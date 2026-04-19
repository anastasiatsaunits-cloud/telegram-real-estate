# PROJECT HANDOFF — telegram-real-estate — 2026-04-19

## Что уже сделано

### 1. Репозиторий и структура
- проект живёт в отдельном repo: `anastasiatsaunits-cloud/telegram-real-estate`
- monorepo на pnpm
- apps:
  - `apps/miniapp`
  - `apps/bot`
  - `apps/api`

### 2. Miniapp
- miniapp публично задеплоена на Vercel
- рабочий URL:
  - `https://telegram-real-estate-miniapp.vercel.app`
- Vercel-проект выровнен до одного канонического project:
  - `telegram-real-estate-miniapp`
- root/build/install/output настройки выровнены и задокументированы
- home несколько раз переделана под тёмный premium-style каталоговый вход
- квиз больше не должен быть первым экраном, он открывается по CTA `Подобрать объект`

### 3. Bot
- живой бот: `@FlatHouse_mini_bot`
- в `/start` добавлен welcome-flow
- menu button на miniapp прописан через Bot API
- description/short description бота обновлены через Bot API
- в welcome встроен рендер (`apps/bot/welcome-render.jpg`)

### 4. API / backend
- `apps/api` подготовлен к Render:
  - слушает `PORT`
  - `0.0.0.0`
  - build включает `prisma generate`
  - есть `start:prod`
  - есть `.env.example`
- backend локально собирается
- инструкция для Render есть

## Что ещё НЕ готово

### 1. Home ещё не финальная
Анастасия несколько раз отметила, что home всё ещё не дотягивает до референса.
Ключевые замечания:
- визуал должен быть ближе к конкуренту
- нужен сильный lifestyle/luxury эффект
- hero-card объекта должна быть центральной и убедительной
- welcome в боте тоже ещё можно усиливать

### 2. Backend ещё не публичный
- Render deploy path подготовлен, но не завершён
- Render API key пока не получен
- без публичного backend miniapp не станет полностью боевой по данным/лидам

## Что уже задокументировано
- `docs/setup/VERCEL_AGENT_WORKFLOW.md`
- `docs/setup/RENDER_API_DEPLOY.md`
- `docs/setup/BOT_WELCOME_REFERENCE.md`
- workspace note: `/Users/anastasiatsaunits/.openclaw/workspace/VERCEL.md`
- workspace note: `/Users/anastasiatsaunits/.openclaw/workspace/RENDER.md`

## Важные токены / секреты
Секреты НЕ в git.
Они хранятся только локально в workspace tmp/secrets.
Ничего из токенов не коммитить.

## Следующие шаги

### Блок A — сначала продукт
1. ещё один проход по home screen
2. добить визуал ближе к референсам, которые Анастасия присылала
3. если нужно — заменить welcome render у бота на более сильный lifestyle-вариант

### Блок B — потом backend
1. получить Render API key от Анастасии
2. создать Render Web Service для `apps/api`
3. создать Render Postgres
4. прописать `DATABASE_URL`
5. проверить `/api/health`
6. обновить miniapp env на публичный backend URL
7. redeploy miniapp

## Важные UX-правила от Анастасии
- не делать техничный язык
- не показывать MVP/backend/slug/девелоперские слова пользователю
- делать визуал как у конкурентов или лучше
- сначала красивый каталоговый вход, потом уже подбор

## Короткий статус для нового чата
- miniapp и bot уже живы
- Vercel настроен и работает
- backend подготовлен к Render, но ещё не задеплоен
- следующий реальный шаг: либо ещё один UI polish home, либо сразу Render API key и деплой backend
