class AddHideFromHomeToAuthor < ActiveRecord::Migration[5.0]
  def change
    change_table(:authors) do |t|
      t.boolean :hide_from_homepage, :default => false
    end

    add_index :authors, :hide_from_homepage
  end
end
