import { useRouter } from 'next/router';
import { OptionCardLink } from '../../components/option-card-link';
import { QuizLayout } from '../../components/quiz-layout';
import { budgetOptions } from '../../lib/quiz-options';

export default function BudgetQuizPage() {
  const router = useRouter();
  const region = typeof router.query.region === 'string' ? router.query.region : 'crimea';
  const regionName = typeof router.query.regionName === 'string' ? router.query.regionName : 'Крым';

  return (
    <QuizLayout
      step="Шаг 2 из 3"
      title="Какой бюджет рассматриваешь?"
      description="Пока делаем линейный MVP-сценарий. Следующим экраном идёт срок покупки."
      backHref="/quiz/region"
    >
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
    </QuizLayout>
  );
}
