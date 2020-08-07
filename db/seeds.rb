domains = ENV['LETSENCRYPT_CERT_DOMAINS'] || ''

domains.split(',').each do |domain|
  cert = LetsEncrypt::Certificate.create(domain: domain)
  cert.verify

  route53 = Aws::Route53::Client.new

  resp = route53.list_hosted_zones_by_name({
    dns_name: domain,
    max_items: 1
  })

  puts resp

  hosted_zone_id = nil
  if resp.hosted_zones.length
    Rails.logger.info "Hosted zone #{domain} already exists with id: #{resp.hosted_zones[0].id}"
    hosted_zone_id = resp.hosted_zones[0].id
  else
    resp = route53.create_hosted_zone({
      name: domain,
      caller_reference: Time.now.to_s,
    })
    Rails.logger.info "Hosted zone #{domain} created with id: #{resp.hosted_zone.id}"
    hosted_zone_id = resp.hosted_zone.id
  end

    cert.aws_hosted_zone_id = hosted_zone_id
end
