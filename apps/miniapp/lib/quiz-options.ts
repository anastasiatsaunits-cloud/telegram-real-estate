export type BudgetOption = {
  title: string;
  description: string;
  key: string;
  min?: number;
  max?: number;
};

export type TimelineOption = {
  title: string;
  key: string;
};

export const budgetOptions: BudgetOption[] = [
  { key: 'under-10m', title: 'До 10 млн ₽', description: 'Стартовый диапазон для подбора', max: 10000000 },
  { key: '10m-20m', title: '10–20 млн ₽', description: 'Расширенный подбор по ликвидным объектам', min: 10000000, max: 20000000 },
  { key: '20m-plus', title: '20+ млн ₽', description: 'Премиальный сегмент и точечный подбор', min: 20000000 },
  { key: 'custom', title: 'Нужен индивидуальный подбор', description: 'Подойдёт, если пока без точного бюджета' },
];

export const timelineOptions: TimelineOption[] = [
  { key: 'urgent', title: 'Срочно' },
  { key: '1-month', title: 'В течение 1 месяца' },
  { key: '3-months', title: 'В течение 3 месяцев' },
  { key: '6-months', title: 'В течение 6 месяцев' },
  { key: 'research', title: 'Пока изучаю рынок' },
];

export function getBudgetByKey(key: string | undefined) {
  return budgetOptions.find((option) => option.key === key) ?? budgetOptions[1];
}

export function getTimelineByKey(key: string | undefined) {
  return timelineOptions.find((option) => option.key === key) ?? timelineOptions[2];
}
