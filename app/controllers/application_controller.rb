class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  before_action do
    set_meta_images_for_letter('L')

    @subscriber = Subscriber.find_by_id(session[:subscriber_id]) if session[:subscriber_id]

    begin
      if params[:secret]
        author_id = params[:author_id] || params[:id]
        if author_id
          author = Author.find(author_id)
          @author = author if params[:secret] == author.secret
        end
      end
    rescue StandardError => e
      not_found
    end
  end

  def set_meta_images_for_author(author)
    return if author.nil?

    first_letter = author.title[0].capitalize
    first_letter = author.title[1].capitalize if first_letter == '@' && author.title.length > 1

    set_meta_images_for_letter(first_letter)

    # You want to do this at the end, because currently there's no way to override favicon.
    # So you want that to be set above by default
    return unless author.meta_image_url && !author.meta_image_url.empty?

    @meta_image = author.meta_image_url
  end

  def set_meta_images_for_letter(first_letter)
    @meta_image = "https://s3.amazonaws.com/sn-listed/letters/v2/big/#{first_letter}.png"
    @fav_icon = "https://s3.amazonaws.com/sn-listed/letters/v2/fav/#{first_letter}.png"
  end

  def redirect_to_authenticated_settings(author)
    redirect_to "#{author.get_host}/authors/#{author.id}/settings/?secret=#{author.secret}", status: 303
  end

  def not_found
    render file: "#{Rails.root}/public/404.html", status: 404
  end

  def find_page(author, title)
    return unless author

    _title = title.gsub('-', ' ')
    _title = CGI.unescape(title) unless _title.match(PostsHelper::POST_TITLE_NO_SYMBOLS_PATTERN)

    author.pages.where('lower(title) = ?', _title.downcase).first
  end

  def find_post
    author =
      if params[:author_id]
        Author.includes(:domain, :credentials).find(params[:author_id])
      else
        Author.includes(:domain, :credentials).find_author_from_path(request.path)
      end
    unless author
      domain = Domain.find_by(domain: request.host, active: true)
      author = domain&.author
    end

    if params[:id]
      if params[:id].is_integer?
        @post = Post.find_by_id(params[:id])
      else
        @post = find_page(author, params[:id])
      end
      return if @post && @post.unlisted == true
    elsif params[:custom_path]
      @post = author&.posts&.find_by_custom_path(params[:custom_path]) ||
              find_page(author, params[:custom_path])
    elsif params[:post_token]
      @post = Post.find_by_token(params[:post_token]) ||
              find_page(author, params[:post_token]) ||
              author&.posts&.find_by_custom_path(params[:post_token])
    end

    domain = Domain.find_by(domain: request.host)
    return unless domain && @post && @post.author != domain.author

    nil
  end
end
