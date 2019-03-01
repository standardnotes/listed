class AddFeaturedToAuthors < ActiveRecord::Migration[5.0]
  def change
    add_column :authors, :featured, :boolean, :default => false
    add_column :authors, :show_tip_option, :boolean, :default => true
  end
end
