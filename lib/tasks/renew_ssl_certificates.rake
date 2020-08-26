# frozen_string_literal: true

namespace :ssl do
  desc 'Renews the letsencrypt certificates,
    re-imports them to AWS Certificate Manager and adds to the Load Balancer HTTPS listener'
  task renew: :environment do
    Rails.logger.tagged('RenewSSL') do
      certificates = LetsEncrypt.certificate_model.all

      Rails.logger.info "Found #{certificates.length} certificates"

      certificates.each do |certificate|
        Rails.logger.tagged(certificate.domain) do
          begin
            unless certificate.renewable?
              Rails.logger.info "Certificate is not renewable before #{certificate.renew_after}"
              next
            end

            Rails.logger.info 'Renewing certificate'
            certificate.renew

            next unless validate_domain(certificate)
          rescue StandardError => e
            Rails.logger.warn "Processing error: #{e.message}"
            next
          end
        end
      end
    end
  end

  def validate_domain(certificate)
    existing_domain = Domain.find_by_domain(certificate.domain)

    unless existing_domain
      Rails.logger.info 'There is no domain entry. Skipped domain validation.'
      return false
    end

    unless certificate.active?
      Rails.logger.info 'Certificate is not active. Removing certificate.'
      existing_domain.author.invalid_domain
      certificate.delete
      return false
    end

    existing_domain.author.approve_domain

    existing_domain.author.notify_domain

    true
  end
end
