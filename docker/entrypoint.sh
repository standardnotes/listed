#!/bin/sh
set -e

case "$1" in
  'start' )
    echo "Prestart Step 1/2 - Removing server lock"
    rm -f /app/tmp/pids/server.pid
    echo "Prestart Step 2/2 - Migrating database"
    bundle exec rake db:migrate:ignore_concurrent
    echo "Starting Server..."
    bundle exec rails server -b 0.0.0.0
    ;;

  'renew-certificates' )
    echo "Prestart Step 1/2 - Removing server lock"
    rm -f /app/tmp/pids/server.pid
    echo "Prestart Step 2/2 - Renew SSL certificates"
    if [[ -z "$LETSENCRYPT_AWS_NETWORK_LOAD_BALANCER_LISTENER_ARN" ]]; then
      echo "Skipped renewing SSL certificates - LETSENCRYPT_AWS_NETWORK_LOAD_BALANCER_LISTENER_ARN environment variable not set"
    else
      bundle exec rake ssl:renew["$LETSENCRYPT_AWS_NETWORK_LOAD_BALANCER_LISTENER_ARN"]
    fi
    echo "Starting Server..."
    bundle exec rails server -b 0.0.0.0
    ;;

   * )
    echo "Unknown command"
    ;;
esac

exec "$@"
