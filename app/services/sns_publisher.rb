require 'aws-sdk-sns'
require 'zlib'

class SnsPublisher
  attr_accessor :sns_client, :topic_arn

  LISTED_ACCOUNT_CREATED = 'LISTED_ACCOUNT_CREATED'.freeze
  LISTED_ACCOUNT_DELETED = 'LISTED_ACCOUNT_DELETED'.freeze

  def initialize
    @sns_client = Aws::SNS::Client.new(
      stub_responses: ENV.fetch('RAILS_ENV') === 'test'
    )
    @topic_arn = ENV.fetch('SNS_TOPIC_ARN', nil)
  end

  def publish_listed_account_created_event(user_id, user_email, user_name, secret)
    publish_event(
      LISTED_ACCOUNT_CREATED,
      {
        userId: user_id,
        userName: user_name,
        userEmail: user_email,
        secret: secret
      }
    )
  end

  def publish_listed_account_deleted_event(user_id, user_email, user_name, secret)
    publish_event(
      LISTED_ACCOUNT_DELETED,
      {
        userId: user_id,
        userName: user_name,
        userEmail: user_email,
        secret: secret
      }
    )
  end

  private

  def publish_event(type, payload)
    unless @topic_arn
      Rails.logger.warn 'SNS topic arn has not been configured. Skipped publishing to SNS.'

      return
    end

    sns_response = @sns_client.publish(
      topic_arn: @topic_arn,
      message: compress_message(
        type: type,
        createdAt: Time.now.utc.iso8601,
        meta: {
          correlation: {
            userIdentifier: payload[:userEmail],
            userIdentifierType: 'email'
          }
        },
        payload: payload
      ),
      message_attributes: {
        'compression' => {
          data_type: 'String',
          string_value: 'true'
        },
        'event' => {
          data_type: 'String',
          string_value: type
        }
      }
    )

    Rails.logger.info "Published event #{type} to SNS: #{sns_response.message_id}"
  rescue StandardError => e
    Rails.logger.error "Could not publish SNS event: #{e.message}"
  end

  def compress_message(event)
    Base64.encode64(Zlib::Deflate.deflate(JSON.dump(event)))
  end
end
