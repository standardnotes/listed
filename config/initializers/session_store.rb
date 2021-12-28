# Be sure to restart your server when you modify this file.

Rails.application.config.session_store :cookie_store,
  key: '_listed_session',
  secret: ENV["SECRET_KEY_BASE"],
  secure: Rails.env.production?
