class Domain < ApplicationRecord
  belongs_to :author

  before_destroy do
    SSLCertificate.where(domain: domain).first.destroy
  end
end
