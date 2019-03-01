class AddEmailToAuthors < ActiveRecord::Migration[5.0]
  def change
    change_table(:authors) do |t|
      t.string :email
    end
  end
end
