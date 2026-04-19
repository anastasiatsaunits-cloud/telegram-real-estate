import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { AppShell } from '../../components/app-shell';
import { BackLink } from '../../components/back-link';
import type { PropertyDetails } from '../../lib/properties';

function formatPrice(value: string | null | undefined, currency: string | null | undefined) {
  if (!value) return 'по запросу';
  return `от ${value} ${currency ?? ''}`.trim();
}

function formatArea(from: string | null | undefined, to: string | null | undefined) {
  if (from && to) return `${from}-${to} м²`;
  if (from) return `${from} м²`;
  if (to) return `${to} м²`;
  return '—';
}

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
    <AppShell
      eyebrow={property?.region.name ?? 'Объект'}
      title={property?.title ?? 'Карточка объекта'}
      description={property?.city ? `${property.city}${property.address ? `, ${property.address}` : ''}` : 'Загружаю карточку объекта...'}
    >
      <BackLink href={region ? `/properties?region=${region}&regionName=${encodeURIComponent(regionName)}` : '/properties'} />

      {!property ? (
        <div style={{ color: '#7d7367' }}>Загружаю карточку...</div>
      ) : (
        <>
          <div
            style={{
              minHeight: 320,
              borderRadius: 28,
              marginBottom: 16,
              background:
                property.region.slug === 'sochi'
                  ? 'linear-gradient(135deg, #8aa8bf 0%, #4f6578 100%)'
                  : 'linear-gradient(135deg, #7f9eaf 0%, #5a6f79 100%)',
              padding: 18,
              position: 'relative',
              overflow: 'hidden',
              display: 'flex',
              alignItems: 'flex-end',
            }}
          >
            <div
              style={{
                position: 'absolute',
                top: 14,
                right: 14,
                padding: '6px 12px',
                borderRadius: 999,
                background: 'rgba(24,24,24,0.72)',
                color: '#ffffff',
                fontSize: 13,
                fontWeight: 700,
              }}
            >
              1 / 1
            </div>

            <div>
              <div style={{ fontSize: 34, fontWeight: 700, lineHeight: 1.04, color: '#ffffff', marginBottom: 8 }}>{property.title}</div>
              <div style={{ fontSize: 13, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.92)' }}>
                {property.city || property.region.name}
              </div>
            </div>
          </div>

          <div
            style={{
              marginBottom: 18,
              borderRadius: 22,
              padding: '18px 18px 20px',
              background: '#0f4b22',
              color: '#ffffff',
              fontWeight: 700,
              fontSize: 20,
              textAlign: 'center',
              boxShadow: '0 12px 28px rgba(15,75,34,0.22)',
            }}
          >
            {formatPrice(property.priceFrom, property.currency)}
          </div>

          <div style={{ marginBottom: 20, color: '#433c33', lineHeight: 1.7 }}>
            <div style={{ fontSize: 12, letterSpacing: '0.12em', color: '#9d9388', textTransform: 'uppercase', marginBottom: 10 }}>О проекте</div>
            <div>{property.description || 'Описание объекта появится здесь.'}</div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 16 }}>
            <div style={{ borderRadius: 22, background: '#faf7f1', padding: 16, border: '1px solid rgba(229,221,208,0.95)' }}>
              <div style={{ fontSize: 12, letterSpacing: '0.08em', color: '#a1978a', textTransform: 'uppercase', marginBottom: 8 }}>Площадь</div>
              <div style={{ fontWeight: 700, color: '#1e1e1e' }}>{formatArea(property.areaFrom, property.areaTo)}</div>
            </div>
            <div style={{ borderRadius: 22, background: '#faf7f1', padding: 16, border: '1px solid rgba(229,221,208,0.95)' }}>
              <div style={{ fontSize: 12, letterSpacing: '0.08em', color: '#a1978a', textTransform: 'uppercase', marginBottom: 8 }}>Цель</div>
              <div style={{ fontWeight: 700, color: '#1e1e1e' }}>Отдых, пассивный доход</div>
            </div>
          </div>

          <div style={{ borderRadius: 22, background: '#faf7f1', padding: 16, border: '1px solid rgba(229,221,208,0.95)', marginBottom: 16 }}>
            <div style={{ fontSize: 12, letterSpacing: '0.08em', color: '#a1978a', textTransform: 'uppercase', marginBottom: 8 }}>Варианты покупки</div>
            <div style={{ fontWeight: 700, color: '#1e1e1e' }}>
              {property.purchaseOptionsJson?.length ? property.purchaseOptionsJson.join(', ') : 'Рассрочка, ипотека'}
            </div>
          </div>

          <div style={{ display: 'grid', gap: 12 }}>
            <button
              type="button"
              style={{
                border: 'none',
                borderRadius: 20,
                padding: '17px 18px',
                background: '#e6d8b8',
                color: '#1f1f1f',
                fontWeight: 700,
                fontSize: 18,
              }}
            >
              📊 Инвест расчёт
            </button>

            <Link
              href={`/quiz/contact?propertySlug=${property.slug}&propertyTitle=${encodeURIComponent(property.title)}${region ? `&region=${region}` : ''}${regionName ? `&regionName=${encodeURIComponent(regionName)}` : ''}`}
              style={{
                textDecoration: 'none',
                textAlign: 'center',
                borderRadius: 20,
                padding: '18px 18px',
                background: '#0f4b22',
                color: '#ffffff',
                fontWeight: 700,
                fontSize: 18,
                boxShadow: '0 12px 28px rgba(15,75,34,0.22)',
              }}
            >
              Оставить заявку
            </Link>
          </div>
        </>
      )}
    </AppShell>
  );
}
