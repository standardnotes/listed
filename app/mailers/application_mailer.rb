class ApplicationMailer < ActionMailer::Base
  default from: 'Listed <listed@standardnotes.org>'
  layout 'mailer'
end
