namespace :privacy do
  desc 'Send privacy policy update emails to all subscribers'
  task notify_subscribers: :environment do
    # Get all verified and non-unsubscribed subscriptions
    subscriptions = Subscription.where(verified: true, unsubscribed: false)

    total = subscriptions.count
    current = 0

    puts "Sending privacy update emails to #{total} subscriptions..."

    subscriptions.find_each do |subscription|
      SubscriptionMailer.privacy_policy_update(subscription).deliver_later
      current += 1

      puts "Processed #{current}/#{total} subscriptions..." if current % 100 == 0
    rescue StandardError => e
      puts "Error sending to subscription #{subscription.id}: #{e.message}"
    end

    puts 'Completed sending privacy update emails'
  end
end
