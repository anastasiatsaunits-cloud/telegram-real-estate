# Deploy runbook

## API / Render

1. Проверить проект:
   - `./scripts/setup-check.sh`
2. Проверить сборку API:
   - `pnpm --filter api build`
3. Commit + push в `main`
4. Trigger Render deploy
5. Проверить:
   - `/api/health`
   - `/api/properties`
   - `/api/regions`

## Miniapp / Vercel

1. Проверить проект:
   - `./scripts/setup-check.sh`
2. Проверить сборку miniapp:
   - `pnpm --filter miniapp build`
3. Commit + push в `main`
4. Проверить Vercel project settings:
   - rootDirectory = `apps/miniapp`
   - installCommand = `pnpm install`
   - buildCommand = `pnpm build`
   - outputDirectory = `.next`
5. Trigger production redeploy
6. Проверить:
   - `/api/properties`
   - `/api/regions-proxy`
   - `/`

## Smoke check

- `./scripts/smoke-check.sh`

## Rollback

Если новая выкладка ломает витрину:
1. Откатить Vercel на предыдущий working deployment
2. Откатить Render на предыдущий working deploy
3. Запустить smoke-check повторно
