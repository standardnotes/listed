module ApplicationHelper
end

class String
  def is_integer?
    self.to_i.to_s == self
  end

  def contains_url?
    match(/\b(?:(?:mailto:\S+|(?:https?|ftp|file):\/\/)?(?:\w+\.)+[a-z]{2,6})\b/) != nil
  end
end
