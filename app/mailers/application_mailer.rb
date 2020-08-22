class ApplicationMailer < ActionMailer::Base
  add_template_helper(ReactOnRailsHelper)
  default from: 'Listed <listed@standardnotes.org>'
  layout 'mailer'
end
