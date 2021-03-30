class AddOnHomepageToAuthors < ActiveRecord::Migration[5.0]
  def change
    add_column :authors, :homepage_activity, :datetime
    add_index :authors, :homepage_activity
  end
end
