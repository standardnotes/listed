class SitemapController < ApplicationController
  layout nil

  def index
    headers['Content-Type'] = 'application/xml'
    @posts = Post.where(:unlisted => false)
    respond_to do |format|
      format.xml
    end
  end

end
