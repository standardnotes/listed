class SubscriptionsController < ApplicationController
  include CaptchaHelper

  def index
    @title = "Subscribe | #{@author.title}"
  end

  def validate
    @subscription = Subscription.find(params[:subscription_id])
    @author = @subscription.author
    @styles = @subscription.author.css if @subscription.author.custom_theme_enabled
    @title = 'Confirm Your Subscription'
  end

  def submit_validate
    @subscription = Subscription.find(params[:subscription_id])
    is_valid_subscription = @subscription && !@subscription.verified && !@subscription.verification_sent_at
    captcha_verification = JSON.parse(CaptchaHelper.verify_hcaptcha(params[:token]))
    is_valid_captcha = captcha_verification["success"]

    if is_valid_subscription && is_valid_captcha
      @subscription.verified = true
      @subscription.save
      SubscriptionMailer.subscription_success(@subscription).deliver_later

      if @subscription.author.email
        SubscriptionMailer.new_subscription(@subscription).deliver_later
      end

      redirect_to author_path(@subscription.author)
    else
      redirect_back(fallback_location: root_path)
    end
  end

  def unsubscribe
    @subscription = Subscription.find_by_token(params[:t])
    if @subscription
      @subscription.unsubscribed = true
      @subscription.save
    else
      @error = true
    end
  end

  def update_frequency
    @subscription = Subscription.find_by_token(params[:t])
    if @subscription
      @subscription.frequency = params[:f]
      @subscription.last_mailing = DateTime.now
      @subscription.save
    else
      @error = true
    end
  end

end
