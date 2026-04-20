import Link from 'next/link';
import { MotionCard, Pill, PrimaryButton, SectionEyebrow, SurfaceCard } from '../components/ui';

const markets = [
  {
    key: 'crimea',
    title: 'Крым',
    subtitle: 'Ялта, Алушта, первая линия, курортные резиденции и приватные лоты для спокойного капитала',
    badge: 'Private coast',
    href: '/properties?region=crimea&regionName=Крым',
    gradient: 'linear-gradient(135deg, #7db4c7 0%, #436676 42%, #23363e 100%)',
    accent: 'rgba(157, 223, 248, 0.42)',
    size: 'large',
  },
  {
    key: 'sochi',
    title: 'Сочи',
    subtitle: 'Премиальные лоты, доходные объекты и сильные curated подборки по морю, центру и статусным локациям',
    badge: 'Curated market',
    href: '/properties?region=sochi&regionName=Сочи',
    gradient: 'linear-gradient(135deg, #8ba685 0%, #566b52 42%, #233129 100%)',
    accent: 'rgba(206, 230, 187, 0.32)',
    size: 'large',
  },
  {
    key: 'thailand',
    title: 'Таиланд',
    subtitle: 'Скоро добавим международное направление',
    href: '/quiz/region',
    gradient: 'linear-gradient(135deg, #9eb8b0 0%, #5f776f 100%)',
    size: 'small',
  },
  {
    key: 'mountains',
    title: 'Горный кластер',
    subtitle: 'Отдых, аренда и капитализация в горах',
    href: '/quiz/region',
    gradient: 'linear-gradient(135deg, #9ca8b6 0%, #5f6a77 100%)',
    size: 'small',
  },
];

const bottomLinks = [
  { title: 'О компании', href: '/quiz/ready' },
  { title: 'Отзывы', href: '/quiz/success' },
  { title: 'Заработать', href: '/quiz/contact' },
];

const premiumSignals = [
  'Два живых рынка, Крым и Сочи, уже разведены отдельно',
  'Закрытые подборки без перегруза CRM-шумом',
  'Короткий путь от просмотра объекта до заявки',
];

