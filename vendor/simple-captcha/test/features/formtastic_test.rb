if defined? Formtastic
  require 'test_helper'
  class FormtasticTest  < ActionDispatch::IntegrationTest
    self.use_transactional_tests = false if Rails::VERSION::MAJOR >= 5 && !defined?(Sequel)
    self.use_transactional_fixtures = false if Rails::VERSION::MAJOR < 5 && !defined?(Sequel)
    include Capybara::DSL

    setup do
      SimpleCaptcha.always_pass = false
      SimpleCaptcha::SimpleCaptchaData.delete_all
    end

    test 'displays captcha and passes' do
      visit '/pages/formtastic_tag'
      assert_equal 1, SimpleCaptcha::SimpleCaptchaData.count
      fill_in 'user[captcha]', with: SimpleCaptcha::SimpleCaptchaData.first.value
      find('input[type=submit]').click
      assert page.has_content? 'captcha valid'
    end

    test 'captcha fails' do
      visit '/pages/formtastic_tag'
      assert_equal 1, SimpleCaptcha::SimpleCaptchaData.count
      fill_in 'user[captcha]', with: 'something else'
      find('input[type=submit]').click
      assert page.has_no_content? 'captcha not valid'
    end
  end
end
