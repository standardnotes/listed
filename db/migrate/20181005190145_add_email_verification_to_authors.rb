class AddEmailVerificationToAuthors < ActiveRecord::Migration[5.0]
  def change
    change_table(:authors) do |t|
      t.boolean :email_verified, :default => false
      t.string :email_verification_token
    end

    Author.where("email IS NOT NULL").each do |author|
      author.email_verified = true
      author.save
    end
  end
end
