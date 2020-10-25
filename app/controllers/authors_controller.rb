class AuthorsController < ApplicationController

  # Allow API acess for actions inside "only"
  skip_before_filter :verify_authenticity_token, :only => [:extension]

  before_action {
    domain = Domain.find_by(domain: request.host)
    if domain
      @display_author = domain.author
    elsif params[:id]
      @display_author = Author.find(params[:id])
    elsif request.path.include? '@'
      @display_author = Author.find_author_from_path(request.path)
    end

    if @display_author
      @styles = @display_author.styles
    end

    set_meta_images_for_author(@display_author)
  }

  def create
    @author = Author.new
    secret = EncryptionHelper.generate_random_key
    @author.secret = secret
    @author.save
    redirect_to_authenticated_usage(@author, secret)
  end

  def settings
    @guestbook_entries = @author.guestbook_entries.where(spam: false)
    @posts = @author.posts
  end

  def show
    unless @display_author
      not_found
      return
    end

    @title = @display_author.title
    @desc = @display_author.bio || 'Via Standard Notes.'
    @blog_page = true

    limit = 15
    all_posts = @display_author.listed_posts(nil, false)
    posts =
      if params[:a]
        all_posts
          .where('created_at > ?', Time.at(params[:a].to_i).to_datetime || 0)
      elsif params[:b]
        all_posts
          .where('created_at < ?', Time.at(params[:b].to_i).to_datetime || 0)
          .order('created_at DESC')
      else
        all_posts
          .order('created_at DESC')
      end

    @posts = posts.limit(limit).sort { |a, b| b.created_at <=> a.created_at }
    @newer_than =
      if all_posts.count > limit && all_posts.last.created_at > @posts.first.created_at
        @posts.first.created_at.to_i
      end
    @older_than =
      if all_posts.count > limit && all_posts.first.created_at < @posts.last.created_at
        @posts.last.created_at.to_i
      end
  end

  def more_posts
    limit = 15
    older_than = params[:older_than].to_i
    all_posts = @display_author.listed_posts(nil, false)
    new_posts = all_posts
      .where('created_at < ?', Time.at(older_than).to_datetime || 0)
      .order('created_at DESC')
      .limit(limit)
    older_than =
      if all_posts.first.created_at < new_posts.last.created_at
        new_posts.last.created_at.to_i
      end

    render :json => {
      older_than: older_than,
      posts: new_posts.as_json(
        only: [:id, :title, :unlisted, :page, :created_at, :word_count],
        methods: [:author_relative_url, :preview_text, :rendered_text]
      )
    }
  end

  def feed
    @author = @display_author

    unless @author
      render :json => {}, :status => 404
      return
    end

    @posts = @display_author.listed_posts(nil)
    respond_to do |format|
      format.rss { render :layout => false }
    end
 end

  def email_subscribe
    email = params[:email]
    @subscriber = Subscriber.find_or_create_by(email: email)
    session[:subscriber_id] = @subscriber.id
    subscriptions = Subscription.where(:author => @display_author, :subscriber => @subscriber)

    if subscriptions.count == 0
      subscription = Subscription.new author: @display_author, subscriber: @subscriber
      subscription.save
      redirect_to subscription_validate_path({:subscription_id => subscription.id})
    else
      if subscriptions.first.verification_sent_at
        redirect_to :back
      else
        redirect_to subscription_validate_path({:subscription_id => subscriptions.first.id})
      end
    end
  end

  def redirect_to_authenticated_usage(author, secret)
    @secret_url = CGI.escape("#{author.get_host}/authors/#{author.id}/extension/?secret=#{secret}&type=sn")
    redirect_to "/new_author?secret_url=#{@secret_url}"
  end

  def extension
    if !@author
      render :json => {:error => "Unable to load extension."}
      return
    end

    secret = params[:secret]
    item_uuid = params[:item_uuid]

    name = "Listed"
    supported_types = ["Note"]
    actions = []
    post = Post.find_by_item_uuid(item_uuid)

    if post && post.author != @author
      render :json => {:error => "Invalid ownership."}
      return
    end

    if item_uuid
      actions += [
        {
          :label => post && !post.unlisted && post.published ? "Update Published Post" : "Publish to Blog",
          :url => "#{@author.get_host}/authors/#{@author.id}/posts/?unlisted=false&secret=#{secret}&item_uuid=#{item_uuid}",
          :verb => "post",
          :context => "Item",
          :content_types => ["Note"],
          :access_type => "decrypted"
        }
      ]

      if post && !@author.newsletter_disabled && (post.can_send_email || post.email_sent_date)
        if post.can_send_email
          label = "Email Subscribers"
        elsif post.email_sent_date
          label = "✓ Subscribers Emailed"
        end
        actions += [
          {
            :label => label,
            :url => "#{@author.get_host}/authors/#{@author.id}/posts/#{post.id}/newsletter?secret=#{secret}&item_uuid=#{item_uuid}",
            :verb => "post",
            :context => "Item",
            :content_types => ["Note"],
          }
        ]
      end
    end

    if !post || post.unlisted || !post.published
      actions.push(
        {
          :label => post && post.published ? "Update Private Post" : "Publish to Private Link",
          :url => "#{@author.get_host}/authors/#{@author.id}/posts/?unlisted=true&secret=#{secret}&item_uuid=#{item_uuid}",
          :verb => "post",
          :context => "Item",
          :content_types => ["Note"],
          :access_type => "decrypted"
        }
      )
    end

    if post
      if post.unlisted && post.published
        actions.push(
        {
          :label => "Open Private Link",
          :url => post.tokenized_url,
          :verb => "show",
          :context => "Item",
          :content_types => ["Note"]
        })
      elsif post.published
        actions.push(
        {
          :label => "Open Published Link",
          :url => "#{post.author_relative_url}",
          :verb => "show",
          :context => "Item",
          :content_types => ["Note"]
        })
      end

      if post.published
        actions.push(
        {
          :label => "Unpublish",
          :url => "#{@author.get_host}/authors/#{@author.id}/posts/#{post.id}/unpublish?secret=#{secret}",
          :verb => "post",
          :context => "Item",
          :content_types => ["Note"]
        })
      end
    end

    actions.push(
      {
        :label => "Open Blog",
        :url => @author.url,
        :verb => "show",
        :context => "Item",
        :content_types => ["Note"]
      }
    )

    actions.push (
    {
      :label => "Settings",
      :url => "#{@author.get_host}/authors/#{@author.id}/settings?secret=#{secret}",
      :verb => "show",
      :context => "Item",
      :content_types => ["Note"]
    }
    )

    description = "Publishes to listed.to."
    render :json => {
      :identifier => "org.standardnotes.listed",
      :name => name,
      :content_type => "Extension",
      :url => request.original_url,
      :description => description,
      :deletion_warning => "WARNING: Uninstalling Listed will result in loss of access to your blog. Ensure your Listed author key is backed up before uninstalling.",
      :supported_types => supported_types,
      :actions => actions
    }
  end

  def update
    @author.username = a_params[:username]
    @author.display_name = a_params[:display_name]
    @author.bio = a_params[:bio]
    @author.link = a_params[:link]
    if @author.email != a_params[:email]
      @author.email = a_params[:email]
      @author.email_verified = false
      @author.assign_email_verification_token
      AuthorsMailer.verify_email(@author).deliver_later
    end
    @author.twitter = a_params[:twitter]
    @author.meta_image_url = a_params[:meta_image_url]
    @author.header_image_url = a_params[:header_image_url]
    @author.hide_from_homepage = a_params[:hide_from_homepage]
    @author.guestbook_disabled = a_params[:guestbook_disabled]
    @author.newsletter_disabled = a_params[:newsletter_disabled]

    if @author.save
      redirect_to @author.url, :status => 303
    else
      redirect_to :back
    end
  end

  def domain_request
    existing_domain = Domain.find_by_domain(params[:domain])
    if existing_domain
      render :json => { message: "Domain #{params[:domain]} is already taken." }, :status => :conflict

      return
    end

    if !@author.domain
      @author.domain = Domain.new
    end

    @author.domain.domain = params[:domain]
    @author.domain.extended_email = params[:extended_email]
    @author.domain.save

    AdminMailer.new_domain_request(@author).deliver_later

    SslCertificateCreateJob.perform_later(params[:domain])

    redirect_to :back
  end

  def verify_email
    return if !@author

    if @author.email_verification_token == params[:t]
      @author.email_verified = true
      @author.email_verification_token = nil
      @author.save
    end
  end

  def delete_all_data
    begin
      @author.destroy
      redirect_to :root
    rescue => e
      puts e.message
      redirect_to :back, :flash => {
        :error_delete_all_data => 'Unable to delete your data. Please try again later.'
      }
    end
  end

  private

  def a_params
    params.require(:author).permit(:username, :display_name, :bio, :link, :email,
      :secret, :twitter, :meta_image_url, :guestbook_disabled, :header_image_url, :hide_from_homepage,
    :newsletter_disabled)
  end

end
