source 'https://rubygems.org'

git_source(:github) do |repo_name|
  repo_name = "#{repo_name}/#{repo_name}" unless repo_name.include?('/')
  "https://github.com/#{repo_name}.git"
end

gem 'dotenv-rails', '~> 2.7.6'
gem 'haml-rails'
gem 'mini_racer', platforms: :ruby
gem 'mysql2', '>= 0.3.13', '< 0.5'
gem 'puma', '~> 4.3'
gem 'rack-cors', :require => 'rack/cors'
gem 'rails', '= 5.2.5'
gem 'react_on_rails', '11.3'
gem 'redcarpet'
gem 'rouge'
gem 'safe_yaml'
gem 'sanitize'
gem 'sass-rails', '~> 5.0'
gem 'tzinfo-data', platforms: [:mingw, :mswin, :x64_mingw, :jruby]
gem 'uglifier', '>= 1.3.0'
gem 'webpacker', '~> 4'
gem 'whenever'
gem "aws-sdk-acm", "~> 1.34"
gem "aws-sdk-elasticloadbalancingv2", "~> 1.47"
gem "aws-sdk-route53", "~> 1.40"
gem "aws-sdk-sns", "~> 1.49"
gem "aws-sdk-sqs", "~> 1.48"
gem "capistrano-shoryuken", "~> 0.1.5"
gem "lograge", "~> 0.11.2"
gem "newrelic_rpm", "= 8.2.0"
gem "newrelic-infinite_tracing", "= 8.2.0"
gem "rails-letsencrypt", "~> 0.9.0"
gem "shoryuken", "~> 5.3"

group :development, :test do
  # Call 'byebug' anywhere in the code to stop execution and get a debugger console
  gem 'byebug', platform: :mri
end

group :development do
  gem 'brakeman'
  gem 'capistrano-bundler'
  gem 'capistrano-git-submodule-strategy', '~> 0.1.22'
  gem 'capistrano-passenger', '>= 0.2.0'
  gem 'capistrano-rails'
  gem 'capistrano-rvm'
  gem 'capistrano-sidekiq'
  gem 'capistrano'
  gem 'listen', '~> 3.0.5'
  gem 'rb-readline'
  gem 'spring-watcher-listen', '~> 2.0.0'
  gem 'spring'
  gem 'web-console', '>= 3.3.0'
end

