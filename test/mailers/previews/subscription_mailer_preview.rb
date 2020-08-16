# Preview all emails at http://localhost:3000/rails/mailers/subscription_mailer
class SubscriptionMailerPreview < ActionMailer::Preview

  def new_post
    post = Post.last
    SubscriptionMailer.new_post(post, Subscriber.last)
  end

  def confirm_subscription
    SubscriptionMailer.confirm_subscription(Subscription.last)
  end

  def new_subscription
    SubscriptionMailer.new_subscription(Subscription.last)
  end

end
