import Link from 'next/link';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';
import { AppShell } from '../../components/app-shell';
import { BackLink } from '../../components/back-link';
import { PropertyCardLink } from '../../components/property-card-link';
import { InfoCard, Pill, PrimaryButton, SectionEyebrow, SurfaceCard } from '../../components/ui';
import { toOptimizedBackgroundImage } from '../../lib/optimized-image';
import type { PropertyListItem } from '../../lib/properties';
import { buildQuizHref, getBudgetByKey, getTimelineByKey } from '../../lib/quiz-options';

type QuickPriceFilter = 'all' | 'under15' | 'mid' | 'over30' | 'launch';

function getMarketStory(region: string, regionName: string) {
  if (region === 'anapa') {
    return {
      eyebrow: 'Анапа. Подборка',
      title: 'Новые курортные проекты для раннего входа',
      text: 'Здесь собраны комплексы, которые удобно показывать тем, кто ищет более мягкий вход в курортную недвижимость, стартовые очереди и форматы у моря.',
      note: 'Подходит тем, кто хочет смотреть Анапу как отдельный рынок, с акцентом на новые запуски и спокойный сценарий покупки.',
    };
  }

  if (region === 'crimea') {
    return {
      eyebrow: 'Крым. Подборка',
      title: 'Курортные объекты у моря',
      text: 'Первая линия, резиденции и форматы для спокойного входа, отдыха и сезонной доходности.',
      note: 'Подходит тем, кто ищет море, приватность и мягкий инвестиционный ритм.',
    };
  }

  if (region === 'sochi') {
    return {
      eyebrow: 'Сочи. Подборка',
      title: 'Лоты с активным спросом',
      text: 'Объекты у моря, в центре и в сильных локациях для тех, кто смотрит на ликвидность и аренду.',
      note: 'Подходит тем, кто хочет быстрый темп рынка и сильный спрос.',
    };
  }

  if (region === 'mountains') {
    return {
      eyebrow: 'Горный кластер. Подборка',
      title: 'Резиденции Красной Поляны с круглогодичным спросом',
      text: 'Здесь собраны премиальные объекты Эсто-Садка и Красной Поляны, где сочетаются личное использование, короткая аренда и сильная сезонная загрузка.',
      note: 'Подходит тем, кто смотрит горы как отдельный инвестиционный сценарий, а не как приложение к Сочи.',
    };
  }

  return {
    eyebrow: 'Каталог',
    title: 'Сначала выберите рынок',
    text: 'Крым, Сочи, Анапа и горный кластер открываются отдельно, чтобы вы сразу смотрели релевантные объекты.',
    note: 'Точный вход всегда работает сильнее, чем смешанная выдача.',
  };
}

function getMarketHighlights(region: string, itemsCount: number) {
  if (region === 'anapa') {
    return [
      {
        label: 'Рынок',
        title: 'Отдельная витрина по Анапе',
        text: 'Без смешения с Крымом и Сочи, чтобы клиент сразу видел именно курортные проекты Анапы.',
      },
      {
        label: 'Формат',
        title: 'Новые комплексы у моря',
        text: 'Подходит под старты продаж, спокойный вход и переговоры с теми, кто выбирает курортную недвижимость заранее.',
      },
      {
        label: 'Сейчас в подборке',
        title: `${itemsCount || 0} объекта в рынке`,
        text: 'Подборку можно быстро расширять новыми комплексами, которые Анастасия присылает прямо в чат.',
      },
    ];
  }

  if (region === 'mountains') {
    return [
      {
        label: 'Локация',
        title: 'Красная Поляна и Эсто-Садок',
        text: 'Отдельная витрина для горного сценария, без смешения с морскими лотами Сочи.',
      },
      {
        label: 'Формат',
        title: 'Резиденции и сервисные апартаменты',
        text: 'Для клиента, которому важны личное использование, арендная загрузка и премиальный alpine feel.',
      },
      {
        label: 'Сейчас в подборке',
        title: `${itemsCount || 0} объекта в кластере`,
        text: 'Стартовали с четырёх сильных проектов и можем расширять витрину следующими объектами Поляны.',
      },
    ];
  }

  return [];
}

