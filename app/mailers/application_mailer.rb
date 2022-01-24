class ApplicationMailer < ActionMailer::Base
  add_template_helper(ReactOnRailsHelper)
  default from: 'Listed <email@listed.to>',
          reply_to: 'help@standardnotes.com'
  layout 'mailer'
end
