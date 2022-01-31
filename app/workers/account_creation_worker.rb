class AccountCreationWorker
  include Shoryuken::Worker

  shoryuken_options queue: ENV.fetch('SQS_QUEUE_URL'), auto_delete: true

  def perform(sqs_msg, body)
    Rails.logger.info("Received SQS Message: #{sqs_msg}")
    Rails.logger.info("Received SQS Body: #{body}")
  end
end
