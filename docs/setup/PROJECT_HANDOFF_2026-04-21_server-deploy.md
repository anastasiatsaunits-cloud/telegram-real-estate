# PROJECT HANDOFF — 2026-04-21 — Server-first deploy for telegram-real-estate

## Решение принято

Анастасия выбрала целевую архитектуру:
- **не** продолжать как основной путь связку Vercel + Render,
- **вынести весь проект на свой сервер**,
- использовать технический домен `flathouse-svc.ru`, который уже смотрит на наш сервер.

Целевой прод-контур теперь такой:
- `https://flathouse-svc.ru/` → miniapp frontend
- `https://flathouse-svc.ru/api/*` → backend API
- внутри сервера стек запускается через `docker compose`

## Целевая архитектура

### Внешний слой
- nginx на сервере
- один домен: `flathouse-svc.ru`

### Внутренний слой
Контейнеры:
- `miniapp` → `127.0.0.1:3000`
- `api` → `127.0.0.1:4000`
- `postgres`
- `redis`

### Маршрутизация
- `/` → miniapp
- `/_next/*` → miniapp
- `/api/*` → api

## Что уже есть в репозитории

Под эту схему уже подготовлены:
- `docker-compose.prod.yml`
- `apps/api/Dockerfile`
- `apps/miniapp/Dockerfile`
- `deploy/nginx/flathouse-svc.ru.conf.example`
- `deploy/env/api.env.example`
- `deploy/env/miniapp.env.example`
- `deploy/scripts/server-bootstrap.sh`
- `deploy/scripts/deploy-prod.sh`

То есть базовая прод-схема уже не гипотеза, а зафиксирована в кодовой базе.

## Что подтверждено по коду

### API
- слушает `0.0.0.0:4000`
- имеет `/api/health`
- использует `DATABASE_URL`
- импорт/инициализация заведены через `ImportController`

Endpoints:
- `POST /api/import/apply-schema`
- `POST /api/import/n93-curated`

Оба требуют `IMPORT_SECRET`.

### Miniapp
- ожидает backend на `API_URL` / `BACKEND_API_URL`
- пользовательский фронт должен использовать публичный URL:
  - `NEXT_PUBLIC_API_URL=https://flathouse-svc.ru/api`
- server-side proxy miniapp может ходить во внутренний контейнерный адрес:
  - `http://api:4000/api`

## Критические технические факты

Перед первым боевым запуском нельзя забыть 2 вещи:

1. **IMPORT_SECRET**
   - без него не получится легально вызвать schema/data import endpoints

2. **Инициализация БД после старта контейнеров**
   - поднять контейнеры недостаточно
   - нужно отдельно:
     - применить SQL-схему
     - загрузить стартовые объекты в БД

Иначе frontend поднимется, но каталог будет пустой или backend будет неполным.

## Новый основной путь развёртки

Это теперь основной порядок действий, который надо выполнять в новом чате.

### Этап 1. Подготовить сервер
1. Подключиться к серверу.
2. Проверить домен `flathouse-svc.ru` и текущий nginx.
3. Установить Docker Engine + docker compose plugin, если ещё не стоят.
4. Создать рабочую папку проекта, например:
   - `/opt/telegram-real-estate`

### Этап 2. Разместить проект на сервере
5. Клонировать репозиторий `telegram-real-estate` на сервер.
6. Перейти в каталог проекта.
7. Создать production env-файлы:
   - `deploy/env/api.env`
   - `deploy/env/miniapp.env`

### Этап 3. Заполнить env
8. В `deploy/env/api.env` заполнить минимум:
   - `NODE_ENV=production`
   - `PORT=4000`
   - `APP_URL=https://flathouse-svc.ru`
   - `MINIAPP_URL=https://flathouse-svc.ru`
   - `CORS_ORIGINS=https://flathouse-svc.ru,https://www.flathouse-svc.ru`
   - `API_URL=https://flathouse-svc.ru/api`
   - `DATABASE_URL=postgresql://...`
   - `REDIS_URL=redis://redis:6379`
   - `BITRIX24_WEBHOOK_URL=...`
   - `IMPORT_SECRET=...`

9. В `deploy/env/miniapp.env` заполнить:
   - `NEXT_PUBLIC_API_URL=https://flathouse-svc.ru/api`
   - `API_URL=http://api:4000/api`
   - `BACKEND_API_URL=http://api:4000/api`

### Этап 4. Поднять стек
10. Выполнить:
   - `bash deploy/scripts/deploy-prod.sh`
11. Убедиться, что контейнеры поднялись:
   - `postgres`
   - `redis`
   - `api`
   - `miniapp`

### Этап 5. Инициализировать backend и БД
12. Вызвать schema import с `IMPORT_SECRET`.
13. Затем вызвать импорт стартовых объектов (`n93-curated`).
14. Проверить, что `/api/properties` возвращает реальные данные.

### Этап 6. Подключить nginx
15. Положить и активировать nginx-конфиг для `flathouse-svc.ru`.
16. Проверить proxy на:
   - `127.0.0.1:3000`
   - `127.0.0.1:4000`
17. Если нужно, выпустить/подключить SSL.

### Этап 7. Smoke-check
18. Проверить:
   - `https://flathouse-svc.ru/`
   - `https://flathouse-svc.ru/api/health`
   - `https://flathouse-svc.ru/api/properties`
   - `https://flathouse-svc.ru/api/regions`
19. Открыть каталог и карточку объекта.
20. Убедиться, что фронт больше не зависит от Vercel/Render.

## Что делать в следующем чате

В следующем чате не обсуждать архитектуру заново.
Решение уже принято.

Начинать сразу с практики:
1. подключение к серверу,
2. установка Docker,
3. подготовка каталога проекта,
4. развёртывание контейнеров,
5. инициализация БД,
6. подключение nginx,
7. первый live smoke-check.

## Роль Vercel / Render после решения

- Vercel больше **не основной прод-контур**
- Render больше **не основной путь для backend**
- старые материалы про Vercel/Render остаются как исторический контекст, но не как актуальное решение

## Короткий статус на 2026-04-21

- продуктовая часть miniapp уже заметно продвинута
- repo синхронизирован с `origin/main`
- в репозитории уже есть production kit под VPS
- архитектурное решение принято: **server-first, all-in on our own server**
- следующий реальный шаг: **зайти на сервер и начать с Docker/bootstrap**
