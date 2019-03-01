class AddDomainToAuthors < ActiveRecord::Migration[5.0]
  def change
    change_table(:authors) do |t|
      t.string :custom_domain
    end

    add_index :authors, :custom_domain
  end
end
