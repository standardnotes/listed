SANITIZE_CONFIG = Sanitize::Config.merge(
  Sanitize::Config::RELAXED,
  css: {
    protocols: Sanitize::Config::RELAXED[:css][:protocols] + ['data'],
    at_rules: ['import'],
    properties: Sanitize::Config::RELAXED[:css][:properties] + [
      '--dimmed-text-color',
      '--dimmed-border-color',
      '--background-color',
      '--body-text-color',
      '--post-title-color',
      '--post-date-color',
      '--post-text-color',
      '--page-menu-link-color',
      '--header-author-name',
      '--header-listed-name',
      '--more-from-border-color',
      '--bio-color',
      '--wordcount-color',
      '--website-color',
      '--twitter-color',
      '--link-color',
      '--header-border-color'
    ]
  }
)