import Link from 'next/link';
import type { PropertyListItem } from '../lib/properties';

export function PropertyCardLink({ property }: { property: PropertyListItem }) {
  return (
    <Link
      href={`/properties/${property.slug}`}
      style={{
        display: 'block',
        textDecoration: 'none',
        border: '1px solid #eadfce',
        borderRadius: 20,
        padding: 18,
        background: '#fffaf6',
        color: '#1f1f1f',
      }}
    >
      <div style={{ fontWeight: 700, fontSize: 18 }}>{property.title}</div>
      <div style={{ marginTop: 8, color: '#7d7367', fontSize: 14 }}>
        {property.region.name}{property.city ? `, ${property.city}` : ''}
      </div>
      <div style={{ marginTop: 10, fontSize: 16, fontWeight: 600 }}>
        от {property.priceFrom ?? 'по запросу'} {property.currency ?? ''}
      </div>
    </Link>
  );
}
