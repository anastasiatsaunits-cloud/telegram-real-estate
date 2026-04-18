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
  return (
    <QuizLayout
      step="Шаг 3 из 3"
      title="Когда планируешь покупку?"
      description="После этого шага ведём пользователя на экран готовой подборки."
      backHref="/quiz/budget"
    >
      <div style={{ display: 'grid', gap: 12 }}>
        {timelineOptions.map((option) => (
          <OptionCardLink key={option} href="/quiz/ready" title={option} />
        ))}
      </div>
    </QuizLayout>
  );
}
