class UsageController < ApplicationController

  def index
    active_authors = Author
                     .includes(:domain)
                     .where.not(homepage_activity: nil)
                     .order(homepage_activity: :desc)
                     .to_a
    # easter_egg_index = 5
    # easter_egg = {
    #   id: 'easter-egg',
    #   title: 'This could be you :)',
    #   bio: 'Share your experience in its truest form. Start writing now.',
    #   featured: false
    # }
    # active_authors.insert(easter_egg_index, easter_egg)
    @active_authors = active_authors
  end

  def new_author
    if params[:secret_url]
      @secret_url = Base64.encode64(params[:secret_url])
    else
      redirect_to '/'
    end
  end
end
