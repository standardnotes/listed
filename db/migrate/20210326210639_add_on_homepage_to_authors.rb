class AddOnHomepageToAuthors < ActiveRecord::Migration[5.0]
  def change
    add_column :authors, :homepage_activity, :datetime
    add_index :authors, :homepage_activity

    Author.all.each do |author|
      if author.featured && !author.homepage_activity
        author.homepage_activity = DateTime.now
        author.save
      else
        author.update_homepage_status
      end
    end
  end
end
