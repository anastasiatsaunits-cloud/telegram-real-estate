import Link from 'next/link';
import { useRouter } from 'next/router';
import { AppShell } from '../../components/app-shell';
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
    <AppShell
      eyebrow="Заявка отправлена"
      title="Готово, мы получили твой контакт"
      description={`Теперь можно перейти к живой подборке объектов из backend. Регион: ${regionName}. Бюджет: ${budget.title}. Срок: ${timeline.title}.`}
    >
      {leadId ? (
        <div style={{ marginBottom: 18, padding: 16, borderRadius: 18, background: '#fffaf6', border: '1px solid #ece3d7' }}>
          <div style={{ fontSize: 13, color: '#8f7658', fontWeight: 700, marginBottom: 8 }}>Данные заявки</div>
          <div style={{ lineHeight: 1.7, color: '#4d443b' }}>
            <div><strong>Lead ID:</strong> {leadId}</div>
            {propertyTitle ? <div><strong>Объект:</strong> {propertyTitle}</div> : null}
          </div>
        </div>
      ) : null}

      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
        {propertySlug ? (
          <Link href={`/properties/${propertySlug}?region=${region}&regionName=${encodeURIComponent(regionName)}&budgetKey=${budget.key}&timelineKey=${timeline.key}`} style={{ background: 'linear-gradient(90deg, #1f1f1f 0%, #444 100%)', color: '#ffffff', textDecoration: 'none', padding: '14px 18px', borderRadius: 16, fontWeight: 700, boxShadow: '0 10px 24px rgba(0,0,0,0.12)' }}>
            Вернуться к объекту
          </Link>
        ) : (
          <Link href={`/properties?region=${region}&regionName=${encodeURIComponent(regionName)}&budgetKey=${budget.key}&timelineKey=${timeline.key}`} style={{ background: 'linear-gradient(90deg, #1f1f1f 0%, #444 100%)', color: '#ffffff', textDecoration: 'none', padding: '14px 18px', borderRadius: 16, fontWeight: 700, boxShadow: '0 10px 24px rgba(0,0,0,0.12)' }}>
            Смотреть объекты
          </Link>
        )}
        <Link href="/quiz/region" style={{ background: '#efe7db', color: '#1f1f1f', textDecoration: 'none', padding: '14px 18px', borderRadius: 16, fontWeight: 700 }}>
          Пройти заново
        </Link>
      </div>
    </AppShell>
  );
}
