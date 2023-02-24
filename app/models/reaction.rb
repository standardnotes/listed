class Reaction < ApplicationRecord
  include Tokenable

  REACTIONS = %w[👍 ❤️ 🫶 👏 👌 🤯 🤔 😂 😍 😭 😢 😡 😮].freeze

  validates :reaction_string, inclusion: { in: REACTIONS }

  belongs_to :post
  belongs_to :subscriber, optional: true

  def self.reactions_to_string(reactions)
    reactions.group_by(&:reaction_string).map do |reaction_string, local_reactions|
      "#{reaction_string} #{local_reactions.length} \u000B\u000B"
    end
  end
end
