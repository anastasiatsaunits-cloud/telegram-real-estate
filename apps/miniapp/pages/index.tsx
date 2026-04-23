import Link from 'next/link';
import { MotionCard, Pill, PrimaryButton, SectionEyebrow, SurfaceCard } from '../components/ui';

const startSalesProjects = [
  {
    title: 'ЛОК VERA',
    subtitle: 'Пятизвёздочный лечебно-оздоровительный комплекс с масштабной территорией, медцентром, spa, бассейнами и сильной подачей для предстартовых клиентов.',
    location: 'Предстарт продаж · 47 000 м² территории · 1 200 номеров',
    price: 'от 750 000 ₽/м²',
    badge: 'Предстарт продаж',
    eyebrow: 'Новый предстарт · курортный формат',
    href: '/quiz/contact?propertyTitle=%D0%9B%D0%9E%D0%9A%20VERA',
    image: '/market/vera-start-sales.jpg',
  },
  {
    title: 'ГК Mandarin Garden',
    subtitle: 'Новый комплекс в Сочи с тихой приватной подачей и высоким порогом внимания уже на старте.',
    location: 'Сочи, ул. Демократическая, 18',
    price: 'от 69,6 млн ₽',
    badge: 'Старт продаж',
    eyebrow: 'Сочи · новая подача',
    href: '/properties/gk-mandarin-garden-mandarin-garden?region=sochi&regionName=Сочи',
    image: 'https://новостройки93.рф/upload/resize_cache/iblock/d59/650_450_2/wicp45v88zvfw26jx28y10qslf5o2vxi.jpeg',
  },
  {
    title: 'ЖК Кировъ',
    subtitle: 'Премиальный жилой квартал в сердце исторической Ялты. Два восьмиэтажных дома, 128 квартир и панорамные виды на море, горы и центр города.',
    location: 'Ялта, исторический центр, берег Чёрного моря',
    price: 'от 400 000 ₽/м²',
    badge: 'Скоро старт',
    eyebrow: 'Крым · новая премьера',
    href: '/properties/zhk-kirov?region=crimea&regionName=Крым',
    image: '/market/kirov-start-sales-cover.png',
  },
];

const markets = [
  {
    key: 'anapa',
    title: 'Анапа',
    kicker: 'Курортный вход',
    subtitle: 'Новые проекты у моря, стартовые запуски и отдельная витрина для спокойного входа в рынок.',
    footnote: 'Для тех, кто хочет смотреть Анапу отдельно и без смешения с другими локациями',
    badge: 'Новый регион',
    href: '/properties?region=anapa&regionName=Анапа',
    gradient: 'linear-gradient(135deg, rgba(74,47,24,0.12) 0%, rgba(22,15,10,0.72) 100%)',
    accent: 'rgba(243, 203, 154, 0.34)',
    image: 'https://новостройки93.рф/upload/iblock/6c0/1grz6rcv8v3faeuclkmq387z3ixsjm46.jpg',
    size: 'large',
  },
  {
    key: 'crimea',
    title: 'Крым',
    kicker: 'Курортный рынок',
    subtitle: 'Ялта, Алушта, первая линия, резиденции у моря и объекты для спокойного входа в курортную недвижимость',
    footnote: 'Для тех, кто ищет море, приватность и аккуратную сезонную доходность',
    badge: 'Первая линия',
    href: '/properties?region=crimea&regionName=Крым',
    gradient: 'linear-gradient(135deg, rgba(29,53,64,0.12) 0%, rgba(10,16,22,0.72) 100%)',
    accent: 'rgba(157, 223, 248, 0.42)',
    image: '/market/crimea-cover.jpg',
    size: 'large',
  },
  {
    key: 'sochi',
    title: 'Сочи',
    kicker: 'Город у моря',
    subtitle: 'Премиальные объекты у моря, в центре и в сильных локациях для тех, кто смотрит на ликвидность и аренду',
    footnote: 'Для входа в рынок с быстрым спросом и сильной динамикой',
    badge: 'Активный рынок',
    href: '/properties?region=sochi&regionName=Сочи',
    gradient: 'linear-gradient(135deg, rgba(24,44,28,0.12) 0%, rgba(10,16,22,0.72) 100%)',
    accent: 'rgba(206, 230, 187, 0.32)',
    image: '/market/sochi-cover.jpg',
    size: 'large',
  },
  {
    key: 'thailand',
    title: 'Таиланд',
    subtitle: 'Готовим международное направление для курортных инвестиций',
    href: '/quiz/scenario',
    gradient: 'linear-gradient(135deg, #9eb8b0 0%, #5f776f 100%)',
    size: 'small',
  },
  {
    key: 'mountains',
    title: 'Горный кластер',
    subtitle: 'Резиденции и арендные форматы в локациях с круглогодичным спросом',
    href: '/quiz/scenario',
    gradient: 'linear-gradient(135deg, #9ca8b6 0%, #5f6a77 100%)',
    size: 'small',
  },
];

