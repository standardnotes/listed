#!/bin/sh
set -e

case "$1" in
  'start' )
    echo "Prestart Step 1/4 - Removing server lock"
    rm -f /app/tmp/pids/server.pid
    echo "Prestart Step 2/4 - Migrating database"
    bundle exec rake db:migrate:ignore_concurrent
    echo "Prestart Step 3/4 - Seeding database"
    bundle exec rails db:seed
    echo "Prestart Step 4/4 - Renew SSL certificates"
    if [[ -z "$LETSENCRYPT_AWS_NETWORK_LOAD_BALANCER_LISTENER_ARN" ]]; then
      bundle exec rake ssl:renew $LETSENCRYPT_AWS_NETWORK_LOAD_BALANCER_LISTENER_ARN
    else
      echo "Skipped renewing SSL certificates - AWS_ELB_LISTENER_ARN environment variable not set"
    fi
    echo "Starting Server..."
    bundle exec rails server -b 0.0.0.0
    ;;

   * )
    echo "Unknown command"
    ;;
esac

exec "$@"
