class AddWordCount < ActiveRecord::Migration[5.0]
  def change
    change_table(:posts) do |t|
      t.integer :word_count
    end

    Post.all.each do |post|
      if post.text
        post.word_count = post.text.split.size
        post.save
      end
    end
  end
end
