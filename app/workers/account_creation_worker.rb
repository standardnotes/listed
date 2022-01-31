require 'zlib'

class AccountCreationWorker
  include Shoryuken::Worker

  shoryuken_options queue: ENV.fetch('SQS_QUEUE_URL'), auto_delete: true

  def perform(sqs_msg, body)
    parsed_body = JSON.parse(body)
    Rails.logger.info "Received body #{parsed_body}"
    Rails.logger.info "Received message #{parsed_body[:Message]}"
    decompressed_message = decompress_message(parsed_body[:Message])

    Rails.logger.info "Received event #{decompressed_message}"

    author = Author.new
    secret = EncryptionHelper.generate_random_key
    author.secret = secret
    author.email = decompressed_message[:payload][:userEmail]
    author.save
  end

  private

  def decompress_message(message)
    decoded_message = Base64.decode64(message)
    zstream = Zlib::Inflate.new
    buffer = zstream.inflate(decoded_message)
    zstream.finish
    zstream.close

    return JSON.parse(buffer)
  end
end
