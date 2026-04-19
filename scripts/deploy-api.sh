#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

if ! command -v pnpm >/dev/null 2>&1; then
  echo 'pnpm не найден' >&2
  exit 1
fi

pnpm --filter api build

git add apps/api docs/setup apps/api/prisma scripts || true

echo 'API build completed. Дальше: commit/push и Render deploy через Git integration или API.'
