class CustomDomainConstraint
  def self.matches? request
    matching_blog?(request)
  end

  def self.matching_blog? request
    Domain.where(:domain => request.host).any?
  end
end
