require 'test_helper'

class GuestbookEntryControllerTest < ActionDispatch::IntegrationTest
  self.fixture_table_names = []

  setup do
    ENV['HOST'] ||= 'http://www.example.com'

    @author = Author.create!(secret: 'author-secret')
    @entry = @author.guestbook_entries.create!(
      text: 'Hello from the guestbook',
      public: false
    )
  end

  %i[approve unapprove spam delete].each do |action|
    test "#{action} requires a valid entry token" do
      assert_no_changes -> { @entry.reload.attributes.slice('public', 'spam') } do
        get send("#{action}_author_guestbook_entry_path", @author, @entry)
      end

      assert_response :not_found
      assert_not response.headers['Location'].to_s.include?(@author.secret)
    end

    test "#{action} rejects an invalid entry token" do
      assert_no_changes -> { @entry.reload.attributes.slice('public', 'spam') } do
        get send("#{action}_author_guestbook_entry_path", @author, @entry, token: 'invalid-token')
      end

      assert_response :not_found
      assert_not response.headers['Location'].to_s.include?(@author.secret)
    end

    test "#{action} rejects a token for an entry owned by another author" do
      other_author = Author.create!(secret: 'other-author-secret')
      other_entry = other_author.guestbook_entries.create!(text: 'Other guestbook entry')

      assert_no_changes -> { other_entry.reload.attributes.slice('public', 'spam') } do
        get send(
          "#{action}_author_guestbook_entry_path",
          @author,
          other_entry,
          token: other_entry.token
        )
      end

      assert_response :not_found
    end
  end

  test 'approve publishes an entry when the token is valid' do
    assert_changes -> { @entry.reload.public? }, from: false, to: true do
      get approve_author_guestbook_entry_path(@author, @entry, token: @entry.token)
    end

    assert_response :see_other
    assert_includes response.headers['Location'], "secret=#{@author.secret}"
  end

  test 'delete removes an entry when the token is valid' do
    assert_difference -> { GuestbookEntry.count }, -1 do
      get delete_author_guestbook_entry_path(@author, @entry, token: @entry.token)
    end

    assert_response :redirect
    assert_not response.headers['Location'].include?(@author.secret)
  end

  test 'destroy requires a valid entry token' do
    assert_no_difference -> { GuestbookEntry.count } do
      delete author_guestbook_entry_path(@author, @entry)
    end

    assert_response :not_found
  end

  test 'destroy removes an entry when the token is valid' do
    assert_difference -> { GuestbookEntry.count }, -1 do
      delete author_guestbook_entry_path(@author, @entry, token: @entry.token)
    end

    assert_response :redirect
    assert_not response.headers['Location'].to_s.include?(@author.secret)
  end
end
