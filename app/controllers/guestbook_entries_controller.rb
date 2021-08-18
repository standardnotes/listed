class GuestbookEntriesController < ApplicationController
  include CaptchaHelper

  before_action do
    if params[:author_id]
      @author = Author.find(params[:author_id]) if params[:author_id]
    else
      @author = Author.includes(:domain, :credentials).find_author_from_path(request.path)
    end

    unless @author
      domain = Domain.find_by(domain: request.host)
      @author = domain&.author
    end

    @entry = GuestbookEntry.find(params[:id]) if params[:id]

    if @author&.custom_theme_enabled
      @styles = @author.css
    end
    @pages = @author.pages if @author
  end

  def index
    @title = "Guestbook | #{@author.title}"
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
    redirect_to_authenticated_settings(@entry.author)
  end

  def unapprove
    @entry.public = false
    @entry.save
    redirect_to_authenticated_settings(@entry.author)
  end

  def spam
    @entry.spam = true
    @entry.save
    redirect_to_authenticated_settings(@entry.author)
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
