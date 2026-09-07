require 'test_helper'
require 'rake'

class SunsettingAnnouncementRakeTest < ActiveSupport::TestCase
  self.fixture_table_names = []

  module RecordingMailerStub
    class << self
      attr_accessor :raise_for_emails
    end
    self.raise_for_emails = []

    def sunsetting_announcement(author)
      if RecordingMailerStub.raise_for_emails.include?(author.email)
        raise StandardError, 'smtp failed'
      end

      SunsettingAnnouncementRakeTest.recorded_deliveries << author
      OpenStruct.new(deliver_now: true)
    end
  end

  module AuthorAudienceStub
    class << self
      attr_accessor :audience_ids
    end

    def with_published_posts
      if AuthorAudienceStub.audience_ids
        where(id: AuthorAudienceStub.audience_ids)
      else
        super
      end
    end
  end

  class << self
    attr_accessor :recorded_deliveries
  end

  setup do
    ENV['HOST'] ||= 'http://www.example.com'
    self.class.recorded_deliveries = []
    RecordingMailerStub.raise_for_emails = []
    AuthorAudienceStub.audience_ids = nil

    unless AuthorsMailer.singleton_class.ancestors.include?(RecordingMailerStub)
      AuthorsMailer.singleton_class.prepend(RecordingMailerStub)
    end

    unless Author.singleton_class.ancestors.include?(AuthorAudienceStub)
      Author.singleton_class.prepend(AuthorAudienceStub)
    end

    Listed::Application.load_tasks if Rake::Task.tasks.empty?
    @task = Rake::Task['authors:announce_sunsetting']

    @original_author_id = ENV['AUTHOR_ID']
    @original_dry_run = ENV['DRY_RUN']
    @original_send_delay = ENV['SEND_DELAY_SECONDS']
    @original_log_path = ENV['SUNSETTING_ANNOUNCEMENT_LOG_PATH']
    @log_path = Rails.root.join('tmp', "sunsetting_announcement_test_#{Process.pid}.log")

    ENV.delete('AUTHOR_ID')
    ENV.delete('DRY_RUN')
    ENV['SEND_DELAY_SECONDS'] = '0'
    ENV['SUNSETTING_ANNOUNCEMENT_LOG_PATH'] = @log_path.to_s
  end

  teardown do
    ENV['AUTHOR_ID'] = @original_author_id
    ENV['DRY_RUN'] = @original_dry_run
    ENV['SEND_DELAY_SECONDS'] = @original_send_delay
    if @original_log_path
      ENV['SUNSETTING_ANNOUNCEMENT_LOG_PATH'] = @original_log_path
    else
      ENV.delete('SUNSETTING_ANNOUNCEMENT_LOG_PATH')
    end
    File.delete(@log_path) if @log_path && File.exist?(@log_path)
    @task.reenable
  end

  def create_author(attrs = {})
    Author.create!({
      secret: SecureRandom.hex(10),
      email: 'author@example.com',
      email_verified: true,
    }.merge(attrs))
  end

  def create_post(author, attrs = {})
    Post.create!({
      author: author,
      title: 'Test post',
      text: 'Post content',
      token: SecureRandom.hex(10),
      published: true,
    }.merge(attrs))
  end

  def with_audience(*authors)
    AuthorAudienceStub.audience_ids = authors.map(&:id)
    yield
  ensure
    AuthorAudienceStub.audience_ids = nil
  end

  test 'announce_sunsetting delivers to published authors with email' do
    eligible_author = create_author(email: 'eligible@example.com')
    create_post(eligible_author)

    ineligible_author = create_author(email: 'ineligible@example.com')
    create_post(ineligible_author, published: false)

    unverified_author = create_author(email: 'unverified@example.com', email_verified: true)
    create_post(unverified_author)
    unverified_author.update!(email_verified: false)

    with_audience(eligible_author, unverified_author) do
      output = capture_io { @task.invoke }.join

      assert_equal [eligible_author.id, unverified_author.id], self.class.recorded_deliveries.map(&:id)
      assert_match(/Sending to 2 authors/, output)
      assert_match(/Completed sunsetting announcement emails. Sent 2, failed 0./, output)
      assert_match(/Log written to #{Regexp.escape(@log_path.to_s)}/, output)

      log_contents = File.read(@log_path)
      assert_match(/=== Sent \(2\) ===/, log_contents)
      assert_match(/author_id=#{eligible_author.id} email=eligible@example.com/, log_contents)
      assert_match(/author_id=#{unverified_author.id} email=unverified@example.com/, log_contents)
      assert_match(/=== Failed \(0\) ===/, log_contents)
    end
  end

  test 'announce_sunsetting dry run prints recipients without delivering' do
    author = create_author(email: 'dryrun@example.com')
    create_post(author)

    ENV['DRY_RUN'] = '1'

    with_audience(author) do
      output = capture_io { @task.invoke }.join

      assert_empty self.class.recorded_deliveries
      assert_match(/\[DRY RUN\] Would send to 1 authors/, output)
      assert_match(/#{author.id} dryrun@example.com/, output)
      assert_no_match(/Completed sunsetting announcement emails/, output)
      assert_no_match(/Log written to/, output)
      refute File.exist?(@log_path)
    end
  end

  test 'announce_sunsetting author_id limits recipients' do
    first_author = create_author(email: 'first@example.com')
    create_post(first_author)

    second_author = create_author(email: 'second@example.com')
    create_post(second_author)

    ENV['AUTHOR_ID'] = first_author.id.to_s

    with_audience(first_author, second_author) do
      @task.invoke

      assert_equal 1, self.class.recorded_deliveries.length
      assert_equal first_author.id, self.class.recorded_deliveries.first.id
    end
  end

  test 'announce_sunsetting continues after delivery errors' do
    good_author = create_author(email: 'good@example.com')
    create_post(good_author)

    bad_author = create_author(email: 'bad@example.com')
    create_post(bad_author)

    RecordingMailerStub.raise_for_emails = ['bad@example.com']

    with_audience(good_author, bad_author) do
      output = capture_io { @task.invoke }.join

      assert_match(/Error sending to author #{bad_author.id}: smtp failed/, output)
      assert_match(/Completed sunsetting announcement emails. Sent 1, failed 1./, output)

      log_contents = File.read(@log_path)
      assert_match(/author_id=#{good_author.id} email=good@example.com/, log_contents)
      assert_match(
        /author_id=#{bad_author.id} email=bad@example.com error=smtp failed/,
        log_contents
      )
    end
  end
end
