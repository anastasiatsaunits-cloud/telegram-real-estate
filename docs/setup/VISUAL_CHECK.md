# Визуальная проверка miniapp

## Локальные адреса для проверки

### Главная
- http://localhost:3000/

### Квиз
- http://localhost:3000/quiz/region
- http://localhost:3000/quiz/budget?region=crimea&regionName=%D0%9A%D1%80%D1%8B%D0%BC
- http://localhost:3000/quiz/timeline?region=crimea&regionName=%D0%9A%D1%80%D1%8B%D0%BC&budgetKey=5m-10m
- http://localhost:3000/quiz/ready?region=crimea&regionName=%D0%9A%D1%80%D1%8B%D0%BC&budgetKey=5m-10m&timelineKey=1-month
- http://localhost:3000/quiz/contact?region=crimea&regionName=%D0%9A%D1%80%D1%8B%D0%BC&budgetKey=5m-10m&timelineKey=1-month
- http://localhost:3000/quiz/success?leadId=test123&region=crimea&regionName=%D0%9A%D1%80%D1%8B%D0%BC&budgetKey=5m-10m&timelineKey=1-month

### Подборка объектов
- http://localhost:3000/properties?region=crimea&regionName=%D0%9A%D1%80%D1%8B%D0%BC&budgetKey=under-5m&timelineKey=1-month
- http://localhost:3000/properties?region=crimea&regionName=%D0%9A%D1%80%D1%8B%D0%BC&budgetKey=5m-10m&timelineKey=1-month
- http://localhost:3000/properties?region=crimea&regionName=%D0%9A%D1%80%D1%8B%D0%BC&budgetKey=10m-20m&timelineKey=1-month
- http://localhost:3000/properties?region=sochi&regionName=%D0%A1%D0%BE%D1%87%D0%B8&budgetKey=20m-plus&timelineKey=1-month

### Карточки объектов
- http://localhost:3000/properties/studio-u-morya-crimea?region=crimea&regionName=%D0%9A%D1%80%D1%8B%D0%BC&budgetKey=under-5m&timelineKey=1-month
- http://localhost:3000/properties/apartments-crimea-invest?region=crimea&regionName=%D0%9A%D1%80%D1%8B%D0%BC&budgetKey=5m-10m&timelineKey=1-month
- http://localhost:3000/properties/villa-u-morya-crimea?region=crimea&regionName=%D0%9A%D1%80%D1%8B%D0%BC&budgetKey=10m-20m&timelineKey=1-month
- http://localhost:3000/properties/premium-residence-sochi?region=sochi&regionName=%D0%A1%D0%BE%D1%87%D0%B8&budgetKey=20m-plus&timelineKey=1-month

## Что уже должно работать
- линейный квиз
- submit лида
- success screen
- подборка по региону и бюджету
- карточка объекта

## Для запуска локально

### API
```bash
cd apps/api
pnpm start
```

### Miniapp
```bash
cd apps/miniapp
pnpm dev
```
