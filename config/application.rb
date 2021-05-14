require_relative 'boot'
require 'rails/all'
Bundler.require(*Rails.groups)

module Listed
  class Application < Rails::Application
    config.active_record.belongs_to_required_by_default = false

    # Cross-Origin Resource Sharing (CORS) for Rack compatible web applications.
    config.middleware.insert_before 0, Rack::Cors do
      allow do
        origins '*'
        resource '*',
          headers: :any,
          methods: [:get, :post, :put, :patch, :delete, :options],
          expose: ['Access-Token', 'Client', 'UID']
      end
    end

    config.action_mailer.default_url_options = { host: ENV['HOST'] }

    # SMTP settings
    config.action_mailer.delivery_method = :smtp
    config.action_mailer.smtp_settings = {
      :address => ENV['SMTP_HOST'],
      :port => ENV['SMTP_PORT'],
      :domain => ENV['SMTP_DOMAIN'],
      :user_name => ENV['SMTP_USERNAME'],
      :password => ENV['SMTP_PASSWORD'],
      :authentication => 'login',
      :enable_starttls_auto => true # detects and uses STARTTLS
    }
  end
end
