class CreatePosts < ActiveRecord::Migration[5.0]
  def change
    create_table :posts do |t|
      t.string :token
      t.string :item_uuid

      t.string :title
      t.text :text, :limit => 16.megabytes - 1

      t.integer :author_id
      t.boolean :unlisted, :default => false

      t.timestamps
    end
  end
end
