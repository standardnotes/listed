module SimpleCaptcha #:nodoc
  module ViewHelper #:nodoc

    # Simple Captcha is a very simplified captcha.
    #
    # It can be used as a *Model* or a *Controller* based Captcha depending on what options
    # we are passing to the method show_simple_captcha.
    #
    # *show_simple_captcha* method will return the image, the label and the text box.
    # This method should be called from the view within your form as...
    #
    # <%= show_simple_captcha %>
    #
    # The available options to pass to this method are
    # * label
    # * object
    #
    # <b>Label:</b>
    #
    # default label is "type the text from the image", it can be modified by passing :label as
    #
    # <%= show_simple_captcha(:label => "new captcha label") %>.
    #
    # *Object*
    #
    # This option is needed to create a model based captcha.
    # If this option is not provided, the captcha will be controller based and
    # should be checked in controller's action just by calling the method simple_captcha_valid?
    #
    # To make a model based captcha give this option as...
    #
    # <%= show_simple_captcha(:object => "user") %>
    # and also call the method apply_simple_captcha in the model
    # this will consider "user" as the object of the model class.
    #
    # *Examples*
    # * controller based
    # <%= show_simple_captcha(:label => "Human Authentication: type the text from image above") %>
    # * model based
    # <%= show_simple_captcha(:object => "person", :label => "Human Authentication: type the text from image above") %>
    #
    # Find more detailed examples with sample images here on my blog http://EXPRESSICA.com
    #
    # All Feedbacks/CommentS/Issues/Queries are welcome.
    def show_simple_captcha(options = {})
      render :partial => SimpleCaptcha.partial_path, :locals => { :simple_captcha_options => simple_captcha_options(options) }
    end

    def simple_captcha_options(options = {})
      key = simple_captcha_key(options[:object])
      if options[:multiple] === false
        # It's not the first captcha, we only need to return the key
        options[:field_value] = key
      else
        # It's the first captcha in the page, we generate a new key
        options[:field_value] = set_simple_captcha_data(key, options)
      end

      {
        :image => simple_captcha_image(key, options),
        :label => I18n.t('simple_captcha.label'),
        :field => simple_captcha_field(options),
        :refresh_button => simple_captcha_refresh_button(options),
      }.merge(options)
    end

    private

      def simple_captcha_image(simple_captcha_key, options = {})
        url = simple_captcha_image_url simple_captcha_key, options: options
        id = simple_captcha_image_id(options)
        tag('img', :src => url, :alt => 'captcha', :id => id)
      end

      def simple_captcha_image_url(simple_captcha_key, options = {})
        defaults = {}
        defaults[:time] = options[:time] || Time.now.to_i

        query = defaults.to_query
        path = "/simple_captcha?code=#{simple_captcha_key}&#{query}"
        build_url(options, path)
      end

      def build_url(options, path)
        if defined?(request) && request
          "#{request.protocol}#{request.host_with_port}#{ENV['RAILS_RELATIVE_URL_ROOT']}#{path}"
        else
          "#{ENV['RAILS_RELATIVE_URL_ROOT']}#{path}"
        end
      end

      def simple_captcha_field(options={})
        html = {:autocomplete => 'off', :autocorrect => 'off', :autocapitalize => 'off', :required => 'required'}
        html.merge!(options[:input_html] || {})
        html[:placeholder] = options[:placeholder] || I18n.t('simple_captcha.placeholder')

        if options[:object]
          text_field(options[:object], :captcha, html.merge(:value => '')) +
          hidden_field(options[:object], :captcha_key, {:value => options[:field_value], :id => simple_captch_hidden_field_id(options)})
        else
          text_field_tag(:captcha, nil, html) +
          hidden_field_tag(:captcha_key, options[:field_value], :id => simple_captch_hidden_field_id(options))
        end
      end

      def simple_captcha_refresh_button(options={})
        html = {remote: true}
        html.merge!(options[:refresh_button_html] || {})

        text = options[:refresh_button_text] || I18n.t('simple_captcha.refresh_button_text', default: 'Refresh')

        url = build_url(options, "/simple_captcha?id=#{simple_captcha_image_id(options)}")
        link_to(text, url, html)
      end

      def simple_captcha_image_id(options={})
        "simple_captcha-#{options[:field_value][0..10]}"
      end

      def simple_captch_hidden_field_id(image_id)
        image_id = simple_captcha_image_id(image_id) if image_id.is_a?(Hash)
        "simple-captcha-hidden-field-#{ image_id }"
      end

      def set_simple_captcha_data(key, options={})
        code_type = options[:code_type]

        value = generate_simple_captcha_data(code_type)
        data = SimpleCaptcha::SimpleCaptchaData.get_data(key)
        data.value = value
        data.save
        key
      end

      def generate_simple_captcha_data(code)
        value = ''

        case code
          when 'numeric' then
            SimpleCaptcha.length.times{value << (48 + rand(10)).chr}
          else
            SimpleCaptcha.length.times{value << (65 + rand(26)).chr}
        end

        return value
      end

      def simple_captcha_key(key_name = nil, prequest = request)
        local_session = prequest.try(:session) || session
        if key_name.nil?
          local_session[:captcha] ||= SimpleCaptcha::Utils.generate_key(local_session[:id].to_s, 'captcha')
        else
          SimpleCaptcha::Utils.generate_key(local_session[:id].to_s, key_name)
        end
      end
  end
end
