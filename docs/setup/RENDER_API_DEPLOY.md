# Render deploy for backend API

## Что деплоим
- `apps/api` как Web Service

## Почему Render
- простой старт для NestJS
- есть Hobby tier
- подходит для обычного `PORT`-based Node backend

## Root Directory
`apps/api`

## Build Command
```bash
cd ../.. && pnpm install --no-frozen-lockfile && pnpm --filter api build
```

## Start Command
```bash
cd ../.. && pnpm --filter api start:prod
```

## Environment Variables
Добавить в Render:
```bash
NODE_ENV=production
APP_URL=https://telegram-real-estate-miniapp.vercel.app
API_URL=https://<your-render-service>.onrender.com/api
DATABASE_URL=<render-postgres-url>
BITRIX24_WEBHOOK_URL=<optional>
```

## Обязательные замечания
- backend должен слушать `PORT`, это уже исправлено в коде
- Prisma generate уже встроен в build/postinstall
- после появления публичного URL backend нужно обновить miniapp env:
  - `NEXT_PUBLIC_API_URL=https://<your-render-service>.onrender.com/api`

## Минимальный боевой путь
1. создать Render Web Service из GitHub repo
2. Root Directory = `apps/api`
3. выставить Build/Start commands
4. создать Render Postgres
5. вставить `DATABASE_URL`
6. открыть `https://.../api/health`
7. потом обновить miniapp на Vercel
