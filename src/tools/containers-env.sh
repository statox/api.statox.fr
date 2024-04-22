#!/usr/bin/env bash

COMPOSE_FILE='src/tools/docker-compose.yml'
COMPOSE=''

if command -v podman-compose &>/dev/null; then
    COMPOSE='podman-compose'
elif command -v docker-compose &>/dev/null; then
    COMPOSE='docker-compose'
else
    echo "Neither podman-compose nor docker-compose were found on this system" >&2
    exit 1
fi

CMD=''
case "$1" in
    up)
        CMD='up -d'
        ;;
    down)
        CMD='down'
        ;;
    *)
        echo "Error: unknown argument $1" >&2
        exit 1
        ;;
esac

"$COMPOSE" -f "$COMPOSE_FILE" ${CMD}
