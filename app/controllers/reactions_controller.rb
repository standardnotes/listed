class ReactionsController < ApplicationController
  include CaptchaHelper

  before_action :find_post

  def create_via_email
    creation_token = params[:creation_token]
    subscriber = Subscriber.find_by(id: params[:subscriber_id])

    return not_found if !subscriber || subscriber.reaction_creation_token(@post) != creation_token

    reaction = Reaction.find_or_initialize_by(post: @post, subscriber: subscriber)

    return if reaction.persisted?

    reaction.reaction_string = params[:reaction]
    reaction.save!

    AuthorsMailer.new_reaction(reaction.id).deliver_now
  end

  def new
    @reaction = Reaction.new(post: @post)
    @reaction_string = params[:reaction]
  end

  def create
    captcha_verification = JSON.parse(CaptchaHelper.verify_hcaptcha(params[:token]))
    is_valid_captcha = captcha_verification['success']

    if is_valid_captcha
      reaction = Reaction.new(post: @post)
      reaction.reaction_string = params[:reaction_string]
      reaction.save!

      AuthorsMailer.new_reaction(reaction.id).deliver_now
    else
      render json: { error: captcha_verification['error'] }
    end
  end
end
