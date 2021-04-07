class PerformLaunchProdMigration < ActiveRecord::Migration[5.0]
  def change
    Post.where(unlisted: [false, nil], hidden: [false, nil], published: true, metatype: nil).find_each do |post|
      post.author_show = !post.page
      post.author_page = post.page
      post.save
    end

    Post.where(metatype: 'css', published: true).find_each do |post|
      if post.author
        post.author.update_css(post.text)
        post.author.custom_theme_enabled = false
        post.author.save
      end
    end

    Author.all.find_each do |author|
      if author.featured && !author.homepage_activity
        author.homepage_activity = DateTime.now
        author.save
      else
        author.update_homepage_status
      end
    end
  end
end
