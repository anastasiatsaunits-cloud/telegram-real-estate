import Link from 'next/link';
import { AppShell } from '../components/app-shell';
import { RegionsList } from '../components/regions-list';

export default function HomePage() {
  return (
    <AppShell
      eyebrow="Недвижимость под ваш запрос"
      title="Поможем подобрать объект для жизни, инвестиций или сохранения капитала"
      description="Короткий подбор займёт меньше минуты. После этого вы увидите варианты, которые действительно подходят по цели, бюджету и сроку покупки."
    >
      <section
        style={{
          marginBottom: 18,
          padding: 20,
          borderRadius: 24,
          background: 'linear-gradient(180deg, #fff8f1 0%, #f7ebde 100%)',
          border: '1px solid #eadfce',
          boxShadow: '0 14px 30px rgba(70, 49, 22, 0.08)',
        }}
      >
        <div style={{ color: '#9b7956', fontSize: 13, fontWeight: 700, marginBottom: 10 }}>Персональный сценарий подбора</div>
        <div style={{ display: 'grid', gap: 10, color: '#54493d', lineHeight: 1.55, fontSize: 15, marginBottom: 16 }}>
          <div>• подберём направление под вашу цель</div>
          <div>• покажем актуальные объекты без лишнего шума</div>
          <div>• сразу проведём к следующему шагу, если объект понравится</div>
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
            Подобрать объект
          </Link>

          <Link
            href="/properties"
            style={{
              background: 'rgba(255,255,255,0.88)',
              color: '#2b241d',
              textDecoration: 'none',
              padding: '15px 18px',
              borderRadius: 18,
              fontWeight: 700,
              textAlign: 'center',
              border: '1px solid #eadfce',
            }}
          >
            Открыть каталог
          </Link>
        </div>
      </section>

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
        <h2 style={{ margin: '0 0 12px', fontSize: 22 }}>Как проходит подбор</h2>
        <div style={{ display: 'grid', gap: 12 }}>
          {[
            'Вы отвечаете на несколько коротких вопросов',
            'Мы формируем подборку по вашим параметрам',
            'Вы переходите к объектам и оставляете заявку на понравившийся вариант',
          ].map((item, index) => (
            <div
              key={item}
              style={{
                display: 'grid',
                gridTemplateColumns: '34px 1fr',
                gap: 12,
                alignItems: 'start',
                color: '#5f5548',
                lineHeight: 1.5,
              }}
            >
              <div
                style={{
                  width: 34,
                  height: 34,
                  borderRadius: 12,
                  background: '#f3e7d9',
                  color: '#8f6d49',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 700,
                }}
              >
                {index + 1}
              </div>
              <div>{item}</div>
            </div>
          ))}
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
          Можно начать с направления, которое тебе ближе, или сразу пройти короткий подбор.
        </p>
        <RegionsList />
      </section>
    </AppShell>
  );
}