const bottomLinks = [
  { title: 'О проекте', href: '/quiz/scenario' },
  { title: 'Отзывы', href: '/quiz/success' },
  { title: 'Инвесторам', href: '/quiz/contact' },
];

const premiumSignals = [
  'Крым, Сочи и Анапа разделены по логике спроса, доходности и образа жизни',
  'В каталоге только объекты, которые можно уверенно показывать взыскательному клиенту',
  'Если нужен не просмотр, а решение, переводим сразу в персональный подбор',
];

const trustNumbers = [
  { value: '3', label: 'рынка в каталоге' },
  { value: '24/7', label: 'сопровождение в Telegram' },
  { value: '72ч', label: 'на точную подборку' },
];

const conciergeSteps = [
  {
    title: 'Выберите рынок',
    text: 'Крым, если важны море и приватность. Сочи, если нужен более активный рынок. Анапа, если смотришь ранний курортный вход и новые запуски.',
  },
  {
    title: 'Откройте объекты',
    text: 'Смотрите уже отобранные лоты с ценой входа, локацией и понятной логикой покупки.',
  },
  {
    title: 'Оставьте запрос на подбор',
    text: 'Если нужен точный сценарий, соберём предложения под бюджет, срок и цель покупки.',
  },
];

export default function HomePage() {
  const featuredMarkets = markets.filter((market) => market.size === 'large');
  const secondaryMarkets = markets.filter((market) => market.size === 'small');

  return (
    <main
      style={{
        minHeight: '100vh',
        margin: 0,
        padding: '0 0 32px',
        fontFamily: 'Inter, Arial, sans-serif',
        color: '#f7f1e8',
        background:
          'radial-gradient(circle at top, rgba(188,156,109,0.12) 0%, rgba(9,13,18,0) 26%), linear-gradient(180deg, #0c1117 0%, #121a21 42%, #181d1b 100%)',
      }}
    >
      <div style={{ maxWidth: 560, margin: '0 auto', padding: '0 14px' }}>
        <div
          style={{
            position: 'relative',
            minHeight: 640,
            marginBottom: 18,
            borderRadius: '0 0 34px 34px',
            overflow: 'hidden',
            backgroundImage:
              'linear-gradient(180deg, rgba(7,10,14,0.24) 0%, rgba(7,10,14,0.68) 48%, rgba(10,12,15,0.96) 100%), url(/market/sochi-cover.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            boxShadow: '0 30px 70px rgba(0,0,0,0.34)',
          }}
        >
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background:
                'radial-gradient(circle at top right, rgba(226,197,141,0.22) 0%, rgba(226,197,141,0) 30%), radial-gradient(circle at bottom left, rgba(83,116,104,0.32) 0%, rgba(83,116,104,0) 34%)',
            }}
          />

          <div
            style={{
              position: 'relative',
              zIndex: 1,
              minHeight: 640,
              padding: '22px 20px 24px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <Pill
                style={{
                  gap: 8,
                  marginBottom: 18,
                  background: 'rgba(255,255,255,0.08)',
                  border: '1px solid rgba(255,255,255,0.12)',
                  color: 'rgba(255,247,231,0.92)',
                  backdropFilter: 'blur(8px)',
                }}
              >
                RICH BY FLATHOUSE <span style={{ opacity: 0.7 }}>•</span> закрытый доступ к объектам
              </Pill>
            </div>

            <div>
              <SectionEyebrow style={{ color: 'rgba(255,240,219,0.72)', marginBottom: 10 }}>Закрытый доступ</SectionEyebrow>
              <div style={{ fontSize: 38, fontWeight: 700, lineHeight: 0.98, marginBottom: 16, maxWidth: 420 }}>
                Недвижимость, которую подбирают под задачу капитала, а не показывают в общей ленте
              </div>

              <div style={{ color: 'rgba(255,245,232,0.8)', lineHeight: 1.6, fontSize: 16, maxWidth: 420, marginBottom: 20 }}>
                Крым, Сочи и Анапа открываются как три разных инвестиционных сценария. Только сильные объекты, понятная логика входа и короткий путь к решению.
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: 10, marginBottom: 18 }}>
                {trustNumbers.map((item) => (
                  <div
                    key={item.label}
                    style={{
                      borderRadius: 20,
                      padding: '14px 10px',
                      background: 'rgba(255,255,255,0.08)',
                      border: '1px solid rgba(255,255,255,0.08)',
                      backdropFilter: 'blur(10px)',
                    }}
                  >
                    <div style={{ fontSize: 22, fontWeight: 700, color: '#fff4dc', marginBottom: 6 }}>{item.value}</div>
                    <div style={{ fontSize: 12, lineHeight: 1.35, color: 'rgba(255,255,255,0.72)' }}>{item.label}</div>
                  </div>
                ))}
              </div>

              <div style={{ display: 'grid', gap: 10, marginBottom: 22 }}>
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

              <div style={{ display: 'grid', gap: 10 }}>
                <PrimaryButton
                  href="/properties"
                  style={{
                    background: 'linear-gradient(135deg, #f0dfb7 0%, #dcc08c 100%)',
                    color: '#181715',
                    boxShadow: '0 18px 34px rgba(0,0,0,0.26)',
                    borderRadius: 20,
                    fontSize: 17,
                  }}
                >
                  Открыть рынки
                </PrimaryButton>

                <Link
                  href="/quiz/scenario"
                  style={{
                    display: 'block',
                    textDecoration: 'none',
                    textAlign: 'center',
                    padding: '16px 16px',
                    borderRadius: 20,
                    fontWeight: 700,
                    fontSize: 16,
                    color: '#f8f2e7',
                    background: 'rgba(255,255,255,0.08)',
                    border: '1px solid rgba(255,255,255,0.14)',
                    backdropFilter: 'blur(10px)',
                  }}
                >
                  Получить персональный подбор
                </Link>

                <div style={{ color: 'rgba(255,245,232,0.68)', fontSize: 13, lineHeight: 1.45, textAlign: 'center' }}>
                  Если нужен готовый список сильных объектов под бюджет и срок, соберём его персонально.
                </div>
              </div>
            </div>
          </div>
        </div>

        <SurfaceCard
          style={{
            background: 'rgba(246,239,228,0.06)',
            borderRadius: 30,
            padding: 18,
            boxShadow: '0 24px 54px rgba(0,0,0,0.16)',
            backdropFilter: 'blur(16px)',
            border: '1px solid rgba(255,255,255,0.08)',
          }}
        >
          <div
            style={{
              marginBottom: 16,
              borderRadius: 24,
              padding: '18px 18px 16px',
              background: 'linear-gradient(180deg, #f6efe4 0%, #f2eadf 100%)',
              border: '1px solid rgba(223,210,193,0.92)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, marginBottom: 14 }}>
              <div>
                <SectionEyebrow style={{ marginBottom: 6 }}>Как это работает</SectionEyebrow>
                <div style={{ fontSize: 22, fontWeight: 700, lineHeight: 1.16, color: '#1d1b18' }}>Не листать десятки карточек, а быстро выйти на сильный вариант</div>
              </div>
              <Pill style={{ flexShrink: 0, background: '#efe4d2', color: '#6d5c49' }}>Частный маршрут</Pill>
            </div>

            <div style={{ display: 'grid', gap: 10 }}>
              {conciergeSteps.map((step, index) => (
                <div
                  key={step.title}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '36px 1fr',
                    gap: 12,
                    alignItems: 'start',
                    borderRadius: 18,
                    padding: '12px 12px',
                    background: 'rgba(255,255,255,0.58)',
                  }}
                >
                  <div
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: 999,
                      background: '#1f2b25',
                      color: '#f7ecd7',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 700,
                    }}
                  >
                    {index + 1}
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, color: '#1f1b17', marginBottom: 4 }}>{step.title}</div>
                    <div style={{ lineHeight: 1.6, color: '#665a4d', fontSize: 14 }}>{step.text}</div>
                  </div>
                </div>
              ))}
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
              <div style={{ fontSize: 22, fontWeight: 700, lineHeight: 1.12, color: '#1d1b18' }}>Сначала рынок, потом объекты</div>
            </div>
            <Pill style={{ flexShrink: 0 }}>3 направления</Pill>
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
                    backgroundImage: `linear-gradient(180deg, rgba(12,18,22,0.12) 0%, rgba(10,13,16,0.5) 100%), url(${market.image})`,
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
                      <SectionEyebrow style={{ color: 'rgba(255,244,221,0.72)', marginBottom: 8 }}>{market.kicker}</SectionEyebrow>
                      <div style={{ fontSize: 42, fontWeight: 700, letterSpacing: '0.03em', marginBottom: 8 }}>{market.title}</div>
                      <div style={{ maxWidth: 390, fontSize: 14, lineHeight: 1.5, color: 'rgba(255,255,255,0.9)', marginBottom: 14 }}>
                        {market.subtitle}
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
                        <div style={{ maxWidth: 230, fontSize: 12, lineHeight: 1.45, color: 'rgba(255,255,255,0.72)' }}>{market.footnote}</div>
                        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, color: '#fff5dd', fontWeight: 700, fontSize: 14, flexShrink: 0 }}>
                          Смотреть объекты <span>→</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </MotionCard>
            ))}
          </div>

          <div
            style={{
              marginBottom: 18,
              borderRadius: 24,
              padding: '16px 16px 14px',
              background: 'linear-gradient(180deg, #fff7eb 0%, #f2eadf 100%)',
              border: '1px solid rgba(223,210,193,0.92)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, marginBottom: 14 }}>
              <div>
                <SectionEyebrow style={{ marginBottom: 6 }}>Старт продаж</SectionEyebrow>
                <div style={{ fontSize: 22, fontWeight: 700, lineHeight: 1.14, color: '#1d1b18' }}>Новые комплексы на раннем входе</div>
              </div>
              <Pill style={{ background: '#f0dfb7', color: '#5f4826' }}>{startSalesProjects.length} объекта</Pill>
            </div>

            <div style={{ display: 'grid', gap: 12 }}>
              {startSalesProjects.map((project) => (
                <MotionCard key={project.title}>
                  <Link
                    href={project.href}
                    style={{
                      display: 'block',
                      textDecoration: 'none',
                      borderRadius: 24,
                      overflow: 'hidden',
                      minHeight: 220,
                      padding: 18,
                      color: '#ffffff',
                      backgroundImage: `linear-gradient(180deg, rgba(12,18,22,0.12) 0%, rgba(10,13,16,0.58) 100%), url(${project.image})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      position: 'relative',
                      boxShadow: '0 18px 34px rgba(20, 21, 20, 0.12)',
                    }}
                  >
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(255,255,255,0.05) 0%, rgba(0,0,0,0.34) 100%)' }} />
                    <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, alignItems: 'flex-start' }}>
                        <Pill style={{ background: '#f0dfb7', color: '#3a2b16' }}>{project.badge}</Pill>
                        <div style={{ padding: '9px 14px', borderRadius: 18, background: 'rgba(255,255,255,0.92)', color: '#181818', fontWeight: 700, fontSize: 15 }}>
                          {project.price}
                        </div>
                      </div>

                      <div>
                        <SectionEyebrow style={{ color: 'rgba(255,244,221,0.76)', marginBottom: 8 }}>{project.eyebrow}</SectionEyebrow>
                        <div style={{ fontSize: 32, fontWeight: 700, lineHeight: 1.04, marginBottom: 10 }}>{project.title}</div>
                        <div style={{ fontSize: 14, lineHeight: 1.55, color: 'rgba(255,255,255,0.88)', marginBottom: 10 }}>{project.subtitle}</div>
                        <div style={{ fontSize: 13, lineHeight: 1.5, color: 'rgba(255,255,255,0.72)', marginBottom: 12 }}>{project.location}</div>
                        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, color: '#fff5dd', fontWeight: 700, fontSize: 14 }}>
                          Смотреть объект <span>→</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </MotionCard>
              ))}
            </div>
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
                    <SectionEyebrow style={{ color: 'rgba(255,255,255,0.72)' }}>Скоро</SectionEyebrow>
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
            <SectionEyebrow style={{ marginBottom: 8 }}>Важно</SectionEyebrow>
            <div style={{ fontWeight: 700, marginBottom: 8 }}>Каталог разделён по рынкам, чтобы выбор начинался точно</div>
            <div>
              Не смешиваем Крым, Сочи и Анапу в одну ленту. Так клиент быстрее понимает, куда смотреть и какой сценарий подходит именно ему.
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
            <SectionEyebrow style={{ marginBottom: 10, color: 'rgba(231,221,205,0.7)' }}>Дополнительно</SectionEyebrow>
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
