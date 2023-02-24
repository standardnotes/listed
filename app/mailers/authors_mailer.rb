class AuthorsMailer < ApplicationMailer
  def featured(author)
    return if author.email_verified == false

    mail(
      to: author.email,
      subject: 'Congratulations! You are now a featured author on Listed.'
    )
  end

  def domain_approved(author)
    @url = author.url
    mail(to: author.domain.extended_email, subject: 'Your custom domain is live!')
  end

  def domain_invalid(email)
    mail(to: email, subject: 'Invalid Listed Domain')
  end

  def verify_email(author, email)
    @display_name = author.title
    @verification_link = author.email_verification_link
    mail(to: email, subject: 'Verify your Listed author email.')
  end

  def unread_guestbook_entries(author_id, entry_ids)
    @author = Author.find(author_id)
    @entries = GuestbookEntry.where(id: entry_ids)
    return if @author.email_verified == false || @entries.empty?

    mail(
      to: @author.email,
      subject: "You have #{@entries.length} unread guestbook entries"
    )
  end

  def new_reaction(reaction_id)
    @reaction = Reaction.find(reaction_id)
    @post = @reaction.post
    @author = @post.author
    return if @post.author.email_verified == false

    mail(
      to: @author.email,
      subject: "New reaction to your post \"#{@post.title}\""
    )
  end
end
