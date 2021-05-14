source 'https://rubygems.org'

git_source(:github) do |repo_name|
  repo_name = "#{repo_name}/#{repo_name}" unless repo_name.include?('/')
  "https://github.com/#{repo_name}.git"
end

gem 'rails', '= 5.2.5'
gem 'mysql2'
gem 'puma', '~> 4.3'
gem 'sass-rails', '~> 5.0'
gem 'uglifier', '>= 1.3.0'
gem 'safe_yaml'
gem 'dotenv-rails', '~> 2.7.6'
gem 'sanitize'
gem 'rouge'
gem 'haml-rails'
gem 'whenever'
gem 'redcarpet'
gem 'rack-cors', :require => 'rack/cors'
gem 'react_on_rails', '11.3'
gem 'webpacker', '~> 4'

group :development, :test do
  # Call 'byebug' anywhere in the code to stop execution and get a debugger console
  gem 'byebug', platform: :mri
end

group :development do
  # Access an IRB console on exception pages or by using <%= console %> anywhere in the code.
  gem 'web-console', '>= 3.3.0'
  gem 'listen', '~> 3.0.5'
  gem 'spring'
  gem 'spring-watcher-listen', '~> 2.0.0'
  gem 'rb-readline'
  # Deployment tools
  gem 'capistrano'
  gem 'capistrano-bundler'
  gem 'capistrano-passenger', '>= 0.2.0'
  gem 'capistrano-rails'
  gem 'capistrano-rvm'
  gem 'capistrano-sidekiq'
  gem 'capistrano-git-submodule-strategy', '~> 0.1.22'
end

# Windows does not include zoneinfo files, so bundle the tzinfo-data gem
gem 'tzinfo-data', platforms: [:mingw, :mswin, :x64_mingw, :jruby]
gem 'mini_racer', platforms: :ruby


gem "rails-letsencrypt", "~> 0.9.0"

gem "aws-sdk-acm", "~> 1.34"

gem "aws-sdk-elasticloadbalancingv2", "~> 1.47"

gem "lograge", "~> 0.11.2"

gem "aws-sdk-route53", "~> 1.40"

gem "newrelic_rpm", "~> 7.0"
