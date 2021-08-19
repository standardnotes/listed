class PostsLink < ActiveRecord::Migration[5.2]
  def change
    add_column :posts, :page_link, :string
    add_column :posts, :page_sort, :integer, default: 0
  end
end
