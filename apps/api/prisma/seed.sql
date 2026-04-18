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
