import { useRouter } from 'next/router';
import { FormEvent, useMemo, useState } from 'react';
import { AppShell } from '../../components/app-shell';
import { BackLink } from '../../components/back-link';
import { submitLead } from '../../lib/leads';
import {
  buildQuizHref,
  getBudgetByKey,
  getFormatByKey,
  getPriorityByKey,
  getRegionNameBySlug,
  getScenarioByKey,
  getTimelineByKey,
} from '../../lib/quiz-options';

const DEMO_SESSION_ID = 'session_seed_demo';

export default function ContactQuizPage() {
  const router = useRouter();
  const regionSlug = typeof router.query.region === 'string' ? router.query.region : undefined;
  const regionName = typeof router.query.regionName === 'string' ? router.query.regionName : getRegionNameBySlug(regionSlug);
  const scenarioKey = typeof router.query.scenarioKey === 'string' ? router.query.scenarioKey : undefined;
  const budgetKey = typeof router.query.budgetKey === 'string' ? router.query.budgetKey : undefined;
  const formatKey = typeof router.query.formatKey === 'string' ? router.query.formatKey : undefined;
  const timelineKey = typeof router.query.timelineKey === 'string' ? router.query.timelineKey : undefined;
  const priorityKey = typeof router.query.priorityKey === 'string' ? router.query.priorityKey : undefined;
  const propertySlug = typeof router.query.propertySlug === 'string' ? router.query.propertySlug : undefined;
  const propertyTitle = typeof router.query.propertyTitle === 'string' ? router.query.propertyTitle : undefined;

  const scenario = getScenarioByKey(scenarioKey);
  const budget = getBudgetByKey(budgetKey);
  const format = getFormatByKey(formatKey);
  const timeline = getTimelineByKey(timelineKey);
  const priority = getPriorityByKey(priorityKey);

  const [phone, setPhone] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const backHref = useMemo(
    () =>
      buildQuizHref('/quiz/ready', {
        scenarioKey,
        region: regionSlug,
        regionName,
        budgetKey: budget.key,
        formatKey,
        timelineKey,
        priorityKey,
      }),
    [budget.key, formatKey, priorityKey, regionName, regionSlug, scenarioKey, timelineKey],
  );

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      const response = await submitLead({
        sessionId: DEMO_SESSION_ID,
        phone,
        regionInterest: regionName,
        budgetRange: budget.title,
        purchaseTerm: timeline.title,
        source: 'miniapp-quiz-v2',
        propertySlug,
      });

      const leadId = response?.item?.id;
      const successHref = buildQuizHref('/quiz/success', {
        scenarioKey,
        region: regionSlug,
        regionName,
        budgetKey: budget.key,
        formatKey,
        timelineKey: timeline.key,
        priorityKey,
        propertySlug,
        propertyTitle,
      });
      const separator = successHref.includes('?') ? '&' : '?';
      window.location.href = leadId ? `${successHref}${separator}leadId=${encodeURIComponent(leadId)}` : successHref;
    } catch {
      setError('Не удалось отправить заявку. Попробуй ещё раз.');
    } finally {
      setSubmitting(false);
    }
  }

  const title = propertyTitle ? 'Оставьте телефон, и мы откроем детали по выбранному объекту' : 'Оставьте телефон, и мы откроем полную подборку под ваш запрос';
  const description = propertyTitle
    ? 'Свяжемся по выбранному объекту, покажем цифры и при необходимости добавим похожие варианты в том же сценарии.'
    : 'Откроем больше вариантов, уточним детали и вернёмся с самыми сильными предложениями под ваш сценарий.';

  return (
    <AppShell eyebrow="Открываем полный доступ" title={title} description={description}>
      <BackLink href={backHref} />

      <div style={{ display: 'grid', gap: 12, marginBottom: 18 }}>
        <div style={{ padding: 16, borderRadius: 18, background: '#fff8f0', border: '1px solid #ebddcb' }}>
          <div style={{ fontSize: 13, color: '#8f7658', fontWeight: 700, marginBottom: 6 }}>Ваш запрос</div>
          <div style={{ color: '#4d443b', lineHeight: 1.7 }}>
            <div><strong>Сценарий:</strong> {scenario.title}</div>
            <div><strong>Рынок:</strong> {regionName}</div>
            <div><strong>Бюджет:</strong> {budget.title}</div>
            <div><strong>Формат:</strong> {format.title}</div>
            <div><strong>Срок:</strong> {timeline.title}</div>
            <div><strong>Приоритет:</strong> {priority.title}</div>
          </div>
        </div>

        {propertyTitle ? (
          <div style={{ padding: 16, borderRadius: 18, background: '#fffaf6', border: '1px solid #ece3d7' }}>
            <div style={{ fontSize: 13, color: '#8f7658', fontWeight: 700, marginBottom: 6 }}>Вы выбрали</div>
            <div style={{ fontWeight: 700, lineHeight: 1.5 }}>{propertyTitle}</div>
          </div>
        ) : null}
      </div>

      <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 14 }}>
        <label style={{ display: 'grid', gap: 8 }}>
          <span style={{ fontWeight: 700 }}>Телефон для связи</span>
          <input
            type="tel"
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
            placeholder="+7 (999) 123-45-67"
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
          {submitting ? 'Отправляем запрос...' : propertyTitle ? 'Получить детали и похожие варианты' : 'Открыть полную подборку'}
        </button>

        {error ? <div style={{ color: '#b94a48', fontSize: 14 }}>{error}</div> : null}
      </form>
    </AppShell>
  );
}
