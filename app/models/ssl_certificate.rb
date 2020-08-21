class SSLCertificate < LetsEncrypt::Certificate
  before_create -> { self.key = ENV['LETSENCRYPT_PRIVATE_KEY'] }

  def renewable?
    !renew_after.present? || renew_after <= Time.zone.now
  end
end
