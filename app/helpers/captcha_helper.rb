module CaptchaHelper
  require 'net/https'

  def self.verify_hcaptcha(token)
    verify_url = Rails.application.config.hcaptcha_verify_url
    secret_key = Rails.application.config.hcaptcha_secret_key
    site_key = Rails.application.config.hcaptcha_site_key

    uri = URI.parse(verify_url)
    response = Net::HTTP.post_form(uri, 'secret' => secret_key, 'response' => token, 'sitekey' => site_key)
    json = JSON.parse(response.body)

    if json['success'] == true
      ApplicationController.render :json => { success: true }
    else
      Rails.logger.warn(
        "hCaptcha verification failed: error_codes=#{json['error-codes']} hostname=#{json['hostname']} challenge_ts=#{json['challenge_ts']}"
      )
      ApplicationController.render :json => { success: false, error: "Please try again." }
    end
  end
end
