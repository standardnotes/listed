class AddAuthorShowToPosts < ActiveRecord::Migration[5.0]
  def change
    add_column :posts, :author_show, :boolean, default: false
    add_index :posts, :author_show
    add_index :posts, [:author_show, :created_at]

    add_column :posts, :author_page, :boolean, default: false
    add_index :posts, :author_page

    Post.all.each do |post|
      post.update_author_show_status
      post.save
    end
  end
end
