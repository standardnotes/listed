class AddEmailSendDateToPosts < ActiveRecord::Migration[5.0]
  def change
    add_column :posts, :email_sent_date, :datetime
  end
end
