class ApplicationMailer < ActionMailer::Base
  add_template_helper(ReactOnRailsHelper)
  default from: 'Listed <listed@standardnotes.org>',
          reply_to: 'help@standardnotes.com'
  layout 'mailer'
end
