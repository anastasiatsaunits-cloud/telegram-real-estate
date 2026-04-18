import { OptionCardLink } from '../../components/option-card-link';
import { QuizLayout } from '../../components/quiz-layout';

const budgetOptions = [
  { title: 'До 5 млн ₽', description: 'Бюджет для стартового подбора' },
  { title: '5–10 млн ₽', description: 'Популярный диапазон для инвест-покупки' },
  { title: '10–20 млн ₽', description: 'Расширенный подбор по ликвидным объектам' },
  { title: '20+ млн ₽', description: 'Премиальный сегмент и точечный подбор' },
  { title: 'Нужен индивидуальный подбор', description: 'Подойдёт, если пока без точного бюджета' },
];

export default function BudgetQuizPage() {
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
            key={option.title}
            href="/quiz/timeline"
            title={option.title}
            description={option.description}
          />
        ))}
      </div>
    </QuizLayout>
  );
}
