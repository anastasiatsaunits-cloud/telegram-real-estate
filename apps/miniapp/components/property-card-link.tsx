import Link from 'next/link';
import type { PropertyListItem } from '../lib/properties';
import { MotionCard, Pill, SectionEyebrow, SurfaceCard } from './ui';

function getMarketPalette(regionSlug: string) {
  if (regionSlug === 'sochi') {
    return {
      gradient: 'linear-gradient(135deg, #8ea986 0%, #5f755a 42%, #243229 100%)',
      accent: 'rgba(209, 232, 193, 0.24)',
      label: 'Сочи · curated market',
      cta: '#0f4b22',
    };
  }

  return {
    gradient: 'linear-gradient(135deg, #7aaec3 0%, #547b92 45%, #263746 100%)',
    accent: 'rgba(188, 230, 245, 0.24)',
    label: 'Крым · private market',
    cta: '#0b4f6c',
  };
}

export function PropertyCardLink({
  property,
  regionQuery,
  regionName,
  budgetKey,
  timelineKey,
}: {
  property: PropertyListItem;
  regionQuery?: string;
  regionName?: string;
  budgetKey?: string;
  timelineKey?: string;
}) {
  const palette = getMarketPalette(property.region.slug);
  const location = [property.region.name, property.city].filter(Boolean).join(' · ');
  const priceLabel = property.priceFrom ? `от ${Number(property.priceFrom).toLocaleString('ru-RU')} ${property.currency ?? ''}`.trim() : 'по запросу';

  return (
    <MotionCard>
      <Link
        href={
          regionQuery
            ? `/properties/${property.slug}?region=${regionQuery}&regionName=${encodeURIComponent(regionName ?? '')}${budgetKey ? `&budgetKey=${budgetKey}` : ''}${timelineKey ? `&timelineKey=${timelineKey}` : ''}`
            : `/properties/${property.slug}`
        }
        style={{ display: 'block', textDecoration: 'none' }}
      >
        <SurfaceCard
          style={{
            borderRadius: 30,
            overflow: 'hidden',
            color: '#161616',
            boxShadow: '0 16px 34px rgba(0,0,0,0.08)',
          }}
        >
          <div
            style={{
              minHeight: 278,
              padding: 20,
              display: 'flex',
              alignItems: 'space-between',
              flexDirection: 'column',
              justifyContent: 'space-between',
              background: palette.gradient,
              position: 'relative',
            }}
          >
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(180deg, rgba(255,255,255,0.06) 0%, rgba(0,0,0,0.36) 100%)',
              }}
            />
            <div
              style={{
                position: 'absolute',
                right: -26,
                top: -20,
                width: 150,
                height: 150,
                borderRadius: '50%',
                background: palette.accent,
                filter: 'blur(10px)',
              }}
            />

            <div style={{ position: 'relative', zIndex: 1, display: 'flex', justifyContent: 'space-between', gap: 12 }}>
              <Pill
                style={{
                  background: 'rgba(255,255,255,0.16)',
                  color: '#ffffff',
                }}
              >
                {palette.label}
              </Pill>
              <div
                style={{
                  padding: '9px 14px',
                  borderRadius: 18,
                  background: 'rgba(255,255,255,0.92)',
                  color: '#181818',
                  fontWeight: 700,
                  fontSize: 15,
                  boxShadow: '0 8px 20px rgba(15,16,18,0.14)',
                }}
              >
                {priceLabel}
              </div>
            </div>

            <div style={{ position: 'relative', zIndex: 1 }}>
              <SectionEyebrow style={{ color: 'rgba(255,255,255,0.72)', marginBottom: 10 }}>signature object</SectionEyebrow>
              <div style={{ fontSize: 34, fontWeight: 700, lineHeight: 1.02, color: '#ffffff', marginBottom: 12 }}>{property.title}</div>
              <div style={{ fontSize: 14, lineHeight: 1.55, color: 'rgba(255,255,255,0.88)', maxWidth: 380, marginBottom: 14 }}>{location || 'Локация уточняется'}</div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, color: '#fff3da', fontWeight: 700, fontSize: 14 }}>
                Смотреть объект <span>→</span>
              </div>
            </div>
          </div>

          <div style={{ padding: 18 }}>
            <div
              style={{
                display: 'flex',
                gap: 10,
                flexWrap: 'wrap',
                marginBottom: 14,
              }}
            >
              <Pill>{property.region.name}</Pill>
              {property.city ? <Pill style={{ background: '#f8f5ef', color: '#6e6256' }}>{property.city}</Pill> : null}
            </div>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 16,
                borderRadius: 20,
                padding: '16px 18px',
                background: palette.cta,
                color: '#ffffff',
                fontWeight: 700,
                fontSize: 17,
                boxShadow: '0 10px 24px rgba(15,75,34,0.18)',
              }}
            >
              <span>Открыть карточку объекта</span>
              <span style={{ fontSize: 20, lineHeight: 1 }}>→</span>
            </div>
          </div>
        </SurfaceCard>
      </Link>
    </MotionCard>
  );
}
