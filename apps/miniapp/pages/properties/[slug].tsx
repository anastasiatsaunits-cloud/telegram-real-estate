import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';
import { AppShell } from '../../components/app-shell';
import { BackLink } from '../../components/back-link';
import { InfoCard, Pill, PrimaryButton, SectionEyebrow, SurfaceCard } from '../../components/ui';
import type { PropertyDetails } from '../../lib/properties';

function formatPrice(value: string | null | undefined, currency: string | null | undefined) {
  if (!value) return 'по запросу';
  return `от ${Number(value).toLocaleString('ru-RU')} ${currency ?? ''}`.trim();
}

function formatArea(from: string | null | undefined, to: string | null | undefined) {
  if (from && to) return `${from}-${to} м²`;
  if (from) return `${from} м²`;
  if (to) return `${to} м²`;
  return '—';
}

function getMarketTheme(regionSlug: string | undefined) {
  if (regionSlug === 'sochi') {
    return {
      gradient: 'linear-gradient(135deg, #89a8ba 0%, #60798b 45%, #2e3e4a 100%)',
      accent: 'rgba(199, 228, 243, 0.28)',
      label: 'Сочи · выбор рынка',
    };
  }

  return {
    gradient: 'linear-gradient(135deg, #7da4b7 0%, #58717f 45%, #2f4149 100%)',
    accent: 'rgba(185, 233, 244, 0.25)',
    label: 'Крым · выбор рынка',
  };
}

function purchaseOptionsLabel(options: string[] | null | undefined) {
  if (!options?.length) return 'Рассрочка, ипотека или персональный сценарий покупки.';
  return options.join(' · ');
}

function metricCards(property: PropertyDetails | null) {
  return [
    { label: 'Площадь', value: formatArea(property?.areaFrom, property?.areaTo) },
    { label: 'Арендная доходность', value: property?.metrics?.rentalYield ? `${property.metrics.rentalYield}%` : 'по запросу' },
    { label: 'Рост капитала', value: property?.metrics?.annualGrowth ? `${property.metrics.annualGrowth}%` : 'по запросу' },
    { label: 'ROI за 5 лет', value: property?.metrics?.roi5y ? `${property.metrics.roi5y}%` : 'по запросу' },
  ];
}

