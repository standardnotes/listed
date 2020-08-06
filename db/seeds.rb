domains = ENV['LETSENCRYPT_CERT_DOMAINS'] || ''

domains.split(',').each do |domain|
  cert = LetsEncrypt::Certificate.create(domain: domain)
  cert.get
end
