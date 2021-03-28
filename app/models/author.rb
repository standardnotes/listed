class Author < ApplicationRecord
  has_many :subscriptions, dependent: :destroy
  has_many :subscribers, through: :subscriptions, dependent: :destroy
  has_many :credentials, dependent: :destroy
  validates :username,
            uniqueness: { case_sensitive: false },
            allow_nil: true,
            allow_blank: true,
            format: {
              with: /\A[\w]+\z/ ,
              message: 'Only letters, numbers, and underscores are allowed.'
            }
  validates :email, uniqueness: true, allow_nil: true, allow_blank: true
  has_many :posts, dependent: :destroy
  has_one :domain, dependent: :destroy
  has_many :guestbook_entries, dependent: :destroy

  def public_guestbook_entries
    guestbook_entries.where(public: true)
  end

  def verified_subscriptions
    subscriptions.where(verified: true)
  end

  def listed_posts(exclude_posts = nil, sort = true)
    results = posts.where(author_show: true)
    results = results.where('id NOT IN (?)', exclude_posts.compact) if exclude_posts
    results = results.order('created_at DESC') if sort
    results
  end

  def pages
    posts.where(author_page: true)
  end

  def code
    Base64.strict_encode64("#{get_host}/authors/#{id}/extension/?secret=#{secret}&type=sn")
  end

  def title
    if display_name && !display_name.empty?
      display_name
    elsif username && !username.empty?
      "#{username}"
    else
      id.to_s
    end
  end

  def get_host
    self.has_custom_domain ? "https://#{self.custom_domain}" : "#{ENV['HOST']}"
  end

  def handle
    "@#{self.username}"
  end

  def has_username
    return self.username && self.username.length > 0
  end

  def email_verification_link
    "#{ENV['HOST']}/authors/#{self.id}/verify_email?secret=#{self.secret}&t=#{self.email_verification_token}"
  end

  def assign_email_verification_token
    token_length = 12
    range = [*'0'..'9', *'a'..'z', *'A'..'Z']
    self.email_verification_token = token_length.times.map { range.sample }.join
  end

  def url_segment
    if self.username && self.username.length > 0
      "@#{self.username}"
    else
      "authors/#{self.id}"
    end
  end

  def url
    if self.has_custom_domain
      self.custom_domain.include?(":") ? "#{self.custom_domain}" : "https://#{self.custom_domain}"
    else
      "#{ENV['HOST']}/#{url_segment}"
    end
  end

  def rss_url
    "#{url}/feed"
  end

  def custom_domain
    self.domain.domain
  end

  def has_custom_domain
    return self.domain && self.domain.active
  end

  def self.find_author_from_path(path)
    match = path[/@([^\/]+)/]
    if match
      username = match.gsub("@", "")
      return Author.find_by_username(username)
    end
    return nil
  end

  def accessible_via
    if ENV['ALT_HOST']
      [url, "#{ENV['ALT_HOST']}/#{url_segment}"]
    else
      [url]
    end
  end

  def update_word_count
    count = posts.where(unlisted: false, published: true).sum(:word_count)
    if count != last_word_count
      self.last_word_count = count
      save
    end
    count
  end

  def update_css(text)
    self.css = !text ? nil : Sanitize::CSS.stylesheet(text, SANITIZE_CONFIG).html_safe
    save
  end

  def personal_link
    return nil if !link || link.empty?

    return link if link.include? 'http'

    "http://#{link}"
  end

  def update_homepage_status
    most_recent_post = listed_posts.where(
      '(posts.created_at >= ? AND posts.created_at <= ?)',
      28.days.ago.utc,
      DateTime.now.utc
    ).first

    return unless most_recent_post && last_word_count > 100 && username && !hide_from_homepage

    self.homepage_activity = most_recent_post.created_at
    save
  end

  def make_featured
    self.featured = true
    self.homepage_activity = DateTime.now

    save

    if email
      AuthorsMailer.featured(self).deliver_later
    end
  end

  def approve_domain
    domain.active = true
    domain.approved = true
    domain.save
  end

  def notify_domain
    AuthorsMailer.domain_approved(self).deliver_now
  end

  def invalid_domain
    AuthorsMailer.domain_invalid(self.domain.extended_email).deliver_now
    self.domain.delete
  end

  def self.email_unread_guestbook_entries
    authors = GuestbookEntry.where(unread: true, spam: false).map(&:author).uniq
    authors.each do |author|
      entries = author.guestbook_entries.where(unread: true, spam: false)
      next if entries.empty? || author.email_verified == false

      entries.each do |entry|
        entry.unread = false
        entry.save
      end
      AuthorsMailer.unread_guestbook_entries(
        author.id,
        entries.map(&:id)
      ).deliver_later
    end
  end
end
