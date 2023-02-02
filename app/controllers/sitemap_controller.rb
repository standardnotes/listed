class SitemapController < ApplicationController
  layout nil

  before_action do
    domain = Domain.find_by(domain: request.host)
    if domain
      if !domain.active
        render file: "#{Rails.root}/public/404.html", status: 404
      else
        @domain_author = domain.author
      end
    else
      unless ["https://#{request.host}", "http://#{request.host}:#{request.port}"].include?(ENV['HOST'])
        render file: "#{Rails.root}/public/404.html", status: 404
      end
    end
  end

  MAX_ENTRIES_PER_PAGE = 10_000

  def index
    headers['Content-Type'] = 'application/xml'

    if @domain_author
      @posts = @domain_author.listed_posts
    else
      num_posts = Post.last.id
      num_post_pages = (num_posts / MAX_ENTRIES_PER_PAGE).ceil + 1
      @post_pages = [*0...num_post_pages]

      num_authors = Author.last.id
      num_pages = (num_authors / MAX_ENTRIES_PER_PAGE).ceil + 1
      @author_pages = [*0...num_pages]
    end
  end

  def authors
    min_author_range = params[:page].to_i * MAX_ENTRIES_PER_PAGE
    max_author_range = min_author_range + MAX_ENTRIES_PER_PAGE

    @authors = Author.includes(:domain).where('id >= ? AND id < ?', min_author_range,
                            max_author_range).select do |author|
      !author.has_custom_domain
    end
  end

  def posts
    min_post_range = params[:page].to_i * MAX_ENTRIES_PER_PAGE
    max_post_range = min_post_range + MAX_ENTRIES_PER_PAGE

    @posts = Post.includes(:author).where('id >= ? AND id < ?', min_post_range,
                        max_post_range).where(author_show: true).reject do |post|
      !post.author || post.author.is_restricted
    end
  end
end
