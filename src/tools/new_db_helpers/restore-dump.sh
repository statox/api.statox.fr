#!/usr/bin/env bash

SCRIPTPATH="$( cd -- "$(dirname "$0")" >/dev/null 2>&1 ; pwd -P )"

FILE_TO_RESTORE="$1"
ENVIRONMENT="$2"
TMP_RESTORE_FILE='restore.sql'

if [ -z "$FILE_TO_RESTORE" ]; then
    echo "Usage ./restore-dump.sh path/to/dump.gz [--prod|--tests|--new-prod]"
    exit 1
fi

if [ ! -f "$FILE_TO_RESTORE" ]; then
    echo "Dump file doesn't exist $FILE_TO_RESTORE"
    exit 1
fi

if [ "$ENVIRONMENT" == '--prod' ]; then
    echo "THIS SCRIPT IS DANGEROUS. It drops the existing database"
    echo "You probaby don't want to do that on prod"
    echo "If you really do uncomment the following line"
    exit 1
fi

if [ -n "$ENVIRONMENT" ] && [ "$ENVIRONMENT" != '--tests' ] && [ "$ENVIRONMENT" != '--new-prod' ]; then
    echo "Usage ./restore-dump.sh path/to/dump.gz [--prod|--tests|--new-prod]"
    exit 1
fi

source "$SCRIPTPATH/set-db-creds.sh" "$2"

echo "Going to restore on $host:$port"

gunzip -c "$FILE_TO_RESTORE" > "$TMP_RESTORE_FILE"
mysql -h "$host" -u "$user" --port "$port" --password="$password" << EOF
drop database IF EXISTS $db;
create database IF NOT EXISTS $db;
use $db;
source $TMP_RESTORE_FILE
EOF
