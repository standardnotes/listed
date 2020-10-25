SimpleCaptcha.setup do |sc|
  sc.refresh_format = :plain_javascript # or :jquery, or :plain_javascript default is :jquery
  sc.image_magick_path = ENV['IMAGE_MAGICK_PATH'] || '/usr/local/bin'
  sc.image_style = 'listed_bg'
  sc.add_image_style('listed_bg', ["-background '#F8F9FC'"])
end
