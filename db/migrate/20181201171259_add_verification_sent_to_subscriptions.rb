class AddVerificationSentToSubscriptions < ActiveRecord::Migration[5.0]
  def change
    change_table(:subscriptions) do |t|
      t.datetime :verification_sent_at
    end
  end
end
