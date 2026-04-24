import Link from 'next/link';
import { useRouter } from 'next/router';
import { AppShell } from '../../components/app-shell';
import {
  buildQuizHref,
  getBudgetByKey,
  getFormatByKey,
  getPriorityByKey,
  getRegionNameBySlug,
  getScenarioByKey,
  getTimelineByKey,
} from '../../lib/quiz-options';

export default function SuccessPage() {
  const router = useRouter();
  const leadId = typeof router.query.leadId === 'string' ? router.query.leadId : null;
  const region = typeof router.query.region === 'string' ? router.query.region : undefined;
  const regionName = typeof router.query.regionName === 'string' ? router.query.regionName : getRegionNameBySlug(region);
  const scenarioKey = typeof router.query.scenarioKey === 'string' ? router.query.scenarioKey : undefined;
  const budgetKey = typeof router.query.budgetKey === 'string' ? router.query.budgetKey : undefined;
  const formatKey = typeof router.query.formatKey === 'string' ? router.query.formatKey : undefined;
  const timelineKey = typeof router.query.timelineKey === 'string' ? router.query.timelineKey : undefined;
  const priorityKey = typeof router.query.priorityKey === 'string' ? router.query.priorityKey : undefined;
  const propertySlug = typeof router.query.propertySlug === 'string' ? router.query.propertySlug : null;
  const propertyTitle = typeof router.query.propertyTitle === 'string' ? router.query.propertyTitle : null;

  const scenario = getScenarioByKey(scenarioKey);
  const budget = getBudgetByKey(budgetKey);
  const format = getFormatByKey(formatKey);
  const timeline = getTimelineByKey(timelineKey);
  const priority = getPriorityByKey(priorityKey);

  const propertyHref = propertySlug
    ? buildQuizHref(`/properties/${propertySlug}`, {
        scenarioKey,
        region,
        regionName,
        budgetKey: budget.key,
        formatKey,
        timelineKey,
        priorityKey,
      })
    : buildQuizHref('/properties', {
        scenarioKey,
        region,
        regionName,
        budgetKey: budget.key,
        formatKey,
        timelineKey,
        priorityKey,
      });

  return (
    <AppShell
      eyebrow="Контакт получен"
      title="Спасибо, запрос уже у нас"
      description={`Подготовим подборку под сценарий «${scenario.title.toLowerCase()}», рынок ${regionName}, формат ${format.title.toLowerCase()} и бюджет ${budget.title}.`}
    >
      {leadId ? (
        <div style={{ marginBottom: 18, padding: 16, borderRadius: 18, background: '#fffaf6', border: '1px solid #ece3d7' }}>
          <div style={{ fontSize: 13, color: '#8f7658', fontWeight: 700, marginBottom: 8 }}>Подтверждение запроса</div>
          <div style={{ lineHeight: 1.7, color: '#4d443b' }}>
            <div><strong>Номер запроса:</strong> {leadId}</div>
            {propertyTitle ? <div><strong>Объект:</strong> {propertyTitle}</div> : null}
            <div><strong>Приоритет:</strong> {priority.title}</div>
            <div><strong>Срок:</strong> {timeline.title}</div>
          </div>
        </div>
      ) : null}

      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
        <Link href={propertyHref} style={{ background: 'linear-gradient(90deg, #1f1f1f 0%, #444 100%)', color: '#ffffff', textDecoration: 'none', padding: '14px 18px', borderRadius: 16, fontWeight: 700, boxShadow: '0 10px 24px rgba(0,0,0,0.12)' }}>
          {propertySlug ? 'Вернуться к объекту' : 'Смотреть объекты'}
        </Link>
        <Link href="/quiz/scenario" style={{ background: '#efe7db', color: '#1f1f1f', textDecoration: 'none', padding: '14px 18px', borderRadius: 16, fontWeight: 700 }}>
          Пройти заново
        </Link>
      </div>
    </AppShell>
  );
}
