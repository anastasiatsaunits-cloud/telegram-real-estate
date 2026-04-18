# Vercel deploy for miniapp

## Что деплоим
- только `apps/miniapp`

## Рекомендуемая схема в Vercel
При создании проекта:
- Import Git Repository
- Root Directory: `apps/miniapp`
- Framework Preset: `Next.js`

## Build settings
Если Vercel сама не определит:
- Install Command:
```bash
cd ../.. && pnpm install --no-frozen-lockfile
```
- Build Command:
```bash
cd ../.. && pnpm --filter miniapp build
```

## Environment Variables
Добавить в Vercel:
```bash
NEXT_PUBLIC_API_URL=<публичный URL backend/api>
```

На текущем этапе miniapp зависит от backend, поэтому для боевого открытия из Telegram нужен не только публичный URL miniapp, но и публичный URL API.

## Что уже готово
- miniapp готова к deploy как Next app
- локальная логика и pages router работают
- bot wiring уже есть

## Важно
Если backend остаётся локальным, miniapp на Vercel не сможет ходить в `localhost:4000`.
Значит для реального боевого сценария нужно также:
1. либо деплоить backend,
2. либо дать backend публичный HTTPS URL.

## Следующий шаг после Vercel
- получить публичный URL miniapp
- подставить его в `TELEGRAM_WEBAPP_URL`
- после этого уже подключать bot/webapp open flow
