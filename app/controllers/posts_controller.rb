class PostsController < ApplicationController

  require "safe_yaml/load"
  FRONT_MATTER_WRAPPER_PATTERN = /\A---(.|\n)*---/
  FRONT_MATTER_CONTENT_PATTERN = /^(?<metadata>---\s*\n.*?\n?)^(---\s*$\n?)/m

  # Allow API acess for actions inside "only"
  skip_before_filter :verify_authenticity_token, :only => [
    :create,
    :unpublish,
    :newsletter
  ]

  def metatype_to_contenttype(metatype)
    return {
      "css" => "text/css",
      "json" => "application/json",
      "html" => "text/html"
    }[metatype]
  end

  before_action :find_post, except: [:unpublish, :change_privacy, :delete]

  def find_page(author, title)
    return unless author
    
    title = title.gsub('-', ' ')
    author.pages.where('lower(title) = ?', title.downcase).first
  end

  def find_post
    author =
      if params[:author_id]
        Author.find(params[:author_id])
      else
        Author.find_author_from_path(request.path)
      end
    unless author
      domain = Domain.find_by(domain: request.host)
      author = domain&.author
    end
    if params[:id]
      if params[:id].is_integer?
        @post = Post.find_by_id(params[:id])
      else
        @post = find_page(author, params[:id])
      end
      if @post && @post.unlisted == true
        not_found
        return
      end
    elsif params[:post_token]
      @post = Post.find_by_token(params[:post_token]) ||
              find_page(author, params[:post_token])
    end

    domain = Domain.find_by(domain: request.host)
    if domain && @post && @post.author != domain.author
      not_found
      return
    end
  end

  def show
    if !@post || !@post.published
      author = Author.find_author_from_path(request.path)
      # Go to author page
      if author
        redirect_to author.url
      else
        not_found
      end
      return
    end

    @next = @post.next
    @previous = @post.previous

    if !@post.unlisted
      @author_posts = @post.author.listed_posts([@post, @next, @previous]).order("created_at DESC")
    end

    if @post.metatype
      if @post.metatype == "html"
        text = @post.rendered_text
      else
        text = @post.text
      end

      render plain: text, content_type: metatype_to_contenttype(@post.metatype)
      return
    end

    @styles = @post.author.styles
    set_meta_images_for_author(@post.author)
  end

  def index
    posts = Post.where(:unlisted => false).all
    days = []
    posts.group_by{|x| x.created_at.strftime("%B %e, %Y")}.each do |day, posts|
      days.push({:day => day, :posts => posts.as_json(only: [:id, :title], methods: :tokenized_url).reverse})
    end
    @days = days.reverse
  end

  def create
    item_uuid = params[:item_uuid]
    post = Post.find_by_item_uuid(item_uuid)
    if post && post.author != @author
      return
    end

    if !post
      post = @author.posts.new(post_params)
    else
      post.update(post_params)
    end

    item = params[:items][0]
    content = item["content"]
    raw_text = content["text"]

    has_frontmatter = raw_text.scan(FRONT_MATTER_WRAPPER_PATTERN).size == 1
    front_params = [
      :canonical,
      :metatype,
      :image_url,
      :hidden,
      :pinned,
      :page
    ]
    if has_frontmatter && (yaml_hash = SafeYAML.load(raw_text)) && yaml_hash.is_a?(Hash)
      frontmatter = ActionController::Parameters.new(yaml_hash)
      post_text = raw_text.match(FRONT_MATTER_CONTENT_PATTERN).post_match
      post.update_attributes(frontmatter.permit(
        :created_at,
        *front_params
      ))
    else
      post_text = raw_text
      front_params.each do |param|
        post[param] = nil
      end
      post.save
    end

    # Posts with a metatype are always unlisted
    unlisted = params[:unlisted] == "true" || post.metatype != nil

    post.title = content["title"]
    post.text = post_text

    post.word_count = post.text.split.size
    post.unlisted = unlisted
    post.published = true
    post.save

    post.author.update_word_count
  end

  def newsletter
    if !@author
      render :json => {:error => "Unable to load extension."}
      return
    end

    post = Post.find(params[:id])
    if post.author != @author
      render :json => {:error => "Unauthorized"}
      return
    end

    if post.can_send_email
      post.email_sent_date = DateTime.now
      post.save

      @author.subscriptions.each do |subscription|
        if subscription.verified == true && 
          subscription.frequency == 'daily' && 
          subscription.unsubscribed == false
          SubscriptionMailer.new_post(
            post, 
            subscription.subscriber
          ).deliver_later
        end
      end
    end
  end

  def unpublish
    if !@author
      render :json => {:error => "Unable to load extension."}
      return
    end

    post = Post.find(params[:id])
    if post.author != @author
      render :json => {:error => "Unauthorized"}
      return
    end

    post.published = false
    post.save

    post.author.update_word_count
  end

  def change_privacy
    post = Post.find(params[:id])

    if post.author != @author
      render :json => {:error => "Unauthorized"}
      return
    end

    post.unlisted = !post.unlisted
    post.save

    post.author.update_word_count
    redirect_back fallback_location: @author.url
  end

  def delete
    unless @author
      render :json => {:error => "Unable to load extension."}
      return
    end

    post = Post.find(params[:id])
    if post.author != @author
      render :json => {:error => "Unauthorized"}
      return
    end

    post.delete

    @author.update_word_count
    redirect_back fallback_location: @author.url
  end

  def post_params
    params.permit(:item_uuid, :slug, :username)
  end

end