const trustNumbers = [
  { value: '2', label: 'живых рынка' },
  { value: '24/7', label: 'concierge-подбор' },
  { value: '1', label: 'точка входа в инвестицию' },
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
        background:
          'radial-gradient(circle at top, rgba(255,255,255,0.68) 0%, rgba(255,255,255,0) 28%), linear-gradient(180deg, #f6efe6 0%, #efe7db 100%)',
      }}
    >
      <div style={{ maxWidth: 560, margin: '0 auto' }}>
        <SurfaceCard
          style={{
            background: 'rgba(255,253,249,0.94)',
            borderRadius: 34,
            padding: 18,
            boxShadow: '0 24px 54px rgba(24,19,15,0.09)',
            backdropFilter: 'blur(12px)',
          }}
        >
          <div
            style={{
              marginBottom: 18,
              borderRadius: 30,
              padding: '18px 18px 20px',
              background: 'linear-gradient(145deg, #18231f 0%, #243a31 45%, #65533c 100%)',
              color: '#ffffff',
              position: 'relative',
              overflow: 'hidden',
              boxShadow: '0 18px 34px rgba(32, 30, 24, 0.18)',
            }}
          >
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background:
                  'radial-gradient(circle at top right, rgba(220,198,157,0.28) 0%, rgba(220,198,157,0) 28%), radial-gradient(circle at bottom left, rgba(136,176,177,0.2) 0%, rgba(136,176,177,0) 30%)',
              }}
            />
            <div style={{ position: 'relative', zIndex: 1 }}>
              <Pill
                style={{
                  gap: 8,
                  marginBottom: 14,
                  background: 'rgba(255,255,255,0.12)',
                  border: '1px solid rgba(255,255,255,0.14)',
                  color: 'rgba(255,247,231,0.9)',
                }}
              >
                RICH BY FLATHOUSE <span style={{ opacity: 0.7 }}>•</span> private catalog
              </Pill>

              <div style={{ fontSize: 30, fontWeight: 700, lineHeight: 1.06, marginBottom: 12 }}>
                Приватный вход в каталог инвестиционной недвижимости, уже разведённый по рынкам
              </div>

              <div style={{ color: 'rgba(255,255,255,0.78)', lineHeight: 1.6, fontSize: 15, marginBottom: 18 }}>
                Сначала выбираем рынок, потом открываем сильные объекты. Крым и Сочи теперь идут отдельными направлениями, без смешанной выдачи.
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: 10, marginBottom: 18 }}>
                {trustNumbers.map((item) => (
                  <div
                    key={item.label}
                    style={{
                      borderRadius: 18,
                      padding: '14px 10px',
                      background: 'rgba(255,255,255,0.08)',
                      border: '1px solid rgba(255,255,255,0.08)',
                    }}
                  >
                    <div style={{ fontSize: 22, fontWeight: 700, color: '#fff5dd', marginBottom: 6 }}>{item.value}</div>
                    <div style={{ fontSize: 12, lineHeight: 1.35, color: 'rgba(255,255,255,0.7)' }}>{item.label}</div>
                  </div>
                ))}
              </div>

              <div style={{ display: 'grid', gap: 10, marginBottom: 18 }}>
                {premiumSignals.map((signal) => (
                  <div
                    key={signal}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 10,
                      color: '#f8f2e7',
                      fontSize: 14,
                    }}
                  >
                    <div
                      style={{
                        width: 6,
                        height: 6,
                        borderRadius: 999,
                        background: '#d7bf8f',
                        boxShadow: '0 0 0 6px rgba(215,191,143,0.12)',
                        flexShrink: 0,
                      }}
                    />
                    <span>{signal}</span>
                  </div>
                ))}
              </div>

              <PrimaryButton
                href="/properties"
                style={{
                  background: '#e7d5ae',
                  color: '#1e201c',
                  boxShadow: '0 10px 24px rgba(14,20,17,0.26)',
                }}
              >
                Открыть рынки и объекты
              </PrimaryButton>
            </div>
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 12,
              marginBottom: 14,
              padding: '0 4px',
            }}
          >
            <div>
              <SectionEyebrow style={{ marginBottom: 6 }}>Выбор рынка</SectionEyebrow>
              <div style={{ fontSize: 22, fontWeight: 700, lineHeight: 1.12, color: '#1d1b18' }}>Сначала выбери рынок, потом открывай объекты</div>
            </div>
            <Pill style={{ flexShrink: 0 }}>2 live markets</Pill>
          </div>

          <div style={{ display: 'grid', gap: 14, marginBottom: 14 }}>
            {featuredMarkets.map((market) => (
              <MotionCard key={market.key}>
                <Link
                  href={market.href}
                  style={{
                    display: 'block',
                    textDecoration: 'none',
                    borderRadius: 30,
                    overflow: 'hidden',
                    minHeight: 216,
                    padding: 20,
                    color: '#ffffff',
                    background: market.gradient,
                    backgroundImage: market.key === 'crimea'
                      ? 'linear-gradient(180deg, rgba(12,18,22,0.12) 0%, rgba(10,13,16,0.5) 100%), url(/market/crimea-cover.jpg)'
                      : market.key === 'sochi'
                        ? 'linear-gradient(180deg, rgba(12,18,22,0.12) 0%, rgba(10,13,16,0.5) 100%), url(/market/sochi-cover.jpg)'
                        : market.gradient,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    position: 'relative',
                    boxShadow: '0 18px 34px rgba(20, 21, 20, 0.12)',
                  }}
                >
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background:
                        'linear-gradient(180deg, rgba(255,255,255,0.06) 0%, rgba(0,0,0,0.3) 100%)',
                    }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      right: -20,
                      top: -18,
                      width: 140,
                      height: 140,
                      borderRadius: '50%',
                      background: market.accent,
                      filter: 'blur(8px)',
                    }}
                  />
                  <div
                    style={{
                      position: 'relative',
                      zIndex: 1,
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      height: '100%',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, alignItems: 'flex-start' }}>
                      <Pill
                        style={{
                          background: 'rgba(255,255,255,0.16)',
                          color: '#fff',
                        }}
                      >
                        {market.badge}
                      </Pill>
                      <div style={{ color: 'rgba(255,255,255,0.82)', fontSize: 22 }}>↗</div>
                    </div>

                    <div>
                      <div style={{ fontSize: 42, fontWeight: 700, letterSpacing: '0.03em', marginBottom: 8 }}>{market.title}</div>
                      <div style={{ maxWidth: 390, fontSize: 14, lineHeight: 1.5, color: 'rgba(255,255,255,0.9)', marginBottom: 14 }}>
                        {market.subtitle}
                      </div>
                      <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, color: '#fff5dd', fontWeight: 700, fontSize: 14 }}>
                        Смотреть объекты <span>→</span>
                      </div>
                    </div>
                  </div>
                </Link>
              </MotionCard>
            ))}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 18 }}>
            {secondaryMarkets.map((market) => (
              <MotionCard key={market.key}>
                <Link
                  href={market.href}
                  style={{
                    display: 'block',
                    textDecoration: 'none',
                    borderRadius: 24,
                    overflow: 'hidden',
                    minHeight: 140,
                    padding: 18,
                    color: '#ffffff',
                    background: market.gradient,
                    position: 'relative',
                  }}
                >
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(255,255,255,0.04) 0%, rgba(0,0,0,0.22) 100%)' }} />
                  <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
                    <SectionEyebrow style={{ color: 'rgba(255,255,255,0.72)' }}>watchlist</SectionEyebrow>
                    <div>
                      <div style={{ fontSize: 26, fontWeight: 700, marginBottom: 8 }}>{market.title}</div>
                      <div style={{ fontSize: 13, lineHeight: 1.42, color: 'rgba(255,255,255,0.86)' }}>{market.subtitle}</div>
                    </div>
                  </div>
                </Link>
              </MotionCard>
            ))}
          </div>

          <div
            style={{
              borderRadius: 24,
              background: 'linear-gradient(180deg, #f6efe4 0%, #f2eadc 100%)',
              padding: 16,
              marginBottom: 18,
              border: '1px solid rgba(221,211,196,0.8)',
              color: '#3d372f',
              lineHeight: 1.55,
            }}
          >
            <SectionEyebrow style={{ marginBottom: 8 }}>Concierge note</SectionEyebrow>
            <div style={{ fontWeight: 700, marginBottom: 8 }}>Каталог уже живой: Крым и Сочи открываются как отдельные рынки, а не как смешанная витрина.</div>
            <div>
              Если нужен быстрый показ, открывай рынок сразу. Если нужен более точный сценарий входа, можно увести клиента в персональную подборку через квиз.
            </div>
          </div>

          <div
            style={{
              borderRadius: 24,
              background: 'linear-gradient(180deg, #173328 0%, #234338 100%)',
              padding: 14,
              boxShadow: '0 16px 32px rgba(19,40,31,0.18)',
            }}
          >
            <SectionEyebrow style={{ marginBottom: 10, color: 'rgba(231,221,205,0.7)' }}>Дополнительные входы в funnel</SectionEyebrow>
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
                    background: 'rgba(255,255,255,0.1)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    color: '#ffffff',
                    fontSize: 13,
                    fontWeight: 700,
                  }}
                >
                  {item.title}
                </Link>
              ))}
            </div>
          </div>
        </SurfaceCard>
      </div>
    </main>
  );
}
