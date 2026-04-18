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
        border: '1px solid #eadfce',
        borderRadius: 22,
        padding: 18,
        background: 'linear-gradient(180deg, #fffaf6 0%, #fff4ea 100%)',
        color: '#1f1f1f',
        boxShadow: '0 10px 24px rgba(0,0,0,0.05)',
      }}
    >
      <div style={{ display: 'inline-flex', marginBottom: 10, padding: '6px 10px', borderRadius: 999, background: '#f1e3d3', color: '#8c6a48', fontSize: 12, fontWeight: 700 }}>
        {property.region.name}
      </div>
      <div style={{ fontWeight: 700, fontSize: 18, lineHeight: 1.35 }}>{property.title}</div>
      <div style={{ marginTop: 8, color: '#7d7367', fontSize: 14 }}>
        {property.city ? property.city : 'Локация уточняется'}
      </div>
      <div style={{ marginTop: 12, fontSize: 17, fontWeight: 700 }}>
        от {property.priceFrom ?? 'по запросу'} {property.currency ?? ''}
      </div>
    </Link>
  );
}
