import { useRouter } from 'next/router';
import { AppShell } from '../../components/app-shell';
import { BackLink } from '../../components/back-link';
import { OptionCardLink } from '../../components/option-card-link';
import { ProgressBar } from '../../components/progress-bar';
import { getBudgetByKey, timelineOptions } from '../../lib/quiz-options';

export default function TimelineQuizPage() {
  const router = useRouter();
  const region = typeof router.query.region === 'string' ? router.query.region : 'crimea';
  const regionName = typeof router.query.regionName === 'string' ? router.query.regionName : 'Крым';
  const budgetKey = typeof router.query.budgetKey === 'string' ? router.query.budgetKey : 'under-10m';
  const budget = getBudgetByKey(budgetKey);

  return (
    <AppShell eyebrow="Подборка" title="Когда планируешь покупку?" description={`Регион: ${regionName}. Бюджет: ${budget.title}.`}>
      <BackLink href="/quiz/budget" />
      <ProgressBar step={3} total={3} />
      <div style={{ display: 'grid', gap: 12 }}>
        {timelineOptions.map((option) => (
          <OptionCardLink
            key={option.key}
            href={`/quiz/ready?region=${region}&regionName=${encodeURIComponent(regionName)}&budgetKey=${budget.key}&timelineKey=${option.key}`}
            title={option.title}
          />
        ))}
      </div>
    </AppShell>
  );
}
