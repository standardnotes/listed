class AuthorFields < ActiveRecord::Migration[5.0]
  def change
    change_table(:authors) do |t|
      t.string :username
      t.string :display_name
      t.text :bio
      t.string :link
    end
  end
end
