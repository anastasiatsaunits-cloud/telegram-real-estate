# Vercel agent workflow

## Канонический проект
Для miniapp использовать только project:
- `telegram-real-estate-miniapp`

## Почему
Ранее случайно появился второй проект `telegram-real-estate`, что привело к путанице с protection, alias и production URLs.

## Настройки проекта
- Team slug: `anastasia-s-projects-7f7b2e61`
- Project id: `prj_7XMsS5FctHESQCofGIo34zFiR1hH`
- Root directory: `apps/miniapp`
- Framework: `nextjs`
- Install command: `cd ../.. && pnpm install --no-frozen-lockfile`
- Build command: `cd ../.. && pnpm --filter miniapp build`
- Output directory: `.next`

## CLI path
Запускать deploy из корня репозитория:
```bash
cd /Users/anastasiatsaunits/.openclaw/workspace/projects/telegram-real-estate
vercel deploy --prod --yes --token "$VERCEL_TOKEN"
```

## API path
Полезные endpoints:
- PATCH `/v9/projects/{idOrName}` для update project settings
- PATCH `/v1/projects/{idOrName}/protection-bypass` для automation bypass

## Полезные ссылки
- https://vercel.com/docs/deployment-protection
- https://vercel.com/docs/deployment-protection/automated-agent-access
- https://vercel.com/docs/rest-api/projects/update-an-existing-project
- https://vercel.com/docs/rest-api/projects/update-protection-bypass-for-automation

## Статус на 2026-04-19
- проект выровнен на один канонический Vercel project
- настройки проекта обновлены через API
- bypass secret создан через API
- production deploy уже идёт в правильный project, но последний ответ Vercel был `Unexpected error`, то есть это уже отдельный runtime/platform issue, не rootDirectory misconfig
