#!/bin/sh
set -e

COMMAND=$1 && shift 1

case "$COMMAND" in
  'start' )
    echo "Prestart Step 1/2 - Removing server lock"
    rm -f /listed/tmp/pids/server.pid
    echo "Prestart Step 2/2 - Migrating database"
    bundle exec rake db:migrate:ignore_concurrent
    echo "Starting Server..."
    bundle exec rails server -b 0.0.0.0
    ;;

  'start-local' )
    echo "Prestart Step 1/4 - Removing server lock"
    rm -f /listed/tmp/pids/server.pid
    echo "Prestart Step 2/4 - Installing dependencies"
    yarn install --frozen-lockfile
    echo "Prestart Step 3/4 - Compiling assets"
    bundle exec rake assets:precompile
    echo "Prestart Step 4/4 - Migrating database"
    bundle exec rake db:migrate:ignore_concurrent
    echo "Starting Server..."
    bundle exec rails server -b 0.0.0.0
    ;;

  'renew-certificates' )
    echo "Prestart Step 1/2 - Removing server lock"
    rm -f /listed/tmp/pids/server.pid
    echo "Prestart Step 2/2 - Renew SSL certificates"
    if [[ -z "$LETSENCRYPT_AWS_NETWORK_LOAD_BALANCER_LISTENER_ARN" ]]; then
      echo "Skipped renewing SSL certificates - LETSENCRYPT_AWS_NETWORK_LOAD_BALANCER_LISTENER_ARN environment variable not set"
    else
      echo "Starting Certificates Renewal..."
      bundle exec rake ssl:renew["$LETSENCRYPT_AWS_NETWORK_LOAD_BALANCER_LISTENER_ARN"]
    fi
    ;;

   * )
    echo "Unknown command"
    ;;
esac

exec "$@"
