set :output, {:error => 'error.log', :standard => 'cron.log'}

every 1.week do
  runner 'Subscription.send_weekly_emails'
end

every 1.day do
  runner 'Author.email_unread_guestbook_entries'
end

every 10.minute do
  rake 'ssl:renew'
end
