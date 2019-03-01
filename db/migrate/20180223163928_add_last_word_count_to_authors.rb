class AddLastWordCountToAuthors < ActiveRecord::Migration[5.0]
  def change
    add_column :authors, :last_word_count, :integer
  end
end
