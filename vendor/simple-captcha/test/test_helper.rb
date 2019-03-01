# Configure Rails Environment
ENV["RAILS_ENV"] = "test"

require File.expand_path("../dummy/config/environment.rb",  __FILE__)
require "rails/test_help"

require 'capybara/rails'
require 'pry'
require 'model'
Rails.backtrace_cleaner.remove_silencers!

# Load support files
Dir["#{File.dirname(__FILE__)}/support/**/*.rb"].each { |f| require f }

require 'capybara/poltergeist'
Capybara.javascript_driver = :poltergeist

if defined?(Sequel)
  module ::SimpleCaptcha
    def SimpleCaptchaData.delete_all
      dataset.delete
    end
  end
end
