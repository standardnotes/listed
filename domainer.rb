# Run this script manually as a root user.

require "yaml"
require "erb"

DOMAINER_PATH = "/home/ec2-user/domainer/"
NGINX_CONF_PATH = "/opt/nginx/conf/nginx.conf"

# DOMAINER_PATH = ""
# NGINX_CONF_PATH = "nginx.conf"

def string_between_markers string, marker1, marker2
  string[/#{Regexp.escape(marker1)}(.*?)#{Regexp.escape(marker2)}/m, 1]
end

def host_for_domain(domain)
  return domain.gsub("http://", "").gsub("https://", "")
end

def process_domains(domains)
  domain_files = []
  domains.each do |domain|
    domain_files << write_domain_to_nginx(domain)
  end

  all_domains_text = "server_name " + domains.join(" ") + ";"
  File.open(DOMAINER_PATH + "nginx_all_domains", "w+") do |f|
    f.write(all_domains_text)
  end

  # generate include statements for every file
  include_statements = domain_files.map { |f| "include #{f};" }.join("\n")

  nginx_file = File.read(NGINX_CONF_PATH)

  # write to nginx file
  start = "#BEGIN DOMAINER INCLUDES#"
  finish = "#END DOMAINER INCLUDES#"

  current_config = nginx_file[/#{start}([\s\S]*)#{finish}/, 0]

  if !current_config
    puts "Unable to find current config. Ensure #BEGIN/END DOMAINER INCLUDES# is present in the nginx file."
    return
  end

  new_config = start + "\n" + include_statements + "\n" + finish
  nginx_file.gsub!(current_config, new_config)

  # write updated nginx file
  File.open(NGINX_CONF_PATH, "w+") do |f|
    f.write(nginx_file)
  end

  # renew certificates
  domains.each do |domain|
    renew_certificate_for_domain(domain)
  end
end

def write_domain_to_nginx(domain)

  default_config_path = DOMAINER_PATH + "nginx_default"

  config = []
  config << "server {"
    config << "server_name #{domain};"
    config << "ssl_certificate /etc/letsencrypt/live/#{domain}/fullchain.pem;"
    config << "ssl_certificate_key /etc/letsencrypt/live/#{domain}/privkey.pem;"

    config << "ssl_dhparam /etc/ssl/certs/dhparam.pem;"
    # config << "ssl_prefer_server_ciphers on;"
    # config << "ssl_ciphers AES256+EECDH:AES256+EDH:!aNULL"
    config << "ssl_protocols TLSv1.1 TLSv1.2;"
    config << "ssl_session_cache shared:SSL:10m;"
    config << "ssl_session_timeout 10m;"
    config << "ssl_stapling on;"
    config << "ssl_stapling_verify on;"
    # config << "ssl_ecdh_curve secp521r1:secp384r1:prime256v1;"
    config << 'add_header Strict-Transport-Security "max-age=31536000; includeSubdomains";'
    config << "add_header X-Frame-Options DENY;"
    config << "add_header X-Content-Type-Options nosniff;"

    config << "include #{default_config_path};"
  config << "}"

  file_path = DOMAINER_PATH + "domains/#{domain}"
  File.open(file_path, "w+") do |f|
    f.write(config.join("\n"))
  end

  return file_path
end

def renew_certificate_for_domain(domain)
  domains_text = "-d #{domain}"

  system("echo 'Renewing cert for domain: #{domain}'")

  cmd = "mkdir -p /tmp/letsencrypt-auto" \
        "&& sudo /opt/letsencrypt/letsencrypt-auto --debug certonly " \
        "--server https://acme-v02.api.letsencrypt.org/directory " \
        "-a webroot --webroot-path=/tmp/letsencrypt-auto " \
        "--cert-name #{domain} --keep-until-expiring " \
        "#{domains_text}"

  system(cmd)
end

def restart_nginx
  system("echo 'Restarting nginx...'")

  cmd = "sudo /opt/nginx/sbin/nginx -s reload"
  system(cmd)

  system("echo 'Done'")
end

path = "config/domains.yml"
domains = YAML.load(ERB.new(File.read(path)).result).map { |d| host_for_domain(d) }
process_domains(domains)
restart_nginx()
