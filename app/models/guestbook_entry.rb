class GuestbookEntry < ApplicationRecord
  include Tokenable
  belongs_to :author

  def approval_url
    "#{ENV['HOST']}/authors/#{author.id}/guestbook/#{id}/approve?token=#{token}"
  end

  def unapproval_url
    "#{ENV['HOST']}/authors/#{author.id}/guestbook/#{id}/unapprove?token=#{token}"
  end

  def deletion_url
    "#{ENV['HOST']}/authors/#{author.id}/guestbook/#{id}/delete?token=#{token}"
  end

  def spam_url
    "#{ENV['HOST']}/authors/#{author.id}/guestbook/#{id}/spam?token=#{token}"
  end
end
