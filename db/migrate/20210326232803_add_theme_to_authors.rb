class AddThemeToAuthors < ActiveRecord::Migration[5.0]
  def change
    add_column :authors, :css, :text, limit: 1.megabytes

    Post.where(metatype: 'css', published: true).each do |post|
      post.author.update_css(post.text)
    end
  end
end
