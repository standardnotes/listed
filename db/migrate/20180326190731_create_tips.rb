class CreateTips < ActiveRecord::Migration[5.0]
  def change
    create_table :tips do |t|
      t.integer :author_id
      t.string :tipper_email
      t.decimal :amount, :precision => 10, :scale => 2
      t.string :cus_stripe_id
      t.string :tx_stripe_id
      t.text :message
      t.boolean :paid_out, :default => false
      t.timestamps
    end

    change_table(:purchases) do |t|
      t.boolean :paid_out, :default => false
    end
  end
end
