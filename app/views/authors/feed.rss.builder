xml.instruct! :xml, :version => "1.0"
xml.rss :version => "2.0" do
  xml.channel do
    xml.title @author.title
    xml.author @author.display_name
    xml.description @author.bio
    xml.link @author.link
    xml.language "en"

    for post in @posts
      xml.item do
        if post.title
          xml.title post.title
        else
          xml.title ""
        end
        xml.author @author.display_name
        xml.pubDate post.created_at.to_s(:rfc822)
        xml.link post.author_relative_url
        xml.guid post.author_relative_url

        text = post.rendered_text
        xml.description "<p>" + text + "</p>"
      end
    end
  end
end
