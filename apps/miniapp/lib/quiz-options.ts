export type QuizChoice = {
  key: string;
  title: string;
  description?: string;
};

export type BudgetOption = QuizChoice & {
  min?: number;
  max?: number;
};

export type MarketOption = QuizChoice & {
  regionSlug?: string;
};

export const scenarioOptions: QuizChoice[] = [
  {
    key: 'investment-growth',
    title: 'Инвестиция и рост стоимости',
    description: 'Сделаем акцент на ликвидности, потенциале и понятном входе.',
  },
  {
    key: 'life-by-sea',
    title: 'Для жизни у моря',
    description: 'Приоритет, комфорт, локация и сценарий для себя.',
  },
  {
    key: 'capital-preservation',
    title: 'Сохранение капитала',
    description: 'Подберём спокойные форматы с сильной базой и понятным активом.',
  },
  {
    key: 'hybrid',
    title: 'Для себя + как актив',
    description: 'Сбалансируем личный сценарий и инвестиционную логику.',
  },
];

export const marketOptions: MarketOption[] = [
  {
    key: 'sochi',
    regionSlug: 'sochi',
    title: 'Сочи',
    description: 'Более активный рынок, сильный спрос, аренда и ликвидность.',
  },
  {
    key: 'crimea',
    regionSlug: 'crimea',
    title: 'Крым',
    description: 'Море, приватность, курортный формат и спокойный сценарий капитала.',
  },
  {
    key: 'anapa',
    regionSlug: 'anapa',
    title: 'Анапа',
    description: 'Курортный вход, новые проекты у моря и отдельная витрина по этому рынку.',
  },
  {
    key: 'compare',
    title: 'Хочу сравнить рынки',
    description: 'Покажем варианты по нескольким рынкам и дадим первый ориентир.',
  },
];

export const budgetOptions: BudgetOption[] = [
  { key: 'under-15m', title: 'До 15 млн ₽', description: 'Стартовый диапазон для первого входа.', max: 15000000 },
  { key: '15-30m', title: '15–30 млн ₽', description: 'Сильный средний сегмент для предметного выбора.', min: 15000000, max: 30000000 },
  { key: '30-60m', title: '30–60 млн ₽', description: 'Премиальные объекты с более выраженным уровнем продукта.', min: 30000000, max: 60000000 },
  { key: '60m-plus', title: '60+ млн ₽', description: 'High-end сегмент и точечный подбор.', min: 60000000 },
  { key: 'custom', title: 'Нужен индивидуальный подбор', description: 'Если хочешь сначала увидеть направление, а не жёсткий фильтр.' },
];

export const formatOptions: QuizChoice[] = [
  {
    key: 'apartments',
    title: 'Апартаменты',
    description: 'Для курортного сценария, аренды и гибкого входа.',
  },
  {
    key: 'residence',
    title: 'Квартира / резиденция',
    description: 'Для жизни, статуса и качественной городской или курортной базы.',
  },
  {
    key: 'villa',
    title: 'Вилла / дом',
    description: 'Для приватности, пространства и собственного ритма.',
  },
  {
    key: 'mixed',
    title: 'Рассматриваю разные форматы',
    description: 'Покажем сильные варианты из нескольких категорий.',
  },
];

export const timelineOptions: QuizChoice[] = [
  { key: 'now', title: 'Готов(а) сейчас', description: 'Сразу покажем варианты, которые стоит считать в первую очередь.' },
  { key: '1-3-months', title: 'В ближайшие 1–3 месяца', description: 'Подберём актуальные предложения под ближайшее решение.' },
  { key: '3-6-months', title: 'В течение 3–6 месяцев', description: 'Сохраним диапазон и логику подбора без лишней спешки.' },
  { key: 'research', title: 'Пока изучаю рынок', description: 'Сначала покажем ориентиры и сильные сценарии входа.' },
];

export const priorityOptions: QuizChoice[] = [
  {
    key: 'yield',
    title: 'Доходность и ликвидность',
    description: 'Сделаем акцент на цифрах, спросе и потенциале роста.',
  },
  {
    key: 'sea-view',
    title: 'Первая линия, море, виды',
    description: 'Покажем варианты, где локация решает всё.',
  },
  {
    key: 'privacy',
    title: 'Приватность и спокойствие',
    description: 'Отдадим приоритет камерным и более тихим форматам.',
  },
  {
    key: 'status',
    title: 'Статус, сервис, инфраструктура',
    description: 'Сместим подбор в сторону продукта и качества окружения.',
  },
  {
    key: 'best-on-budget',
    title: 'Максимально сильный актив на мой бюджет',
    description: 'Соберём самые убедительные варианты в выбранном диапазоне.',
  },
];

export type QuizHrefParams = {
  region?: string;
  regionName?: string;
  budgetKey?: string;
  timelineKey?: string;
  scenarioKey?: string;
  formatKey?: string;
  priorityKey?: string;
  propertySlug?: string;
  propertyTitle?: string;
};

export function getScenarioByKey(key: string | undefined) {
  return scenarioOptions.find((option) => option.key === key) ?? scenarioOptions[0];
}

export function getBudgetByKey(key: string | undefined) {
  return budgetOptions.find((option) => option.key === key) ?? budgetOptions[1];
}

export function getFormatByKey(key: string | undefined) {
  return formatOptions.find((option) => option.key === key) ?? formatOptions[3];
}

export function getTimelineByKey(key: string | undefined) {
  return timelineOptions.find((option) => option.key === key) ?? timelineOptions[1];
}

export function getPriorityByKey(key: string | undefined) {
  return priorityOptions.find((option) => option.key === key) ?? priorityOptions[4];
}

export function getRegionNameBySlug(region: string | undefined) {
  if (region === 'anapa') return 'Анапа';
  if (region === 'sochi') return 'Сочи';
  if (region === 'crimea') return 'Крым';
  return 'Сочи, Крым и Анапа';
}

export function buildQuizHref(path: string, params: QuizHrefParams = {}) {
  const search = new URLSearchParams();

  if (params.region) search.set('region', params.region);
  if (params.regionName) search.set('regionName', params.regionName);
  if (params.budgetKey) search.set('budgetKey', params.budgetKey);
  if (params.timelineKey) search.set('timelineKey', params.timelineKey);
  if (params.scenarioKey) search.set('scenarioKey', params.scenarioKey);
  if (params.formatKey) search.set('formatKey', params.formatKey);
  if (params.priorityKey) search.set('priorityKey', params.priorityKey);
  if (params.propertySlug) search.set('propertySlug', params.propertySlug);
  if (params.propertyTitle) search.set('propertyTitle', params.propertyTitle);

  const query = search.toString();
  return query ? `${path}?${query}` : path;
}
