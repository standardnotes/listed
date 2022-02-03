# Preview all emails at http://localhost:3009/rails/mailers/subscription_mailer
class SubscriptionMailerPreview < ActionMailer::Preview

  def new_post
    post = Post.last
    SubscriptionMailer.new_post(post, Subscriber.last)
  end

  def subscription_success
    SubscriptionMailer.subscription_success(Subscription.last)
  end

  def new_subscription
    SubscriptionMailer.new_subscription(Subscription.last)
  end

  def weekly_digest
    SubscriptionMailer.weekly_digest(Subscription.last.id)
  end

end
