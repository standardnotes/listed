class SubscriptionMailer < ApplicationMailer
  def confirm_subscription(subscription)
    @author = subscription.author
    @author_url = @author.url
    @confirm_url = "#{@author.get_host}/subscriptions/#{subscription.id}/confirm?t=#{subscription.token}"
    mail(to: subscription.subscriber.email, subject: "Confirm your subscription to #{subscription.author.title} on Listed")
  end

  def new_post(post, subscriber)
    @post = post
    subscription = subscriber.subscription_for_author(post.author)
    @unsubscribe_url = "#{@post.author.get_host}/subscriptions/#{subscription.id}/unsubscribe?t=#{subscription.token}"
    if subscription.frequency == "daily"
      @weekly_url = "#{@post.author.get_host}/subscriptions/#{subscription.id}/update_frequency?f=weekly&t=#{subscription.token}"
    end
    @post_url = "#{@post.author.get_host}#{post.path}"
    @rendered_text = post.rendered_text
    mail(to: subscriber.email, subject: "#{post.title} — a new post by #{post.author.title}", reply_to: post.author.email)
  end

  def weekly_digest(sub_id)
    subscription = Subscription.find(sub_id)
    @author = subscription.author
    @posts = @author.posts
                    .where('created_at > ?', subscription.last_mailing || 0)
                    .where(unlisted: false)
                    .where.not(email_sent_date: nil)
                    .order('created_at DESC')
    return if @posts.empty?

    if @posts.length == 1
      title = "\"#{@posts.first.title}\" | This week from #{subscription.author.title}"
    else
      title = "\"#{@posts.first.title}\" and #{@posts.length - 1} other posts from #{subscription.author.title}"
    end

    @unsubscribe_url = "#{@author.get_host}/subscriptions/#{subscription.id}/unsubscribe?t=#{subscription.token}"
    mail(to: subscription.subscriber.email, subject: title)
  end

  def new_subscription(subscription)
    @author = subscription.author
    return if @author.email_verified == false

    mail(to: subscription.author.email, subject: "New subscriber to #{subscription.author.title}")
  end
end
