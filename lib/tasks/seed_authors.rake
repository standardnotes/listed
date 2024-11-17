namespace :db do
  desc "Seed authors and subscriptions"
  task seed_authors: :environment do
    # Create 3 authors
    3.times do |i|
      author = Author.create!(
        secret: SecureRandom.hex(10),
        username: "author#{i}",
        display_name: "Author #{i}",
        email: "author#{i}@example.com",
        email_verified: true,
        bio: "This is author #{i}'s bio"
      )

      # Create 5 subscribers for each author
      5.times do |j|
        subscriber = Subscriber.create!(
          email: "subscriber#{i}_#{j}@example.com"
        )

        # Create verified subscription
        Subscription.create!(
          author: author,
          subscriber: subscriber,
          token: SecureRandom.hex(10),
          verified: true,
          frequency: ['daily', 'weekly'].sample,
          last_mailing: DateTime.now - rand(1..10).days
        )
      end

      # Create some posts for each author
      3.times do |k|
        Post.create!(
          author: author,
          title: "Post #{k} by Author #{i}",
          text: "This is the content of post #{k}",
          token: SecureRandom.hex(10),
          published: true,
          author_show: true
        )
      end
    end

    puts "Created 3 authors with 5 verified subscribers each and 3 posts each"
  end
end