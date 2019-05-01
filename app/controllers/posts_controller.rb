class PostsController < ApplicationController

  # Allow API acess for actions inside "only"
  skip_before_filter :verify_authenticity_token, :only => [:create, :unpublish, :newsletter]

  def metatype_to_contenttype(metatype)
    return {
      "css" => "text/css",
      "json" => "application/json",
      "html" => "text/html"
    }[metatype]
  end

  before_action :find_post, except: [:unpublish, :delete]

  def find_post
    if params[:id]
      @post = Post.find_by_id(params[:id])
      if @post && @post.unlisted == true
        not_found
        return
      end
    elsif params[:post_token]
      @post = Post.find_by_token(params[:post_token])
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
      # go to author page
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
      @author_posts = @post.author.listed_posts([@post, @next, @previous]).order("id DESC")
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
      days.push({:day => day, :posts => posts.reverse})
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
      is_new = true
      post = @author.posts.new(post_params)
    else
      # If published previously as unlisted, but now publishing as listed,
      # we want to count this as a new post.
      if params[:unlisted] != "true" && post.unlisted == true
        is_new = true
      else
        is_new = false
      end
      post.update(post_params)
    end

    item = params[:items][0]
    content = item["content"]
    raw_text = content["text"]

    has_frontmatter = raw_text.scan(/\A---(.|\n)*---/).size == 1
    if has_frontmatter && (yaml_hash = YAML.load(raw_text)) && yaml_hash.is_a?(Hash)
      frontmatter = ActionController::Parameters.new(yaml_hash)
      text = raw_text.match(/^(?<metadata>---\s*\n.*?\n?)^(---\s*$\n?)/m).post_match
      post.update_attributes(frontmatter.permit(
        :created_at, :canonical, :metatype,
        :image_url, :hidden, :pinned
      ))
    else
      text = raw_text
      # clear meta fields
      post.update({:canonical => nil, :metatype => nil})
    end

    # posts with a metatype are always unlisted
    unlisted = params[:unlisted] == "true" || post.metatype != nil

    post.title = content["title"]
    post.text = text

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
        if subscription.verified == true && subscription.frequency == 'daily' && subscription.unsubscribed == false
          SubscriptionMailer.new_post(post, subscription.subscriber).deliver_later
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

  def delete
    if !@author
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
    redirect_to :back
  end

  def post_params
    params.permit(:item_uuid, :slug, :username)
  end

end
