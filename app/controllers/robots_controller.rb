class RobotsController < ApplicationController

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

  def index
    if @domain_author
      @sitemap = "#{@domain_author.url}/author-sitemap.xml"
    else
      @sitemap = "#{ENV['HOST']}/sitemap.xml"
    end

  end
end
