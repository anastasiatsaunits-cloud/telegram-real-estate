# Bot + Mini App setup

## Что уже реализовано
- `/start` в Telegram-боте
- кнопка `Открыть каталог`
- кнопка `Подобрать объект`
- WebApp-кнопка ведёт в mini app URL из env

## Нужные переменные
Добавить в `.env` или в окружение:

```bash
TELEGRAM_BOT_TOKEN=...
TELEGRAM_WEBAPP_URL=http://localhost:3000
```

## Локальный запуск

### Bot
```bash
cd apps/bot
TELEGRAM_BOT_TOKEN=... TELEGRAM_WEBAPP_URL=http://localhost:3000 pnpm dev
```

### Mini App
```bash
cd apps/miniapp
pnpm dev
```

### API
```bash
cd apps/api
pnpm start
```

## Важно
Для реального открытия mini app внутри Telegram нужен публичный HTTPS URL.
Локальный `http://localhost:3000` подходит для разработки и локальной проверки структуры, но не как финальный боевой URL внутри Telegram.

## Следующий инфраструктурный шаг
Поднять публичный HTTPS URL для mini app и прописать его в:
- `TELEGRAM_WEBAPP_URL`
- BotFather / menu button / web app button
