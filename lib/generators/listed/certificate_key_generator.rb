# frozen_string_literal: true

require 'rails/generators'
require 'rails/generators/migration'
require 'rails/generators/active_record'

require 'generators/lets_encrypt/register_generator'

module Listed
  module Generators
    class CertificateKeyGenerator < LetsEncrypt::Generators::RegisterGenerator
      private

      def generate_key
        # rubocop:disable Metrics/LineLength
        key_path = ask("Where you to save private key [#{LetsEncrypt.private_key_path}]:", path: true)
        # rubocop:enable Metrics/LineLength
        key_path = LetsEncrypt.private_key_path if key_path.blank?

        return unless file_collision(key_path)
        FileUtils.rm(key_path) if File.exist?(key_path)
        LetsEncrypt.config.use_env_key = false
        LetsEncrypt.config.private_key_path = key_path

        key = OpenSSL::PKey::RSA.new(2048)
        File.open(key_path, 'w') { |f| f.write(key.to_s) }
        Rails.logger.info "Created new private key for Let's Encrypt with 2048 bit length"

        # rubocop:disable Metrics/LineLength
        say "Your privated key is saved in #{key_path}, make sure setup configure for your rails.", :yellow
        # rubocop:enable Metrics/LineLength
      end
    end
  end
end
