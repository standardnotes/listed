# frozen_string_literal: true

# :nodoc:
class CreateLetsencryptCertificates < ActiveRecord::Migration[5.0]
  def change
    create_table :letsencrypt_certificates do |t|
      t.string   :domain, limit: 180
      t.text     :certificate, limit: 65535
      t.text     :intermediaries, limit: 65535
      t.text     :key, limit: 65535
      t.datetime :expires_at
      t.datetime :renew_after
      t.string   :verification_path
      t.string   :verification_string
      t.string   :aws_arn
      t.string   :aws_hosted_zone_id

      t.index    :domain
      t.index    :renew_after
      t.timestamps
    end
  end
end
