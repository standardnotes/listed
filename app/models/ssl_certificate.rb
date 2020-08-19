class SSLCertificate < LetsEncrypt::Certificate
  before_create -> { self.key = OpenSSL::PKey::RSA.new(2048).to_s }

  def renewable?
    !renew_after.present? || renew_after <= Time.zone.now
  end
end
