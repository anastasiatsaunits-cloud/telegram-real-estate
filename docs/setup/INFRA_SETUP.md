# Infra Setup

## Что входит в локальную инфраструктуру
- PostgreSQL
- Redis

## Быстрый старт

### 1. Создать локальный env
```bash
cp .env.example .env
```

### 2. Поднять контейнеры
```bash
docker compose up -d
```

### 3. Проверить контейнеры
```bash
docker compose ps
```

### 4. Остановить контейнеры
```bash
docker compose down
```

---

## Порты по умолчанию
- Mini App: `3000`
- API: `4000`
- PostgreSQL: `5432`
- Redis: `6379`

---

## Подключение к PostgreSQL
```bash
postgresql://postgres:postgres@localhost:5432/telegram_real_estate
```

## Подключение к Redis
```bash
redis://localhost:6379
```

---

## Что сделать дальше
После старта infra:
1. подключить ORM
2. создать первую schema/migration
3. подключить API к PostgreSQL
4. подключить Redis для очередей и фоновых задач
