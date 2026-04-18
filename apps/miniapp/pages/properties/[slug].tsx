import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import type { PropertyDetails } from '../../lib/properties';

export default function PropertyDetailsPage() {
  const router = useRouter();
  const slug = typeof router.query.slug === 'string' ? router.query.slug : null;
  const region = typeof router.query.region === 'string' ? router.query.region : '';
  const regionName = typeof router.query.regionName === 'string' ? router.query.regionName : '';
  const [property, setProperty] = useState<PropertyDetails | null>(null);

  useEffect(() => {
    if (!slug) return;

    fetch(`/api/properties/${slug}`)
      .then((res) => res.json())
      .then((data) => setProperty(data.item ?? null));
  }, [slug]);

  return (
    <main style={{ minHeight: '100vh', padding: '24px 20px 40px', fontFamily: 'Inter, Arial, sans-serif', color: '#1f1f1f' }}>
      <div style={{ marginBottom: 20 }}>
        <Link href={region ? `/properties?region=${region}&regionName=${encodeURIComponent(regionName)}` : '/properties'} style={{ color: '#8b7355', textDecoration: 'none', fontWeight: 600 }}>
          ← К подборке
        </Link>
      </div>

      <section style={{ background: '#ffffff', borderRadius: 24, padding: 24, boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
        {!property ? (
          <div style={{ color: '#7d7367' }}>Загружаю карточку...</div>
        ) : (
          <>
            <p style={{ margin: '0 0 8px', color: '#8b7355', fontWeight: 600 }}>{property.region.name}</p>
            <h1 style={{ margin: '0 0 12px', fontSize: 30 }}>{property.title}</h1>
            <p style={{ margin: '0 0 18px', color: '#5c5348', lineHeight: 1.5 }}>{property.description}</p>

            <div style={{ display: 'grid', gap: 12, marginBottom: 18 }}>
              <div><strong>Город:</strong> {property.city ?? '—'}</div>
              <div><strong>Адрес:</strong> {property.address ?? '—'}</div>
              <div><strong>Цена:</strong> от {property.priceFrom ?? '—'} до {property.priceTo ?? '—'} {property.currency ?? ''}</div>
              <div><strong>Площадь:</strong> {property.areaFrom ?? '—'}–{property.areaTo ?? '—'} м²</div>
              <div><strong>Тип:</strong> {property.propertyType ?? '—'}</div>
            </div>

            {property.metrics ? (
              <div style={{ border: '1px solid #eadfce', borderRadius: 18, padding: 16, background: '#fffaf6', marginBottom: 18 }}>
                <div style={{ fontWeight: 700, marginBottom: 10 }}>Инвестиционные метрики</div>
                <div style={{ display: 'grid', gap: 8, color: '#4f473d' }}>
                  <div>Аренда: {property.metrics.rentalYield ?? '—'}%</div>
                  <div>Краткосрочная доходность: {property.metrics.shortTermYield ?? '—'}%</div>
                  <div>Рост цены: {property.metrics.annualGrowth ?? '—'}%</div>
                  <div>ROI 5 лет: {property.metrics.roi5y ?? '—'}%</div>
                  <div>ROI 10 лет: {property.metrics.roi10y ?? '—'}%</div>
                </div>
              </div>
            ) : null}

            <Link href="/quiz/contact" style={{ background: '#1f1f1f', color: '#ffffff', textDecoration: 'none', padding: '14px 18px', borderRadius: 14, fontWeight: 600, display: 'inline-block' }}>
              Оставить заявку
            </Link>
          </>
        )}
      </section>
    </main>
  );
}
