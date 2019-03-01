require 'test_helper'
require 'generators/simple_captcha_generator'

class RunGeneratorTest < Rails::Generators::TestCase
  tests SimpleCaptchaGenerator
  destination File.expand_path('../dummy')
  setup :prepare_destination

  test 'generates default partial with ERB format' do
    run_generator
    assert_file 'app/views/simple_captcha/_simple_captcha.erb'
  end

  test 'generates partial with HAML format if specified' do
    run_generator ['haml']
    assert_file 'app/views/simple_captcha/_simple_captcha.haml'
  end
end
