require 'rails/generators'

class SimpleCaptchaGenerator < Rails::Generators::Base
  argument :template_format, :type => :string, :default => 'erb'
  include Rails::Generators::Migration

  def self.source_root
    @source_root ||= File.expand_path(File.join(File.dirname(__FILE__), 'templates/'))
  end

  def self.next_migration_number(dirname)
    Time.now.strftime("%Y%m%d%H%M%S")
  end

  def create_partial
    template "partial.#{template_format}", File.join('app/views', 'simple_captcha', "_simple_captcha.#{template_format}")
  end

  def create_captcha_migration
    migration_template migration_file, File.join('db/migrate', "create_simple_captcha_data.rb")
  end

  private

  def migration_file
    return "migration_sequel.rb" if defined?(Sequel)
    Rails::VERSION::MAJOR > 4 ? "migration5.rb" : "migration.rb"
  end
end