export default function PropertyDetailsPage() {
  const router = useRouter();
  const slug = typeof router.query.slug === 'string' ? router.query.slug : null;
  const region = typeof router.query.region === 'string' ? router.query.region : '';
  const regionName = typeof router.query.regionName === 'string' ? router.query.regionName : '';
  const [property, setProperty] = useState<PropertyDetails | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) return;

    setError(null);

    fetch(`/api/properties/${slug}`)
      .then(async (res) => {
        const data = await res.json();
        if (!res.ok) {
          throw new Error(typeof data.message === 'string' ? data.message : 'Не удалось загрузить карточку');
        }
        setProperty(data.item ?? null);
      })
      .catch((err) => {
        setProperty(null);
        setError(err instanceof Error ? err.message : 'Не удалось загрузить карточку');
      });
  }, [slug]);

  const theme = useMemo(() => getMarketTheme(property?.region.slug), [property?.region.slug]);
  const facts = useMemo(
    () => [
      { label: 'География', value: property ? [property.region.name, property.city].filter(Boolean).join(' · ') || property.region.name : '—' },
      { label: 'Площадь', value: formatArea(property?.areaFrom, property?.areaTo) },
      { label: 'Тип объекта', value: property?.propertyType || 'Премиальный объект' },
      { label: 'Статус', value: property?.status || 'Доступен к просмотру' },
    ],
    [property]
  );

  const metrics = useMemo(() => metricCards(property), [property]);
  const locationLine = property ? [property.city, property.address].filter(Boolean).join(', ') || property.region.name : 'Загружаю карточку объекта...';
  const propertyData = property;
  const marketHref = region ? `/properties?region=${region}&regionName=${encodeURIComponent(regionName)}` : '/properties';
  const contactHref = propertyData
    ? `/quiz/contact?propertySlug=${propertyData.slug}&propertyTitle=${encodeURIComponent(propertyData.title)}${region ? `&region=${region}` : ''}${regionName ? `&regionName=${encodeURIComponent(regionName)}` : ''}`
    : '/quiz/contact';

  return (
    <AppShell eyebrow={property?.region.name ?? 'Объект'} title={property?.title ?? 'Карточка объекта'} description={locationLine}>
      <BackLink href={marketHref} />

      {!property && !error ? (
        <InfoCard style={{ color: '#7d7367' }}>Открываем объект...</InfoCard>
      ) : error ? (
        <InfoCard style={{ background: '#fff6f1', color: '#6b4a36' }}>
          <SectionEyebrow style={{ marginBottom: 8, color: '#b17b58' }}>Временная пауза</SectionEyebrow>
          <div style={{ fontWeight: 700, marginBottom: 8 }}>Карточка сейчас недоступна</div>
          <div style={{ lineHeight: 1.6 }}>Попробуйте открыть объект чуть позже.</div>
        </InfoCard>
      ) : propertyData ? (
        <>
          <SurfaceCard
            style={{
              minHeight: 520,
              borderRadius: 30,
              marginBottom: 16,
              background: theme.gradient,
              backgroundImage: propertyData.coverAsset ? `linear-gradient(180deg, rgba(10,12,15,0.14) 0%, rgba(10,13,16,0.58) 100%), url(${propertyData.coverAsset})` : theme.gradient,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              padding: 18,
              position: 'relative',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              boxShadow: '0 18px 36px rgba(22, 23, 27, 0.14)',
            }}
          >
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(255,255,255,0.08) 0%, rgba(0,0,0,0.38) 100%)' }} />
            <div style={{ position: 'absolute', right: -28, top: -18, width: 170, height: 170, borderRadius: '50%', background: theme.accent, filter: 'blur(12px)' }} />

            <div style={{ position: 'relative', zIndex: 1, display: 'flex', justifyContent: 'space-between', gap: 12, alignItems: 'flex-start', flexWrap: 'wrap' }}>
              <Pill style={{ background: 'rgba(255,255,255,0.16)', color: '#ffffff' }}>{theme.label}</Pill>
              <Pill style={{ background: 'rgba(17,22,24,0.42)', color: '#ffffff' }}>объект в подборке</Pill>
            </div>

            <div style={{ position: 'relative', zIndex: 1 }}>
              <SectionEyebrow style={{ color: 'rgba(255,255,255,0.76)', marginBottom: 10 }}>Отобранный объект</SectionEyebrow>
              <div style={{ fontSize: 42, fontWeight: 700, lineHeight: 1.02, color: '#ffffff', marginBottom: 10 }}>{propertyData.title}</div>
              <div style={{ fontSize: 15, lineHeight: 1.55, color: 'rgba(255,255,255,0.88)', maxWidth: 420, marginBottom: 18 }}>{locationLine}</div>

              <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 12 }}>
                <div style={{ borderRadius: 24, padding: '18px 18px 16px', background: 'rgba(255,255,255,0.92)', color: '#181818', boxShadow: '0 12px 28px rgba(11,17,20,0.18)' }}>
                  <SectionEyebrow style={{ color: '#8a7e73', marginBottom: 6 }}>цена входа</SectionEyebrow>
                  <div style={{ fontWeight: 700, fontSize: 26, lineHeight: 1.08, marginBottom: 8 }}>{formatPrice(propertyData.priceFrom, propertyData.currency)}</div>
                  <div style={{ fontSize: 14, color: '#665b50', lineHeight: 1.5 }}>Стартовая стоимость для первого ориентира.</div>
                </div>
                <div style={{ borderRadius: 24, padding: '18px 18px 16px', background: 'rgba(24,31,34,0.36)', color: '#ffffff', border: '1px solid rgba(255,255,255,0.08)' }}>
                  <SectionEyebrow style={{ color: 'rgba(255,255,255,0.6)', marginBottom: 6 }}>Потенциал</SectionEyebrow>
                  <div style={{ fontWeight: 700, fontSize: 18, lineHeight: 1.25, marginBottom: 8 }}>Лот, который стоит считать дальше</div>
                  <div style={{ color: 'rgba(255,255,255,0.76)', lineHeight: 1.5, fontSize: 14 }}>Если объект откликается по локации и бюджету, следующий шаг, запросить расчёт и похожие варианты.</div>
                </div>
              </div>
            </div>
          </SurfaceCard>

          <div style={{ display: 'grid', gap: 10, gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', marginBottom: 16 }}>
            {propertyData.galleryAssets.slice(0, 3).map((asset) => (
              <div
                key={asset}
                style={{
                  borderRadius: 22,
                  minHeight: 116,
                  backgroundImage: `url(${asset})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  boxShadow: '0 14px 24px rgba(0,0,0,0.1)',
                }}
              />
            ))}
          </div>

          <InfoCard style={{ marginBottom: 16, background: 'linear-gradient(180deg, #f9f3e8 0%, #f4ead8 100%)', color: '#3d342b' }}>
            <SectionEyebrow style={{ marginBottom: 8, color: '#978876' }}>Об объекте</SectionEyebrow>
            <div style={{ fontSize: 18, fontWeight: 700, lineHeight: 1.3, color: '#201c18', marginBottom: 10 }}>Коротко о главном</div>
            <div style={{ lineHeight: 1.7 }}>{propertyData.description || 'Сильный объект для тех, кто выбирает локацию, понятный ценовой вход и потенциал дальнейшего роста.'}</div>
          </InfoCard>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: 10, marginBottom: 16 }}>
            {[
              {
                title: 'Цена входа',
                text: 'Сразу видно, с какого бюджета начинается вход в объект.',
              },
              {
                title: 'Похожие варианты',
                text: 'Если нужен выбор, подберём соседние лоты в том же сценарии.',
              },
              {
                title: 'Следующий шаг',
                text: 'Можно сразу запросить расчёт и персональную подборку.',
              },
            ].map((item) => (
              <InfoCard key={item.title} style={{ minHeight: 148, background: '#fffaf2' }}>
                <SectionEyebrow style={{ marginBottom: 8 }}>{item.title}</SectionEyebrow>
                <div style={{ color: '#51473c', lineHeight: 1.55, fontSize: 14 }}>{item.text}</div>
              </InfoCard>
            ))}
          </div>

          <InfoCard style={{ marginBottom: 16, background: 'linear-gradient(180deg, #162a24 0%, #1f3c34 100%)', color: '#ffffff', boxShadow: '0 16px 30px rgba(18,38,31,0.2)' }}>
            <SectionEyebrow style={{ marginBottom: 8, color: 'rgba(230,220,204,0.7)' }}>Инвестиционный потенциал</SectionEyebrow>
            <div style={{ fontSize: 20, fontWeight: 700, lineHeight: 1.32, marginBottom: 10 }}>Объект не для случайного просмотра, а для предметного решения.</div>
            <div style={{ color: 'rgba(255,255,255,0.8)', lineHeight: 1.7, marginBottom: 12 }}>
              Здесь важны три вещи: локация, цена входа и потенциал по росту или аренде. Если объект подходит по задаче, дальше ведём в расчёт и подбор похожих вариантов.
            </div>
            <div style={{ display: 'grid', gap: 10 }}>
              {[
                'Понятная локация и ценовой вход',
                'Ключевые метрики без лишнего шума',
                'Быстрый переход к расчёту и персональной подборке',
              ].map((item) => (
                <div key={item} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                  <div style={{ width: 7, height: 7, marginTop: 7, borderRadius: 999, background: '#e5d0a7', flexShrink: 0 }} />
                  <div style={{ color: 'rgba(255,255,255,0.86)', lineHeight: 1.6 }}>{item}</div>
                </div>
              ))}
            </div>
          </InfoCard>

          <div style={{ marginBottom: 16 }}>
            <SectionEyebrow style={{ marginBottom: 10, color: '#978876' }}>Ключевые факты</SectionEyebrow>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              {facts.map((fact) => (
                <InfoCard key={fact.label} style={{ minHeight: 104 }}>
                  <SectionEyebrow style={{ marginBottom: 10, color: '#a1978a' }}>{fact.label}</SectionEyebrow>
                  <div style={{ fontWeight: 700, color: '#1e1e1e', lineHeight: 1.4 }}>{fact.value}</div>
                </InfoCard>
              ))}
            </div>
          </div>

          <div style={{ marginBottom: 16 }}>
            <SectionEyebrow style={{ marginBottom: 10, color: '#978876' }}>Инвестиционные метрики</SectionEyebrow>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              {metrics.map((metric) => (
                <InfoCard key={metric.label} style={{ background: '#fffdf9' }}>
                  <SectionEyebrow style={{ marginBottom: 8 }}>{metric.label}</SectionEyebrow>
                  <div style={{ fontSize: 22, fontWeight: 700, color: '#1f1b17' }}>{metric.value}</div>
                </InfoCard>
              ))}
            </div>
          </div>

          <InfoCard style={{ marginBottom: 16 }}>
            <SectionEyebrow style={{ marginBottom: 8, color: '#978876' }}>Варианты покупки</SectionEyebrow>
            <div style={{ fontWeight: 700, fontSize: 18, lineHeight: 1.35, color: '#1f1b17', marginBottom: 10 }}>Подберём удобный формат входа</div>
            <div style={{ color: '#53493f', lineHeight: 1.65 }}>{purchaseOptionsLabel(propertyData.purchaseOptionsJson)}</div>
          </InfoCard>

          <InfoCard style={{ marginBottom: 16, background: 'linear-gradient(180deg, #fffaf3 0%, #f4ebde 100%)' }}>
            <SectionEyebrow style={{ marginBottom: 8, color: '#978876' }}>Следующий шаг</SectionEyebrow>
            <div style={{ fontWeight: 700, fontSize: 18, lineHeight: 1.35, color: '#1f1b17', marginBottom: 10 }}>После просмотра не нужно начинать поиск заново</div>
            <div style={{ display: 'grid', gap: 10 }}>
              {[
                'Нужен расчёт, соберём цифры под вашу задачу.',
                'Нужны альтернативы, покажем похожие объекты.',
                'Нужна консультация, свяжемся и проведём дальше.',
              ].map((item) => (
                <div key={item} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', color: '#564b40', lineHeight: 1.6 }}>
                  <div style={{ width: 7, height: 7, marginTop: 8, borderRadius: 999, background: '#d1b585', flexShrink: 0 }} />
                  <div>{item}</div>
                </div>
              ))}
            </div>
          </InfoCard>

          <InfoCard style={{ marginBottom: 16, background: 'linear-gradient(180deg, #173328 0%, #234338 100%)', color: '#ffffff', boxShadow: '0 16px 32px rgba(19,40,31,0.18)' }}>
            <SectionEyebrow style={{ marginBottom: 8, color: 'rgba(231,221,205,0.7)' }}>Запрос</SectionEyebrow>
            <div style={{ fontWeight: 700, fontSize: 18, lineHeight: 1.35, marginBottom: 8 }}>Можно сразу перейти к расчёту и персональной подборке</div>
            <div style={{ color: 'rgba(255,255,255,0.78)', lineHeight: 1.65 }}>Оставьте контакт, и мы вернёмся с предметным сценарием по этому объекту.</div>
          </InfoCard>

          <div style={{ display: 'grid', gap: 12 }}>
            <PrimaryButton href={contactHref} style={{ background: '#ead7ad', color: '#1f1f1f', boxShadow: '0 10px 22px rgba(90,77,38,0.12)' }}>
              Получить расчёт и похожие объекты
            </PrimaryButton>

            <Link
              href={contactHref}
              style={{
                textDecoration: 'none',
                textAlign: 'center',
                borderRadius: 22,
                padding: '18px 18px',
                background: '#0f4b22',
                color: '#ffffff',
                fontWeight: 700,
                fontSize: 18,
                boxShadow: '0 12px 28px rgba(15,75,34,0.22)',
              }}
            >
              Оставить заявку
            </Link>

            <Link
              href={marketHref}
              style={{
                textDecoration: 'none',
                textAlign: 'center',
                borderRadius: 22,
                padding: '17px 18px',
                background: '#f6efe4',
                color: '#2d261f',
                fontWeight: 700,
                fontSize: 17,
                border: '1px solid rgba(216,201,180,0.92)',
              }}
            >
              Вернуться к подборке
            </Link>
          </div>
        </>
      ) : null}
    </AppShell>
  );
}
