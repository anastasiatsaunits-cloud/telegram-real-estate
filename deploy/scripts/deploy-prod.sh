#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR=${ROOT_DIR:-/opt/telegram-real-estate}
cd "$ROOT_DIR"

if [ ! -f deploy/env/api.env ] || [ ! -f deploy/env/miniapp.env ]; then
  echo "Missing deploy/env/api.env or deploy/env/miniapp.env"
  exit 1
fi

docker compose -f docker-compose.prod.yml up -d --build

docker compose -f docker-compose.prod.yml ps
