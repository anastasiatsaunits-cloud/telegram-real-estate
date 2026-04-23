import { useRouter } from 'next/router';
import { AppShell } from '../../components/app-shell';
import { BackLink } from '../../components/back-link';
import { OptionCardLink } from '../../components/option-card-link';
import { ProgressBar } from '../../components/progress-bar';
import { buildQuizHref, formatOptions, getBudgetByKey, getRegionNameBySlug } from '../../lib/quiz-options';

export default function FormatQuizPage() {
  const router = useRouter();
  const scenarioKey = typeof router.query.scenarioKey === 'string' ? router.query.scenarioKey : undefined;
  const region = typeof router.query.region === 'string' ? router.query.region : undefined;
  const regionName = typeof router.query.regionName === 'string' ? router.query.regionName : getRegionNameBySlug(region);
  const budgetKey = typeof router.query.budgetKey === 'string' ? router.query.budgetKey : undefined;
  const budget = getBudgetByKey(budgetKey);

  return (
    <AppShell
      eyebrow="Шаг 4 из 6"
      title="Какой формат вам ближе?"
      description={`Рынок: ${regionName}. Бюджет: ${budget.title}. Оставим только тот тип продукта, который вам действительно подходит.`}
    >
      <BackLink href={buildQuizHref('/quiz/budget', { scenarioKey, region, regionName, budgetKey })} />
      <ProgressBar step={4} total={6} />

      <div style={{ display: 'grid', gap: 12 }}>
        {formatOptions.map((option) => (
          <OptionCardLink
            key={option.key}
            href={buildQuizHref('/quiz/timeline', {
              scenarioKey,
              region,
              regionName,
              budgetKey: budget.key,
              formatKey: option.key,
            })}
            title={option.title}
            description={option.description}
          />
        ))}
      </div>
    </AppShell>
  );
}
