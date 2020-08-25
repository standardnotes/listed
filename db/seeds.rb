existing_domains = Domain.all

existing_domains.each do |existing_domain|
  SSLCertificate.find_or_create_by(domain: existing_domain.domain)
end
