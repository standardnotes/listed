class CreateDomains < ActiveRecord::Migration[5.0]
  def change
    create_table(:domains) do |t|
      t.integer :author_id
      t.string :domain
      t.string :extended_email
      t.boolean :approved, :default => false
      t.boolean :active, :default => false
      t.timestamps
    end

    remove_column :authors, :custom_domain
  end
end
