import { useRouter } from 'next/router';
import { AppShell } from '../../components/app-shell';
import { BackLink } from '../../components/back-link';
import { OptionCardLink } from '../../components/option-card-link';
import { ProgressBar } from '../../components/progress-bar';
import { budgetOptions } from '../../lib/quiz-options';

export default function BudgetQuizPage() {
  const router = useRouter();
  const region = typeof router.query.region === 'string' ? router.query.region : 'crimea';
  const regionName = typeof router.query.regionName === 'string' ? router.query.regionName : 'Крым';

  return (
    <AppShell eyebrow="Подборка" title="Какой бюджет рассматриваешь?" description={`Регион уже выбран: ${regionName}. Следующим шагом уточним срок покупки.`}>
      <BackLink href="/quiz/region" />
      <ProgressBar step={2} total={3} />
      <div style={{ display: 'grid', gap: 12 }}>
        {budgetOptions.map((option) => (
          <OptionCardLink
            key={option.key}
            href={`/quiz/timeline?region=${region}&regionName=${encodeURIComponent(regionName)}&budgetKey=${option.key}`}
            title={option.title}
            description={option.description}
          />
        ))}
      </div>
    </AppShell>
  );
}
