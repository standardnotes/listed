class AddIndexes < ActiveRecord::Migration[5.0]
  def change
    add_index :posts, :unlisted
    add_index :posts, :metatype
    add_index :posts, :created_at
  end
end
