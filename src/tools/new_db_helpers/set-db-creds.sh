#!/usr/bin/env bash

if [ "$#" -eq 0 ] || [ -z "$1" ]; then
    echo "Returning creds for local"
    export user="root"
    export password="example"
    export host="127.0.0.1"
    export port="23306"
    export db="db"
    return 0
fi

if [ "$1" == '--tests' ]; then
    echo "Returning creds for tests"
    export user="root"
    export password="example"
    export host="127.0.0.1"
    export port="23306"
    return 0
fi

if [ "$1" == '--new-prod' ]; then
    echo "Returning creds for new-prod"
    EXPECTED_USER="me@statox.fr"
    CONNECTED_USER=$(npx heroku whoami)

    if [ "$CONNECTED_USER" != "$EXPECTED_USER" ]; then
        echo "User not logged in. Use 'npm run heroku:login'"
        return 1
    fi

    URL=$(npx heroku config:get APIDB_URL)

    # mysql://[user]:[password]@[host]:[port]/[db]
    DATA_STR=$(echo "$URL" | sed -E 's;mysql://(.*):(.*)@(.*):(.*)/(.*);\1 \2 \3 \4 \5;')

    export user=$(echo "$DATA_STR" | cut -d ' ' -f1)
    export password=$(echo "$DATA_STR" | cut -d ' ' -f2)
    export host=$(echo "$DATA_STR" | cut -d ' ' -f3)
    export port=$(echo "$DATA_STR" | cut -d ' ' -f4)
    export db=$(echo "$DATA_STR" | cut -d ' ' -f5)

    return 0
fi

if [ "$1" == '--prod' ]; then
    echo "Returning creds for prod"
    EXPECTED_USER="me@statox.fr"
    CONNECTED_USER=$(npx heroku whoami)

    if [ "$CONNECTED_USER" != "$EXPECTED_USER" ]; then
        echo "User not logged in. Use 'npm run heroku:login'"
        return 1
    fi

    URL=$(npx heroku config:get JAWSDB_URL)

    # mysql://[user]:[password]@[host]:[port]/[db]
    DATA_STR=$(echo "$URL" | sed -E 's;mysql://(.*):(.*)@(.*):(.*)/(.*);\1 \2 \3 \4 \5;')

    export user=$(echo "$DATA_STR" | cut -d ' ' -f1)
    export password=$(echo "$DATA_STR" | cut -d ' ' -f2)
    export host=$(echo "$DATA_STR" | cut -d ' ' -f3)
    export port=$(echo "$DATA_STR" | cut -d ' ' -f4)
    export db=$(echo "$DATA_STR" | cut -d ' ' -f5)

    return 0
fi

echo 'Usage set-db-creds.sh [--prod | --new-prod | --tests]'
return 1
