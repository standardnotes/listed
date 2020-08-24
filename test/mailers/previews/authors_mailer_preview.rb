# Preview all emails at http://localhost:3000/rails/mailers/authors_mailer
class AuthorsMailerPreview < ActionMailer::Preview

  def domain_approved
    AuthorsMailer.domain_approved(Author.first)
  end

  def domain_invalid
    AuthorsMailer.domain_invalid(Author.first)
  end

  def featured
    AuthorsMailer.featured(Author.first)
  end

  def verify_email
    AuthorsMailer.verify_email(Author.first)
  end

  def unread_guestbook_entries
    @author = Author.first
    @entries = @author.guestbook_entries
    AuthorsMailer.unread_guestbook_entries(
      @author.id,
      @entries.map(&:id)
    )
  end

end
