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
    return <div style={{ color: '#7d7367' }}>Подбираю направления...</div>;
  }

  if (error) {
    return <div style={{ color: '#b94a48' }}>Список направлений временно недоступен</div>;
  }

  return (
    <div style={{ display: 'grid', gap: 12 }}>
      {regions.map((region, index) => (
        <div
          key={region.id}
          style={{
            border: '1px solid #ece4d8',
            borderRadius: 20,
            padding: compact ? 14 : 16,
            background: '#fffaf6',
            boxShadow: '0 10px 24px rgba(71, 52, 30, 0.05)',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, alignItems: 'center' }}>
            <div>
              <div style={{ fontWeight: 700, fontSize: compact ? 16 : 18 }}>{region.name}</div>
              <div style={{ marginTop: 6, color: '#7d7367', fontSize: 14 }}>
                {index === 0
                  ? 'Готовые варианты для жизни и инвестиций'
                  : index === 1
                    ? 'Подборки по бюджету, доходности и сроку покупки'
                    : 'Актуальные предложения с быстрым входом в подбор'}
              </div>
            </div>
            <div
              style={{
                minWidth: 42,
                height: 42,
                borderRadius: 14,
                background: '#f3e7d7',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#8c6b49',
                fontWeight: 700,
              }}
            >
              {String(index + 1).padStart(2, '0')}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
