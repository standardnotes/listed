require 'test_helper'

class AuthorsMailerTest < ActionMailer::TestCase
  self.fixture_table_names = []

  setup do
    ENV['HOST'] ||= 'http://www.example.com'
  end

  test 'sunsetting_announcement returns before mail for nil author' do
    assert_nil AuthorsMailer.new.sunsetting_announcement(nil)
  end

  test 'sunsetting_announcement returns before mail for blank email author' do
    author = Author.create!(
      secret: SecureRandom.hex(10),
      email: '',
      email_verified: false
    )

    assert_nil AuthorsMailer.new.sunsetting_announcement(author)
  end

  test 'sunsetting_announcement delivers to unverified author' do
    author = Author.create!(
      secret: SecureRandom.hex(10),
      email: 'unverified@example.com',
      email_verified: false
    )

    email = AuthorsMailer.sunsetting_announcement(author)

    assert_emails 1 do
      email.deliver_now
    end

    assert_equal ['unverified@example.com'], email.to
  end
end
