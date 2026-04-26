import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';
import { AppShell } from '../../components/app-shell';
import { BackLink } from '../../components/back-link';
import { InfoCard, PrimaryButton, SectionEyebrow, SurfaceCard } from '../../components/ui';
import { toOptimizedBackgroundImage } from '../../lib/optimized-image';
import type { PropertyListItem } from '../../lib/properties';
import {
  buildQuizHref,
  getBudgetByKey,
  getFormatByKey,
  getPriorityByKey,
  getRegionNameBySlug,
  getScenarioByKey,
  getTimelineByKey,
} from '../../lib/quiz-options';

function formatPrice(value: string | null | undefined, currency: string | null | undefined) {
  if (!value) return 'по запросу';
  return `от ${Number(value).toLocaleString('ru-RU')} ${currency ?? ''}`.trim();
}

export default function ReadyPage() {
  const router = useRouter();
  const scenarioKey = typeof router.query.scenarioKey === 'string' ? router.query.scenarioKey : undefined;
  const region = typeof router.query.region === 'string' ? router.query.region : undefined;
  const regionName = typeof router.query.regionName === 'string' ? router.query.regionName : getRegionNameBySlug(region);
  const budgetKey = typeof router.query.budgetKey === 'string' ? router.query.budgetKey : undefined;
  const formatKey = typeof router.query.formatKey === 'string' ? router.query.formatKey : undefined;
  const timelineKey = typeof router.query.timelineKey === 'string' ? router.query.timelineKey : undefined;
  const priorityKey = typeof router.query.priorityKey === 'string' ? router.query.priorityKey : undefined;

  const scenario = getScenarioByKey(scenarioKey);
  const budget = getBudgetByKey(budgetKey);
  const format = getFormatByKey(formatKey);
  const timeline = getTimelineByKey(timelineKey);
  const priority = getPriorityByKey(priorityKey);

  const [items, setItems] = useState<PropertyListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFallback, setIsFallback] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function loadPreview() {
      setLoading(true);
      setIsFallback(false);

      const params = new URLSearchParams();
      if (region) params.set('region', region);
      if (typeof budget.min === 'number') params.set('budgetMin', String(budget.min));
      if (typeof budget.max === 'number') params.set('budgetMax', String(budget.max));

      try {
        const response = await fetch(`/api/properties${params.toString() ? `?${params.toString()}` : ''}`);
        const data = await response.json();
        const filteredItems = (data.items ?? []) as PropertyListItem[];

        if (!cancelled && filteredItems.length > 0) {
          setItems(filteredItems.slice(0, 3));
          setLoading(false);
          return;
        }

        const fallbackParams = new URLSearchParams();
        if (region) fallbackParams.set('region', region);
        const fallbackResponse = await fetch(`/api/properties${fallbackParams.toString() ? `?${fallbackParams.toString()}` : ''}`);
        const fallbackData = await fallbackResponse.json();
        const fallbackItems = (fallbackData.items ?? []) as PropertyListItem[];

        if (!cancelled) {
          setItems(fallbackItems.slice(0, 3));
          setIsFallback(filteredItems.length === 0 && fallbackItems.length > 0);
        }
      } catch {
        if (!cancelled) {
          setItems([]);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadPreview();

    return () => {
      cancelled = true;
    };
  }, [budget.max, budget.min, region]);

  const summary = useMemo(
    () => [scenario.title, regionName, budget.title, format.title].filter(Boolean).join(' · '),
    [budget.title, format.title, regionName, scenario.title],
  );

  const contactHref = buildQuizHref('/quiz/contact', {
    scenarioKey,
    region,
    regionName,
    budgetKey: budget.key,
    formatKey,
    timelineKey,
    priorityKey,
  });

  const catalogHref = buildQuizHref('/properties', {
    region,
    regionName,
    budgetKey: budget.key,
    timelineKey,
    scenarioKey,
    formatKey,
    priorityKey,
  });

  return (
    <AppShell
      eyebrow="Первая подборка"
      title="Мы уже собрали для вас первые сильные варианты"
      description="Ниже показываю направление, подходящие объекты и логику выбора. После контакта откроем полную подборку под ваш запрос."
    >
      <BackLink
        href={buildQuizHref('/quiz/priority', {
          scenarioKey,
          region,
          regionName,
          budgetKey: budget.key,
          formatKey,
          timelineKey,
          priorityKey,
        })}
      />

      <InfoCard style={{ marginBottom: 16, background: 'linear-gradient(180deg, #fffaf3 0%, #f4ebde 100%)' }}>
        <SectionEyebrow style={{ marginBottom: 8, color: '#9c8566' }}>Под ваш запрос</SectionEyebrow>
        <div style={{ fontSize: 19, fontWeight: 700, lineHeight: 1.35, color: '#1f1b17', marginBottom: 10 }}>{summary}</div>
        <div style={{ color: '#5b5044', lineHeight: 1.65 }}>
          Приоритет: {priority.title}. Срок решения: {timeline.title}.
        </div>
      </InfoCard>

      {loading ? (
        <InfoCard style={{ marginBottom: 16, color: '#695d50' }}>Подбираю первые объекты под ваш сценарий...</InfoCard>
      ) : items.length ? (
        <>
          <InfoCard style={{ marginBottom: 16 }}>
            <SectionEyebrow style={{ marginBottom: 8 }}>Первые варианты</SectionEyebrow>
            <div style={{ fontWeight: 700, fontSize: 18, lineHeight: 1.4, marginBottom: 8 }}>
              {isFallback ? 'Показываю сильные варианты, с которых удобно начать' : `Собрала ${items.length} релевантных варианта для первого просмотра`}
            </div>
            <div style={{ color: '#5b5044', lineHeight: 1.65 }}>
              {isFallback
                ? 'Показываю самые сильные объекты по выбранному рынку. После контакта откроем закрытую подборку и расширим выбор под ваш сценарий.'
                : 'Это лучшие варианты для быстрого ориентира. После контакта добавим похожие объекты и сузим подборку уже точечно под вас.'}
            </div>
          </InfoCard>

          <div style={{ display: 'grid', gap: 12, marginBottom: 16 }}>
            {items.map((item) => (
              <Link
                key={item.id}
                href={buildQuizHref(`/properties/${item.slug}`, {
                  scenarioKey,
                  region,
                  regionName,
                  budgetKey: budget.key,
                  formatKey,
                  timelineKey,
                  priorityKey,
                })}
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                <SurfaceCard style={{ overflow: 'hidden', borderRadius: 26, boxShadow: '0 14px 28px rgba(0,0,0,0.08)' }}>
                  <div
                    style={{
                      minHeight: 212,
                      padding: 18,
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      background: item.coverAsset
                        ? `${toOptimizedBackgroundImage(item.coverAsset, 960, 'linear-gradient(180deg, rgba(12,15,18,0.16) 0%, rgba(12,15,18,0.58) 100%)')} center/cover`
                        : 'linear-gradient(135deg, #7da4b7 0%, #58717f 45%, #2f4149 100%)',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, alignItems: 'flex-start' }}>
                      <div style={{ padding: '8px 12px', borderRadius: 999, background: 'rgba(255,255,255,0.16)', color: '#ffffff', fontSize: 12, fontWeight: 700 }}>
                        {item.region.name}
                      </div>
                      <div style={{ padding: '8px 12px', borderRadius: 999, background: 'rgba(255,255,255,0.92)', color: '#191919', fontSize: 13, fontWeight: 700 }}>
                        {formatPrice(item.priceFrom, item.currency)}
                      </div>
                    </div>

                    <div>
                      <SectionEyebrow style={{ color: 'rgba(255,255,255,0.72)', marginBottom: 8 }}>первая подборка</SectionEyebrow>
                      <div style={{ fontSize: 28, fontWeight: 700, lineHeight: 1.08, color: '#ffffff', marginBottom: 8 }}>{item.title}</div>
                      <div style={{ color: 'rgba(255,255,255,0.86)', lineHeight: 1.55 }}>{[item.city, item.region.name].filter(Boolean).join(' · ')}</div>
                    </div>
                  </div>

                  <div style={{ padding: 18 }}>
                    <div style={{ color: '#5b5044', lineHeight: 1.65, marginBottom: 12 }}>
                      Этот объект подходит под сценарий «{scenario.title.toLowerCase()}», приоритет «{priority.title.toLowerCase()}» и выбранный диапазон бюджета.
                    </div>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontWeight: 700, color: '#1f1b17' }}>
                      Смотреть детали <span>→</span>
                    </div>
                  </div>
                </SurfaceCard>
              </Link>
            ))}
          </div>
        </>
      ) : (
        <InfoCard style={{ marginBottom: 16, color: '#5b5044' }}>
          Под точный фильтр сейчас мало открытых объектов. После контакта соберём расширенную подборку вручную и вернёмся с сильными вариантами под ваш сценарий.
        </InfoCard>
      )}

      <InfoCard style={{ marginBottom: 16, background: 'linear-gradient(180deg, #162a24 0%, #1f3c34 100%)', color: '#ffffff' }}>
        <SectionEyebrow style={{ marginBottom: 8, color: 'rgba(230,220,204,0.7)' }}>Что будет дальше</SectionEyebrow>
        <div style={{ fontWeight: 700, fontSize: 18, lineHeight: 1.35, marginBottom: 10 }}>Откроем полную подборку и сузим выбор под вас</div>
        <div style={{ color: 'rgba(255,255,255,0.82)', lineHeight: 1.7 }}>
          Вы уже видите направление, рынок и первые объекты. На следующем шаге откроем больше вариантов, уточним детали и вернёмся с самым сильным предложением под ваш запрос.
        </div>
      </InfoCard>

      <div style={{ display: 'grid', gap: 12 }}>
        <PrimaryButton href={contactHref} style={{ background: '#ead7ad', color: '#1f1f1f', boxShadow: '0 10px 22px rgba(90,77,38,0.12)' }}>
          Получить полную подборку
        </PrimaryButton>

        <Link
          href={catalogHref}
          style={{
            textDecoration: 'none',
            textAlign: 'center',
            borderRadius: 18,
            padding: '17px 16px',
            background: '#f3ebdf',
            color: '#1f1f1f',
            fontWeight: 700,
            border: '1px solid rgba(216,201,180,0.92)',
          }}
        >
          Смотреть весь каталог
        </Link>
      </div>
    </AppShell>
  );
}
