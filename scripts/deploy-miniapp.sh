#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
APP="$ROOT/apps/miniapp"
cd "$APP"

if ! command -v vercel >/dev/null 2>&1; then
  echo 'vercel CLI не найден' >&2
  exit 1
fi

TOKEN_FILE="${HOME}/.openclaw/workspace/tmp/vercel-token.txt"
if [ ! -f "$TOKEN_FILE" ]; then
  echo 'workspace tmp/vercel-token.txt не найден' >&2
  exit 1
fi

VERCEL_TOKEN="$(python3 - <<PY
import re, pathlib
text = pathlib.Path(r'''$TOKEN_FILE''').read_text()
print(re.search(r'VERCEL_TOKEN=(\\S+)', text).group(1))
PY
)"
export VERCEL_TOKEN

vercel pull --yes --environment=production --token "$VERCEL_TOKEN"
pnpm build

echo 'Miniapp локально собран. Для production deploy проверь текущие Vercel project settings, затем запускай redeploy через Vercel.'
