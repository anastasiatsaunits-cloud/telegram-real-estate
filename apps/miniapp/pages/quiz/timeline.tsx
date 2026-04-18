import { useRouter } from 'next/router';
import { OptionCardLink } from '../../components/option-card-link';
import { QuizLayout } from '../../components/quiz-layout';

const timelineOptions = [
  'Срочно',
  'В течение 1 месяца',
  'В течение 3 месяцев',
  'В течение 6 месяцев',
  'Пока изучаю рынок',
];

export default function TimelineQuizPage() {
  const router = useRouter();
  const region = typeof router.query.region === 'string' ? router.query.region : 'crimea';
  const regionName = typeof router.query.regionName === 'string' ? router.query.regionName : 'Крым';
  const budget = typeof router.query.budget === 'string' ? router.query.budget : '10–20 млн ₽';

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
            key={option}
            href={`/quiz/ready?region=${region}&regionName=${encodeURIComponent(regionName)}&budget=${encodeURIComponent(budget)}&timeline=${encodeURIComponent(option)}`}
            title={option}
          />
        ))}
      </div>
    </QuizLayout>
  );
}
