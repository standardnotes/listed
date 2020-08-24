class SslCertificateCreateJob < ApplicationJob
  def perform(domain)
    SSLCertificate.find_or_create_by(domain: domain)
  end
end
