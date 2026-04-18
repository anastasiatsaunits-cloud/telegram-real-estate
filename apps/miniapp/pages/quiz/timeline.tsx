import { useRouter } from 'next/router';
import { OptionCardLink } from '../../components/option-card-link';
import { QuizLayout } from '../../components/quiz-layout';
import { getBudgetByKey, timelineOptions } from '../../lib/quiz-options';

export default function TimelineQuizPage() {
  const router = useRouter();
  const region = typeof router.query.region === 'string' ? router.query.region : 'crimea';
  const regionName = typeof router.query.regionName === 'string' ? router.query.regionName : 'Крым';
  const budgetKey = typeof router.query.budgetKey === 'string' ? router.query.budgetKey : 'under-10m';
  const budget = getBudgetByKey(budgetKey);

  return (
    <QuizLayout
      step="Шаг 3 из 3"
      title="Когда планируешь покупку?"
      description="После этого шага ведём пользователя на экран готовой подборки."
      backHref="/quiz/budget"
    >
      <div style={{ display: 'grid', gap: 12 }}>
        {timelineOptions.map((option) => (
          <OptionCardLink
            key={option.key}
            href={`/quiz/ready?region=${region}&regionName=${encodeURIComponent(regionName)}&budgetKey=${budget.key}&timelineKey=${option.key}`}
            title={option.title}
          />
        ))}
      </div>
    </QuizLayout>
  );
}
