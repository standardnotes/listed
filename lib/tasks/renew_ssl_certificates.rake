# frozen_string_literal: true

APP_ROOT = File.expand_path('../..', __dir__)
DOMAINER_PATH = '/home/ec2-user/domainer/'
NGINX_CONF_PATH = '/opt/nginx/conf/nginx.conf'

namespace :ssl do
  desc 'Renews the letsencrypt certificates,
    re-imports them to AWS Certificate Manager and adds to the Load Balancer HTTPS listener'
  task renew: :environment do
    Rails.logger.tagged('RenewSSL') do
      certificates = LetsEncrypt.certificate_model.all

      Rails.logger.info "Found #{certificates.length} certificates"

      renew_certificates(certificates)

      domains = certificates.map(&:domain)

      create_nginx_domain_config_files(domains)

      update_main_nginx_config_file(domains)

      restart_nginx

      validate_certificates(certificates)
    end
  end

  def renew_certificates(certificates)
    certificates.each do |certificate|
      Rails.logger.tagged(certificate.domain) do
        begin
          unless certificate.renewable?
            Rails.logger.info "Certificate is not renewable before #{certificate.renew_after}"
            next
          end

          Rails.logger.info 'Renewing certificate'
          certificate.renew
        rescue StandardError => e
          Rails.logger.warn "Processing error: #{e.message}"
          next
        end
      end
    end

  end

  def validate_certificates(certificates)
    certificates.each do |certificate|
      Rails.logger.tagged(certificate.domain) do
        existing_domain = Domain.find_by_domain(certificate.domain)

        unless existing_domain
          Rails.logger.info 'There is no domain entry. Skipped domain validation.'

          next
        end

        unless certificate.active?
          Rails.logger.info 'Certificate is not active. Removing certificate.'

          existing_domain.author.invalid_domain

          certificate.delete

          next
        end

        existing_domain.author.approve_domain

        existing_domain.author.notify_domain
      end
    end
  end

  def update_main_nginx_config_file(domains)
    nginx_domain_config_files = domains.map { |domain| "#{DOMAINER_PATH}domains/#{domain}" }

    nginx_file = File.read(NGINX_CONF_PATH)

    start = '#BEGIN DOMAINER INCLUDES#'
    finish = '#END DOMAINER INCLUDES#'

    current_config = nginx_file[/#{start}([\s\S]*)#{finish}/, 0]

    unless current_config
      Rail.logger.error 'Unable to find current config. Ensure #BEGIN/END DOMAINER INCLUDES# is present in the nginx file.'
      return
    end

    include_statements = nginx_domain_config_files.map { |file_path| "include #{file_path};" }.join("\n")
    new_config = "#{start}\n#{include_statements}\n#{finish}"
    nginx_file.gsub!(current_config, new_config)

    File.open(NGINX_CONF_PATH, 'w+') { |file| file.write(nginx_file) }
  end

  def create_nginx_domain_config_files(domains)
    File.open("#{DOMAINER_PATH}nginx_all_domains", 'w+') { |file| file.write("server_name #{domains.join(' ')};") }

    default_config_path = "#{DOMAINER_PATH}nginx_default"

    domains.each do |domain|
      Rails.logger.tagged(domain) do
        domain_config = <<~CONF.strip
        server {
          server_name #{domain};
          ssl_certificate #{APP_ROOT}/certificates/#{domain}/fullchain.pem;
          ssl_certificate_key #{APP_ROOT}/certificates/#{domain}/privkey.pem;

          ssl_dhparam /etc/ssl/certs/dhparam.pem;

          ssl_protocols TLSv1.1 TLSv1.2;
          ssl_session_cache shared:SSL:10m;
          ssl_session_timeout 10m;
          ssl_stapling on;
          ssl_stapling_verify on;

          add_header Strict-Transport-Security "max-age=31536000; includeSubdomains";
          add_header X-Frame-Options DENY;
          add_header X-Content-Type-Options nosniff;

          include #{default_config_path};
        }
        CONF

        Rails.logger.info 'Creating nginx domain config file'

        file_path = "#{DOMAINER_PATH}domains/#{domain}"
        File.open(file_path, 'w+') { |file| file.write(domain_config) }
      end
    end
  end

  def restart_nginx
    Rails.logger.info 'Restarting nginx...'
    system('sudo /opt/nginx/sbin/nginx -s reload')
    Rails.logger.info 'Restarted nginx'
  end
end
