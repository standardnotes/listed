Rails.application.configure do
  Rails.application.config.hcaptcha_verify_url = "https://hcaptcha.com/siteverify"
  Rails.application.config.hcaptcha_secret_key = ENV["HCAPTCHA_SECRET_KEY"]
  Rails.application.config.hcaptcha_site_key = ENV["HCAPTCHA_SITE_KEY"]
end
