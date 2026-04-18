import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { AppShell } from '../../components/app-shell';
import { BackLink } from '../../components/back-link';
import { PropertyCardLink } from '../../components/property-card-link';
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

  useEffect(() => {
    const params = new URLSearchParams();
    if (region) params.set('region', region);
    if (budget.min) params.set('budgetMin', String(budget.min));
    if (budget.max) params.set('budgetMax', String(budget.max));
    const query = params.toString() ? `?${params.toString()}` : '';
    fetch(`/api/properties${query}`)
      .then((res) => res.json())
      .then((data) => setItems(data.items ?? []))
      .finally(() => setLoading(false));
  }, [region, budget.min, budget.max]);

  return (
    <AppShell eyebrow="Живая подборка" title="Подходящие варианты" description={`Регион: ${regionName || 'не выбран'}. Бюджет: ${budget.title}. Срок: ${timeline.title}.`}>
      <BackLink href="/quiz/success" />

      {loading ? (
        <div style={{ color: '#7d7367' }}>Загружаю объекты...</div>
      ) : (
        <div style={{ display: 'grid', gap: 12 }}>
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
