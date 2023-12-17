#!/usr/bin/env bash

SCRIPTPATH="$( cd -- "$(dirname "$0")" >/dev/null 2>&1 ; pwd -P )"

if [ "$#" -eq 0 ]; then
    MYSQL_CMD=$("$SCRIPTPATH/mysql-local")
elif [ "$1" == '--prod' ]; then
    MYSQL_CMD=$("$SCRIPTPATH/mysql-prod")
else
    echo 'Usage init-sh.sh [--prod]'
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
# Merge all sql files into one big sql file
for f in $(find "$SCRIPTPATH/tables" -type f -name "*.sql" | sort); do
    cat "$f" >> "$SCRIPTPATH/tmp.sql"
    echo $'\n' >> "$SCRIPTPATH/tmp.sql"
done;

cat "$SCRIPTPATH/tmp.sql" | eval "$MYSQL_CMD"
