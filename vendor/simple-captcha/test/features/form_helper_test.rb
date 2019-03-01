require 'test_helper'
require 'simple_captcha/controller'

class FormHelperTest  < ActionDispatch::IntegrationTest
  include Capybara::DSL
  self.use_transactional_tests = false if Rails::VERSION::MAJOR >= 5 && !defined?(Sequel)
  self.use_transactional_fixtures = false if Rails::VERSION::MAJOR < 5 && !defined?(Sequel)

  setup do
    SimpleCaptcha.always_pass = false
    Capybara.current_driver = Capybara.javascript_driver
    SimpleCaptcha::SimpleCaptchaData.delete_all
  end

  test 'displays captcha and passes' do
    visit '/pages/form_tag'
    assert_equal 1, SimpleCaptcha::SimpleCaptchaData.count
    fill_in 'captcha', with: SimpleCaptcha::SimpleCaptchaData.first.value
    click_on 'Save changes'
    assert page.has_content? 'captcha valid'
  end

  test 'captcha fails' do
    visit '/pages/form_tag'
    assert_equal 1, SimpleCaptcha::SimpleCaptchaData.count
    fill_in 'captcha', with: 'something else'
    click_on 'Save changes'
    assert page.has_content? 'captcha not valid'
  end

  test 'also works with model based' do
    visit '/pages/model_tag'
    assert_equal 1, SimpleCaptcha::SimpleCaptchaData.count
    fill_in 'user[captcha]', with: SimpleCaptcha::SimpleCaptchaData.first.value
    click_on 'Save changes'
    assert page.has_content? 'captcha valid'
  end

  test 'model based failure' do
    visit '/pages/model_tag'
    assert_equal 1, SimpleCaptcha::SimpleCaptchaData.count
    fill_in 'user[captcha]', with: 'wrong captcha'
    click_on 'Save changes'
    assert page.has_content? 'captcha not valid'
  end

  test 'Refresh Button' do
    skip
    # visit '/pages/form_tag'
    # captcha= SimpleCaptcha::SimpleCaptchaData.first
    # img = find('img')['src']
    # click_on 'Refresh'

    # assert_not_equal img, new_img
    # fill_in 'captcha', with: new_captcha.value
    # click_on 'Save changes'
    # assert page.has_content? 'captcha valid'
  end
end
