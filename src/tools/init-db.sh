#!/usr/bin/env bash

# shellcheck disable=SC2317  # Don't warn about unreachable commands in this file (TODO understand why the source command creates this warning)

if ! command -v mysql >/dev/null 2>&1; then
    echo "mysql client is not installed. Stoping here."
    exit 1
fi


SCRIPTPATH="$( cd -- "$(dirname "$0")" >/dev/null 2>&1 ; pwd -P )"
TESTS=0

#if [ "$#" -eq 0 ]; then
#    MYSQL_CMD=$("$SCRIPTPATH/mysql-local")
#elif [ "$1" == '--prod' ]; then
#    MYSQL_CMD=$("$SCRIPTPATH/mysql-prod")
#elif [ "$1" == '--tests' ]; then
#    MYSQL_CMD=$("$SCRIPTPATH/mysql-tests")

source "$SCRIPTPATH/new_db_helpers/set-db-creds.sh" "$1"
MYSQL_CMD="mysql -h $host -u $user --port $port --password=$password $db"

if [ "$1" == '--tests' ]; then
    TESTS=1
elif [ -n "$1" ] && [ ! "$1" = "--prod" ]; then
    echo 'Usage init-sh.sh [--prod | --tests]'
fi

try_connect(){
    echo 'Try to connect to mysql'
    echo 'SHOW DATABASES' | eval "$MYSQL_CMD" &>/dev/null
}

# Make sure the MySQL server is properly started before we start doing requests
while ! try_connect; do
    sleep 0.1
done

echo 'connected'

echo "" > "$SCRIPTPATH/tmp.sql"

if [ $TESTS -eq 1 ]; then
    echo 'Drop test db'
    echo 'DROP DATABASE IF EXISTS tests;' >> "$SCRIPTPATH/tmp.sql"
    echo 'CREATE DATABASE tests;' >> "$SCRIPTPATH/tmp.sql"
    echo 'USE tests;' >> "$SCRIPTPATH/tmp.sql"
fi

echo 'Make queries'
# Merge all sql files into one big sql file
for f in $(find "$SCRIPTPATH/tables" -type f -name "*.sql" | sort); do
    cat "$f" >> "$SCRIPTPATH/tmp.sql"
    echo $'\n' >> "$SCRIPTPATH/tmp.sql"
done;

echo 'Run queries'
cat "$SCRIPTPATH/tmp.sql" | eval "$MYSQL_CMD"

echo 'DONE init-db'
