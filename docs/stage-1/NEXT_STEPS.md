# Stage 1: ближайшие шаги

## Цель этапа
Собрать фундамент проекта, чтобы сразу перейти к нормальной разработке без хаоса.

## Уже сделано
- создан отдельный GitHub-репозиторий
- создан локальный проект
- создан базовый monorepo-каркас
- оформлена архитектура и roadmap

## Следующие шаги

### 1. Установка инструментов
- установить `pnpm`
- проверить `docker`

### 2. Продуктовые документы
- `MVP_SPEC.md`
- `SCREEN_FLOW.md`
- `ER_MODEL.md`
- `API_MODULES.md`

### 3. Технический bootstrap
- miniapp: Next.js + TypeScript + Tailwind
- api: NestJS
- bot: Node.js + grammY
- shared-types: базовые DTO и контракты

### 4. Базовая инфраструктура
- PostgreSQL
- Redis
- `.env.example`
- docker-compose.yml

### 5. Начало реализации MVP
- `/start`
- open mini app
- 3 шага квиза
- экран результата
- форма телефона
- lead capture

## Решение по стеку
- package manager: `pnpm`
- miniapp: `Next.js`
- api: `NestJS`
- bot: `grammY`
- db: `PostgreSQL`
- queues/cache: `Redis`
