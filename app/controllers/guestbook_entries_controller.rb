class GuestbookEntriesController < ApplicationController
  include CaptchaHelper

  before_action do
    @author = Author.find(params[:author_id]) if params[:author_id]
    @entry = GuestbookEntry.find(params[:id]) if params[:id]

    if @author && @author.custom_theme_enabled
      @styles = @author.css
    end
  end

  def index
    @entries = @author.public_guestbook_entries
  end

  def new
    @entry = GuestbookEntry.new
    render :json => {}, :status => 200
  end

  def create
    @entry = @author.guestbook_entries.new(entry_params)
    @entry.unread = true
    if @entry.text.contains_url? ||
       @entry.donation_info&.contains_url? ||
       @entry.text == @entry.donation_info
      @entry.spam = true
    end


    captcha_verification = JSON.parse(CaptchaHelper.verify_hcaptcha(params[:token]))
    is_valid_captcha = captcha_verification["success"]

    if is_valid_captcha
      @entry.save
      redirect_to_guestbook(sent: true)
    else
      render :json => { error: captcha_verification["error"] }
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
