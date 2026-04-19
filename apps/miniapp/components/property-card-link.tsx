import Link from 'next/link';
import type { PropertyListItem } from '../lib/properties';

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
  return (
    <Link
      href={
        regionQuery
          ? `/properties/${property.slug}?region=${regionQuery}&regionName=${encodeURIComponent(regionName ?? '')}${budgetKey ? `&budgetKey=${budgetKey}` : ''}${timelineKey ? `&timelineKey=${timelineKey}` : ''}`
          : `/properties/${property.slug}`
      }
      style={{
        display: 'block',
        textDecoration: 'none',
        border: '1px solid rgba(230,222,210,0.95)',
        borderRadius: 28,
        overflow: 'hidden',
        background: '#fffdf9',
        color: '#161616',
        boxShadow: '0 14px 30px rgba(0,0,0,0.08)',
      }}
    >
      <div
        style={{
          minHeight: 220,
          padding: 18,
          display: 'flex',
          alignItems: 'flex-end',
          background:
            property.region.slug === 'sochi'
              ? 'linear-gradient(135deg, #7e9fb6 0%, #52687a 100%)'
              : 'linear-gradient(135deg, #7396a8 0%, #4f6470 100%)',
          position: 'relative',
        }}
      >
        <div
          style={{
            position: 'absolute',
            left: 16,
            top: 16,
            padding: '8px 14px',
            borderRadius: 999,
            background: 'rgba(255,255,255,0.92)',
            color: '#181818',
            fontWeight: 700,
            fontSize: 14,
          }}
        >
          от {property.priceFrom ?? 'по запросу'} {property.currency ?? ''}
        </div>

        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ fontSize: 34, fontWeight: 700, lineHeight: 1.02, color: '#ffffff', marginBottom: 8 }}>{property.title}</div>
          <div style={{ fontSize: 13, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.92)' }}>
            {property.city || property.region.name}
          </div>
        </div>
      </div>

      <div style={{ padding: 18 }}>
        <div
          style={{
            display: 'block',
            textAlign: 'center',
            borderRadius: 18,
            padding: '16px 18px',
            background: '#0f4b22',
            color: '#ffffff',
            fontWeight: 700,
            fontSize: 17,
            boxShadow: '0 10px 24px rgba(15,75,34,0.18)',
          }}
        >
          Подробнее
        </div>
      </div>
    </Link>
  );
}
