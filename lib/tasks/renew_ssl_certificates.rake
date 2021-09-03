# frozen_string_literal: true

require 'fileutils'
require 'uri'

namespace :ssl do
  desc 'Renews the letsencrypt certificates,
    re-imports them to AWS Certificate Manager and adds to the Load Balancer HTTPS listener'
  task renew: :environment do
    Rails.logger.tagged('RenewSSL') do
      certificates = LetsEncrypt.certificate_model.all

      Rails.logger.info "Found #{certificates.length} certificates"

      renew_certificates(certificates)

      active_domains = certificates.select(&:active?).map(&:domain)
      host_domain = URI.parse(ENV['ALT_HOST']).host
      active_domains = active_domains.reject { |domain| domain == host_domain }

      create_nginx_domain_config_files(active_domains)

      update_main_nginx_config_file(active_domains)

      restart_nginx

      validate_certificates(certificates)
    end
  end

  def renew_certificates(certificates)
    certificates.each do |certificate|
      Rails.logger.tagged(certificate.domain) do
        begin
          dump_certificate_to_files(certificate) unless certificate_files_exist(certificate)

          unless certificate.renewable?
            Rails.logger.info "Certificate is not renewable before #{certificate.renew_after}"
            next
          end

          Rails.logger.info 'Renewing certificate'
          certificate.renew

          dump_certificate_to_files(certificate)
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

        if certificate.validate == 'invalid'
          Rails.logger.info 'Certificate is not valid. Removing certificate.'

          existing_domain.author.invalid_domain

          certificate.delete

          next
        end

        unless certificate.active?
          Rails.logger.info 'Certificate is not active. Removing certificate.'

          existing_domain.author.invalid_domain

          certificate.delete

          next
        end

        unless existing_domain.approved
          existing_domain.author.approve_domain

          existing_domain.author.notify_domain
        end
      end
    end
  end

  def update_main_nginx_config_file(domains)
    nginx_domain_config_files = domains.map { |domain| "#{ENV['DOMAINS_FOLDER_PATH']}/#{domain}" }

    nginx_file = File.read(ENV['NGINX_CONFIG_PATH'])

    start = '#BEGIN DOMAIN INCLUDES#'
    finish = '#END DOMAIN INCLUDES#'

    current_config = nginx_file[/#{start}([\s\S]*)#{finish}/, 0]

    unless current_config
      Rail.logger.error 'Unable to find current config. Ensure #BEGIN/END DOMAIN INCLUDES# is present in the nginx file.'
      return
    end

    include_statements = nginx_domain_config_files.map { |file_path| "include #{file_path};" }.join("\n")
    new_config = "#{start}\n#{include_statements}\n#{finish}"
    nginx_file.gsub!(current_config, new_config)

    File.open(ENV['NGINX_CONFIG_PATH'], 'w+') { |file| file.write(nginx_file) }
  end

  def create_nginx_domain_config_files(domains)
    File.open("#{ENV['DOMAINS_FOLDER_PATH']}/nginx_all_domains", 'w+') { |file| file.write("server_name #{domains.join(' ')};") }

    default_config_path = "#{ENV['DOMAINS_FOLDER_PATH']}/nginx_default"

    domains.each do |domain|
      Rails.logger.tagged(domain) do
        domain_config = <<~CONF.strip
        server {
          server_name #{domain};
          ssl_certificate #{ENV['CERTIFICATES_FOLDER_PATH']}/#{domain}/fullchain.pem;
          ssl_certificate_key #{ENV['CERTIFICATES_FOLDER_PATH']}/#{domain}/privkey.pem;

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

        file_path = "#{ENV['DOMAINS_FOLDER_PATH']}/#{domain}"
        File.open(file_path, 'w+') { |file| file.write(domain_config) }
      end
    end
  end

  def dump_certificate_to_files(certificate)
    certificate_directory = "#{ENV['CERTIFICATES_FOLDER_PATH']}/#{certificate.domain}"
    FileUtils.mkdir_p certificate_directory unless File.exists?(certificate_directory)

    Rails.logger.info 'Creating fullchain certificate file'
    file_path = "#{certificate_directory}/fullchain.pem"
    File.open(file_path, 'w+') { |file| file.write(certificate.bundle) }

    Rails.logger.info 'Creating privkey certificate file'
    file_path = "#{certificate_directory}/privkey.pem"
    File.open(file_path, 'w+') { |file| file.write(certificate.key) }
  end

  def certificate_files_exist(certificate)
    File.file?("#{ENV['CERTIFICATES_FOLDER_PATH']}/#{certificate.domain}/fullchain.pem") &&
      File.file?("#{ENV['CERTIFICATES_FOLDER_PATH']}/#{certificate.domain}/privkey.pem")
  end

  def restart_nginx
    Rails.logger.info 'Restarting nginx...'
    system('if [ -f "/opt/nginx/logs/nginx.pid" ]; then sudo kill $(cat /opt/nginx/logs/nginx.pid); fi && sudo /opt/nginx/sbin/nginx')
    Rails.logger.info 'Restarted nginx'
  end
end
