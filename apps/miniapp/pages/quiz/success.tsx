import Link from 'next/link';
import { useRouter } from 'next/router';
import { getBudgetByKey, getTimelineByKey } from '../../lib/quiz-options';

export default function SuccessPage() {
  const router = useRouter();
  const leadId = typeof router.query.leadId === 'string' ? router.query.leadId : null;
  const region = typeof router.query.region === 'string' ? router.query.region : 'crimea';
  const regionName = typeof router.query.regionName === 'string' ? router.query.regionName : 'Крым';
  const budget = getBudgetByKey(typeof router.query.budgetKey === 'string' ? router.query.budgetKey : 'under-10m');
  const timeline = getTimelineByKey(typeof router.query.timelineKey === 'string' ? router.query.timelineKey : '3-months');
  const propertySlug = typeof router.query.propertySlug === 'string' ? router.query.propertySlug : null;
  const propertyTitle = typeof router.query.propertyTitle === 'string' ? router.query.propertyTitle : null;

  return (
    <main style={{ minHeight: '100vh', padding: '24px 20px 40px', fontFamily: 'Inter, Arial, sans-serif', color: '#1f1f1f' }}>
      <section style={{ background: '#fffaf2', borderRadius: 24, padding: 24, boxShadow: '0 10px 30px rgba(0,0,0,0.06)' }}>
        <p style={{ margin: '0 0 8px', color: '#8b7355', fontWeight: 600 }}>Заявка отправлена</p>
        <h1 style={{ margin: '0 0 12px', fontSize: 32, lineHeight: 1.1 }}>Готово, мы получили твой контакт</h1>
        <p style={{ margin: '0 0 20px', color: '#5c5348', lineHeight: 1.5 }}>
          Теперь уже можно перейти к живой подборке объектов из backend. Сейчас откроем её с учётом региона {regionName}, бюджета {budget.title} и срока {timeline.title}.
        </p>

        {leadId ? (
          <div style={{ marginBottom: 16, padding: 14, borderRadius: 14, background: '#ffffff', border: '1px solid #ece3d7' }}>
            <strong>Lead ID:</strong> {leadId}
            {propertyTitle ? <div style={{ marginTop: 8 }}><strong>Объект:</strong> {propertyTitle}</div> : null}
          </div>
        ) : null}

        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          {propertySlug ? (
            <Link href={`/properties/${propertySlug}?region=${region}&regionName=${encodeURIComponent(regionName)}&budgetKey=${budget.key}&timelineKey=${timeline.key}`} style={{ background: '#1f1f1f', color: '#ffffff', textDecoration: 'none', padding: '14px 18px', borderRadius: 14, fontWeight: 600 }}>
              Вернуться к объекту
            </Link>
          ) : (
            <Link href={`/properties?region=${region}&regionName=${encodeURIComponent(regionName)}&budgetKey=${budget.key}&timelineKey=${timeline.key}`} style={{ background: '#1f1f1f', color: '#ffffff', textDecoration: 'none', padding: '14px 18px', borderRadius: 14, fontWeight: 600 }}>
              Смотреть объекты
            </Link>
          )}
          <Link href="/quiz/region" style={{ background: '#efe7db', color: '#1f1f1f', textDecoration: 'none', padding: '14px 18px', borderRadius: 14, fontWeight: 600 }}>
            Пройти заново
          </Link>
        </div>
      </section>
    </main>
  );
}
