class FrequencyParamsToSubscription < ActiveRecord::Migration[5.0]
  def change

    change_table(:subscriptions) do |t|
      t.string :frequency, :default => "daily"
      t.datetime :last_mailing
      t.boolean :unsubscribed, :default => false
    end

    add_index :subscriptions, :frequency
    add_index :subscriptions, :unsubscribed
    add_index :subscriptions, :verified

  end
end
