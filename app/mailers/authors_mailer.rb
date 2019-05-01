class AuthorsMailer < ApplicationMailer

  def featured(author)
    return if author.email_verified == false
    mail(to: author.email, subject: "Congratulations! You are now a featured author on Listed.")
  end

  def domain_approved(author)
    @url = author.url
    mail(to: author.domain.extended_email, subject: "Your custom domain is live!")
  end

  def verify_email(author)
    @author = author
    @verification_link = author.email_verification_link
    mail(to: author.email, subject: "Verify your Listed author email.")
  end

  # def new_guestbook_entry(entry_id)
  #   @entry = GuestbookEntry.find(entry_id)
  #   @author = @entry.author
  #   return if @author.email_verified == false
  #   mail(to: @author.email, subject: "Someone has signed your guestbook!")
  # end

end
