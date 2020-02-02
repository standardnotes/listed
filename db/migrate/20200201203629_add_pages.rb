class AddPages < ActiveRecord::Migration[5.0]
  def change
    add_column :posts, :page, :boolean, default: false
  end
end
