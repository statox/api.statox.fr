#!/usr/bin/env bash

# Runs a command to get the current side of the specified database.
# Use this to check the quota on JAWSdb the dashboard says free plan
# limit is  0.005 GB (5 MB)
# https://mysql.jawsdb.com/resource/dashboard
#
# 02/05/25 Prod db size: 0.563 Mb


# The part about getting the db command and checking connectivity is
# stolen from init-db.sh
# TODO: Maybe extract to seperate script callable from here
if ! command -v mysql >/dev/null 2>&1; then
    echo "mysql client is not installed. Stoping here."
    exit 1
fi


SCRIPTPATH="$( cd -- "$(dirname "$0")" >/dev/null 2>&1 ; pwd -P )"
TESTS=0

if [ "$#" -eq 0 ]; then
    MYSQL_CMD=$("$SCRIPTPATH/mysql-local")
elif [ "$1" == '--prod' ]; then
    MYSQL_CMD=$("$SCRIPTPATH/mysql-prod")
elif [ "$1" == '--tests' ]; then
    MYSQL_CMD=$("$SCRIPTPATH/mysql-tests")
else
    echo 'Usage check-mysql-size.sh [--prod | --tests]'
fi

try_connect(){
    echo 'Try to connect to mysql'
    echo 'SHOW DATABASES' | eval "$MYSQL_CMD" &>/dev/null
}

# Make sure the MySQL server is properly started before we start doing requests
while ! try_connect; do
    sleep 0.1
done

# LLM generated: Used phind.com to generate the command and removed useless stuff
# it generated about user permissions
read -r -d '' query <<'EOF'
SELECT 
    s.schema_name,
    CAST(ROUND(SUM(COALESCE(t.data_length + t.index_length, 0)) / 1024 / 1024, 3) AS CHAR) db_size_mb
FROM 
    information_schema.schemata s
INNER JOIN information_schema.tables t ON s.schema_name = t.table_schema
INNER JOIN (
    SELECT 
        spi.table_schema
    FROM 
        information_schema.schema_privileges spi
    GROUP BY 
        spi.grantee, spi.table_schema
) sp ON s.schema_name = sp.table_schema
GROUP BY 
    s.schema_name;
EOF

eval "$MYSQL_CMD" <<< "$query"
