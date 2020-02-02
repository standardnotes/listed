class AddReadStatusToGuestbook < ActiveRecord::Migration[5.0]
  def change
    add_column :guestbook_entries, :unread, :boolean, default: false
    add_column :guestbook_entries, :spam, :boolean, default: false
    add_index :guestbook_entries, :unread
  end
end
