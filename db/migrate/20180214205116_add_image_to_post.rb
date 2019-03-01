class AddImageToPost < ActiveRecord::Migration[5.0]
  def change
    add_column :posts, :image_url, :string
  end
end
