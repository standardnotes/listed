#!/bin/bash

set -e

host="$1"
shift
port="$1"
shift
cmd="$@"

until timeout 1 bash -c ">/dev/tcp/$host/$port" 2>/dev/null
do
  >&2 echo "$host:$port is unavailable yet - waiting for it to start"
  sleep 1
done

>&2 echo "$host:$port is up - executing command"
exec $cmd
