class HelloWorker
  include Shoryuken::Worker

  shoryuken_options queue: ->{ ENV['SQS_QUEUE_NAME'] }, auto_delete: true

  def perform(sqs_msg)
    Rails.logger.info(sqs_msg)
  end
end
