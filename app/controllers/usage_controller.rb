class UsageController < ApplicationController
  before_action {
    set_meta_images_for_letter("L")
  }

  def index
    # @hide_header = true
    @active_authors = Author.active_authors
  end

  def new_author
    if params[:secret_url]
      @secret_url = Base64.encode64(params[:secret_url])
    else
      redirect_to "/"
    end
  end
end
