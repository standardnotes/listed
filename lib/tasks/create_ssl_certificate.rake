# frozen_string_literal: true

namespace :ssl do
  desc 'Create a letsencrypt certificate for a domain'
  task :create_certificate, [:domain] => [:environment] do |_t, args|
    Rails.logger.tagged('CreateSSL') do
      cert = LetsEncrypt.certificate_model.create(domain: args[:domain])
      cert.get
    end
  end
end
