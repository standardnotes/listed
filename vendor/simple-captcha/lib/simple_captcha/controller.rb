module SimpleCaptcha #:nodoc
  module ControllerHelpers #:nodoc
    # This method is to validate the simple captcha in controller.
    # It means when the captcha is controller based i.e. :object has not been passed to the method show_simple_captcha.
    #
    # *Example*
    #
    # If you want to save an object say @user only if the captcha is validated then do like this in action...
    #
    #  if simple_captcha_valid?
    #   @user.save
    #  else
    #   flash[:notice] = "captcha did not match"
    #   redirect_to :action => "myaction"
    #  end
    def simple_captcha_valid?
      return true if SimpleCaptcha.always_pass
      return @_simple_captcha_result unless !defined?(@_simple_captcha_result) || @_simple_captcha_result.nil?

      if params[:captcha]
        captcha_key = params[:captcha_key] || session[:captcha]
        data = SimpleCaptcha::Utils::simple_captcha_value(captcha_key)
        result = data == params[:captcha].delete(" ").upcase
        SimpleCaptcha::Utils::simple_captcha_passed!(captcha_key) if result
        @_simple_captcha_result = result
        result
      else
        false
      end
    end
  end
end
