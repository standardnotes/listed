class AddCanonicalToPosts < ActiveRecord::Migration[5.0]
  def change
    add_column :posts, :canonical, :string
  end
end
