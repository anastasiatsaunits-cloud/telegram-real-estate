import Link from 'next/link';

const markets = [
  { key: 'crimea', title: 'Крым', subtitle: 'Первая линия, курортные комплексы, Ялта и южный берег', href: '/properties?regionName=Крым' },
  { key: 'sochi', title: 'Сочи', subtitle: 'Проверенные проекты и инвестиционные лоты', href: '/properties?region=sochi&regionName=Сочи' },
  { key: 'thailand', title: 'Таиланд', subtitle: 'Подготовим международное направление следующим этапом', href: '/quiz/region' },
  { key: 'mountains', title: 'Горный кластер', subtitle: 'Подборка под отдых, аренду и капитализацию', href: '/quiz/region' },
];

const bottomLinks = [
  { title: 'О компании', href: '/quiz/ready' },
  { title: 'Отзывы', href: '/quiz/success' },
  { title: 'Заработать', href: '/quiz/contact' },
];

export default function HomePage() {
  return (
    <main
      style={{
        minHeight: '100vh',
        margin: 0,
        padding: '18px 14px 32px',
        fontFamily: 'Inter, Arial, sans-serif',
        color: '#171717',
        background: '#f6f2ea',
      }}
    >
      <div style={{ maxWidth: 560, margin: '0 auto' }}>
        <section
          style={{
            background: '#fffdf9',
            borderRadius: 30,
            padding: 18,
            boxShadow: '0 18px 40px rgba(0,0,0,0.08)',
            border: '1px solid rgba(227,219,207,0.9)',
          }}
        >
          <div style={{ marginBottom: 16 }}>
            <div style={{ fontSize: 12, letterSpacing: '0.12em', color: '#8a857d', marginBottom: 8 }}>RICH</div>
            <div style={{ fontSize: 20, fontWeight: 700, lineHeight: 1.2 }}>Привет, Анастасия</div>
          </div>

          <Link
            href="/quiz/region"
            style={{
              display: 'block',
              textDecoration: 'none',
              textAlign: 'center',
              background: '#0f4b22',
              color: '#ffffff',
              padding: '18px 16px',
              borderRadius: 18,
              fontWeight: 700,
              fontSize: 18,
              marginBottom: 18,
              boxShadow: '0 10px 24px rgba(15,75,34,0.25)',
            }}
          >
            Получить подборку
          </Link>

          <div style={{ display: 'grid', gap: 14, marginBottom: 18 }}>
            {markets.map((market, index) => (
              <Link
                key={market.key}
                href={market.href}
                style={{
                  display: 'block',
                  textDecoration: 'none',
                  borderRadius: 24,
                  overflow: 'hidden',
                  minHeight: index < 2 ? 118 : 104,
                  padding: 18,
                  color: '#ffffff',
                  background:
                    market.key === 'crimea'
                      ? 'linear-gradient(135deg, #4ba0b3 0%, #295a68 100%)'
                      : market.key === 'sochi'
                        ? 'linear-gradient(135deg, #70986e 0%, #395740 100%)'
                        : market.key === 'thailand'
                          ? 'linear-gradient(135deg, #6aa89b 0%, #2f6158 100%)'
                          : 'linear-gradient(135deg, #7690a1 0%, #465865 100%)',
                  position: 'relative',
                  boxShadow: 'inset 0 -80px 120px rgba(0,0,0,0.18)',
                }}
              >
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(255,255,255,0.02) 0%, rgba(0,0,0,0.18) 100%)' }} />
                <div style={{ position: 'relative', zIndex: 1 }}>
                  <div style={{ fontSize: 30, fontWeight: 700, letterSpacing: '0.04em', marginBottom: 8 }}>{market.title}</div>
                  <div style={{ maxWidth: 360, fontSize: 13, lineHeight: 1.45, color: 'rgba(255,255,255,0.86)' }}>{market.subtitle}</div>
                </div>
              </Link>
            ))}
          </div>

          <div
            style={{
              borderRadius: 20,
              background: '#f4efe6',
              padding: 16,
              marginBottom: 18,
              border: '1px solid rgba(221,211,196,0.8)',
              color: '#3d372f',
              lineHeight: 1.55,
            }}
          >
            <div style={{ fontWeight: 700, marginBottom: 10 }}>🔐 Доступ к закрытым инвестиционным объектам открыт.</div>
            <div>В этом каталоге собраны подборки по Крыму и Сочи, которые уже можно смотреть и фильтровать.</div>
            <div style={{ marginTop: 10 }}>Нажмите на нужный рынок и переходите к объектам.</div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
            {bottomLinks.map((item) => (
              <Link
                key={item.title}
                href={item.href}
                style={{
                  textDecoration: 'none',
                  textAlign: 'center',
                  borderRadius: 16,
                  padding: '14px 10px',
                  background: '#0f4b22',
                  color: '#ffffff',
                  fontSize: 13,
                  fontWeight: 700,
                  boxShadow: '0 8px 18px rgba(15,75,34,0.18)',
                }}
              >
                {item.title}
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
