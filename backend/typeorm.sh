#!/bin/sh
# can be used: yarn typeorm mg MigrationName => alike yarn typeorm migration:generate src/migrations/MigrationName

# Extract command line arguments
COMMAND="$1"
SRC="$2"
all_args=$@

echo command: $COMMAND
#
# If mg without name then fail
if [ "$COMMAND" = "mg" ] && [ -z "$SRC" ] ; then
  echo "No migration name given"
  exit 1;
fi
if  [ "$COMMAND" = "mg" ] ; then
  # Add name to full path
  SRC=src/migrations/$SRC
  echo generate migration src: $SRC
  # Change command go migrtion:generate and run
  all_args="migration:generate $SRC -p"
fi

node ./node_modules/ts-node/dist/bin.js -r tsconfig-paths/register -r dotenv/config --project ./tsconfig.json ./node_modules/typeorm/cli.js -d ./src/infrastructure/database/postgres.ts $all_args
