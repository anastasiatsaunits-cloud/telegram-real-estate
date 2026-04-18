import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { AppShell } from '../../components/app-shell';
import { BackLink } from '../../components/back-link';
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
    <AppShell eyebrow={property?.region.name ?? 'Объект'} title={property?.title ?? 'Карточка объекта'} description={property?.description ?? 'Загружаю карточку объекта...'}>
      <BackLink href={region ? `/properties?region=${region}&regionName=${encodeURIComponent(regionName)}` : '/properties'} />

      {!property ? (
        <div style={{ color: '#7d7367' }}>Загружаю карточку...</div>
      ) : (
        <>
          <div style={{ display: 'grid', gap: 12, marginBottom: 18 }}>
            <div style={{ padding: 16, borderRadius: 18, background: '#fffaf6', border: '1px solid #eadfce' }}>
              <div style={{ fontSize: 13, color: '#8f7658', fontWeight: 700, marginBottom: 8 }}>Основная информация</div>
              <div style={{ display: 'grid', gap: 8, color: '#4d443b', lineHeight: 1.6 }}>
                <div><strong>Город:</strong> {property.city ?? '—'}</div>
                <div><strong>Адрес:</strong> {property.address ?? '—'}</div>
                <div><strong>Цена:</strong> от {property.priceFrom ?? '—'} до {property.priceTo ?? '—'} {property.currency ?? ''}</div>
                <div><strong>Площадь:</strong> {property.areaFrom ?? '—'}–{property.areaTo ?? '—'} м²</div>
                <div><strong>Тип:</strong> {property.propertyType ?? '—'}</div>
              </div>
            </div>

            {property.metrics ? (
              <div style={{ border: '1px solid #eadfce', borderRadius: 18, padding: 16, background: 'linear-gradient(180deg, #fffaf6 0%, #fff2e6 100%)', marginBottom: 6 }}>
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
          </div>

          <Link href={`/quiz/contact?propertySlug=${property.slug}&propertyTitle=${encodeURIComponent(property.title)}${region ? `&region=${region}` : ''}${regionName ? `&regionName=${encodeURIComponent(regionName)}` : ''}`} style={{ background: 'linear-gradient(90deg, #1f1f1f 0%, #444 100%)', color: '#ffffff', textDecoration: 'none', padding: '15px 18px', borderRadius: 16, fontWeight: 700, display: 'inline-block', boxShadow: '0 10px 24px rgba(0,0,0,0.12)' }}>
            Хочу этот объект
          </Link>
        </>
      )}
    </AppShell>
  );
}
