class PagesController < ApplicationController
  def form_tag
  end

  def form_tag_submit
    simple_captcha_valid? # idempotence
    if simple_captcha_valid?
      render plain: 'captcha valid!'
    else
      render plain: 'captcha not valid!'
    end
  end

  def model_tag
    @user = User.new
  end

  def model_tag_submit
    @model = User.new(user_params)
    if @model.valid_with_captcha?
      render plain: 'captcha valid!'
    else
      render plain: 'captcha not valid!'
    end
  end

  def formtastic_tag
    @user = User.new
  end

  def formtastic_tag_submit
    @user = User.new(user_params)
    if @user.valid_with_captcha?
      render plain: 'captcha valid!'
    else
      render :formtastic_tag
    end
  end

  private

  def user_params
    params.require(:user).permit(:captcha, :captcha_key)
  end
end
