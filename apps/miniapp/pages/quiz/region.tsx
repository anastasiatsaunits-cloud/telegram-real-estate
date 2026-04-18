import Link from 'next/link';
import { useEffect, useState } from 'react';
import { AppShell } from '../../components/app-shell';
import { BackLink } from '../../components/back-link';
import { ProgressBar } from '../../components/progress-bar';
import type { Region } from '../../lib/api';

export default function RegionQuizPage() {
  const [regions, setRegions] = useState<Region[]>([]);

  useEffect(() => {
    fetch('/api/regions-proxy')
      .then((res) => res.json())
      .then((data) => setRegions(data.items ?? []));
  }, []);

  return (
    <AppShell eyebrow="Mini App MVP" title="Где планируешь покупку?" description="Выбери регион, и мы продолжим подбор уже по живым данным. ">
      <BackLink href="/" />
      <ProgressBar step={1} total={3} />

      <div style={{ display: 'grid', gap: 12 }}>
        {regions.map((region) => (
          <Link
            key={region.id}
            href={`/quiz/budget?region=${region.slug}&regionName=${encodeURIComponent(region.name)}`}
            style={{
              display: 'block',
              textAlign: 'left',
              border: '1px solid #eadfce',
              borderRadius: 20,
              padding: 18,
              background: 'linear-gradient(180deg, #fffaf6 0%, #fff4ea 100%)',
              textDecoration: 'none',
              color: '#1f1f1f',
              fontSize: 17,
              fontWeight: 700,
              boxShadow: '0 8px 20px rgba(0,0,0,0.04)',
            }}
          >
            {region.name}
          </Link>
        ))}
      </div>
    </AppShell>
  );
}
