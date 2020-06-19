#!/bin/sh
set -e

case "$1" in
  'start' )
    rm -f /app/tmp/pids/server.pid
    bundle exec rails db:migrate
    bundle exec rails db:seed
    bundle exec rails server -b 0.0.0.0
    ;;

   * )
    echo "Unknown command"
    ;;
esac

exec "$@"
