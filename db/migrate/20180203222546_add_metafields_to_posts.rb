class AddMetafieldsToPosts < ActiveRecord::Migration[5.0]
  def change
    change_table(:posts) do |t|
      t.string :metatype
    end
  end
end
