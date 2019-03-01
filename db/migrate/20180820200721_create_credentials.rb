class CreateCredentials < ActiveRecord::Migration[5.0]
  def change
    create_table :credentials do |t|
      t.integer :author_id
      t.string :key
      t.text :value
      t.timestamps
    end
  end
end
