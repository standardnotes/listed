module Tokenable
  extend ActiveSupport::Concern

  included do
    before_create :generate_token
  end

  protected

  def generate_token
    token_length = 10
    self.token = loop do
      range = [*'0'..'9', *'a'..'z', *'A'..'Z']
      random_token = token_length.times.map { range.sample }.join
      break random_token unless self.class.exists?(token: random_token)
    end
  end

end
