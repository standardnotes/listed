# frozen_string_literal: true

namespace :ssl do
  desc 'Create a letsencrypt certificate for a domain'
  task :create_certificate, [:domain] => [:environment] do |_t, args|
    Rails.logger.tagged('CreateSSL') do
      certificate = LetsEncrypt.certificate_model.create(domain: args[:domain])

      Rake::Task['ssl:renew'].invoke

      certificate.verify
    end
  end
end
