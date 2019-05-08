class Subscription < ApplicationRecord
  include Tokenable

  belongs_to :author
  belongs_to :subscriber

  def self.send_weekly_emails
    subscriptions = Subscription.where(:frequency => "weekly", :verified => true, :unsubscribed => false)
    subscriptions.each do |subscription|
      # deliver_later doesn't work for this for some reason as we're calling this from schedule.rb (runner)
      # there's an issue where subscription.last_mailing isn't being saved for some subs. I believe it's because
      # there may be an exception triggering here causing subscriptions to not save.
      begin
        SubscriptionMailer.weekly_digest(subscription.id).deliver_now
      rescue => e

      end
      subscription.last_mailing = DateTime.now
    end
    subscriptions.each(&:save)
  end
end
