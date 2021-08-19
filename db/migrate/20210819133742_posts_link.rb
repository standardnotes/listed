class PostsLink < ActiveRecord::Migration[5.2]
  def change
    add_column :posts, :link, :string
  end
end
