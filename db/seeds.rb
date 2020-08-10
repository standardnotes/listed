domains = ENV['LETSENCRYPT_CERT_DOMAINS'] || ''

domains.split(',').each do |domain|
  if LetsEncrypt::Certificate.exists?(domain: domain)
    Rails.logger.info "Hosted zone #{domain} already exists"
  else
    cert = LetsEncrypt::Certificate.create(domain: domain)
    cert.verify

    route53 = Aws::Route53::Client.new

    resp = route53.create_hosted_zone({
      name: domain,
      caller_reference: Time.now.to_s
    })

    hosted_zone_id = resp.hosted_zone.id.gsub('/hostedzone/', '')
    Rails.logger.info "Hosted zone #{domain} created with id: #{hosted_zone_id}"

    cert.aws_hosted_zone_id = hosted_zone_id
    cert.save

    resp = route53.change_resource_record_sets({
      change_batch: {
        changes: [
          {
            action: "CREATE",
            resource_record_set: {
              alias_target: {
                dns_name: ENV['LETSENCRYPT_AWS_NETWORK_LOAD_BALANCER_ENDPOINT'],
                evaluate_target_health: true,
                hosted_zone_id: ENV['LETSENCRYPT_AWS_NETWORK_LOAD_BALANCER_HOSTED_ZONE_ID']
              },
              name: domain,
              region: "us-east-1",
              set_identifier: "#{domain}-route",
              type: "A"
            }
          }
        ]
      },
      hosted_zone_id: hosted_zone_id
    })
  end
end
