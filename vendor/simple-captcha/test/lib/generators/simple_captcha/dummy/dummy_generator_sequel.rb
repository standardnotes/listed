require File.expand_path('../dummy_generator', __FILE__)

module SimpleCaptcha
  class DummyGeneratorSequel < DummyGenerator
    desc "Creates dummy test Rails application (sequel version)"

    def generate_test_dummy
      opts = (options || {}).slice(*PASSTHROUGH_OPTIONS) || {} # rails 3.2 ? -> slice is nil
      opts[:force] = true
      opts[:skip_bundle] = true
      opts[:old_style_hash] = true
      opts[:skip_active_record] = true unless ENV["SEQUEL"].nil?

      copy_file "config/database.yml", "#{dummy_path}/config/database.yml", :force => true

      invoke Rails::Generators::AppGenerator, [ File.expand_path(dummy_path, destination_root) ], opts
      create_file "#{dummy_path}/config/initializers/sequel.rb", "Rails.application.config.sequel.schema_dump = false"
      run "mkdir db"
      run "rails generate simple_captcha"
    end
  end
end
