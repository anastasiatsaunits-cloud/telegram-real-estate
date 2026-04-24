INSERT INTO "Region" ("id", "name", "slug", "isActive", "sortOrder")
VALUES ('region_mountains', 'Горный кластер', 'mountains', true, 4)
ON CONFLICT ("slug") DO UPDATE SET
  "name" = EXCLUDED."name",
  "isActive" = EXCLUDED."isActive",
  "sortOrder" = EXCLUDED."sortOrder";

INSERT INTO "Property" (
  "id", "regionId", "title", "slug", "city", "address", "priceFrom", "pricePerM2", "currency",
  "areaFrom", "areaTo", "areaText", "deadlineText", "objectType", "promoText", "propertyType", "status",
  "description", "purchaseOptionsJson", "isActive", "createdAt", "updatedAt"
)
VALUES
  (
    'property_mountains_polyana_pik',
    'region_mountains',
    'ГК Поляна Пик',
    'gk-polyana-pik',
    'Красная Поляна',
    'ул. Защитников Кавказа, 77, Красная Поляна',
    49455000.00,
    1050000.00,
    'RUB',
    45.00,
    142.30,
    '45.00 - 142.30 м²',
    '2 квартал 2025',
    'АК',
    'DoubleTree by Hilton 4*, SPA и премиальная курортная инфраструктура.',
    'apartment',
    'active',
    $$Поляна Пик объединяет сервисные апартаменты и курортную инфраструктуру в самом узнаваемом горном сценарии Красной Поляны. Здесь важны премиальная отделка, SPA, бассейн и формат, который одинаково хорошо работает и для личного использования, и для арендной стратегии.$$,
    '["Персональный расчёт", "Ипотека", "Рассрочка"]'::jsonb,
    true,
    NOW(),
    NOW()
  ),
  (
    'property_mountains_benefit_collection',
    'region_mountains',
    'Benefit Collection Sochi Chalet',
    'gk-benefit-collection-sochi-chalet-benefit-kollekshn',
    'Красная Поляна',
    'Сочи, Красная Поляна, Роза Хутор',
    45600000.00,
    1600000.00,
    'RUB',
    39.20,
    103.80,
    '39.2 - 103.8 м²',
    'Дом сдан',
    'АК',
    'Флагманский alpine-проект у Розы Хутор с термальным комплексом и премиальным сервисом.',
    'apartment',
    'active',
    $$Benefit Collection Sochi Chalet собран как премиальная горная резиденция, где главная ценность в атмосфере шале, панорамных видах и сильной сервисной составляющей. Это лот для клиента, которому нужен статусный mountain-продукт, а не просто апартаменты в Сочи.$$,
    '["Персональный расчёт", "Ипотека", "Рассрочка"]'::jsonb,
    true,
    NOW(),
    NOW()
  ),
  (
    'property_mountains_leeprime',
    'region_mountains',
    'LeePrime Residences Polyana Sochi',
    'ak-leeprime-residences-polyana-sochi-lipraym-rezidens-polyana-sochi-',
    'Эсто-Садок',
    'Большой Сочи, с. Эсто-Садок, набережная Полянка, 1',
    33830000.00,
    800000.00,
    'RUB',
    36.00,
    83.00,
    '36.00 - 83.00 м²',
    'Дом сдан',
    'АК',
    'Готовые сервисные апартаменты 5-звёздочного уровня рядом с Розой Хутор.',
    'apartment',
    'active',
    $$LeePrime Residences Polyana Sochi подходит тем, кто хочет войти в готовый premium-формат без ожидания стройки. Здесь сильны готовность, отделка, сервис и сценарий краткосрочной аренды в одной из самых ликвидных горных локаций.$$,
    '["Персональный расчёт", "100% оплата"]'::jsonb,
    true,
    NOW(),
    NOW()
  ),
  (
    'property_mountains_rouge_540',
    'region_mountains',
    'Поляна Rouge 540',
    'gk-polyana-rouge-540-polyana-ruzh',
    'Эсто-Садок',
    'Эстосадок, ул. Набережная Времена Года, д. 3',
    41515000.00,
    786000.00,
    'RUB',
    37.80,
    61.10,
    '37.80 - 61.10 м²',
    'Дом сдан',
    'АК',
    'Сервисные апартаменты в центре курорта Красная Поляна с архитектурой Михаила Филиппова.',
    'apartment',
    'active',
    $$Поляна Rouge 540 это компактный премиальный формат в самом сердце курорта, где работают адрес, архитектура и готовность объекта. Хороший сценарий для клиента, который хочет центр горной жизни и быстрый предметный вход.$$,
    '["Персональный расчёт", "100% оплата"]'::jsonb,
    true,
    NOW(),
    NOW()
  )
