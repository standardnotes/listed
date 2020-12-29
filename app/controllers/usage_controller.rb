class UsageController < ApplicationController
  before_action do
    set_meta_images_for_letter('L')
  end

  def index
    active_authors = Author.active_authors
    easter_egg_index = active_authors.size.positive? ? rand(1..active_authors.size) : 0
    easter_egg = {
      id: 'easter-egg',
      title: 'This could be you :)',
      bio: 'Share your experience in its truest form. Start writing now.',
      featured: false
    }
    active_authors.insert(easter_egg_index, easter_egg)
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
