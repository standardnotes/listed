class Author < ApplicationRecord

  has_many :subscriptions
  has_many :subscribers, :through => :subscriptions

  has_many :credentials

  validates :username, uniqueness: true, :allow_nil => true, :allow_blank => true, :format => { with: /\A[\w]+\z/ , :message => 'Only letters, numbers, and underscores are allowed.' }
  validates :email, uniqueness: true, :allow_nil => true, :allow_blank => true

  has_many :posts

  has_one :domain

  has_many :guestbook_entries

  def public_guestbook_entries
    self.guestbook_entries.where(:public => true)
  end

  def verified_subscriptions
    self.subscriptions.where(:verified => true)
  end

  def listed_posts(exclude_posts = nil, sort = true)
    if exclude_posts
      posts = self.posts.where(:unlisted => false, :hidden => false, :published => true).where("id NOT IN (?)", exclude_posts.compact)
    else
      posts = self.posts.where(:unlisted => false, :hidden => false, :published => true)
    end

    if sort
      posts.order("created_at DESC")
    end

    posts
  end

  def title
    if self.display_name && self.display_name.length > 0
      return self.display_name
    elsif self.username && self.username.length > 0
      @title = "@#{self.username}"
    else
      @title = "#{self.id}"
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
      return [url, "#{ENV['ALT_HOST']}/#{url_segment}"]
    else
      return [url]
    end
  end

  def word_count
    count = self.posts.where(:unlisted => false, :published => true).sum(:word_count)
    if count != self.last_word_count
      self.last_word_count = count
      self.save
    end
    return count
  end

  def update_word_count
    # just access word_count
    self.word_count
  end

  def styles
    post = self.posts.where(:metatype => "css", :published => true).first
    return if !post
    css = post.text
    config = Sanitize::Config.merge(Sanitize::Config::RELAXED,
      :css => {
        :protocols => Sanitize::Config::RELAXED[:css][:protocols] + ['data'],
        :at_rules => ['import']
      }
    )
    Sanitize::CSS.stylesheet(css, config).html_safe
  end

  def personal_link
    return nil if !self.link || self.link.length == 0

    if self.link.include? "http"
      return self.link
    else
      return "http://#{self.link}"
    end
  end

  def self.active_authors
    authors = Author.joins(:posts).
      where("last_word_count > 100").
      where.not(:username => nil).
      where(:hide_from_homepage => false).
      where("posts.created_at >= ? OR featured = TRUE", 28.days.ago.utc).
      where("posts.unlisted = FALSE").
      order("posts.created_at DESC")

    authors.to_a.uniq
  end

  def make_featured
    self.featured = true
    self.save

    if self.email
      AuthorsMailer.featured(self).deliver_later
    end
  end

  def approve_domain
    self.domain.active = true
    self.domain.approved = true
    self.domain.save

    Author.build_all_domains
  end

  def notify_domain
    AuthorsMailer.domain_approved(self).deliver_later
  end

  def self.build_all_domains
    domains = Domain.where(:active => true, :approved => true).map { |d| d.domain }
    if ENV['ALT_HOST']
      domains.unshift("#{ENV['ALT_HOST']}")
    end

    domains.unshift("#{ENV['HOST']}")

    puts "Building domains: #{domains}"

    File.open("config/domains.yml", "w+") do |f|
      f.write(domains.to_yaml)
    end
  end

end
