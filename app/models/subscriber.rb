class Subscriber < ApplicationRecord

  has_many :subscriptions
  has_many :authors, :through => :subscriptions

  def subscribed_to_author(author)
    self.authors.include? author
  end

  def subscription_for_author(author)
    return Subscription.find_by(:author => author, :subscriber => self)
  end

end
