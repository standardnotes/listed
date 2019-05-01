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
      redirect_to_guestbook({:sent => true})
    else
      @captcha_error = true
      render :new
    end
  end

  def destroy
    @entry.destroy
    redirect_to :back
  end

  def approve
    @entry.public = true
    @entry.save
    redirect_to :back
  end

  def unapprove
    @entry.public = false
    @entry.save
    redirect_to :back
  end

  def delete
    @entry.delete
    redirect_to :back
  end

  def redirect_to_guestbook(params = {})
    redirect_to author_guestbook_entries_path(@author, **params)
  end

  def entry_params
    params.require(:guestbook_entry).permit(:text, :signer_email, :donation_info)
  end

end
