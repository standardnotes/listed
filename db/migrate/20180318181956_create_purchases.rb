class CreatePurchases < ActiveRecord::Migration[5.0]
  def change
    create_table :purchases do |t|
      t.integer :post_id
      t.string :buyer_email
      t.decimal :price_paid, :precision => 10, :scale => 2 
      t.boolean :emailed, :default => false
      t.string :cus_stripe_id
      t.string :tx_stripe_id
      t.timestamps
    end
  end
end
