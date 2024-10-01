#!/usr/bin/env bash

if [ "$#" -eq 0 ]; then
    ELK_URL='http://localhost:29200/_cat/health'
elif [ "$1" == '--prod' ]; then
    echo 'Not implemented for prod'
    exit 0
elif [ "$1" == '--tests' ]; then
    echo 'Not implemented for tests'
    exit 0
else
    echo 'Usage init-elk.sh [--prod | --tests]'
fi

try_connect(){
    echo 'Try to connect to ELK'
    curl -s "$ELK_URL" | grep green
}

# Make sure the ELK cluster is properly started before we start doing requests
while ! try_connect; do
    sleep 0.1
done

# TODO: Implement initializations partly done in src/libs/databases/elk.ts
# with createDataStream()

echo 'DONE init-elk'
