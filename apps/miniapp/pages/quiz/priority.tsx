import { useRouter } from 'next/router';
import { AppShell } from '../../components/app-shell';
import { BackLink } from '../../components/back-link';
import { OptionCardLink } from '../../components/option-card-link';
import { ProgressBar } from '../../components/progress-bar';
import { buildQuizHref, getBudgetByKey, getRegionNameBySlug, getTimelineByKey, priorityOptions } from '../../lib/quiz-options';

export default function PriorityQuizPage() {
  const router = useRouter();
  const scenarioKey = typeof router.query.scenarioKey === 'string' ? router.query.scenarioKey : undefined;
  const region = typeof router.query.region === 'string' ? router.query.region : undefined;
  const regionName = typeof router.query.regionName === 'string' ? router.query.regionName : getRegionNameBySlug(region);
  const budgetKey = typeof router.query.budgetKey === 'string' ? router.query.budgetKey : undefined;
  const formatKey = typeof router.query.formatKey === 'string' ? router.query.formatKey : undefined;
  const timelineKey = typeof router.query.timelineKey === 'string' ? router.query.timelineKey : undefined;
  const budget = getBudgetByKey(budgetKey);
  const timeline = getTimelineByKey(timelineKey);

  return (
    <AppShell
      eyebrow="Шаг 6 из 6"
      title="Что для вас критично в выборе?"
      description={`Рынок: ${regionName}. Бюджет: ${budget.title}. Срок: ${timeline.title}. Последний шаг, и покажу предварительную подборку.`}
    >
      <BackLink href={buildQuizHref('/quiz/timeline', { scenarioKey, region, regionName, budgetKey: budget.key, formatKey, timelineKey })} />
      <ProgressBar step={6} total={6} />

      <div style={{ display: 'grid', gap: 12 }}>
        {priorityOptions.map((option) => (
          <OptionCardLink
            key={option.key}
            href={buildQuizHref('/quiz/ready', {
              scenarioKey,
              region,
              regionName,
              budgetKey: budget.key,
              formatKey,
              timelineKey,
              priorityKey: option.key,
            })}
            title={option.title}
            description={option.description}
          />
        ))}
      </div>
    </AppShell>
  );
}
