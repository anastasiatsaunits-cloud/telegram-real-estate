# Production deploy for flathouse-svc.ru

## Что нужно на сервере один раз
1. Ubuntu-сервер с nginx
2. Docker Engine + docker compose plugin
3. Каталог проекта, например `/opt/telegram-real-estate`
4. DNS домена `flathouse-svc.ru` на этот сервер

## Что лежит в git
- `apps/api/Dockerfile`
- `apps/miniapp/Dockerfile`
- `docker-compose.prod.yml`
- `deploy/env/*.example`
- `deploy/nginx/flathouse-svc.ru.conf.example`
- `deploy/scripts/server-bootstrap.sh`
- `deploy/scripts/deploy-prod.sh`

## Первый запуск
1. Установить Docker: `bash deploy/scripts/server-bootstrap.sh`
2. Скопировать env:
   - `cp deploy/env/api.env.example deploy/env/api.env`
   - `cp deploy/env/miniapp.env.example deploy/env/miniapp.env`
3. При необходимости скорректировать пароли/Postgres webhook.
4. Запустить: `bash deploy/scripts/deploy-prod.sh`
5. Положить nginx-конфиг из `deploy/nginx/flathouse-svc.ru.conf.example`
6. Проверить:
   - `https://flathouse-svc.ru`
   - `https://flathouse-svc.ru/api/health`
   - `https://flathouse-svc.ru/api/properties`

## Что важно
- Docker сам по себе не трогает другие сайты.
- Риск появляется только если занять те же порты 80/443 напрямую контейнерами. Здесь этого нет: контейнеры слушают только `127.0.0.1:3000` и `127.0.0.1:4000`.
- Внешний вход остаётся через текущий nginx.
- При 20 ГБ свободного места этот стек поместится, но хранить лишние старые образы не стоит.
