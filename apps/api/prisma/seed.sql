INSERT INTO "Region" ("id", "name", "slug", "isActive", "sortOrder")
VALUES
  ('region_crimea', 'Крым', 'crimea', true, 1),
  ('region_sochi', 'Сочи', 'sochi', true, 2),
  ('region_dubai', 'Дубай', 'dubai', true, 3),
  ('region_thailand', 'Таиланд', 'thailand', true, 4)
ON CONFLICT ("slug") DO UPDATE SET
  "name" = EXCLUDED."name",
  "isActive" = EXCLUDED."isActive",
  "sortOrder" = EXCLUDED."sortOrder";

INSERT INTO "User" ("id", "fullName", "phone", "createdAt", "updatedAt")
VALUES
  ('user_seed_demo', 'Demo User', '+79990000000', NOW(), NOW())
ON CONFLICT ("id") DO UPDATE SET
  "fullName" = EXCLUDED."fullName",
  "phone" = EXCLUDED."phone",
  "updatedAt" = NOW();

INSERT INTO "TelegramProfile" ("id", "userId", "telegramId", "username", "firstName", "lastName", "languageCode", "createdAt")
VALUES
  ('tg_seed_demo', 'user_seed_demo', 'seed-demo-telegram', 'demo_user', 'Demo', 'User', 'ru', NOW())
ON CONFLICT ("telegramId") DO UPDATE SET
  "userId" = EXCLUDED."userId",
  "username" = EXCLUDED."username",
  "firstName" = EXCLUDED."firstName",
  "lastName" = EXCLUDED."lastName",
  "languageCode" = EXCLUDED."languageCode";

INSERT INTO "Session" ("id", "userId", "telegramProfileId", "source", "utmSource", "utmCampaign", "funnelStage", "startedAt", "lastSeenAt")
VALUES
  ('session_seed_demo', 'user_seed_demo', 'tg_seed_demo', 'seed', 'seed', 'mvp', 'BOT_STARTED', NOW(), NOW())
ON CONFLICT ("id") DO UPDATE SET
  "userId" = EXCLUDED."userId",
  "telegramProfileId" = EXCLUDED."telegramProfileId",
  "source" = EXCLUDED."source",
  "utmSource" = EXCLUDED."utmSource",
  "utmCampaign" = EXCLUDED."utmCampaign",
  "funnelStage" = EXCLUDED."funnelStage",
  "lastSeenAt" = NOW();

INSERT INTO "Property" (
  "id", "regionId", "title", "slug", "city", "address", "priceFrom", "priceTo", "currency",
  "areaFrom", "areaTo", "propertyType", "status", "description", "purchaseOptionsJson", "isActive", "createdAt", "updatedAt"
)
VALUES
  (
    'property_crimea_studio', 'region_crimea', 'Студия у моря, Крым', 'studio-u-morya-crimea', 'Евпатория', 'Евпатория, 10 минут до моря',
    4700000.00, 5200000.00, 'RUB', 24.00, 29.00, 'studio', 'active',
    'Тестовый объект для бюджетной подборки по Крыму.',
    '["Рассрочка", "100% оплата"]'::jsonb,
    true, NOW(), NOW()
  ),
  (
    'property_crimea_apart', 'region_crimea', 'Апартаменты, Крым', 'apartments-crimea-invest', 'Алушта', 'Алушта, курортная зона',
    8900000.00, 9600000.00, 'RUB', 36.00, 44.00, 'apartment', 'active',
    'Тестовый объект для диапазона до 10 млн по Крыму.',
    '["Ипотека", "Рассрочка"]'::jsonb,
    true, NOW(), NOW()
  ),
  (
    'property_crimea_villa', 'region_crimea', 'Вилла у моря, Крым', 'villa-u-morya-crimea', 'Ялта', 'Ялта, первая линия',
    12500000.00, 15800000.00, 'RUB', 48.00, 72.00, 'villa', 'active',
    'Тестовый объект для MVP-проверки каталога и лида.',
    '["Ипотека", "Рассрочка", "100% оплата"]'::jsonb,
    true, NOW(), NOW()
  ),
  (
    'property_sochi_invest', 'region_sochi', 'Инвест-апартаменты, Сочи', 'invest-apartments-sochi', 'Сочи', 'Сочи, центр',
    9800000.00, 12100000.00, 'RUB', 32.00, 45.00, 'apartment', 'active',
    'Тестовый объект для выдачи properties и карточки по slug.',
    '["Ипотека", "100% оплата"]'::jsonb,
    true, NOW(), NOW()
  ),
  (
    'property_sochi_premium', 'region_sochi', 'Премиум-резиденция, Сочи', 'premium-residence-sochi', 'Сочи', 'Сочи, первая береговая линия',
    21800000.00, 28900000.00, 'RUB', 54.00, 88.00, 'residence', 'active',
    'Тестовый объект под диапазон 20+ млн.',
    '["100% оплата"]'::jsonb,
    true, NOW(), NOW()
  )
ON CONFLICT ("slug") DO UPDATE SET
  "title" = EXCLUDED."title",
  "city" = EXCLUDED."city",
  "address" = EXCLUDED."address",
  "priceFrom" = EXCLUDED."priceFrom",
  "priceTo" = EXCLUDED."priceTo",
  "currency" = EXCLUDED."currency",
  "areaFrom" = EXCLUDED."areaFrom",
  "areaTo" = EXCLUDED."areaTo",
  "propertyType" = EXCLUDED."propertyType",
  "status" = EXCLUDED."status",
  "description" = EXCLUDED."description",
  "purchaseOptionsJson" = EXCLUDED."purchaseOptionsJson",
  "isActive" = EXCLUDED."isActive",
  "updatedAt" = NOW();

INSERT INTO "PropertyMetric" (
  "id", "propertyId", "rentalYield", "shortTermYield", "annualGrowth", "roi5y", "roi10y", "alternativeTotal", "payloadJson", "updatedAt"
)
VALUES
  (
    'metric_crimea_studio', 'property_crimea_studio', 6.80, 9.20, 10.50, 41.00, 97.00, 9100000.00,
    '{"note":"seed metric"}'::jsonb, NOW()
  ),
  (
    'metric_crimea_apart', 'property_crimea_apart', 7.40, 10.10, 11.20, 49.00, 118.00, 16400000.00,
    '{"note":"seed metric"}'::jsonb, NOW()
  ),
  (
    'metric_crimea_villa', 'property_crimea_villa', 8.50, 12.00, 14.50, 62.00, 148.00, 28600000.00,
    '{"note":"seed metric"}'::jsonb, NOW()
  ),
  (
    'metric_sochi_invest', 'property_sochi_invest', 7.20, 10.30, 11.80, 54.00, 131.00, 21900000.00,
    '{"note":"seed metric"}'::jsonb, NOW()
  ),
  (
    'metric_sochi_premium', 'property_sochi_premium', 9.10, 12.40, 15.30, 66.00, 159.00, 47200000.00,
    '{"note":"seed metric"}'::jsonb, NOW()
  )
ON CONFLICT ("propertyId") DO UPDATE SET
  "rentalYield" = EXCLUDED."rentalYield",
  "shortTermYield" = EXCLUDED."shortTermYield",
  "annualGrowth" = EXCLUDED."annualGrowth",
  "roi5y" = EXCLUDED."roi5y",
  "roi10y" = EXCLUDED."roi10y",
  "alternativeTotal" = EXCLUDED."alternativeTotal",
  "payloadJson" = EXCLUDED."payloadJson",
  "updatedAt" = NOW();
