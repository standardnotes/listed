class AddAuthorShowToPosts < ActiveRecord::Migration[5.0]
  def change
    add_column :posts, :author_show, :boolean, default: false
    add_index :posts, :author_show
    add_index :posts, [:author_show, :created_at]

    add_column :posts, :author_page, :boolean, default: false
    add_index :posts, :author_page

    add_column :authors, :css, :text, limit: 1.megabytes
  end
end
