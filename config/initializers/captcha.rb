Rails.application.configure do
  config.captcha_ui_url = ENV["CAPTCHA_UI_URL"]
  config.captcha_server_url = ENV["CAPTCHA_SERVER_URL"]
end
