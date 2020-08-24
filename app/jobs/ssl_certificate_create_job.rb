class SslCertificateCreateJob < ApplicationJob
  def perform(domain)
    certificate = SSLCertificate.find_or_create_by(domain: domain)
    certificate.save
  end
end
