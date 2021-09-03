class SSLCertificate < LetsEncrypt::Certificate
  before_create -> { self.key = OpenSSL::PKey::RSA.new(2048).to_s }

  public :create_order, :start_challenge, :wait_verify_status, :check_verify_status, :retry_on_verify_error

  def renewable?
    !renew_after.present? || renew_after <= Time.zone.now
  end

  # rails-letsencrypt does not return error value on `verify` method, so we can't differentiate
  # between a rate limiting error and an invalid domain. Use this method to custom validate
  # whether a domain's DNS records are correctly configured.
  # Returns 'valid' if valid, 'invalid' if explicitly invalid, and 'error' if API error.
  # Based on https://github.com/elct9620/rails-letsencrypt/blob/master/app/models/concerns/lets_encrypt/certificate_verifiable.rb
  def validate
    create_order
    start_challenge
    wait_verify_status
    status = @challenge.status
    return 'invalid' if status == 'invalid'

    'valid'
  rescue StandardError => e
    Rails.logger.info "Error validating cerficate #{e.message}"
    'error'
  end
end
