class DisableNewsletter < ActiveRecord::Migration[5.0]
  def change
    add_column :authors, :newsletter_disabled, :boolean, :default => false
  end
end
