existing_domains = Domain.all

existing_domains.each do |existing_domain|
  LetsEncrypt.certificate_model.find_or_create_by(domain: existing_domain.domain)
end
