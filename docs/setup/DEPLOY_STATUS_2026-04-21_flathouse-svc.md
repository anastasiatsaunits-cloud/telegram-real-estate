# Deploy status — 2026-04-21

## Commit
- App repo deployed from commit `6328644` (`fix(docker): isolate api and miniapp image builds`)

## Done
1. Docker installed on server
2. Clean git-first deploy from GitHub to `/opt/telegram-real-estate`
3. Containers started:
   - postgres
   - redis
   - api
   - miniapp
4. Database initialized from:
   - `apps/api/prisma/render_init.sql`
   - `apps/api/prisma/seed.sql`
5. Existing ISPmanager vhost for `flathouse-svc.ru` switched:
   - `/api/` -> `127.0.0.1:4000`
   - `/` -> `127.0.0.1:3000`

## Smoke check
- `https://flathouse-svc.ru/api/health` -> `{"status":"ok"}`
- `https://flathouse-svc.ru/` -> `HTTP/2 200`, Next.js response

## Backups created on server
- `/etc/nginx/vhosts/www-root/flathouse-svc.ru.conf.bak_20260421_1342`
- `/etc/nginx/vhosts/www-root/flathouse-svc.ru-ssl.conf.bak_20260421_1342`

## Notes
- Main blocker during deploy was macOS metadata / dot-underscore garbage affecting server build context.
- Switched both app images to isolated Docker builds.
- Final successful path was: commit -> push -> clean git clone on server -> compose build/up -> db init/seed -> vhost patch.
