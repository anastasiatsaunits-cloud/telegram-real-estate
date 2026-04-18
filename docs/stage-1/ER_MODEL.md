# ER Model

## 1. Цель

Описать минимальную модель данных для MVP Telegram-бота и Mini App каталога недвижимости.

---

## 2. Основные сущности

- users
- telegram_profiles
- sessions
- quiz_answers
- regions
- properties
- property_media
- property_metrics
- leads
- applications
- events

---

## 3. Таблицы

## users

### Назначение
Основной пользователь продукта.

### Поля
- `id`
- `full_name`
- `phone`
- `created_at`
- `updated_at`

---

## telegram_profiles

### Назначение
Привязка пользователя к Telegram.

### Поля
- `id`
- `user_id`
- `telegram_id`
- `username`
- `first_name`
- `last_name`
- `language_code`
- `created_at`

### Связи
- many-to-one → users

---

## sessions

### Назначение
Сессия пользователя внутри bot + mini app.

### Поля
- `id`
- `user_id`
- `telegram_profile_id`
- `source`
- `utm_source`
- `utm_campaign`
- `funnel_stage`
- `started_at`
- `last_seen_at`

### Связи
- many-to-one → users
- many-to-one → telegram_profiles

---

## quiz_answers

### Назначение
Хранение ответов квиза.

### Поля
- `id`
- `session_id`
- `user_id`
- `question_key`
- `answer_value`
- `created_at`

### Связи
- many-to-one → sessions
- many-to-one → users

---

## regions

### Назначение
Справочник регионов.

### Поля
- `id`
- `name`
- `slug`
- `is_active`
- `sort_order`

---

## properties

### Назначение
Основная карточка объекта недвижимости.

### Поля
- `id`
- `region_id`
- `title`
- `slug`
- `city`
- `address`
- `price_from`
- `price_to`
- `currency`
- `area_from`
- `area_to`
- `property_type`
- `status`
- `description`
- `purchase_options_json`
- `is_active`
- `created_at`
- `updated_at`

### Связи
- many-to-one → regions

---

## property_media

### Назначение
Фото и медиа объекта.

### Поля
- `id`
- `property_id`
- `media_type`
- `url`
- `sort_order`
- `created_at`

### Связи
- many-to-one → properties

---

## property_metrics

### Назначение
Инвестиционные показатели объекта.

### Поля
- `id`
- `property_id`
- `rental_yield`
- `short_term_yield`
- `annual_growth`
- `roi_5y`
- `roi_10y`
- `alternative_total`
- `payload_json`
- `updated_at`

### Связи
- one-to-one → properties

---

## leads

### Назначение
Лид после захвата телефона или заявки.

### Поля
- `id`
- `user_id`
- `session_id`
- `phone`
- `region_interest`
- `budget_range`
- `purchase_term`
- `source`
- `crm_id`
- `status`
- `created_at`

### Связи
- many-to-one → users
- many-to-one → sessions

---

## applications

### Назначение
Конкретная заявка на объект или консультацию.

### Поля
- `id`
- `lead_id`
- `property_id`
- `application_type`
- `comment`
- `created_at`

### Связи
- many-to-one → leads
- many-to-one → properties

---

## events

### Назначение
События аналитики.

### Поля
- `id`
- `user_id`
- `session_id`
- `event_name`
- `payload_json`
- `created_at`

### Связи
- many-to-one → users
- many-to-one → sessions

---

## 4. Логические связи

```text
users
  └── telegram_profiles
  └── sessions
        └── quiz_answers
        └── leads
        └── events

regions
  └── properties
        └── property_media
        └── property_metrics
        └── applications

leads
  └── applications
```

---

## 5. Минимальные индексы

### users
- index on `phone`

### telegram_profiles
- unique index on `telegram_id`
- index on `user_id`

### sessions
- index on `user_id`
- index on `telegram_profile_id`
- index on `funnel_stage`

### quiz_answers
- index on `session_id`
- index on `user_id`
- index on `question_key`

### properties
- index on `region_id`
- index on `slug`
- index on `is_active`
- index on `price_from`

### property_media
- index on `property_id`

### property_metrics
- unique index on `property_id`

### leads
- index on `user_id`
- index on `session_id`
- index on `crm_id`
- index on `status`

### applications
- index on `lead_id`
- index on `property_id`

### events
- index on `user_id`
- index on `session_id`
- index on `event_name`

---

## 6. Что можно добавить на v2

- favorites
- compare_lists
- pdf_requests
- managers
- crm_sync_logs
- recommendation_results
- content_blocks
- developers
- cities
- tags
- property_features

---

## 7. Итог

Этой ER-модели достаточно, чтобы запустить MVP:
- пользователь,
- Telegram-профиль,
- сессия,
- ответы квиза,
- каталог объектов,
- метрики,
- лиды,
- заявки,
- события аналитики.

Следующий логичный шаг после этого документа: описать SQL schema draft или Prisma schema.
