# Preview all emails at http://localhost:3009/rails/mailers/admin_mailer
class AdminMailerPreview < ActionMailer::Preview

  def new_domain_request
    AdminMailer.new_domain_request(Author.first)
  end

end
