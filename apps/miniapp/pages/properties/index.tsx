import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { PropertyCardLink } from '../../components/property-card-link';
import type { PropertyListItem } from '../../lib/properties';
import { getBudgetByKey, getTimelineByKey } from '../../lib/quiz-options';

export default function PropertiesPage() {
  const router = useRouter();
  const region = typeof router.query.region === 'string' ? router.query.region : '';
  const regionName = typeof router.query.regionName === 'string' ? router.query.regionName : '';
  const budget = getBudgetByKey(typeof router.query.budgetKey === 'string' ? router.query.budgetKey : '10m-20m');
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
    <main style={{ minHeight: '100vh', padding: '24px 20px 40px', fontFamily: 'Inter, Arial, sans-serif', color: '#1f1f1f' }}>
      <div style={{ marginBottom: 20 }}>
        <Link href="/quiz/success" style={{ color: '#8b7355', textDecoration: 'none', fontWeight: 600 }}>
          ← Назад
        </Link>
      </div>

      <section style={{ background: '#ffffff', borderRadius: 24, padding: 24, boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
        <p style={{ margin: '0 0 8px', color: '#8b7355', fontWeight: 600 }}>Подборка объектов</p>
        <h1 style={{ margin: '0 0 12px', fontSize: 30 }}>Подходящие варианты</h1>
        <p style={{ margin: '0 0 20px', color: '#5c5348', lineHeight: 1.5 }}>
          Здесь уже живая выдача из backend.{regionName ? ` Сейчас показаны объекты по региону: ${regionName}.` : ''} Бюджет: {budget.title}. Срок: {timeline.title}.
        </p>

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
      </section>
    </main>
  );
}
