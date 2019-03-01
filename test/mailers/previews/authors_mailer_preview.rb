# Preview all emails at http://localhost:3000/rails/mailers/authors_mailer
class AuthorsMailerPreview < ActionMailer::Preview

  def new_guestbook_entry
    @entry = GuestbookEntry.last
    AuthorsMailer.new_guestbook_entry(@entry.id)
  end

end
