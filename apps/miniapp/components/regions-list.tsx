'use client';

import { useEffect, useState } from 'react';
import { getRegions, type Region } from '../lib/api';

export function RegionsList({ compact = false }: { compact?: boolean }) {
  const [regions, setRegions] = useState<Region[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    getRegions()
      .then((items) => {
        if (!mounted) return;
        setRegions(items);
      })
      .catch(() => {
        if (!mounted) return;
        setError('Не удалось загрузить регионы');
      })
      .finally(() => {
        if (!mounted) return;
        setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, []);

  if (loading) {
    return <div style={{ color: '#7d7367' }}>Загружаю регионы...</div>;
  }

  if (error) {
    return <div style={{ color: '#b94a48' }}>{error}</div>;
  }

  return (
    <div style={{ display: 'grid', gap: 12 }}>
      {regions.map((region) => (
        <div
          key={region.id}
          style={{
            border: '1px solid #ece4d8',
            borderRadius: 18,
            padding: compact ? 14 : 16,
            background: '#fffaf6',
          }}
        >
          <div style={{ fontWeight: 700, fontSize: compact ? 16 : 18 }}>{region.name}</div>
          <div style={{ marginTop: 6, color: '#7d7367', fontSize: 14 }}>slug: {region.slug}</div>
        </div>
      ))}
    </div>
  );
}
