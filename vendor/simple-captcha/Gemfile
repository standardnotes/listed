source "https://rubygems.org"

if ENV['SEQUEL']
  gem "sequel", "~> 5.14"
  gem "sequel-rails", "~> 1.0"
end

gemspec :name => 'simple_captcha2'

gem 'rails', ENV['RAILS'] || '~> 5.0'
gem 'listen'
gem 'jquery-rails'
gem 'formtastic'

if ENV['DB'] and ENV['DB']['mysql']
  gem 'mysql2'
end

if ENV['DB'] and ENV['DB']['postgresql']
  gem 'pg'
end

gem "bootsnap", "~> 1.3"

gem "puma", "~> 3.12"
