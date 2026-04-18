import Link from 'next/link';
import { useEffect, useState } from 'react';
import type { PropertyListItem } from '../lib/properties';

export default function HomePage() {
  const [items, setItems] = useState<PropertyListItem[]>([]);

  useEffect(() => {
    fetch('/api/properties')
      .then((res) => res.json())
      .then((data) => setItems((data.items ?? []).slice(0, 4)));
  }, []);

  const featured = items[0];
  const sideTop = items[1];
  const sideBottom = items[2];

  return (
    <main
      style={{
        minHeight: '100vh',
        margin: 0,
        padding: '14px 14px 28px',
        fontFamily: 'Inter, Arial, sans-serif',
        color: '#f7f3ee',
        background: '#050505',
      }}
    >
      <div style={{ maxWidth: 560, margin: '0 auto' }}>
        <section style={{ marginBottom: 14 }}>
          <div style={{ fontSize: 28, fontWeight: 700, lineHeight: 1.1 }}>FlatHouse</div>
          <div style={{ color: 'rgba(255,255,255,0.62)', fontSize: 14, marginTop: 4 }}>Каталог недвижимости</div>
        </section>

        {featured ? (
          <section
            style={{
              marginBottom: 14,
              borderRadius: 28,
              overflow: 'hidden',
              background: 'linear-gradient(180deg, rgba(111,132,188,0.34) 0%, rgba(10,10,10,0.96) 100%)',
              border: '1px solid rgba(255,255,255,0.08)',
              boxShadow: '0 18px 40px rgba(0,0,0,0.34)',
            }}
          >
            <div
              style={{
                minHeight: 360,
                padding: 18,
                display: 'flex',
                alignItems: 'flex-end',
              }}
            >
              <div>
                <div style={{ fontSize: 12, letterSpacing: '0.08em', color: 'rgba(255,255,255,0.72)', marginBottom: 8 }}>
                  {featured.region.name.toUpperCase()}
                </div>
                <div style={{ fontSize: 30, fontWeight: 700, lineHeight: 1.08 }}>{featured.title}</div>
                <div style={{ marginTop: 8, color: 'rgba(255,255,255,0.72)', fontSize: 16 }}>
                  от {featured.priceFrom ?? 'по запросу'} {featured.currency ?? ''}
                </div>
              </div>
            </div>

            <div style={{ padding: 14, display: 'grid', gap: 10 }}>
              <Link
                href="/quiz/region"
                style={{
                  display: 'block',
                  textAlign: 'center',
                  textDecoration: 'none',
                  background: '#0f0f10',
                  color: '#ffffff',
                  padding: '15px 16px',
                  borderRadius: 18,
                  fontWeight: 700,
                  fontSize: 17,
                }}
              >
                Подобрать объект
              </Link>
              <Link
                href="/properties"
                style={{
                  display: 'block',
                  textAlign: 'center',
                  textDecoration: 'none',
                  background: 'rgba(255,255,255,0.08)',
                  color: '#f5efe8',
                  padding: '14px 16px',
                  borderRadius: 18,
                  fontWeight: 700,
                  border: '1px solid rgba(255,255,255,0.08)',
                }}
              >
                Открыть каталог
              </Link>
            </div>
          </section>
        ) : null}

        <section style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 14 }}>
          <Link
            href="/properties"
            style={{
              minHeight: 118,
              borderRadius: 22,
              background: '#111111',
              border: '1px solid rgba(255,255,255,0.08)',
              textDecoration: 'none',
              color: '#f5efe8',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
              fontWeight: 700,
              fontSize: 18,
              padding: 14,
            }}
          >
            Все объекты
          </Link>

          <div style={{ display: 'grid', gap: 10 }}>
            {[sideTop, sideBottom].map((item, index) =>
              item ? (
                <div
                  key={item.id}
                  style={{
                    minHeight: 54,
                    borderRadius: 18,
                    padding: 12,
                    background:
                      index === 0
                        ? 'linear-gradient(180deg, rgba(47,112,128,0.35) 0%, rgba(10,10,10,0.96) 100%)'
                        : 'linear-gradient(180deg, rgba(82,90,112,0.35) 0%, rgba(10,10,10,0.96) 100%)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    display: 'flex',
                    alignItems: 'flex-end',
                  }}
                >
                  <div>
                    <div style={{ fontSize: 10, letterSpacing: '0.08em', color: 'rgba(255,255,255,0.68)', marginBottom: 3 }}>
                      {item.region.name.toUpperCase()}
                    </div>
                    <div style={{ fontSize: 15, fontWeight: 700, lineHeight: 1.05 }}>{item.title}</div>
                  </div>
                </div>
              ) : null,
            )}
          </div>
        </section>

        <section
          style={{
            marginBottom: 14,
            borderRadius: 26,
            padding: 22,
            background: 'linear-gradient(135deg, #26115a 0%, #0d214c 48%, #071730 100%)',
            border: '1px solid rgba(255,255,255,0.08)',
            boxShadow: '0 18px 40px rgba(19, 15, 53, 0.45)',
          }}
        >
          <div
            style={{
              width: 66,
              height: 66,
              borderRadius: 999,
              background: 'linear-gradient(135deg, #7f47ff 0%, #22d1ff 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 800,
              fontSize: 24,
              marginBottom: 16,
            }}
          >
            MAX
          </div>

          <div style={{ display: 'inline-flex', marginBottom: 14, padding: '6px 12px', borderRadius: 999, background: 'rgba(255,255,255,0.08)', color: '#d8d1ff', fontSize: 12, fontWeight: 700 }}>
            АКЦИЯ
          </div>

          <div style={{ fontSize: 33, fontWeight: 700, lineHeight: 1.08, marginBottom: 12 }}>Дарим подарки в канале</div>
          <div style={{ color: 'rgba(255,255,255,0.72)', lineHeight: 1.6, fontSize: 16, marginBottom: 20 }}>
            Розыгрыши, эксклюзивные предложения и бонусы при бронировании.
          </div>

          <a
            href="https://t.me/max"
            style={{
              display: 'block',
              textAlign: 'center',
              textDecoration: 'none',
              background: 'linear-gradient(90deg, #8a3dff 0%, #1ed8ff 100%)',
              color: '#ffffff',
              padding: '16px 18px',
              borderRadius: 18,
              fontWeight: 700,
              fontSize: 17,
            }}
          >
            Перейти в канал
          </a>
        </section>

        <section
          style={{
            marginBottom: 14,
            borderRadius: 24,
            padding: 18,
            background: 'linear-gradient(180deg, #17120e 0%, #0b0b0b 100%)',
            border: '1px solid rgba(226, 188, 123, 0.18)',
          }}
        >
          <div style={{ color: '#c8a56a', fontSize: 13, letterSpacing: '0.08em', marginBottom: 8 }}>КАРЬЕРА</div>
          <div style={{ fontSize: 28, fontWeight: 700, lineHeight: 1.1, marginBottom: 8 }}>Работай там, где другие отдыхают</div>
          <div style={{ color: 'rgba(255,255,255,0.72)', lineHeight: 1.5, marginBottom: 16 }}>3 открытые вакансии · от 200 000 ₽</div>
          <div style={{ color: '#dcc07b', fontWeight: 700 }}>→</div>
        </section>

        <section style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
          <button
            type="button"
            style={{
              borderRadius: 18,
              border: '1px solid rgba(255,255,255,0.08)',
              background: '#141414',
              color: '#f5efe8',
              padding: '16px 10px',
              fontSize: 15,
            }}
          >
            О компании
          </button>
          <button
            type="button"
            style={{
              borderRadius: 18,
              border: '1px solid rgba(255,255,255,0.08)',
              background: '#141414',
              color: '#f5efe8',
              padding: '16px 10px',
              fontSize: 15,
            }}
          >
            Отзывы
          </button>
          <button
            type="button"
            style={{
              borderRadius: 18,
              border: '1px solid rgba(255,255,255,0.08)',
              background: '#141414',
              color: '#f5efe8',
              padding: '16px 10px',
              fontSize: 15,
            }}
          >
            Вакансии
          </button>
        </section>
      </div>
    </main>
  );
}
