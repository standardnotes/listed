# frozen_string_literal: true

class UsageController < ApplicationController
  def index
    active_authors_query = Author
                     .includes(:domain)
                     .where.not(homepage_activity: nil)
                     .order(homepage_activity: :desc)
    active_authors = active_authors_query.to_a
    easter_egg_index = active_authors.size.positive? ? rand(1..active_authors.size) : 0
    easter_egg = {
      id: 'easter-egg',
      title: 'This could be you :)',
      bio: 'Share your experience in its truest form. Start writing now.',
      featured: false
    }
    active_authors.insert(easter_egg_index, easter_egg)
    @active_authors = active_authors
    @featured_authors = active_authors_query.where(featured: true)
  end

  def new_author
    @title = 'New Author | Listed'
    if params[:secret_url]
      @secret_url = Base64.encode64(params[:secret_url])
    else
      redirect_to '/'
    end
  end
end
