class CreateSubscribers < ActiveRecord::Migration[5.0]
  def change
    create_table :subscribers do |t|
      t.string :email
      t.timestamps
    end

    create_table :subscriptions do |t|
      t.belongs_to :author, :index => true
      t.belongs_to :subscriber, :index => true
      t.string :token
      t.boolean :verified
    end
  end
end
