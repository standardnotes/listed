class Subscriber < ApplicationRecord
  has_many :subscriptions
  has_many :authors, through: :subscriptions

  def subscribed_to_author(author)
    authors.include? author
  end

  def subscription_for_author(author)
    Subscription.find_by(author: author, subscriber: self)
  end

  def reaction_creation_token(post)
    subscription = subscription_for_author(post.author)

    return nil unless subscription

    Digest::SHA256.hexdigest("#{subscription.token}#{post.id}")
  end
end
