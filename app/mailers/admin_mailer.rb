class AdminMailer < ApplicationMailer

  def new_domain_request(author)
    @username = author.username
    @id = author.id
    @domain = author.domain.domain
    @email = author.domain.extended_email

    mail(to: "admin@standardnotes.org", subject: "New Listed domain request")
  end

end
