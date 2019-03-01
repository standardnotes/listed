class CreateGuestbooks < ActiveRecord::Migration[5.0]
  def change
    create_table :guestbook_entries do |t|
      t.integer :author_id
      t.text :text
      t.string :signer_email
      t.text :donation_info
      t.boolean :public, :default => false
      t.string :token
      t.timestamps
    end
  end
end
