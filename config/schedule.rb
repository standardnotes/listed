set :output, {:error => 'log/error.log', :standard => 'log/cron.log'}

job_type :rake_verbose, "cd :path && :environment_variable=:environment :bundle_command rake :task :output"

every 1.week do
  runner 'Subscription.send_weekly_emails'
end

every 1.day do
  runner 'Author.email_unread_guestbook_entries'
end

every 1.hour do
  rake_verbose 'ssl:renew'
end
