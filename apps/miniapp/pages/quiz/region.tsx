import { useRouter } from 'next/router';
import { AppShell } from '../../components/app-shell';
import { BackLink } from '../../components/back-link';
import { OptionCardLink } from '../../components/option-card-link';
import { ProgressBar } from '../../components/progress-bar';
import { buildQuizHref, getScenarioByKey, marketOptions } from '../../lib/quiz-options';

export default function RegionQuizPage() {
  const router = useRouter();
  const scenarioKey = typeof router.query.scenarioKey === 'string' ? router.query.scenarioKey : undefined;
  const scenario = getScenarioByKey(scenarioKey);

  return (
    <AppShell
      eyebrow="Шаг 2 из 6"
      title="Какой рынок рассматриваете?"
      description={`Сценарий уже понятен: ${scenario.title}. Теперь сузим рынок и уберём нерелевантные варианты.`}
    >
      <BackLink href={buildQuizHref('/quiz/scenario', { scenarioKey })} />
      <ProgressBar step={2} total={6} />

      <div style={{ display: 'grid', gap: 12 }}>
        {marketOptions.map((option) => (
          <OptionCardLink
            key={option.key}
            href={buildQuizHref('/quiz/budget', {
              scenarioKey,
              region: option.regionSlug,
              regionName: option.title,
            })}
            title={option.title}
            description={option.description}
          />
        ))}
      </div>
    </AppShell>
  );
}
