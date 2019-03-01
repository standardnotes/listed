class TwitterLinks < ActiveRecord::Migration[5.0]
  def change
    add_column :authors, :twitter, :string
  end
end
