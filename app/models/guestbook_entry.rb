class GuestbookEntry < ApplicationRecord
  include Tokenable

  belongs_to :author

  def approval_url
    "#{ENV['HOST']}/authors/#{self.author.id}/guestbook/#{self.id}/approve?token=#{self.token}"
  end

  def unapproval_url
    "#{ENV['HOST']}/authors/#{self.author.id}/guestbook/#{self.id}/unapprove?token=#{self.token}"
  end

  def deletion_url
    "#{ENV['HOST']}/authors/#{self.author.id}/guestbook/#{self.id}/delete?token=#{self.token}"
  end
end
