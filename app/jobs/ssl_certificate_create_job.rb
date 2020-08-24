class SslCertificateCreateJob < ApplicationJob
  def perform(domain)
    certificate = LetsEncrypt.certificate_model.find_or_create_by(domain: domain)
    certificate.key = ENV['LETSENCRYPT_PRIVATE_KEY']
    certificate.save
  end
end
