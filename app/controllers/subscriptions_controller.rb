class SubscriptionsController < ApplicationController

  include SimpleCaptcha::ControllerHelpers

  def validate
    @subscription = Subscription.find(params[:subscription_id])
    @styles = @subscription.author.styles
  end

  def submit_validate
    @subscription = Subscription.find(params[:subscription_id])
    is_valid_subscription = @subscription && !@subscription.verified && !@subscription.verification_sent_at
    if is_valid_subscription && simple_captcha_valid?
      SubscriptionMailer.confirm_subscription(@subscription).deliver_later
      @subscription.verification_sent_at = DateTime.now
      @subscription.save

      redirect_to author_path(@subscription.author)
    else
      redirect_back(fallback_location: root_path)
    end
  end

  def confirm
    @subscription = Subscription.find_by_token(params[:t])
    if @subscription
      # Don't notify the author more than once in case the user clicks on this link twice
      existing = @subscription.verified
      @subscription.verified = true
      @subscription.save

      if !existing && @subscription.author.email
        SubscriptionMailer.new_subscription(@subscription).deliver_later
      end

      redirect_to author_path(@subscription.author)
    else
      @error = true
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
