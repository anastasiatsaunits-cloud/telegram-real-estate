# Bitrix → backend mapping for curated real-estate catalog

Собрано по живым источникам:
- repo N93: `repos/n93/site/dev_n93/local/templates/nonvo93/components/bitrix/catalog.section/front/template.php`
- repo N93 страницы витрин: `repos/n93/site/dev_n93/doveritelnoe-upravlenie/index.php`
- live Bitrix iblock 5 property list с dev N93

## Поля, которые реально используются на витрине N93 сейчас

Обязательный минимум карточки:
- `NAME` → `Property.title`
- `CODE` → `Property.slug`
- `OBJECT_PHOTO` → `PropertyMedia[]`
- `n18_address` → `Property.address`
- `n18_min_price` → `Property.priceFrom`
- `N18_MAX_PRICE` → `Property.priceTo`
- `n18_area` / `N18_MIN_AREA` / `N18_MAX_AREA` → `Property.areaFrom`, `Property.areaTo`, `Property.areaText`
- `n18_kvartiry` → `Property.flatCount`
- `n18_date` / `date` / `SROK` / `N18_DEADLINE` → `Property.deadlineText`
- `N18_OBJECT_TYPE` → `Property.objectType`
- `ACTION_TEXT`, `ACTION_TEXT_2`, `ACTION_TEXT_3` → `Property.badgesJson`
- `SOON` → `Property.isSoon`

## Важные дополнительные поля из Bitrix, которые стоит держать в backend

- `n18_price_m2` → `Property.pricePerM2`
- `N18_DEVELOPER` / `DEVELOPER_NAME` → `Property.developerName`
- `N18_IPOTEKA` → `Property.mortgageText`
- `N18_RASSROCHKA` → `Property.installmentText`
- `N18_AKCIYA` → `Property.promoText`
- `n18_distance` → `Property.seaDistanceM`
- `n18_parking` → `Property.parkingJson`
- `n18_territory` → `Property.territoryText`
- `n18_potolki` → `Property.ceilingHeight`
- `n18_service` → `Property.serviceCostPerM2`
- `n18_gas` → `Property.gasText`
- `n18_heating` → `Property.heatingText`
- `n18_electric` → `Property.electricityText`
- `n18_canalization` → `Property.canalizationText`
- `n18_water` → `Property.waterText`
- `DETAIL_TEXT` / `DETAIL2` / `SEO_TEXT` → `Property.description` / `Property.descriptionExtra`
- `PLAN_PHOTO` → `PropertyMedia[]` as `plan`
- `DOCS`, `PRICE_LIST`, `MANIFEST` → `PropertyAsset[]`
- `FAQ_QUESTION`, `FAQ_ANSWER` → `PropertyFaq[]`

## Что уже есть в текущем backend

Текущая schema покрывает только часть модели:
- region
- title
- slug
- city
- address
- priceFrom / priceTo
- areaFrom / areaTo
- propertyType
- status
- description
- media
- metrics

## Чего не хватает в backend schema для нормального импорта из Bitrix

Нужно добавить как минимум:
- `areaText`
- `flatCount`
- `deadlineText`
- `objectType`
- `badgesJson`
- `isSoon`
- `pricePerM2`
- `developerName`
- `mortgageText`
- `installmentText`
- `promoText`
- `seaDistanceM`
- `parkingJson`
- `territoryText`
- `ceilingHeight`
- `serviceCostPerM2`
- `gasText`
- `heatingText`
- `electricityText`
- `canalizationText`
- `waterText`
- опционально отдельные таблицы для FAQ и assets

## Вывод

Корневой сбой был двойной:
1. schema Render DB вообще не была создана
2. даже текущая schema backend была слишком узкой относительно реальной модели объекта из Bitrix

Правильный следующий путь:
1. расширить Prisma schema под реальную модель объекта
2. применить schema в Render DB
3. импортировать curated N93
4. проверить `/api/properties`
5. затем повторить тот же пайплайн для Крыма
