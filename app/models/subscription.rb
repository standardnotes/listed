class Subscription < ApplicationRecord
  include Tokenable

  belongs_to :author
  belongs_to :subscriber

  def self.send_weekly_emails
    subscriptions = Subscription.where(:frequency => "weekly", :verified => true, :unsubscribed => false)
    subscriptions.each do |subscription|
      # deliver_later doesn't work for this for some reason as we're calling this from schedule.rb (runner)
      SubscriptionMailer.weekly_digest(subscription.id).deliver_now
      subscription.last_mailing = DateTime.now
    end
    subscriptions.each(&:save)
  end
end
