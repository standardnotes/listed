class AddImageUrlToAuthors < ActiveRecord::Migration[5.0]
  def change
    change_table(:authors) do |t|
      t.string :meta_image_url
      t.string :header_image_url
    end
  end
end
