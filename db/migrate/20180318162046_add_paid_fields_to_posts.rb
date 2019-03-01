class AddPaidFieldsToPosts < ActiveRecord::Migration[5.0]
  def change
    change_table(:posts) do |t|
      t.boolean :paid
      t.decimal :price, :precision => 10, :scale => 2
      t.text :paid_content, :limit => 16.megabytes - 1
    end
  end
end
