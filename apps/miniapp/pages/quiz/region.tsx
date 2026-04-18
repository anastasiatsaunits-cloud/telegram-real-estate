import Link from 'next/link';
import { useEffect, useState } from 'react';
import type { Region } from '../../lib/api';

export default function RegionQuizPage() {
  const [regions, setRegions] = useState<Region[]>([]);

  useEffect(() => {
    fetch('/api/regions-proxy')
      .then((res) => res.json())
      .then((data) => setRegions(data.items ?? []));
  }, []);

  return (
    <main style={{ minHeight: '100vh', padding: '24px 20px 40px', fontFamily: 'Inter, Arial, sans-serif', color: '#1f1f1f' }}>
      <div style={{ marginBottom: 20 }}>
        <Link href="/" style={{ color: '#8b7355', textDecoration: 'none', fontWeight: 600 }}>
          ← На главную
        </Link>
      </div>

      <section style={{ background: '#ffffff', borderRadius: 24, padding: 24, boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
        <p style={{ margin: '0 0 8px', color: '#8b7355', fontWeight: 600 }}>Шаг 1 из 3</p>
        <h1 style={{ margin: '0 0 12px', fontSize: 30 }}>Где планируешь покупку?</h1>
        <p style={{ margin: '0 0 20px', color: '#5c5348', lineHeight: 1.5 }}>Первый живой экран выбора региона для miniapp MVP.</p>

        <div style={{ display: 'grid', gap: 12 }}>
          {regions.map((region) => (
            <Link
              key={region.id}
              href={`/quiz/budget?region=${region.slug}&regionName=${encodeURIComponent(region.name)}`}
              style={{
                display: 'block',
                textAlign: 'left',
                border: '1px solid #eadfce',
                borderRadius: 18,
                padding: 18,
                background: '#fffaf6',
                textDecoration: 'none',
                color: '#1f1f1f',
                fontSize: 17,
                fontWeight: 600,
              }}
            >
              {region.name}
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
