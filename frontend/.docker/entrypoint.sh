#!/bin/bash

set -e

# run yarn install
yarn install

# execute docker-compose command
exec "$@"
