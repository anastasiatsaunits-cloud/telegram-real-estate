import Link from 'next/link';
import type { PropertyListItem } from '../lib/properties';
import { MotionCard, Pill, SectionEyebrow, SurfaceCard } from './ui';

function getMarketPalette(regionSlug: string) {
  if (regionSlug === 'anapa') {
    return {
      gradient: 'linear-gradient(135deg, #caa36f 0%, #8f6b44 45%, #3f2d1d 100%)',
      accent: 'rgba(244, 210, 163, 0.28)',
      label: 'Анапа · курортный вход',
      cta: '#7a4d22',
    };
  }

  if (regionSlug === 'sochi') {
    return {
      gradient: 'linear-gradient(135deg, #8ea986 0%, #5f755a 42%, #243229 100%)',
      accent: 'rgba(209, 232, 193, 0.24)',
      label: 'Сочи · активный спрос',
      cta: '#0f4b22',
    };
  }

  if (regionSlug === 'mountains') {
    return {
      gradient: 'linear-gradient(135deg, #8a9dae 0%, #5f7384 42%, #24313a 100%)',
      accent: 'rgba(202, 223, 238, 0.24)',
      label: 'Горный кластер · круглый год',
      cta: '#24495f',
    };
  }

  return {
    gradient: 'linear-gradient(135deg, #7aaec3 0%, #547b92 45%, #263746 100%)',
    accent: 'rgba(188, 230, 245, 0.24)',
    label: 'Крым · у моря',
    cta: '#0b4f6c',
  };
}

function getCollectionBadge(slug: string) {
  if (slug === 'gk-mandarin-garden-mandarin-garden') {
    return 'Старт продаж';
  }

  return null;
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
  const collectionBadge = getCollectionBadge(property.slug);

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
            boxShadow: '0 18px 38px rgba(0,0,0,0.08)',
          }}
        >
          <div
            style={{
              minHeight: 318,
              padding: 18,
              display: 'flex',
              alignItems: 'space-between',
              flexDirection: 'column',
              justifyContent: 'space-between',
              background: palette.gradient,
              backgroundImage: property.coverAsset ? `linear-gradient(180deg, rgba(14,17,19,0.14) 0%, rgba(10,13,16,0.3) 24%, rgba(10,13,16,0.88) 100%), url(${property.coverAsset})` : palette.gradient,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              position: 'relative',
            }}
          >
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(180deg, rgba(255,255,255,0.04) 0%, rgba(0,0,0,0.16) 14%, rgba(0,0,0,0.52) 100%)',
              }}
            />
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(90deg, rgba(7,11,15,0.74) 0%, rgba(7,11,15,0.28) 54%, rgba(7,11,15,0.12) 100%)',
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
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                <Pill
                  style={{
                    background: 'rgba(255,255,255,0.16)',
                    color: '#ffffff',
                    backdropFilter: 'blur(10px)',
                  }}
                >
                  {palette.label}
                </Pill>
                {collectionBadge ? (
                  <Pill
                    style={{
                      background: '#f0dfb7',
                      color: '#342817',
                      boxShadow: '0 8px 20px rgba(15,16,18,0.14)',
                    }}
                  >
                    {collectionBadge}
                  </Pill>
                ) : null}
              </div>
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

            <div
              style={{
                position: 'relative',
                zIndex: 1,
                maxWidth: 396,
                padding: '16px 16px 14px',
                borderRadius: 24,
                background: 'linear-gradient(180deg, rgba(12,18,24,0.12) 0%, rgba(12,18,24,0.42) 20%, rgba(8,12,16,0.72) 100%)',
                border: '1px solid rgba(255,255,255,0.08)',
                backdropFilter: 'blur(10px)',
                boxShadow: '0 18px 30px rgba(6,8,10,0.18)',
              }}
            >
              <SectionEyebrow style={{ color: 'rgba(255,255,255,0.72)', marginBottom: 10 }}>объект в подборке</SectionEyebrow>
              <div style={{ fontSize: 34, fontWeight: 700, lineHeight: 1, color: '#ffffff', marginBottom: 12, textShadow: '0 10px 24px rgba(0,0,0,0.3)' }}>{property.title}</div>
              <div style={{ fontSize: 14, lineHeight: 1.48, color: 'rgba(255,255,255,0.9)', maxWidth: 340, marginBottom: 14 }}>{location || 'Локация уточняется'}</div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, color: '#fff3da', fontWeight: 700, fontSize: 14 }}>
                Смотреть объект <span>→</span>
              </div>
            </div>
          </div>

          <div style={{ padding: 18 }}>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
                gap: 10,
                marginBottom: 14,
              }}
            >
              <div style={{ borderRadius: 18, padding: '12px 10px', background: '#faf6ef' }}>
                <SectionEyebrow style={{ marginBottom: 6 }}>рынок</SectionEyebrow>
                <div style={{ fontWeight: 700, color: '#1d1b18' }}>{property.region.name}</div>
              </div>
              <div style={{ borderRadius: 18, padding: '12px 10px', background: '#faf6ef' }}>
                <SectionEyebrow style={{ marginBottom: 6 }}>локация</SectionEyebrow>
                <div style={{ fontWeight: 700, color: '#1d1b18' }}>{property.city || 'уточняется'}</div>
              </div>
              <div style={{ borderRadius: 18, padding: '12px 10px', background: '#faf6ef' }}>
                <SectionEyebrow style={{ marginBottom: 6 }}>формат</SectionEyebrow>
                <div style={{ fontWeight: 700, color: '#1d1b18' }}>для капитала</div>
              </div>
            </div>

            <div
              style={{
                borderRadius: 22,
                padding: '16px 16px',
                marginBottom: 14,
                background: 'linear-gradient(180deg, #fffaf2 0%, #f6efe4 100%)',
                border: '1px solid rgba(228,216,198,0.92)',
              }}
            >
              <SectionEyebrow style={{ marginBottom: 8 }}>Почему смотреть</SectionEyebrow>
              <div style={{ fontWeight: 700, fontSize: 18, lineHeight: 1.32, color: '#1d1b18', marginBottom: 8 }}>
                Сильный лот для первого просмотра и предметного разговора.
              </div>
              <div style={{ color: '#675b4f', lineHeight: 1.6, fontSize: 14 }}>
                Цена входа, локация и суть объекта уже перед глазами. Дальше, детали, расчёт и следующий шаг.
              </div>
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
              <span>Смотреть детали объекта</span>
              <span style={{ fontSize: 20, lineHeight: 1 }}>→</span>
            </div>
          </div>
        </SurfaceCard>
      </Link>
    </MotionCard>
  );
}
