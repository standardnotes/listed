class AddCustomAuthorToPosts < ActiveRecord::Migration[5.2]
  def change
    add_column :posts, :author_name, :string
    add_column :posts, :author_link, :string
    add_index :posts, [:author_id, :author_name]
  end
end
