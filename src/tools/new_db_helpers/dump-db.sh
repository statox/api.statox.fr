#!/usr/bin/env bash

SCRIPTPATH="$( cd -- "$(dirname "$0")" >/dev/null 2>&1 ; pwd -P )"

BACKUP_FILE="./backup_$(date +%y_%m_%d-%H_%M).gz"
TMP_BACKUP_FILE='./backup_tmp.sql'

source "$SCRIPTPATH/set-db-creds.sh" "$1"

echo "Got creds. Dumping DB"

# --compress is used only in transit between client and server
# docker exec apistatox.mysql /usr/bin/mysqldump --compress -h "$host" -u "$user" --password="$password" --no-tablespaces "$db" >  "$TMP_BACKUP_FILE"
# docker exec apistatox.mysql /usr/bin/mysqldump -h "$host" -u "$user" --password="$password" --no-tablespaces --compression-algorithms=zlib "$db" >  "$TMP_BACKUP_FILE"
docker exec apistatox.mysql /usr/bin/mysqldump -h "$host" -u "$user" --password="$password" --no-tablespaces "$db" >  "$TMP_BACKUP_FILE"

gzip -c "$TMP_BACKUP_FILE" > "$BACKUP_FILE"
rm "$TMP_BACKUP_FILE"
