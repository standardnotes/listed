SimpleCaptcha.setup do |sc|
  sc.refresh_format = :plain_javascript # or :jquery, or :plain_javascript default is :jquery
  sc.image_magick_path = '/usr/bin'
end
