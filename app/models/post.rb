class CustomRender < Redcarpet::Render::HTML
  require 'rouge'
  require 'rouge/plugins/redcarpet'
  include Rouge::Plugins::Redcarpet
end

class Post < ApplicationRecord
  include Tokenable

  belongs_to :author

  def url
    if self.unlisted
      self.tokenized_url
    else
      self.author_relative_url
    end
  end

  def tokenized_url
    "#{self.author.get_host}/#{self.token}"
  end

  def author_relative_url
    if self.author.has_custom_domain
      "https://#{self.author.custom_domain}#{self.path}"
    else
      "#{ENV['HOST']}#{self.path}"
    end
  end

  def preview_text
    # Render to remove Markdown syntax
    result = self.rendered_text
    # Remove HTML syntax
    result = ActionView::Base.full_sanitizer.sanitize(result)

    limit = 500
    return result[0, 500] + "..."
  end

  def rendered_text(limit = nil)
    return get_rendered_text(self.text, limit)
  end

  def get_rendered_text(input, limit = nil)
    return nil if input == nil
    options = {
      filter_html:     false,
      hard_wrap:       true,
      # Use sanitize's 'add_attributes' instead
      # link_attributes: { rel: 'nofollow noopener', target: "_blank" },
      space_after_headers: true,
      fenced_code_blocks: true,
      prettify: true
    }

    extensions = {
      autolink:           true,
      superscript:        true,
      disable_indented_code_blocks: true,
      fenced_code_blocks: true,
      lax_spacing: true,
      tables: true,
      footnotes: true,
      highlight: true
    }

    renderer = CustomRender.new(options)
    markdown = Redcarpet::Markdown.new(renderer, extensions)

    text = markdown.render(limit ? (input[0, limit] + "...") : input)

    sanitized = Sanitize.fragment(text, Sanitize::Config.merge(Sanitize::Config::RELAXED,
      :elements => Sanitize::Config::RELAXED[:elements] + ['center', 'iframe'],
      :attributes => {'iframe' => ['src', 'width', 'height', 'frameborder', 'allow']},
      :add_attributes => {
        'a' => {'rel' => 'noopener', 'target' => "_blank"}
      }
    ))

    return sanitized.html_safe
  end

  def path
    if self.title
      prefix = (author.has_custom_domain) ? "" : "/#{author.url_segment}" + (author.has_username ? "" : "/posts")
      if author.has_username
        "#{prefix}/#{self.id}/#{self.title.parameterize}"
      else
        "#{prefix}/#{self.id}"
      end
    else
      "/#{author.url_segment}/#{self.id}/"
    end
  end

  def next
    self.author.listed_posts.where("id > ?", self.id).first
  end

  def previous
    self.author.listed_posts.where("id < ?", self.id).last
  end

  def can_send_email
    self.unlisted == false && self.email_sent_date == nil
  end

end
