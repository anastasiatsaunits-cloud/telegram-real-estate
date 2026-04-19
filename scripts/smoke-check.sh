#!/usr/bin/env bash
set -euo pipefail

API_URL="${API_URL:-https://telegram-real-estate-api.onrender.com/api}"
MINIAPP_URL="${MINIAPP_URL:-https://telegram-real-estate-miniapp.vercel.app}"

check_json() {
  local name="$1"
  local url="$2"
  printf '\n== %s ==\n' "$name"
  curl -fsSL "$url" | python3 -m json.tool | head -60
}

check_head() {
  local name="$1"
  local url="$2"
  printf '\n== %s ==\n' "$name"
  curl -I -sS "$url" | head -20
}

check_json 'Render health' "$API_URL/health"
check_json 'Render properties' "$API_URL/properties"
check_json 'Render regions' "$API_URL/regions"
check_json 'Miniapp properties proxy' "$MINIAPP_URL/api/properties"
check_json 'Miniapp regions proxy' "$MINIAPP_URL/api/regions-proxy"
check_head 'Miniapp home' "$MINIAPP_URL/"

printf '\nSmoke-check завершён.\n'