ON CONFLICT ("slug") DO UPDATE SET
  "regionId" = EXCLUDED."regionId",
  "title" = EXCLUDED."title",
  "city" = EXCLUDED."city",
  "address" = EXCLUDED."address",
  "priceFrom" = EXCLUDED."priceFrom",
  "pricePerM2" = EXCLUDED."pricePerM2",
  "currency" = EXCLUDED."currency",
  "areaFrom" = EXCLUDED."areaFrom",
  "areaTo" = EXCLUDED."areaTo",
  "areaText" = EXCLUDED."areaText",
  "deadlineText" = EXCLUDED."deadlineText",
  "objectType" = EXCLUDED."objectType",
  "promoText" = EXCLUDED."promoText",
  "propertyType" = EXCLUDED."propertyType",
  "status" = EXCLUDED."status",
  "description" = EXCLUDED."description",
  "purchaseOptionsJson" = EXCLUDED."purchaseOptionsJson",
  "isActive" = EXCLUDED."isActive",
  "updatedAt" = NOW();

DELETE FROM "PropertyMedia"
WHERE "propertyId" IN (
  'property_mountains_polyana_pik',
  'property_mountains_benefit_collection',
  'property_mountains_leeprime',
  'property_mountains_rouge_540'
);

INSERT INTO "PropertyMedia" ("id", "propertyId", "mediaType", "url", "sortOrder", "createdAt")
VALUES
  ('media_mountains_polyana_pik_1', 'property_mountains_polyana_pik', 'image', 'https://новостройки93.рф/upload/iblock/e5d/mamy3xr59mjqpezvg76rx141fzmfcdyp.png', 0, NOW()),
  ('media_mountains_polyana_pik_2', 'property_mountains_polyana_pik', 'image', 'https://новостройки93.рф/upload/iblock/9cb/myvbcjjpcuc7jzgsd7lwi9yv8uls46j8.png', 1, NOW()),
  ('media_mountains_polyana_pik_3', 'property_mountains_polyana_pik', 'image', 'https://новостройки93.рф/upload/iblock/69a/mgfce6c0597gy1f8kacur38opwws1ygk.png', 2, NOW()),
  ('media_mountains_benefit_1', 'property_mountains_benefit_collection', 'image', 'https://новостройки93.рф/upload/iblock/f85/azm9tq9wl62p1zrg3pw0iqr6gdwgap1f.jpg', 0, NOW()),
  ('media_mountains_benefit_2', 'property_mountains_benefit_collection', 'image', 'https://новостройки93.рф/upload/iblock/577/kytolqz82im6z5i8an37ecfzv38kzfoo.jpg', 1, NOW()),
  ('media_mountains_benefit_3', 'property_mountains_benefit_collection', 'image', 'https://новостройки93.рф/upload/iblock/655/eyqc7bz9jt9vb7u4s0m9vyvyqz63cp9p.jpg', 2, NOW()),
  ('media_mountains_leeprime_1', 'property_mountains_leeprime', 'image', 'https://новостройки93.рф/upload/iblock/4e2/ptmp61vklew1rq8hgpiw26ix4tc4cyof.png', 0, NOW()),
  ('media_mountains_leeprime_2', 'property_mountains_leeprime', 'image', 'https://новостройки93.рф/upload/iblock/03a/iunxjarlwcy3sorl6am69gd5ln8pdbft.jpg', 1, NOW()),
  ('media_mountains_leeprime_3', 'property_mountains_leeprime', 'image', 'https://новостройки93.рф/upload/iblock/47a/ph8ocx6vks47grb78c41r7pwfvpoic76.jpg', 2, NOW()),
  ('media_mountains_rouge_1', 'property_mountains_rouge_540', 'image', 'https://новостройки93.рф/upload/iblock/78b/8j64glt42w1wx15jf7ye28brz8ayg9w5.jpg', 0, NOW()),
  ('media_mountains_rouge_2', 'property_mountains_rouge_540', 'image', 'https://новостройки93.рф/upload/iblock/aee/g0dfarprhcsf0cjxwsohwlks1pdc9m4k.jpg', 1, NOW()),
  ('media_mountains_rouge_3', 'property_mountains_rouge_540', 'image', 'https://новостройки93.рф/upload/iblock/2e3/9ltzs7n603hkukjyz1iu04rqp6ucf1sl.jpg', 2, NOW())
ON CONFLICT ("id") DO UPDATE SET
  "propertyId" = EXCLUDED."propertyId",
  "mediaType" = EXCLUDED."mediaType",
  "url" = EXCLUDED."url",
  "sortOrder" = EXCLUDED."sortOrder";
