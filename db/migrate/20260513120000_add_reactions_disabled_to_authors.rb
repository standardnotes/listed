class AddReactionsDisabledToAuthors < ActiveRecord::Migration[5.2]
  def change
    add_column :authors, :reactions_disabled, :boolean, default: false
  end
end
