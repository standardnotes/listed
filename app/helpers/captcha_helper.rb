module CaptchaHelper
  require "net/http"
  require "json"
  require "uri"

  def self.verify_token(token)
    server_url = Rails.application.config.captcha_server_url

    if server_url.blank?
      return ApplicationController.render json: { success: true }
    end

    if token.blank?
      return ApplicationController.render json: { success: false, error: "Please complete the captcha." }
    end

    uri = URI.parse("#{server_url.chomp('/')}/verify")
    uri.query = URI.encode_www_form(token: token)

    response = Net::HTTP.get_response(uri)
    json = JSON.parse(response.body)

    if json["status"] == "pass"
      ApplicationController.render json: { success: true }
    else
      Rails.logger.warn("Captcha verification failed: #{json}")
      ApplicationController.render json: { success: false, error: "Please try again." }
    end
  rescue StandardError => e
    Rails.logger.error("Captcha verification error: #{e}")
    ApplicationController.render json: { success: false, error: "Please try again." }
  end
end
