class GuestbookEntry < ApplicationRecord
  include Tokenable
  belongs_to :author

  def approval_url
    "#{author.get_host}/authors/#{author.id}/guestbook/#{id}/approve?token=#{token}"
  end

  def unapproval_url
    "#{author.get_host}/authors/#{author.id}/guestbook/#{id}/unapprove?token=#{token}"
  end

  def deletion_url
    "#{author.get_host}/authors/#{author.id}/guestbook/#{id}/delete?token=#{token}"
  end

  def spam_url
    "#{author.get_host}/authors/#{author.id}/guestbook/#{id}/spam?token=#{token}"
  end

  def mark_as_read
    self.unread = false
    save
  end
end
