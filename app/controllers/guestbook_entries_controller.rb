class GuestbookEntriesController < ApplicationController

  include SimpleCaptcha::ControllerHelpers

  before_action {
    if params[:author_id]
      @author = Author.find(params[:author_id])
    end

    if params[:id]
      @entry = GuestbookEntry.find(params[:id])
    end
  }

  def index
    @entries = @author.public_guestbook_entries
  end

  def new
    @entry = GuestbookEntry.new
  end

  def create
    @entry = @author.guestbook_entries.new(entry_params)

    if simple_captcha_valid?
      @entry.save

      if @author.email && @author.email_verified
        AuthorsMailer.new_guestbook_entry(@entry.id).deliver_later
      end

      redirect_to_guestbook({:sent => true})
    else
      @captcha_error = true
      render :new
    end
  end

  def destroy
    @entry.destroy
    redirect_to_guestbook
  end

  def approve
    @entry.public = true
    @entry.save
    redirect_to_guestbook
  end

  def unapprove
    @entry.public = false
    @entry.save
    redirect_to_guestbook
  end

  def redirect_to_guestbook(params = {})
    redirect_to author_guestbook_entries_path(@author, **params)
  end

  def entry_params
    params.require(:guestbook_entry).permit(:text, :signer_email, :donation_info)
  end

end
