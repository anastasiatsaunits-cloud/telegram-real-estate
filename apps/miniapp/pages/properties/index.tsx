import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';
import { AppShell } from '../../components/app-shell';
import { BackLink } from '../../components/back-link';
import { PropertyCardLink } from '../../components/property-card-link';
import { InfoCard, Pill, SectionEyebrow } from '../../components/ui';
import type { PropertyListItem } from '../../lib/properties';
import { getBudgetByKey, getTimelineByKey } from '../../lib/quiz-options';

export default function PropertiesPage() {
  const router = useRouter();
  const region = typeof router.query.region === 'string' ? router.query.region : '';
  const regionName = typeof router.query.regionName === 'string' ? router.query.regionName : '';
  const budget = getBudgetByKey(typeof router.query.budgetKey === 'string' ? router.query.budgetKey : 'under-10m');
  const timeline = getTimelineByKey(typeof router.query.timelineKey === 'string' ? router.query.timelineKey : '3-months');
  const [items, setItems] = useState<PropertyListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams();
    if (region) params.set('region', region);
    if (budget.min) params.set('budgetMin', String(budget.min));
    if (budget.max) params.set('budgetMax', String(budget.max));
    const query = params.toString() ? `?${params.toString()}` : '';

    setLoading(true);
    setError(null);

    fetch(`/api/properties${query}`)
      .then(async (res) => {
        const data = await res.json();
        if (!res.ok) {
          throw new Error(typeof data.message === 'string' ? data.message : 'Не удалось загрузить объекты');
        }
        setItems(data.items ?? []);
      })
      .catch((err) => {
        setItems([]);
        setError(err instanceof Error ? err.message : 'Не удалось загрузить объекты');
      })
      .finally(() => setLoading(false));
  }, [region, budget.min, budget.max]);

  const title = useMemo(() => {
    if (regionName) return `Объекты · ${regionName}`;
    return 'Рынки и объекты';
  }, [regionName]);

  return (
    <AppShell
      eyebrow="Живой каталог"
      title={title}
      description={regionName ? `Рынок: ${regionName}. Бюджет: ${budget.title}. Срок: ${timeline.title}.` : 'Сначала выбери рынок, потом смотри объекты и веди клиента дальше по сильному сценарию.'}
    >
      <BackLink href="/quiz/success" />

      <InfoCard style={{ marginBottom: 16, background: 'linear-gradient(180deg, #f6f1e8 0%, #f3ecdf 100%)', color: '#4a4339' }}>
        <SectionEyebrow style={{ marginBottom: 8, color: '#a09383' }}>Фильтр</SectionEyebrow>
        <div style={{ fontWeight: 700, marginBottom: 12, fontSize: 20, color: '#201c18' }}>{regionName || 'Крым и Сочи'}</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
          <Pill>{budget.title}</Pill>
          <Pill style={{ background: '#f8f5ef', color: '#6e6256' }}>{timeline.title}</Pill>
          <Pill style={{ background: '#efe7d8', color: '#7d6c58' }}>{loading ? 'Обновляем выдачу' : `${items.length} в подборке`}</Pill>
        </div>
      </InfoCard>

      {loading ? (
        <InfoCard style={{ color: '#7d7367' }}>Загружаю объекты...</InfoCard>
      ) : error ? (
        <InfoCard style={{ background: '#fff6f1', color: '#6b4a36' }}>
          <SectionEyebrow style={{ marginBottom: 8, color: '#b17b58' }}>Live status</SectionEyebrow>
          <div style={{ fontWeight: 700, marginBottom: 8 }}>Каталог сейчас отвечает нестабильно</div>
          <div style={{ lineHeight: 1.6 }}>{error}. Проверь backend URL и доступность API.</div>
        </InfoCard>
      ) : items.length === 0 ? (
        <InfoCard>
          <SectionEyebrow style={{ marginBottom: 8 }}>Пустая выдача</SectionEyebrow>
          <div style={{ fontWeight: 700, marginBottom: 8 }}>Под эти параметры пока нет активных объектов</div>
          <div style={{ lineHeight: 1.6, color: '#615648' }}>Можно ослабить фильтр по бюджету или переключиться между Крымом и Сочи.</div>
        </InfoCard>
      ) : (
        <div style={{ display: 'grid', gap: 14 }}>
          {items.map((property) => (
            <PropertyCardLink
              key={property.id}
              property={property}
              regionQuery={region}
              regionName={regionName}
              budgetKey={budget.key}
              timelineKey={timeline.key}
            />
          ))}
        </div>
      )}
    </AppShell>
  );
}
