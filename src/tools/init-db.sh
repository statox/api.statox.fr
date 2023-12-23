#!/usr/bin/env bash

SCRIPTPATH="$( cd -- "$(dirname "$0")" >/dev/null 2>&1 ; pwd -P )"
TESTS=0

if [ "$#" -eq 0 ]; then
    MYSQL_CMD=$("$SCRIPTPATH/mysql-local")
elif [ "$1" == '--prod' ]; then
    MYSQL_CMD=$("$SCRIPTPATH/mysql-prod")
elif [ "$1" == '--tests' ]; then
    MYSQL_CMD=$("$SCRIPTPATH/mysql-tests")
    TESTS=1
else
    echo 'Usage init-sh.sh [--prod | --tests]'
fi

echo "$MYSQL_CMD"

try_connect(){
    echo 'Try to connect'
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

# Merge all sql files into one big sql file
for f in $(find "$SCRIPTPATH/tables" -type f -name "*.sql" | sort); do
    cat "$f" >> "$SCRIPTPATH/tmp.sql"
    echo $'\n' >> "$SCRIPTPATH/tmp.sql"
done;

cat "$SCRIPTPATH/tmp.sql" | eval "$MYSQL_CMD"
