# config valid only for current version of Capistrano
lock '3.6.1'

set :application, 'listed'
set :repo_url, 'https://github.com/standardnotes/listed'

# Default branch is :master
# ask :branch, `git rev-parse --abbrev-ref HEAD`.chomp

# Default deploy_to directory is /var/www/my_app_name
# set :deploy_to, '/var/www/my_app_name'

# Default value for :scm is :git
set :scm, :git
set :git_strategy, Capistrano::Git::SubmoduleStrategy

# Default value for :format is :airbrussh.
# set :format, :airbrussh

# You can configure the Airbrussh format using :format_options.
# These are the defaults.
# set :format_options, command_output: true, log_file: 'log/capistrano.log', color: :auto, truncate: :auto

# Default value for :pty is false
# set :pty, true

# Default value for :linked_files is []
# set :linked_files, fetch(:linked_files, []).push('config/database.yml', 'config/secrets.yml')
set :linked_files, fetch(:linked_files, []).push('.env')

# Default value for linked_dirs is []
# set :linked_dirs, fetch(:linked_dirs, []).push('log', 'tmp/pids', 'tmp/cache', 'tmp/sockets', 'public/system')
set :linked_dirs, fetch(:linked_dirs, []).push('log', 'tmp/pids', 'tmp/cache', 'tmp/sockets', 'public/system', 'public/uploads')

# Default value for keep_releases is 5
# set :keep_releases, 5

# set :rvm_ruby_version, '2.3.0'

namespace :deploy do
  task :npm_install do
    on roles(:app) do
      within release_path do
        # string commands dont work, have to use special *%w syntax
        execute *%w[ npm install ]
      end
    end
  end
end

before 'deploy:compile_assets', 'deploy:npm_install'

set :ssh_options, {
  keys: ENV.fetch('LISTED_SSH_KEY_PATH'),
  forward_agent: false,
  auth_methods: %w(publickey)
}

set :whenever_identifier, ->{ "#{fetch(:application)}_#{fetch(:stage)}" }
# What servers should be updated with whenever
set :whenever_roles, ->{ [:web, :app]}
