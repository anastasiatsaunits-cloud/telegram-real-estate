import Link from 'next/link';
import { useRouter } from 'next/router';
import { getBudgetByKey, getTimelineByKey } from '../../lib/quiz-options';

export default function ReadyPage() {
  const router = useRouter();
  const region = typeof router.query.region === 'string' ? router.query.region : 'crimea';
  const regionName = typeof router.query.regionName === 'string' ? router.query.regionName : 'Крым';
  const budget = getBudgetByKey(typeof router.query.budgetKey === 'string' ? router.query.budgetKey : 'under-10m');
  const timeline = getTimelineByKey(typeof router.query.timelineKey === 'string' ? router.query.timelineKey : '3-months');
  return (
    <main
      style={{
        minHeight: '100vh',
        padding: '24px 20px 40px',
        fontFamily: 'Inter, Arial, sans-serif',
        color: '#1f1f1f',
      }}
    >
      <section
        style={{
          background: '#fffaf2',
          borderRadius: 24,
          padding: 24,
          boxShadow: '0 10px 30px rgba(0,0,0,0.06)',
        }}
      >
        <p style={{ margin: '0 0 8px', color: '#8b7355', fontWeight: 600 }}>Подборка готова</p>
        <h1 style={{ margin: '0 0 12px', fontSize: 32, lineHeight: 1.1 }}>
          Мы уже собрали подходящие варианты
        </h1>
        <p style={{ margin: '0 0 20px', lineHeight: 1.5, color: '#5c5348' }}>
          Следующим шагом сюда подключим форму телефона и вывод персональной подборки объектов.
          Сейчас это первый рабочий экран завершения квиза для MVP.
        </p>

        <div
          style={{
            borderRadius: 20,
            background: '#ffffff',
            padding: 18,
            marginBottom: 18,
            border: '1px solid #ece3d7',
          }}
        >
          <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 8 }}>Что уже подготовлено</div>
          <ul style={{ margin: 0, paddingLeft: 18, color: '#5c5348', lineHeight: 1.6 }}>
            <li>регион: {regionName}</li>
            <li>бюджет: {budget.title}</li>
            <li>срок покупки: {timeline.title}</li>
            <li>подборка будет открыта с фильтром по региону</li>
          </ul>
        </div>

        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <Link
            href={`/quiz/contact?region=${region}&regionName=${encodeURIComponent(regionName)}&budgetKey=${budget.key}&timelineKey=${timeline.key}`}
            style={{
              background: '#1f1f1f',
              color: '#ffffff',
              textDecoration: 'none',
              padding: '14px 18px',
              borderRadius: 14,
              fontWeight: 600,
            }}
          >
            Получить подборку
          </Link>
          <Link
            href="/quiz/region"
            style={{
              background: '#efe7db',
              color: '#1f1f1f',
              textDecoration: 'none',
              padding: '14px 18px',
              borderRadius: 14,
              fontWeight: 600,
            }}
          >
            Пройти заново
          </Link>
        </div>
      </section>
    </main>
  );
}
