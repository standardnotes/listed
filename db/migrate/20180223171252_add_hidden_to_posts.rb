class AddHiddenToPosts < ActiveRecord::Migration[5.0]
  def change
    add_column :posts, :hidden, :boolean, :default => false
    add_column :posts, :pinned, :boolean, :default => false
  end
end
