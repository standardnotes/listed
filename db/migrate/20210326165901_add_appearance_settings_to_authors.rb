class AddAppearanceSettingsToAuthors < ActiveRecord::Migration[5.0]
  def change
      add_column :authors, :cover_style, :string, default: 'full'
      add_column :authors, :blog_layout_style, :string, default: 'vertical'
      add_column :authors, :custom_theme_enabled, :boolean, default: false
  end
end
