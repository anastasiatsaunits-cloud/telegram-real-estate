#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

ok() { printf '✅ %s\n' "$1"; }
warn() { printf '⚠️  %s\n' "$1"; }
fail() { printf '❌ %s\n' "$1"; exit 1; }

[ -f package.json ] || fail 'Нет root package.json'
[ -f pnpm-workspace.yaml ] || fail 'Нет pnpm-workspace.yaml'
[ -f pnpm-lock.yaml ] || fail 'Нет pnpm-lock.yaml'
[ -d apps/api ] || fail 'Нет apps/api'
[ -d apps/miniapp ] || fail 'Нет apps/miniapp'
[ -f apps/miniapp/package.json ] || fail 'Нет apps/miniapp/package.json'
[ -f apps/miniapp/next.config.mjs ] || fail 'Нет apps/miniapp/next.config.mjs'
[ -f apps/api/prisma/schema.prisma ] || fail 'Нет apps/api/prisma/schema.prisma'

ok 'Базовая структура монорепы на месте'

command -v pnpm >/dev/null 2>&1 || fail 'pnpm не найден'
command -v node >/dev/null 2>&1 || fail 'node не найден'
command -v vercel >/dev/null 2>&1 || warn 'vercel CLI не найден'

ok 'Ключевые CLI доступны'

if grep -q 'output: .standalone' apps/miniapp/next.config.mjs || grep -q "output: 'standalone'" apps/miniapp/next.config.mjs; then
  ok 'standalone output включен в next.config.mjs'
else
  warn 'standalone output не найден в next.config.mjs'
fi

if grep -q 'turbopack' apps/miniapp/next.config.mjs; then
  ok 'turbopack.root задан'
else
  warn 'turbopack.root не найден'
fi

if [ -f apps/miniapp/.vercel/project.json ]; then
  ok '.vercel/project.json найден в miniapp'
else
  warn '.vercel/project.json не найден, vercel pull ещё не делали локально'
fi

WORKSPACE_TMP="${HOME}/.openclaw/workspace/tmp"

if [ -f "$WORKSPACE_TMP/render-api-key.txt" ]; then
  ok 'Render API key найден в workspace tmp/'
else
  warn 'workspace tmp/render-api-key.txt не найден'
fi

if [ -f "$WORKSPACE_TMP/vercel-token.txt" ]; then
  ok 'Vercel token найден в workspace tmp/'
else
  warn 'workspace tmp/vercel-token.txt не найден'
fi

printf '\nГотово. setup-check завершён.\n'
