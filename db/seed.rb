require 'fileutils'

certificates = LetsEncrypt.certificate_model.all

certificates.each do |certificate|
  if certificate.intermediaries.present? && certificate.key.present?
    certificate_directory = "#{ENV['CERTIFICATES_FOLDER_PATH']}/#{certificate.domain}"
    FileUtils.mkdir_p certificate_directory unless File.exists?(certificate_directory)

    File.open("#{certificate_directory}/fullchain.pem", 'w+') { |file| file.write(certificate.intermediaries) }
    File.open("#{certificate_directory}/privkey.pem", 'w+') { |file| file.write(certificate.key) }
  end
end
