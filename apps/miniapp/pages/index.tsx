import Link from 'next/link';

const markets = [
  {
    key: 'crimea',
    title: 'Крым',
    subtitle: 'Первая линия, Ялта, Южный берег, курортные комплексы и видовые резиденции',
    href: '/properties?region=crimea&regionName=Крым',
    gradient: 'linear-gradient(135deg, #6ca6b7 0%, #335c68 100%)',
    size: 'large',
  },
  {
    key: 'sochi',
    title: 'Сочи',
    subtitle: 'Премиальные лоты, доходные объекты и curated подборки по морю и центру',
    href: '/properties?region=sochi&regionName=Сочи',
    gradient: 'linear-gradient(135deg, #7f9d7b 0%, #415847 100%)',
    size: 'large',
  },
  {
    key: 'thailand',
    title: 'Таиланд',
    subtitle: 'Скоро добавим международное направление',
    href: '/quiz/region',
    gradient: 'linear-gradient(135deg, #87aba2 0%, #47635d 100%)',
    size: 'small',
  },
  {
    key: 'mountains',
    title: 'Горный кластер',
    subtitle: 'Отдых, аренда и капитализация в горах',
    href: '/quiz/region',
    gradient: 'linear-gradient(135deg, #8e99a7 0%, #56616c 100%)',
    size: 'small',
  },
];

const bottomLinks = [
  { title: 'О компании', href: '/quiz/ready' },
  { title: 'Отзывы', href: '/quiz/success' },
  { title: 'Заработать', href: '/quiz/contact' },
];

export default function HomePage() {
  const featuredMarkets = markets.filter((market) => market.size === 'large');
  const secondaryMarkets = markets.filter((market) => market.size === 'small');

  return (
    <main
      style={{
        minHeight: '100vh',
        margin: 0,
        padding: '18px 14px 32px',
        fontFamily: 'Inter, Arial, sans-serif',
        color: '#171717',
        background: 'linear-gradient(180deg, #f7f1e8 0%, #f1eadf 100%)',
      }}
    >
      <div style={{ maxWidth: 560, margin: '0 auto' }}>
        <section
          style={{
            background: '#fffdf9',
            borderRadius: 32,
            padding: 18,
            boxShadow: '0 20px 44px rgba(0,0,0,0.08)',
            border: '1px solid rgba(227,219,207,0.92)',
          }}
        >
          <div style={{ marginBottom: 16 }}>
            <div style={{ fontSize: 12, letterSpacing: '0.14em', color: '#8b8478', marginBottom: 8 }}>RICH BY FLATHOUSE</div>
            <div style={{ fontSize: 24, fontWeight: 700, lineHeight: 1.15 }}>Приватный каталог инвестиционной недвижимости</div>
            <div style={{ marginTop: 10, color: '#5c554c', lineHeight: 1.55, fontSize: 15 }}>
              Подборки по проверенным рынкам, curated объекты и короткий путь от Telegram-прогрева до заявки.
            </div>
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
              boxShadow: '0 10px 24px rgba(15,75,34,0.24)',
            }}
          >
            Получить подборку
          </Link>

          <div style={{ display: 'grid', gap: 14, marginBottom: 14 }}>
            {featuredMarkets.map((market) => (
              <Link
                key={market.key}
                href={market.href}
                style={{
                  display: 'block',
                  textDecoration: 'none',
                  borderRadius: 28,
                  overflow: 'hidden',
                  minHeight: 148,
                  padding: 20,
                  color: '#ffffff',
                  background: market.gradient,
                  position: 'relative',
                  boxShadow: 'inset 0 -80px 120px rgba(0,0,0,0.22)',
                }}
              >
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(255,255,255,0.04) 0%, rgba(0,0,0,0.26) 100%)' }} />
                <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
                  <div style={{ display: 'inline-flex', alignSelf: 'flex-start', padding: '7px 12px', borderRadius: 999, background: 'rgba(255,255,255,0.18)', color: '#fff', fontSize: 12, fontWeight: 700, letterSpacing: '0.08em' }}>
                    РЫНОК
                  </div>
                  <div>
                    <div style={{ fontSize: 34, fontWeight: 700, letterSpacing: '0.03em', marginBottom: 8 }}>{market.title}</div>
                    <div style={{ maxWidth: 380, fontSize: 14, lineHeight: 1.45, color: 'rgba(255,255,255,0.9)' }}>{market.subtitle}</div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 18 }}>
            {secondaryMarkets.map((market) => (
              <Link
                key={market.key}
                href={market.href}
                style={{
                  display: 'block',
                  textDecoration: 'none',
                  borderRadius: 24,
                  overflow: 'hidden',
                  minHeight: 128,
                  padding: 18,
                  color: '#ffffff',
                  background: market.gradient,
                  position: 'relative',
                }}
              >
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(255,255,255,0.04) 0%, rgba(0,0,0,0.22) 100%)' }} />
                <div style={{ position: 'relative', zIndex: 1 }}>
                  <div style={{ fontSize: 26, fontWeight: 700, marginBottom: 8 }}>{market.title}</div>
                  <div style={{ fontSize: 13, lineHeight: 1.42, color: 'rgba(255,255,255,0.86)' }}>{market.subtitle}</div>
                </div>
              </Link>
            ))}
          </div>

          <div
            style={{
              borderRadius: 22,
              background: '#f4efe6',
              padding: 16,
              marginBottom: 18,
              border: '1px solid rgba(221,211,196,0.8)',
              color: '#3d372f',
              lineHeight: 1.55,
            }}
          >
            <div style={{ fontWeight: 700, marginBottom: 10 }}>🔐 Доступ к закрытым инвестиционным объектам открыт</div>
            <div>Сейчас уже доступны curated подборки по Крыму и Сочи. Следующий шаг, выбрать рынок и перейти к лотам.</div>
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
