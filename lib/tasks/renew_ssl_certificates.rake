# frozen_string_literal: true

namespace :ssl do
  desc 'Renews the letsencrypt certificates,
    re-imports them to AWS Certificate Manager and adds to the Load Balancer HTTPS listener'
  task :renew, [:aws_elb_listener_arn] => [:environment] do |_t, args|
    certificates = LetsEncrypt.certificate_model.find(:all)

    Rails.logger.info "Found #{certificates.length} certificates"

    acm = Aws::ACM::Client.new
    elb = Aws::ElasticLoadBalancingV2::Client.new

    Rake::Task['letsencrypt:renew'].invoke

    certificates.each do |certificate|
      unless certificate.active?
        Rails.logger.info "Certificate for domain #{certificate.domain} is not active"
        next
      end

      Rails.logger.info "Importing certificate for #{certificate.domain}"

      import_parameters = {
        certificate: certificate.certificate,
        private_key: certificate.key,
        certificate_chain: certificate.intermediaries
      }

      if certificate.aws_arn.present?
        Rails.logger.info "Certificate for #{certificate.domain} already exists. Updating."
        import_parameters['certificate_arn'] = certificate.aws_arn
      end

      response = acm.import_certificate(import_parameters)

      Rails.logger.info "Certificate imported for #{certificate.domain} - ARN: #{response.certificate_arn}"

      certificate.aws_arn = response.certificate_arn
      certificate.save

      Rails.logger.info "Adding certificate to load balancer listener for #{certificate.domain}"

      elb.add_listener_certificates({
        listener_arn: args[:aws_elb_listener_arn],
        certificates: [
          {
            certificate_arn: certificate.aws_arn,
            is_default: false
          }
        ]
      })
    end
  end
end
