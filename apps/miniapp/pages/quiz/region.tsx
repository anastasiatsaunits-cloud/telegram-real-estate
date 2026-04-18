import { useEffect, useState } from 'react';
import { AppShell } from '../../components/app-shell';
import { BackLink } from '../../components/back-link';
import { OptionCardLink } from '../../components/option-card-link';
import { ProgressBar } from '../../components/progress-bar';
import type { Region } from '../../lib/api';

export default function RegionQuizPage() {
  const [regions, setRegions] = useState<Region[]>([]);

  useEffect(() => {
    fetch('/api/regions-proxy')
      .then((res) => res.json())
      .then((data) => setRegions(data.items ?? []));
  }, []);

  return (
    <AppShell
      eyebrow="Шаг 1 из 3"
      title="Где планируешь покупку?"
      description="Выбери направление, и я продолжу подбор уже по подходящим объектам и твоему сценарию покупки."
    >
      <BackLink href="/" />
      <ProgressBar step={1} total={3} />

      <div
        style={{
          marginBottom: 16,
          padding: 16,
          borderRadius: 20,
          background: 'linear-gradient(180deg, #fff9f3 0%, #f8ede1 100%)',
          border: '1px solid #eadfce',
          color: '#5a4f43',
          lineHeight: 1.5,
        }}
      >
        Это займёт меньше минуты. После этого я покажу подборку вариантов, которые подходят именно тебе.
      </div>

      <div style={{ display: 'grid', gap: 12 }}>
        {regions.map((region, index) => (
          <OptionCardLink
            key={region.id}
            href={`/quiz/budget?region=${region.slug}&regionName=${encodeURIComponent(region.name)}`}
            title={region.name}
            description={
              index === 0
                ? 'Актуальные варианты для жизни и инвестиций'
                : index === 1
                  ? 'Объекты под разный бюджет и сценарий покупки'
                  : 'Подборка по параметрам и сроку сделки'
            }
          />
        ))}
      </div>
    </AppShell>
  );
}
