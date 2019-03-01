class AddGuestbookOptionsToAuthors < ActiveRecord::Migration[5.0]
  def change
    change_table(:authors) do |t|
      t.boolean :guestbook_disabled, :default => false
    end
  end
end
