class PathAndDescFrontmatter < ActiveRecord::Migration[5.2]
  def change
    add_column :posts, :desc, :string
    add_column :posts, :custom_path, :string
    add_index :posts, [:author_id, :custom_path]
  end
end
