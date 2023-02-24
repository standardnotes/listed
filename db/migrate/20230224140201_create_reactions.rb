class CreateReactions < ActiveRecord::Migration[5.2]
  def change
    create_table :reactions do |t|
      t.integer :post_id, null: false
      t.integer :subscriber_id, optional: true
      t.string :reaction_string, null: false
      t.string :token, null: false
      t.text :comment, optional: true
      t.timestamps
    end
  end
end