function getPriceValue(item: PropertyListItem) {
  const value = item.priceFrom ? Number(item.priceFrom) : NaN;
  return Number.isFinite(value) ? value : null;
}

function isLaunchProperty(item: PropertyListItem) {
  return ['gk-mandarin-garden-mandarin-garden', 'zhk-kirov'].includes(item.slug);
}

function matchesQuickPriceFilter(item: PropertyListItem, filter: QuickPriceFilter) {
  const price = getPriceValue(item);

  if (filter === 'launch') return isLaunchProperty(item);
  if (filter === 'under15') return price !== null && price <= 15_000_000;
  if (filter === 'mid') return price !== null && price > 15_000_000 && price <= 30_000_000;
  if (filter === 'over30') return price !== null && price > 30_000_000;

  return true;
}

function getRegionLabel(regionSlug: string) {
  if (regionSlug === 'anapa') return 'Анапа';
  if (regionSlug === 'crimea') return 'Крым';
  if (regionSlug === 'sochi') return 'Сочи';
  if (regionSlug === 'mountains') return 'Горы';
  return regionSlug;
}

export default function PropertiesPage() {
  const router = useRouter();
  const searchParams = useMemo(() => {
    const query = router.asPath.includes('?') ? router.asPath.split('?')[1] : '';
    return new URLSearchParams(query);
  }, [router.asPath]);
  const region = searchParams.get('region') ?? '';
  const regionName = searchParams.get('regionName') ?? '';
  const budgetKey = searchParams.get('budgetKey') ?? '';
  const timelineKey = searchParams.get('timelineKey') ?? '';
  const budget = budgetKey ? getBudgetByKey(budgetKey) : null;
  const timeline = timelineKey ? getTimelineByKey(timelineKey) : null;
  const [items, setItems] = useState<PropertyListItem[]>([]);
  const [quickPriceFilter, setQuickPriceFilter] = useState<QuickPriceFilter>('all');
  const [quickRegionFilter, setQuickRegionFilter] = useState(region || 'all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const marketStory = useMemo(() => getMarketStory(region, regionName), [region, regionName]);
  const marketHighlights = useMemo(() => getMarketHighlights(region, items.length), [region, items.length]);

  useEffect(() => {
    setQuickPriceFilter('all');
    setQuickRegionFilter(region || 'all');
  }, [region]);

  useEffect(() => {
    const params = new URLSearchParams();
    if (region) params.set('region', region);
    if (budget?.min) params.set('budgetMin', String(budget.min));
    if (budget?.max) params.set('budgetMax', String(budget.max));
    const query = params.toString() ? `?${params.toString()}` : '';

    setLoading(true);
    setError(null);

    fetch(`/api/properties${query}`)
      .then(async (res) => {
        const data = await res.json();
        if (!res.ok) {
          throw new Error(typeof data.message === 'string' ? data.message : 'Не удалось загрузить объекты');
        }
        setItems(data.items ?? []);
      })
      .catch((err) => {
        setItems([]);
        setError(err instanceof Error ? err.message : 'Не удалось загрузить объекты');
      })
      .finally(() => setLoading(false));
  }, [region, budget?.min, budget?.max]);

  const title = useMemo(() => {
    if (region === 'anapa') return 'Анапа. Объекты у моря';
    if (region === 'crimea') return 'Крым. Объекты у моря';
    if (region === 'sochi') return 'Сочи. Сильные объекты';
    if (region === 'mountains') return 'Горы. Красная Поляна';
    if (regionName) return `Объекты · ${regionName}`;
    return 'Рынки и объекты';
  }, [region, regionName]);

  const regionFilteredItems = useMemo(() => {
    if (region || quickRegionFilter === 'all') return items;
    return items.filter((item) => item.region.slug === quickRegionFilter);
  }, [items, quickRegionFilter, region]);

  const filteredItems = useMemo(
    () => regionFilteredItems.filter((item) => matchesQuickPriceFilter(item, quickPriceFilter)),
    [regionFilteredItems, quickPriceFilter],
  );

  const regionFilterOptions = useMemo(() => {
    if (region) return [];

    const order = ['anapa', 'crimea', 'sochi', 'mountains'];
    const counts = new Map<string, number>();
    items.forEach((item) => counts.set(item.region.slug, (counts.get(item.region.slug) ?? 0) + 1));

    return [
      { key: 'all', label: 'Все рынки', count: items.length },
      ...order
        .filter((slug) => counts.has(slug))
        .map((slug) => ({ key: slug, label: getRegionLabel(slug), count: counts.get(slug) ?? 0 })),
    ];
  }, [items, region]);

  const priceFilterOptions = useMemo(() => {
    const options = [
      { key: 'all' as QuickPriceFilter, label: 'Все объекты', count: regionFilteredItems.length },
      {
        key: 'under15' as QuickPriceFilter,
        label: 'До 15 млн',
        count: regionFilteredItems.filter((item) => matchesQuickPriceFilter(item, 'under15')).length,
      },
      {
        key: 'mid' as QuickPriceFilter,
        label: '15–30 млн',
        count: regionFilteredItems.filter((item) => matchesQuickPriceFilter(item, 'mid')).length,
      },
      {
        key: 'over30' as QuickPriceFilter,
        label: 'От 30 млн',
        count: regionFilteredItems.filter((item) => matchesQuickPriceFilter(item, 'over30')).length,
      },
      {
        key: 'launch' as QuickPriceFilter,
        label: 'Старт продаж',
        count: regionFilteredItems.filter((item) => matchesQuickPriceFilter(item, 'launch')).length,
      },
    ];

    return options.filter((option) => option.key === 'all' || option.count > 0);
  }, [regionFilteredItems]);

  const useCompactTail = filteredItems.length > 4;
  const featuredItems = useMemo(() => (useCompactTail ? filteredItems.slice(0, 3) : filteredItems), [filteredItems, useCompactTail]);
  const compactTailItems = useMemo(() => (useCompactTail ? filteredItems.slice(3) : []), [filteredItems, useCompactTail]);
  const contactHref = buildQuizHref('/quiz/contact', {
    region: region || undefined,
    regionName: regionName || undefined,
    budgetKey: budget?.key,
    timelineKey: timeline?.key,
  });

  return (
    <AppShell
      eyebrow={region ? 'Каталог рынка' : 'Каталог объектов'}
      title={title}
      description={region
        ? budget && timeline
          ? `Отобранные объекты под бюджет ${budget.title} и срок ${timeline.title}.`
          : 'Откройте объекты этого рынка и посмотрите варианты без лишнего шума.'
        : 'Выберите рынок и откройте объекты с понятным ценовым входом и инвестиционной логикой.'}
    >
      <BackLink href="/quiz/success" />

      <InfoCard style={{ marginBottom: 16, background: 'linear-gradient(180deg, #f6f1e8 0%, #f3ecdf 100%)', color: '#4a4339' }}>
        <SectionEyebrow style={{ marginBottom: 8, color: '#a09383' }}>{marketStory.eyebrow}</SectionEyebrow>
        <div style={{ fontWeight: 700, marginBottom: 10, fontSize: 'clamp(22px, 6vw, 24px)', lineHeight: 1.15, color: '#201c18', overflowWrap: 'anywhere' }}>{marketStory.title}</div>
        <div style={{ lineHeight: 1.65, color: '#5b5145', marginBottom: 14 }}>{marketStory.text}</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
          <Pill>{budget?.title ?? 'Все бюджеты'}</Pill>
          <Pill style={{ background: '#f8f5ef', color: '#6e6256' }}>{timeline?.title ?? 'Без ограничения по сроку'}</Pill>
          <Pill style={{ background: '#efe7d8', color: '#7d6c58' }}>
            {loading ? 'Обновляем подборку' : quickPriceFilter === 'all' && quickRegionFilter === (region || 'all') ? `${items.length} объектов` : `${filteredItems.length} из ${items.length}`}
          </Pill>
        </div>

        <div
          style={{
            marginTop: 14,
            borderRadius: 18,
            padding: '14px 14px',
            background: 'rgba(255,255,255,0.52)',
            border: '1px solid rgba(224,211,193,0.9)',
            color: '#5e5347',
            lineHeight: 1.6,
            fontSize: 14,
          }}
        >
          {marketStory.note}
        </div>

        <div style={{ display: 'grid', gap: 10, marginTop: 14 }}>
          <PrimaryButton href={contactHref} style={{ fontSize: 16, padding: '16px 14px' }}>
            Получить подбор под мой бюджет
          </PrimaryButton>
          <Link
            href={contactHref}
            style={{
              display: 'block',
              textDecoration: 'none',
              textAlign: 'center',
              padding: '14px 14px',
              borderRadius: 18,
              fontWeight: 700,
              fontSize: 15,
              color: '#2f5e42',
              background: '#fffaf2',
              border: '1px solid rgba(223,210,193,0.92)',
            }}
          >
            Не листать всё, а получить 3 сильных варианта
          </Link>
        </div>
      </InfoCard>

      {!loading && !error && items.length ? (
        <div
          style={{
            position: 'sticky',
            top: 10,
            zIndex: 12,
            display: 'grid',
            gap: 10,
            marginBottom: 16,
            padding: '14px 14px 12px',
            borderRadius: 22,
            background: 'rgba(255,250,242,0.94)',
            border: '1px solid rgba(223,210,193,0.92)',
            backdropFilter: 'blur(12px)',
            boxShadow: '0 14px 28px rgba(0,0,0,0.06)',
          }}
        >
          <div>
            <SectionEyebrow style={{ marginBottom: 6 }}>Быстрые фильтры</SectionEyebrow>
            <div style={{ color: '#5b5145', lineHeight: 1.5, fontSize: 14 }}>Сузить выдачу по рынку и ценовому входу, не уходя в длинный скролл.</div>
          </div>

          {regionFilterOptions.length > 1 ? (
            <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 2 }}>
              {regionFilterOptions.map((option) => {
                const active = quickRegionFilter === option.key;
                return (
                  <motion.button
                    key={option.key}
                    type="button"
                    onClick={() => setQuickRegionFilter(option.key)}
                    whileTap={{ scale: 0.97 }}
                    animate={{
                      y: active ? -1 : 0,
                      scale: active ? 1.01 : 1,
                      boxShadow: active ? '0 10px 22px rgba(20,32,27,0.16)' : '0 0 0 rgba(0,0,0,0)',
                    }}
                    transition={{ type: 'spring', stiffness: 260, damping: 18 }}
                    style={{
                      flexShrink: 0,
                      border: active ? '1px solid #d7bf8f' : '1px solid rgba(223,210,193,0.92)',
                      background: active ? '#1f2b25' : '#fffaf2',
                      color: active ? '#f7ecd7' : '#5b5145',
                      borderRadius: 999,
                      padding: '10px 14px',
                      fontSize: 13,
                      fontWeight: 700,
                      cursor: 'pointer',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {option.label} · {option.count}
                  </motion.button>
                );
              })}
            </div>
          ) : null}

          {priceFilterOptions.length > 1 ? (
            <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 2 }}>
              {priceFilterOptions.map((option) => {
                const active = quickPriceFilter === option.key;
                return (
                  <motion.button
                    key={option.key}
                    type="button"
                    onClick={() => setQuickPriceFilter(option.key)}
                    whileTap={{ scale: 0.97 }}
                    animate={{
                      y: active ? -1 : 0,
                      scale: active ? 1.01 : 1,
                      boxShadow: active ? '0 10px 22px rgba(125,95,44,0.16)' : '0 0 0 rgba(0,0,0,0)',
                    }}
                    transition={{ type: 'spring', stiffness: 260, damping: 18 }}
                    style={{
                      flexShrink: 0,
                      border: active ? '1px solid #d7bf8f' : '1px solid rgba(223,210,193,0.92)',
                      background: active ? '#f0dfb7' : '#fffaf2',
                      color: active ? '#2d2417' : '#5b5145',
                      borderRadius: 999,
                      padding: '10px 14px',
                      fontSize: 13,
                      fontWeight: 700,
                      cursor: 'pointer',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {option.label} · {option.count}
                  </motion.button>
                );
              })}
            </div>
          ) : null}
        </div>
      ) : null}

      {marketHighlights.length ? (
        <InfoCard style={{ marginBottom: 16, background: '#fffaf2' }}>
          <SectionEyebrow style={{ marginBottom: 10 }}>Сейчас в подборке</SectionEyebrow>
          <div style={{ display: 'grid', gap: 10 }}>
            {marketHighlights.map((item) => (
              <div
                key={item.title}
                style={{
                  borderRadius: 18,
                  padding: '14px 14px',
                  background: item.label === 'Фокус' ? 'linear-gradient(180deg, #fff7eb 0%, #f2eadf 100%)' : 'rgba(255,255,255,0.56)',
                  border: '1px solid rgba(223,210,193,0.72)',
                }}
              >
                <SectionEyebrow style={{ marginBottom: 6 }}>{item.label}</SectionEyebrow>
                <div style={{ fontWeight: 700, fontSize: 18, lineHeight: 1.25, color: '#201c18', marginBottom: 6 }}>{item.title}</div>
                <div style={{ color: '#5b5145', lineHeight: 1.55, fontSize: 14 }}>{item.text}</div>
              </div>
            ))}
          </div>
        </InfoCard>
      ) : null}

      {loading ? (
        <InfoCard style={{ color: '#7d7367' }}>Подбираем объекты...</InfoCard>
      ) : error ? (
        <InfoCard style={{ background: '#fff6f1', color: '#6b4a36' }}>
          <SectionEyebrow style={{ marginBottom: 8, color: '#b17b58' }}>Временная пауза</SectionEyebrow>
          <div style={{ fontWeight: 700, marginBottom: 8 }}>Каталог сейчас недоступен</div>
          <div style={{ lineHeight: 1.6 }}>Попробуйте открыть экран чуть позже.</div>
        </InfoCard>
      ) : items.length === 0 ? (
        <InfoCard>
          <SectionEyebrow style={{ marginBottom: 8 }}>Под эти параметры</SectionEyebrow>
          <div style={{ fontWeight: 700, marginBottom: 8 }}>Сейчас нет подходящих объектов</div>
          <div style={{ lineHeight: 1.6, color: '#615648' }}>Можно расширить бюджет или открыть другой рынок.</div>
        </InfoCard>
      ) : filteredItems.length === 0 ? (
        <InfoCard>
          <SectionEyebrow style={{ marginBottom: 8 }}>Фильтры</SectionEyebrow>
          <div style={{ fontWeight: 700, marginBottom: 8 }}>Под быстрый фильтр сейчас нет подходящих объектов</div>
          <div style={{ lineHeight: 1.6, color: '#615648' }}>Попробуйте другой бюджетный диапазон или вернитесь ко всем объектам.</div>
        </InfoCard>
      ) : (
        <div style={{ display: 'grid', gap: 14 }}>
          {useCompactTail ? (
            <InfoCard style={{ background: 'linear-gradient(180deg, #fffaf3 0%, #f4ebde 100%)' }}>
              <SectionEyebrow style={{ marginBottom: 8 }}>Сначала сильные варианты</SectionEyebrow>
              <div style={{ fontWeight: 700, fontSize: 20, lineHeight: 1.25, color: '#201c18', marginBottom: 8 }}>Первые 3 лота, это быстрый вход в рынок без усталости от длинной выдачи</div>
              <div style={{ color: '#5b5145', lineHeight: 1.6 }}>Ниже останутся остальные объекты в более компактном формате, чтобы не терять темп просмотра.</div>
            </InfoCard>
          ) : null}

          {featuredItems.map((property) => (
            <PropertyCardLink
              key={property.id}
              property={property}
              regionQuery={region}
              regionName={regionName}
              budgetKey={budget?.key}
              timelineKey={timeline?.key}
            />
          ))}

          {compactTailItems.length ? (
            <>
              <InfoCard style={{ background: 'linear-gradient(180deg, #f7f1e8 0%, #f3ebde 100%)' }}>
                <SectionEyebrow style={{ marginBottom: 8 }}>Ещё в подборке</SectionEyebrow>
                <div style={{ fontWeight: 700, fontSize: 20, lineHeight: 1.25, color: '#201c18', marginBottom: 8 }}>Остальные варианты идут короче, чтобы быстрее отсечь слабые и не потерять сильные</div>
                <div style={{ color: '#5b5145', lineHeight: 1.6, marginBottom: 12 }}>Если не хочется листать весь список, можно сразу перейти в персональный подбор под бюджет и задачу.</div>
                <Link
                  href={contactHref}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 8,
                    textDecoration: 'none',
                    color: '#2f5e42',
                    fontWeight: 700,
                  }}
                >
                  Получить 3 strongest options <span>→</span>
                </Link>
              </InfoCard>

              <div style={{ display: 'grid', gap: 10 }}>
                {compactTailItems.map((property, index) => {
                  const location = [property.region.name, property.city].filter(Boolean).join(' · ');
                  const href = region
                    ? `/properties/${property.slug}?region=${region}&regionName=${encodeURIComponent(regionName ?? '')}${budget?.key ? `&budgetKey=${budget.key}` : ''}${timeline?.key ? `&timelineKey=${timeline.key}` : ''}`
                    : `/properties/${property.slug}`;
                  const priceLabel = property.priceFrom
                    ? `от ${Number(property.priceFrom).toLocaleString('ru-RU')} ${property.currency ?? ''}`.trim()
                    : 'цена по запросу';

                  return (
                    <Link key={property.id} href={href} style={{ textDecoration: 'none' }}>
                      <SurfaceCard
                        style={{
                          borderRadius: 24,
                          padding: 10,
                          display: 'grid',
                          gridTemplateColumns: '112px 1fr',
                          gap: 12,
                          alignItems: 'stretch',
                          color: '#201c18',
                        }}
                      >
                        <div
                          style={{
                            position: 'relative',
                            borderRadius: 18,
                            minHeight: 112,
                            background: property.coverAsset
                              ? toOptimizedBackgroundImage(
                                  property.coverAsset,
                                  640,
                                  'linear-gradient(180deg, rgba(9,13,18,0.08) 0%, rgba(9,13,18,0.22) 100%)'
                                )
                              : 'linear-gradient(135deg, #d8c4a0 0%, #92724d 100%)',
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.08)',
                            overflow: 'hidden',
                          }}
                        >
                          <div
                            style={{
                              position: 'absolute',
                              left: 8,
                              top: 8,
                              padding: '6px 8px',
                              borderRadius: 999,
                              background: 'rgba(15,18,22,0.72)',
                              color: '#fff6e4',
                              fontSize: 11,
                              fontWeight: 700,
                              letterSpacing: '0.04em',
                            }}
                          >
                            #{index + 4}
                          </div>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minWidth: 0 }}>
                          <div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', gap: 10, alignItems: 'flex-start', marginBottom: 8 }}>
                              <SectionEyebrow style={{ color: '#8f8578' }}>{property.region.name}</SectionEyebrow>
                              <Pill style={{ background: '#f4ecdf', color: '#6a5a47', padding: '6px 10px', fontSize: 11 }}>{priceLabel}</Pill>
                            </div>
                            <div style={{ fontWeight: 700, fontSize: 18, lineHeight: 1.24, color: '#1f1b17', marginBottom: 6 }}>{property.title}</div>
                            <div style={{ color: '#65594d', lineHeight: 1.5, fontSize: 14, marginBottom: 8 }}>{location || 'Локация уточняется'}</div>
                            <div style={{ color: '#8b7d6e', fontSize: 12, fontWeight: 700, letterSpacing: '0.04em', textTransform: 'uppercase' }}>Быстрый просмотр</div>
                          </div>

                          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, color: '#2f5e42', fontWeight: 700, fontSize: 14, marginTop: 10 }}>
                            Смотреть объект <span>→</span>
                          </div>
                        </div>
                      </SurfaceCard>
                    </Link>
                  );
                })}
              </div>
            </>
          ) : null}
        </div>
      )}
    </AppShell>
  );
}
