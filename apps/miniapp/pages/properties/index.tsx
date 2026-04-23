import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';
import { AppShell } from '../../components/app-shell';
import { BackLink } from '../../components/back-link';
import { PropertyCardLink } from '../../components/property-card-link';
import { InfoCard, Pill, SectionEyebrow } from '../../components/ui';
import type { PropertyListItem } from '../../lib/properties';
import { getBudgetByKey, getTimelineByKey } from '../../lib/quiz-options';

function getMarketStory(region: string, regionName: string) {
  if (region === 'anapa') {
    return {
      eyebrow: 'Анапа. Подборка',
      title: 'Курортные проекты раннего входа',
      text: 'Новые комплексы у моря и форматы для спокойного входа в курортную недвижимость с сильной сезонной логикой.',
      note: 'Подходит тем, кто хочет смотреть Анапу отдельно, без смешения с другими рынками.',
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

  return {
    eyebrow: 'Каталог',
    title: 'Сначала выберите рынок',
    text: 'Крым, Сочи и Анапа открываются отдельно, чтобы вы сразу смотрели релевантные объекты.',
    note: 'Точный вход всегда работает сильнее, чем смешанная выдача.',
  };
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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const marketStory = useMemo(() => getMarketStory(region, regionName), [region, regionName]);

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
    if (region === 'anapa') return 'Анапа. Курортные проекты у моря';
    if (region === 'crimea') return 'Крым. Объекты у моря';
    if (region === 'sochi') return 'Сочи. Объекты для активного спроса';
    if (regionName) return `Объекты · ${regionName}`;
    return 'Рынки и объекты';
  }, [region, regionName]);

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
        <div style={{ fontWeight: 700, marginBottom: 10, fontSize: 24, lineHeight: 1.15, color: '#201c18' }}>{marketStory.title}</div>
        <div style={{ lineHeight: 1.65, color: '#5b5145', marginBottom: 14 }}>{marketStory.text}</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
          <Pill>{budget?.title ?? 'Все бюджеты'}</Pill>
          <Pill style={{ background: '#f8f5ef', color: '#6e6256' }}>{timeline?.title ?? 'Без ограничения по сроку'}</Pill>
          <Pill style={{ background: '#efe7d8', color: '#7d6c58' }}>{loading ? 'Обновляем подборку' : `${items.length} объектов`}</Pill>
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
      </InfoCard>

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
      ) : (
        <div style={{ display: 'grid', gap: 14 }}>
          {items.map((property) => (
            <PropertyCardLink
              key={property.id}
              property={property}
              regionQuery={region}
              regionName={regionName}
              budgetKey={budget?.key}
              timelineKey={timeline?.key}
            />
          ))}
        </div>
      )}
    </AppShell>
  );
}
