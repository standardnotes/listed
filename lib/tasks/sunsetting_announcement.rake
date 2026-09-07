namespace :authors do
  SUNSETTING_ANNOUNCEMENT_PROGRESS_INTERVAL = 100

  desc 'Send sunsetting announcement email to authors who have published at least once'
  task announce_sunsetting: :environment do
    authors = Author.with_published_posts.with_email
    authors = authors.where(id: ENV['AUTHOR_ID']) if ENV['AUTHOR_ID'].present?

    total = authors.count
    dry_run = ENV['DRY_RUN'].present?
    send_delay = ENV.fetch('SEND_DELAY_SECONDS', '0.1').to_f

    puts "#{dry_run ? '[DRY RUN] Would send' : 'Sending'} to #{total} authors..."

    current = 0
    sent = 0
    failed = 0
    sent_entries = []
    failed_entries = []
    log_path = nil
    log_file = nil

    unless dry_run
      log_path = ENV['SUNSETTING_ANNOUNCEMENT_LOG_PATH'].presence ||
                 Rails.root.join('log', "sunsetting_announcement_#{Time.now.utc.strftime('%Y%m%d_%H%M%S')}.log")

      log_file = File.open(log_path, 'w')
      log_file.puts "Sunsetting announcement email run started at #{Time.now.utc.iso8601}"
      log_file.puts "Total authors: #{total}"
      log_file.puts ''
    end

    begin
      authors.find_each do |author|
        current += 1

        if dry_run
          puts "  -> #{author.id} #{author.email}"
          next
        end

        AuthorsMailer.sunsetting_announcement(author).deliver_now
        sent += 1
        sent_entries << { id: author.id, email: author.email }

        if (current % SUNSETTING_ANNOUNCEMENT_PROGRESS_INTERVAL).zero?
          puts "Processed #{current}/#{total} authors..."
        end

        sleep(send_delay) if send_delay.positive?
      rescue StandardError => e
        failed += 1
        failed_entries << { id: author.id, email: author.email, error: e.message }
        puts "Error sending to author #{author.id}: #{e.message}"
      end
    ensure
      unless dry_run
        log_file.puts "=== Sent (#{sent}) ==="
        sent_entries.each do |entry|
          log_file.puts "author_id=#{entry[:id]} email=#{entry[:email]}"
        end
        log_file.puts ''

        log_file.puts "=== Failed (#{failed}) ==="
        failed_entries.each do |entry|
          log_file.puts "author_id=#{entry[:id]} email=#{entry[:email]} error=#{entry[:error]}"
        end
        log_file.puts ''

        log_file.puts "Completed at #{Time.now.utc.iso8601}"
        log_file.puts "Sent: #{sent}, Failed: #{failed}"
        log_file.close

        puts "Completed sunsetting announcement emails. Sent #{sent}, failed #{failed}."
        puts "Log written to #{log_path}"
      end
    end
  end
end
