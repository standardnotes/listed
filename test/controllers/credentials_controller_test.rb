require 'test_helper'

class CredentialsControllerTest < ActionDispatch::IntegrationTest
  self.fixture_table_names = []

  setup do
    ENV['HOST'] ||= 'http://www.example.com'

    @author = Author.create!(secret: 'author-secret')
    @other_author = Author.create!(secret: 'other-author-secret')
    @credential = @author.credentials.create!(key: 'PayPal', value: 'paypal.me/listed')
  end

  test 'create requires an authenticated author' do
    assert_no_difference -> { Credential.count } do
      post author_credentials_path(@author), params: {
        credential: {
          key: 'Bitcoin',
          value: 'bc1qexample'
        }
      }
    end

    assert_response :unauthorized
  end

  test 'create adds credentials for the authenticated author' do
    assert_difference -> { @author.credentials.count }, 1 do
      post author_credentials_path(@author, secret: @author.secret), params: {
        credential: {
          key: 'Bitcoin',
          value: 'bc1qexample'
        }
      }
    end

    assert_response :see_other
  end

  test 'update requires credential ownership' do
    patch author_credential_path(@other_author, @credential, secret: @other_author.secret), params: {
      credential: {
        key: 'Venmo',
        value: '@listed'
      }
    }

    assert_response :unauthorized
    assert_equal({ 'error' => 'Unauthorized' }, JSON.parse(response.body))
    assert_equal 'PayPal', @credential.reload.key
    assert_equal 'paypal.me/listed', @credential.value
  end

  test 'destroy requires credential ownership' do
    assert_no_difference -> { Credential.count } do
      delete author_credential_path(@other_author, @credential, secret: @other_author.secret)
    end

    assert_response :unauthorized
    assert_equal({ 'error' => 'Unauthorized' }, JSON.parse(response.body))
  end
end
