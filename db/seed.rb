APP_ROOT = File.expand_path("..", __dir__)

certificates = LetsEncrypt.certificate_model.all

certificates.each do |certificate|
  if certificate.intermediaries.present? && certificate.key.present?
    File.open("#{APP_ROOT}/certificates/#{certificate.domain}/fullchain.pem", 'w+') { |file| file.write(certificate.intermediaries) }
    File.open("#{APP_ROOT}/certificates/#{certificate.domain}/privkey.pem", 'w+') { |file| file.write(certificate.key) }
  end
end
