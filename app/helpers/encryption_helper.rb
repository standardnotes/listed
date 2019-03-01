module EncryptionHelper

  require 'securerandom'
  require "openssl"
  require 'base64'

  ALG = "AES-256-CBC"

  def self.generate_random_key
    Digest::SHA256.hexdigest(SecureRandom.hex)
  end

  def self.encrypt(message, key)
    aes = OpenSSL::Cipher::Cipher.new(ALG)
    aes.encrypt
    aes.key = [key].pack('H*')
    cipher = aes.update(message)
    cipher << aes.final
    cipher64 = [cipher].pack('m')
    cipher64
  end

  def self.decrypt(cipher64, key)
    decode_cipher = OpenSSL::Cipher::Cipher.new(ALG)
    decode_cipher.decrypt
    decode_cipher.key = [key].pack('H*')
    plain = decode_cipher.update(cipher64.unpack('m')[0])
    plain << decode_cipher.final
    plain
  end

  def self.sha256(string)
    Digest::SHA256.hexdigest(string)
  end

end
