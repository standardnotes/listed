class UsageController < ApplicationController
  def index
    set_meta_images_for_letter("L")
    # @hide_header = true
    if params[:secret_url]
      @secret_url = Base64.encode64(params[:secret_url])
    end
    @active_authors = Author.active_authors
  end
end
