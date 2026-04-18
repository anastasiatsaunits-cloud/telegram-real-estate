import Link from 'next/link';
import { useEffect, useState } from 'react';
import type { Region } from '../lib/api';

export default function HomePage() {
  const [regions, setRegions] = useState<Region[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/regions-proxy')
      .then((res) => res.json())
      .then((data) => setRegions(data.items ?? []))
      .finally(() => setLoading(false));
  }, []);

  return (
    <main style={{ minHeight: '100vh', padding: '24px 20px 40px', fontFamily: 'Inter, Arial, sans-serif', color: '#1f1f1f' }}>
      <section style={{ background: '#fffaf2', borderRadius: 24, padding: 24, boxShadow: '0 10px 30px rgba(0,0,0,0.06)', marginBottom: 20 }}>
        <p style={{ margin: '0 0 8px', color: '#8b7355', fontWeight: 600 }}>Mini App MVP</p>
        <h1 style={{ margin: '0 0 12px', fontSize: 32, lineHeight: 1.1 }}>Подбор недвижимости внутри Telegram</h1>
        <p style={{ margin: '0 0 20px', fontSize: 16, lineHeight: 1.5, color: '#5c5348' }}>
          Первый живой экран miniapp. Регионы уже подтягиваются из backend.
        </p>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <Link href="/quiz/region" style={{ background: '#1f1f1f', color: '#ffffff', textDecoration: 'none', padding: '14px 18px', borderRadius: 14, fontWeight: 600 }}>
            Подобрать объект
          </Link>
        </div>
      </section>

      <section style={{ background: '#ffffff', borderRadius: 24, padding: 20, boxShadow: '0 10px 30px rgba(0,0,0,0.04)' }}>
        <h2 style={{ marginTop: 0 }}>Доступные регионы</h2>
        {loading ? (
          <div style={{ color: '#7d7367' }}>Загружаю регионы...</div>
        ) : (
          <div style={{ display: 'grid', gap: 12 }}>
            {regions.map((region) => (
              <div key={region.id} style={{ border: '1px solid #ece4d8', borderRadius: 18, padding: 16, background: '#fffaf6' }}>
                <div style={{ fontWeight: 700, fontSize: 18 }}>{region.name}</div>
                <div style={{ marginTop: 6, color: '#7d7367', fontSize: 14 }}>slug: {region.slug}</div>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
