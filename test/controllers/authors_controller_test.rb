require 'test_helper'

class AuthorsControllerTest < ActionDispatch::IntegrationTest
  self.fixture_table_names = []

  setup do
    ENV['HOST'] ||= 'http://www.example.com'

    @author = Author.create!(secret: 'author-secret')
    @other_author = Author.create!(secret: 'other-author-secret')
    @author.create_domain!(
      domain: 'author.example.com',
      extended_email: 'author@example.com',
      approved: true,
      active: true
    )
    @other_author.create_domain!(
      domain: 'other.example.com',
      extended_email: 'other@example.com',
      approved: true,
      active: true
    )
  end

  test 'delete_domain requires an authenticated author' do
    assert_no_difference -> { Domain.count } do
      post delete_domain_author_path(@author), params: { domain: 'author.example.com' }
    end

    assert_response :unauthorized
  end

  test 'delete_domain only deletes the authenticated author domain' do
    assert_difference -> { Domain.count }, -1 do
      post delete_domain_author_path(@author, secret: @author.secret), params: { domain: 'other.example.com' }
    end

    assert_response :see_other
    assert_nil @author.reload.domain
    assert_equal 'other.example.com', @other_author.reload.domain.domain
  end

  test 'delete_domain returns not found when author has no domain' do
    @author.domain.delete

    post delete_domain_author_path(@author, secret: @author.secret), params: { domain: 'author.example.com' }

    assert_response :not_found
    assert_equal({ 'error' => 'Domain not found.' }, JSON.parse(response.body))
  end

  test 'domain_request requires an authenticated author' do
    assert_no_difference -> { Domain.count } do
      post domain_request_author_path(@author), params: {
        domain: 'new.example.com',
        extended_email: 'new@example.com'
      }
    end

    assert_response :unauthorized
  end

  test 'domain_request rejects domains that are already taken' do
    assert_no_difference -> { Domain.count } do
      post domain_request_author_path(@author, secret: @author.secret), params: {
        domain: 'other.example.com',
        extended_email: 'new@example.com'
      }
    end

    assert_response :conflict
    assert_equal 'other.example.com', @other_author.reload.domain.domain
  end

  test 'domain_request creates a domain for the authenticated author' do
    @author.domain.delete

    assert_difference -> { Domain.count }, 1 do
      post domain_request_author_path(@author, secret: @author.secret), params: {
        domain: 'new.example.com',
        extended_email: 'new@example.com'
      }
    end

    assert_response :see_other
    assert_equal 'new.example.com', @author.reload.domain.domain
  end
end
