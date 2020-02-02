# Preview all emails at http://localhost:3000/rails/mailers/authors_mailer
class AuthorsMailerPreview < ActionMailer::Preview
  def unread_guestbook_entries
    @author = Author.first
    @entries = @author.guestbook_entries
    AuthorsMailer.unread_guestbook_entries(
      @author.id,
      @entries.map(&:id)
    )
  end
end
