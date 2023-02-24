class PostsController < ApplicationController

  require 'safe_yaml/load'
  FRONT_MATTER_WRAPPER_PATTERN = /\A---(.|\n)*---/.freeze
  FRONT_MATTER_CONTENT_PATTERN = /^(?<metadata>---\s*\n.*?\n?)^(---\s*$\n?)/m.freeze

  # Allow API acess for actions inside "only"
  skip_before_action :verify_authenticity_token, :only => [
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

  before_action :find_post, only: [:show]

  MAX_TITLE_LENGTH = 60
  def show
    if !@post || !@post.published
      return not_found
    end

    @next = @post.next
    @previous = @post.previous

    if !@post.unlisted
      @author_posts = @post.author.listed_posts([@post, @next, @previous]).order("created_at DESC")
      @title = "#{@post.title} | #{@post.author.title}"

      if @title.length < MAX_TITLE_LENGTH && @post.author.bio
        @title += " — #{@post.author.bio_without_newlines}"
        @title = "#{@title[0..MAX_TITLE_LENGTH]}..." if @title.length > 60
      end

      set_meta_images_for_author(@post.author)
    else
      @title = @post.title
    end

    if @post.metatype
      if @post.metatype == 'html'
        text = @post.rendered_text
      else
        text = @post.text
      end

      render plain: text, content_type: metatype_to_contenttype(@post.metatype)
      return
    end

    @pages = @post.author.pages if @post.author
    @styles = @post.author.css if @post.author.custom_theme_enabled
    @is_accessory_page = false

    @reaction_links = Reaction::REACTIONS.map do |reaction|
      {
        reaction: reaction,
        url: "#{@post.author.get_host}/authors/#{@post.author.id}/posts/#{@post.id}/reactions/new?reaction=#{reaction}"
      }
    end
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
    return if post && post.author != @author

    if !post
      post = @author.posts.new(post_params)
    else
      post.update(post_params)
    end

    item = params[:items][0]
    content = item['content']
    raw_text = content['text']

    has_frontmatter = raw_text.scan(FRONT_MATTER_WRAPPER_PATTERN).size == 1
    front_params = [
      :author_name,
      :author_link,
      :canonical,
      :custom_path,
      :desc,
      :hidden,
      :image_url,
      :metatype,
      :page_link,
      :page_sort,
      :page,
      :pinned
    ]
    if has_frontmatter && (yaml_hash = SafeYAML.load(raw_text)) && yaml_hash.is_a?(Hash)
      frontmatter = ActionController::Parameters.new(yaml_hash)
      post_text = raw_text.match(FRONT_MATTER_CONTENT_PATTERN).post_match
      post.update_attributes(
        frontmatter.permit(:created_at, *front_params)
      )
    else
      post_text = raw_text
      front_params.each do |param|
        post[param] = nil
      end
    end

    unlisted = params[:unlisted] == 'true' || post.metatype != nil

    post.title = content['title']
    post.text = post_text

    post.word_count = post.text.split.size
    post.unlisted = unlisted
    post.published = true
    post.save
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
  end

  def change_privacy
    post = Post.find(params[:id])

    if post.author != @author
      render :json => {:error => "Unauthorized"}
      return
    end

    post.unlisted = !post.unlisted
    post.save

    redirect_to_authenticated_settings(@author)
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
    redirect_to_authenticated_settings(@author)
  end

  def post_params
    params.permit(:item_uuid, :slug, :username)
  end

end
