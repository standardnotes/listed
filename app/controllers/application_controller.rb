class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  before_action {
    set_meta_images_for_letter('L')

    if session[:subscriber_id]
      @subscriber = Subscriber.find_by_id(session[:subscriber_id])
    end

    begin
      if params[:secret]
        author_id = params[:author_id] || params[:id]
        if author_id
          author = Author.find(author_id)
          if params[:secret] == author.secret
            @author = author
          end
        end
      end
    rescue => e
      not_found
    end
  }

  def set_meta_images_for_author(author)
    return if author.nil?

    first_letter = author.title[0].capitalize
    if first_letter == '@' && author.title.length > 1
      first_letter = author.title[1].capitalize
    end

    set_meta_images_for_letter(first_letter)

    # You want to do this at the end, because currently there's no way to override favicon.
    # So you want that to be set above by default
    if author.meta_image_url && !author.meta_image_url.empty?
      @meta_image = author.meta_image_url
    end
  end

  def set_meta_images_for_letter(first_letter)
    @meta_image = "https://s3.amazonaws.com/sn-listed/letters/v2/big/#{first_letter}.png"
    @fav_icon = "https://s3.amazonaws.com/sn-listed/letters/v2/fav/#{first_letter}.png"
  end

  def redirect_to_authenticated_settings(author)
    redirect_to "#{author.get_host}/authors/#{author.id}/settings/?secret=#{author.secret}", :status => 303
  end

  def not_found
    render :file => "#{Rails.root}/public/404.html",  :status => 404
  end

end
