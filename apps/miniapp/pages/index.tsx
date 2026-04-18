import Link from 'next/link';
import { AppShell } from '../components/app-shell';
import { RegionsList } from '../components/regions-list';

export default function HomePage() {
  return (
    <AppShell
      eyebrow="Персональный подбор"
      title="Подберём недвижимость под вашу цель, бюджет и срок покупки"
      description="Ответьте на несколько коротких вопросов и получите подборку объектов, которые действительно подходят именно вам."
    >
      <div
        style={{
          display: 'grid',
          gap: 14,
          marginBottom: 18,
        }}
      >
        <div
          style={{
            padding: 18,
            borderRadius: 22,
            background: 'linear-gradient(180deg, #fff7ef 0%, #f8ede1 100%)',
            border: '1px solid #eadfce',
            boxShadow: '0 12px 28px rgba(77, 53, 24, 0.06)',
          }}
        >
          <div style={{ color: '#8d6f50', fontWeight: 700, fontSize: 13, marginBottom: 10 }}>Что внутри</div>
          <div style={{ display: 'grid', gap: 10, color: '#54493d', lineHeight: 1.5, fontSize: 15 }}>
            <div>• короткий подбор по вашим параметрам</div>
            <div>• актуальные варианты по направлениям</div>
            <div>• понятный следующий шаг без лишней переписки</div>
          </div>
        </div>

        <div style={{ display: 'grid', gap: 10 }}>
          <Link
            href="/quiz/region"
            style={{
              background: '#1f1f1f',
              color: '#ffffff',
              textDecoration: 'none',
              padding: '16px 18px',
              borderRadius: 18,
              fontWeight: 700,
              textAlign: 'center',
              boxShadow: '0 12px 28px rgba(0,0,0,0.15)',
            }}
          >
            Начать подбор
          </Link>

          <Link
            href="/properties"
            style={{
              background: '#ffffff',
              color: '#2b241d',
              textDecoration: 'none',
              padding: '15px 18px',
              borderRadius: 18,
              fontWeight: 700,
              textAlign: 'center',
              border: '1px solid #eadfce',
            }}
          >
            Смотреть каталог
          </Link>
        </div>
      </div>

      <section
        style={{
          marginBottom: 18,
          padding: 18,
          borderRadius: 22,
          background: '#fffdfb',
          border: '1px solid #efe5d9',
          boxShadow: '0 10px 24px rgba(0,0,0,0.05)',
        }}
      >
        <h2 style={{ margin: '0 0 10px', fontSize: 22 }}>Как это работает</h2>
        <div style={{ display: 'grid', gap: 10, color: '#605548', lineHeight: 1.55 }}>
          <div><strong>1.</strong> Вы отвечаете на 3 коротких вопроса</div>
          <div><strong>2.</strong> Мы формируем релевантную подборку объектов</div>
          <div><strong>3.</strong> Вы переходите к просмотру и оставляете заявку на понравившийся вариант</div>
        </div>
      </section>

      <section
        style={{
          padding: 18,
          borderRadius: 22,
          background: '#ffffff',
          border: '1px solid #efe5d9',
          boxShadow: '0 10px 24px rgba(0,0,0,0.05)',
        }}
      >
        <h2 style={{ margin: '0 0 8px', fontSize: 22 }}>Популярные направления</h2>
        <p style={{ margin: '0 0 16px', color: '#6c5f52', lineHeight: 1.5 }}>
          Начните с направления, которое вам ближе, или сразу переходите в короткий подбор.
        </p>
        <RegionsList />
      </section>
    </AppShell>
  );
}
