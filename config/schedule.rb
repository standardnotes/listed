job_type :rake_verbose, "cd :path && :environment_variable=:environment :bundle_command rake :task :output"

every 1.week do
  runner 'Subscription.send_weekly_emails'
end

every 1.day do
  runner 'Author.email_unread_guestbook_entries'
end

every 10.minute do
  rake_verbose 'ssl:renew'
end
