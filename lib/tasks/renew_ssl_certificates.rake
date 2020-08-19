# frozen_string_literal: true

namespace :ssl do
  desc 'Renews the letsencrypt certificates,
    re-imports them to AWS Certificate Manager and adds to the Load Balancer HTTPS listener'
  task :renew, [:aws_elb_listener_arn] => [:environment] do |_t, args|
    certificates = LetsEncrypt.certificate_model.all

    Rails.logger.info "Found #{certificates.length} certificates"

    certificates.each do |certificate|
      unless certificate.renewable?
        Rails.logger.info "Certificate for domain #{certificate.domain} is not renewable before #{certificate.renew_after}"
        next
      end

      unless certificate.key.present?
        Rails.logger.info "Setting default private key on certificate for domain #{certificate.domain}"
        certificate.key = ENV['LETSENCRYPT_PRIVATE_KEY']
        certificate.save
      end

      unless certificate.aws_hosted_zone_id.present?
        Rails.logger.info "Setting up Route 53 records for domain #{certificate.domain}"
        create_aws_hosted_zone(certificate)
      end

      Rails.logger.info "Renewing certificate for domain #{certificate.domain}"
      certificate.renew

      unless certificate.active?
        Rails.logger.info "Certificate for domain #{certificate.domain} is not active"
        next
      end

      import_certificate_to_aws(certificate)

      add_certificate_to_load_balancer(certificate, args[:aws_elb_listener_arn])
    end
  end

  def add_certificate_to_load_balancer(certificate, load_balancer_listener_arn)
    Rails.logger.info "Adding certificate to load balancer listener for #{certificate.domain}"

    elb = Aws::ElasticLoadBalancingV2::Client.new
    elb.add_listener_certificates({
      listener_arn: load_balancer_listener_arn,
      certificates: [
        {
          certificate_arn: certificate.aws_arn
        }
      ]
    })
  end

  def import_certificate_to_aws(certificate)
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

    acm = Aws::ACM::Client.new
    response = acm.import_certificate(import_parameters)

    Rails.logger.info "Certificate imported for #{certificate.domain} - ARN: #{response.certificate_arn}"

    certificate.aws_arn = response.certificate_arn
    certificate.save
  end

  def create_aws_hosted_zone(certificate)
    route53 = Aws::Route53::Client.new

    response = route53.create_hosted_zone({
      name: certificate.domain,
      caller_reference: Time.now.to_s
    })

    hosted_zone_id = response.hosted_zone.id.gsub('/hostedzone/', '')
    Rails.logger.info "Hosted zone #{certificate.domain} created with id: #{hosted_zone_id}"

    certificate.aws_hosted_zone_id = hosted_zone_id
    certificate.save

    route53.change_resource_record_sets({
      change_batch: {
        changes: [
          {
            action: 'CREATE',
            resource_record_set: {
              alias_target: {
                dns_name: ENV['LETSENCRYPT_AWS_NETWORK_LOAD_BALANCER_ENDPOINT'],
                evaluate_target_health: true,
                hosted_zone_id: ENV['LETSENCRYPT_AWS_NETWORK_LOAD_BALANCER_HOSTED_ZONE_ID']
              },
              name: domain,
              region: 'us-east-1',
              set_identifier: "#{domain}-route",
              type: 'A'
            }
          }
        ]
      },
      hosted_zone_id: hosted_zone_id
    })
  end
end
