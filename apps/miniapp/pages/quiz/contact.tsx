import Link from 'next/link';
import { useRouter } from 'next/router';
import { FormEvent, useState } from 'react';
import { submitLead } from '../../lib/leads';

const DEMO_SESSION_ID = 'session_seed_demo';

export default function ContactQuizPage() {
  const router = useRouter();
  const region = typeof router.query.regionName === 'string' ? router.query.regionName : 'Крым';
  const budget = typeof router.query.budget === 'string' ? router.query.budget : '10–20 млн ₽';
  const timeline = typeof router.query.timeline === 'string' ? router.query.timeline : 'В течение 3 месяцев';
  const regionSlug = typeof router.query.region === 'string' ? router.query.region : 'crimea';

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
        budgetRange: budget,
        purchaseTerm: timeline,
        source: 'miniapp-mvp',
      });

      const leadId = response?.item?.id;
      window.location.href = leadId
        ? `/quiz/success?leadId=${leadId}&region=${regionSlug}&regionName=${encodeURIComponent(region)}&budget=${encodeURIComponent(budget)}&timeline=${encodeURIComponent(timeline)}`
        : '/quiz/success';
    } catch {
      setError('Не удалось отправить заявку. Попробуй ещё раз.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main style={{ minHeight: '100vh', padding: '24px 20px 40px', fontFamily: 'Inter, Arial, sans-serif', color: '#1f1f1f' }}>
      <div style={{ marginBottom: 20 }}>
        <Link href={`/quiz/ready?region=${regionSlug}&regionName=${encodeURIComponent(region)}&budget=${encodeURIComponent(budget)}&timeline=${encodeURIComponent(timeline)}`} style={{ color: '#8b7355', textDecoration: 'none', fontWeight: 600 }}>
          ← Назад
        </Link>
      </div>

      <section style={{ background: '#ffffff', borderRadius: 24, padding: 24, boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
        <p style={{ margin: '0 0 8px', color: '#8b7355', fontWeight: 600 }}>Последний шаг</p>
        <h1 style={{ margin: '0 0 12px', fontSize: 30 }}>Оставь телефон, и мы покажем подборку</h1>
        <p style={{ margin: '0 0 20px', color: '#5c5348', lineHeight: 1.5 }}>
          Это уже живой submit в backend. Для MVP используем demo session из seed-данных. Сейчас подборка
          будет открываться с учётом выбранного региона.
        </p>

        <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 14 }}>
          <label style={{ display: 'grid', gap: 8 }}>
            <span style={{ fontWeight: 600 }}>Телефон</span>
            <input
              type="tel"
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
              placeholder="+7 999 123-45-67"
              required
              style={{
                border: '1px solid #d9cdbd',
                borderRadius: 14,
                padding: '14px 16px',
                fontSize: 16,
                outline: 'none',
              }}
            />
          </label>

          <button
            type="submit"
            disabled={submitting}
            style={{
              background: '#1f1f1f',
              color: '#ffffff',
              border: 'none',
              borderRadius: 14,
              padding: '14px 18px',
              fontSize: 16,
              fontWeight: 700,
              cursor: 'pointer',
              opacity: submitting ? 0.7 : 1,
            }}
          >
            {submitting ? 'Отправляю...' : 'Получить подборку'}
          </button>

          {error ? <div style={{ color: '#b94a48', fontSize: 14 }}>{error}</div> : null}
        </form>
      </section>
    </main>
  );
}
