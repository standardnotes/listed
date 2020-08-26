# frozen_string_literal: true

class RemoveAwsColumsFromCertificates < ActiveRecord::Migration[5.0]
  def change
    remove_column :letsencrypt_certificates, :aws_arn
    remove_column :letsencrypt_certificates, :aws_hosted_zone_id
  end
end
