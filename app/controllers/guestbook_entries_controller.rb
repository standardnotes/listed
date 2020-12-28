class GuestbookEntriesController < ApplicationController
  include SimpleCaptcha::ControllerHelpers

  before_action do
    @author = Author.find(params[:author_id]) if params[:author_id]
    @entry = GuestbookEntry.find(params[:id]) if params[:id]

    if @author
      @styles = @author.styles
    end
  end

  def index
    @entries = @author.public_guestbook_entries
  end

  def new
    @entry = GuestbookEntry.new
  end

  def create
    @entry = @author.guestbook_entries.new(entry_params)
    @entry.unread = true
    if @entry.text.contains_url? ||
       @entry.donation_info&.contains_url? ||
       @entry.text == @entry.donation_info
      @entry.spam = true
    end
    if simple_captcha_valid?
      @entry.save
      redirect_to_guestbook(sent: true)
    end
  end

  def destroy
    @entry.destroy
    redirect_back fallback_location: @author.url
  end

  def approve
    @entry.public = true
    @entry.save
    redirect_back fallback_location: @entry.author.url
  end

  def unapprove
    @entry.public = false
    @entry.save
    redirect_back fallback_location: @entry.author.url
  end

  def spam
    @entry.spam = true
    @entry.save
    redirect_back fallback_location: @entry.author.url
  end

  def delete
    @entry.delete
    redirect_back fallback_location: @author.url
  end

  def redirect_to_guestbook(params = {})
    redirect_to author_guestbook_entries_path(@author, **params)
  end

  def entry_params
    params.require(:guestbook_entry).permit(
      :text,
      :signer_email,
      :donation_info
    )
  end
end
