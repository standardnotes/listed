class SitemapController < ApplicationController
  layout nil

  AUTHORS_PER_PAGE = 1000

  def index
    headers['Content-Type'] = 'application/xml'
    num_authors = Author.where(hide_from_homepage: [false, nil]).size
    num_pages = (num_authors / AUTHORS_PER_PAGE).ceil + 1
    @pages = [*0...num_pages]
    respond_to do |format|
      format.xml
    end
  end

  def authors_page
    min_author_range = params[:page].to_i * AUTHORS_PER_PAGE
    max_author_range = min_author_range + AUTHORS_PER_PAGE
    @authors = Author.where('id >= ? AND id < ?', min_author_range, max_author_range)
  end

  def author_posts
    @author = Author.find(params[:author_id])
    @posts = @author.listed_posts
  end
end
