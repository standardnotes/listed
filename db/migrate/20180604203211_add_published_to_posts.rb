class AddPublishedToPosts < ActiveRecord::Migration[5.0]
  def change
    add_column :posts, :published, :boolean, after: :unlisted, default: true
    add_index :posts, [:unlisted, :hidden, :published]
  end
end
