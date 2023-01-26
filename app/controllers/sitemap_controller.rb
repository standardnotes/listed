class SitemapController < ApplicationController
  layout nil

  AUTHORS_PER_PAGE = 1000

  before_action {
    domain = Domain.find_by(domain: request.host)
    if domain && !domain.active
      render :file => "#{Rails.root}/public/404.html", :status => 404
    else
      @domain_author = domain&.author
    end
  }

  def index
    headers['Content-Type'] = 'application/xml'

    if @domain_author
      @posts = @domain_author.listed_posts
    else
      num_authors = Author.last.id
      num_pages = (num_authors / AUTHORS_PER_PAGE).ceil + 1
      @pages = [*0...num_pages]
    end

    respond_to do |format|
      format.xml
    end
  end

  def authors_page
    min_author_range = params[:page].to_i * AUTHORS_PER_PAGE
    max_author_range = min_author_range + AUTHORS_PER_PAGE

    @authors = Author.where('id >= ? AND id < ?', min_author_range, max_author_range).select do |author|
      !author.has_custom_domain
    end
  end

  def author_posts
    @author = Author.find(params[:author_id])

    if @author.has_custom_domain
      render :file => "#{Rails.root}/public/404.html", :status => 404
      return
    end

    @posts = @author.listed_posts
  end
end
