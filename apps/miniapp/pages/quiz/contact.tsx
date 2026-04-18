import Link from 'next/link';
import { useRouter } from 'next/router';
import { FormEvent, useState } from 'react';
import { AppShell } from '../../components/app-shell';
import { BackLink } from '../../components/back-link';
import { submitLead } from '../../lib/leads';
import { getBudgetByKey, getTimelineByKey } from '../../lib/quiz-options';

const DEMO_SESSION_ID = 'session_seed_demo';

export default function ContactQuizPage() {
  const router = useRouter();
  const region = typeof router.query.regionName === 'string' ? router.query.regionName : 'Крым';
  const budget = getBudgetByKey(typeof router.query.budgetKey === 'string' ? router.query.budgetKey : 'under-10m');
  const timeline = getTimelineByKey(typeof router.query.timelineKey === 'string' ? router.query.timelineKey : '3-months');
  const regionSlug = typeof router.query.region === 'string' ? router.query.region : 'crimea';
  const propertySlug = typeof router.query.propertySlug === 'string' ? router.query.propertySlug : undefined;
  const propertyTitle = typeof router.query.propertyTitle === 'string' ? router.query.propertyTitle : undefined;

  const [phone, setPhone] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      const response = await submitLead({
        sessionId: DEMO_SESSION_ID,
        phone,
        regionInterest: region,
        budgetRange: budget.title,
        purchaseTerm: timeline.title,
        source: 'miniapp-mvp',
        propertySlug,
      });

      const leadId = response?.item?.id;
      window.location.href = leadId
        ? `/quiz/success?leadId=${leadId}&region=${regionSlug}&regionName=${encodeURIComponent(region)}&budgetKey=${budget.key}&timelineKey=${timeline.key}${propertySlug ? `&propertySlug=${propertySlug}` : ''}${propertyTitle ? `&propertyTitle=${encodeURIComponent(propertyTitle)}` : ''}`
        : '/quiz/success';
    } catch {
      setError('Не удалось отправить заявку. Попробуй ещё раз.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <AppShell
      eyebrow="Последний шаг"
      title="Оставь телефон, и мы покажем подборку"
      description="Это уже живой submit в backend. Для MVP используем demo session из seed-данных. Сейчас можно отправить либо общий запрос по подборке, либо заявку на конкретный объект."
    >
      <BackLink href={`/quiz/ready?region=${regionSlug}&regionName=${encodeURIComponent(region)}&budgetKey=${budget.key}&timelineKey=${timeline.key}`} />

      <div style={{ display: 'grid', gap: 12, marginBottom: 18 }}>
        <div style={{ padding: 16, borderRadius: 18, background: '#fff8f0', border: '1px solid #ebddcb' }}>
          <div style={{ fontSize: 13, color: '#8f7658', fontWeight: 700, marginBottom: 6 }}>Параметры запроса</div>
          <div style={{ color: '#4d443b', lineHeight: 1.6 }}>
            <div><strong>Регион:</strong> {region}</div>
            <div><strong>Бюджет:</strong> {budget.title}</div>
            <div><strong>Срок:</strong> {timeline.title}</div>
          </div>
        </div>

        {propertyTitle ? (
          <div style={{ padding: 16, borderRadius: 18, background: '#fffaf6', border: '1px solid #ece3d7' }}>
            <div style={{ fontSize: 13, color: '#8f7658', fontWeight: 700, marginBottom: 6 }}>Выбранный объект</div>
            <div style={{ fontWeight: 700, lineHeight: 1.5 }}>{propertyTitle}</div>
          </div>
        ) : null}
      </div>

      <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 14 }}>
        <label style={{ display: 'grid', gap: 8 }}>
          <span style={{ fontWeight: 700 }}>Телефон</span>
          <input
            type="tel"
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
            placeholder="+7 999 123-45-67"
            required
            style={{
              border: '1px solid #d9cdbd',
              borderRadius: 16,
              padding: '15px 16px',
              fontSize: 16,
              outline: 'none',
              background: '#fffdfb',
            }}
          />
        </label>

        <button
          type="submit"
          disabled={submitting}
          style={{
            background: 'linear-gradient(90deg, #1f1f1f 0%, #444 100%)',
            color: '#ffffff',
            border: 'none',
            borderRadius: 16,
            padding: '15px 18px',
            fontSize: 16,
            fontWeight: 700,
            cursor: 'pointer',
            opacity: submitting ? 0.75 : 1,
            boxShadow: '0 10px 24px rgba(0,0,0,0.12)',
          }}
        >
          {submitting ? 'Отправляю...' : propertyTitle ? 'Отправить заявку на объект' : 'Получить подборку'}
        </button>

        {error ? <div style={{ color: '#b94a48', fontSize: 14 }}>{error}</div> : null}
      </form>
    </AppShell>
  );
}
