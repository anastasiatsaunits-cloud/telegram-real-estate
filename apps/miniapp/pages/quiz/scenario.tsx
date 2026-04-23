import { AppShell } from '../../components/app-shell';
import { BackLink } from '../../components/back-link';
import { OptionCardLink } from '../../components/option-card-link';
import { ProgressBar } from '../../components/progress-bar';
import { buildQuizHref, scenarioOptions } from '../../lib/quiz-options';

export default function ScenarioQuizPage() {
  return (
    <AppShell
      eyebrow="Шаг 1 из 6"
      title="Что для вас сейчас в приоритете?"
      description="Сначала поймём сценарий покупки, а потом сузим рынок и покажем релевантные объекты, а не общий каталог."
    >
      <BackLink href="/" />
      <ProgressBar step={1} total={6} />

      <div
        style={{
          marginBottom: 16,
          padding: 16,
          borderRadius: 20,
          background: 'linear-gradient(180deg, #fff9f3 0%, #f8ede1 100%)',
          border: '1px solid #eadfce',
          color: '#5a4f43',
          lineHeight: 1.55,
        }}
      >
        Это займёт меньше минуты. Сразу после последнего ответа покажу предварительную подборку по вашему сценарию.
      </div>

      <div style={{ display: 'grid', gap: 12 }}>
        {scenarioOptions.map((option) => (
          <OptionCardLink
            key={option.key}
            href={buildQuizHref('/quiz/region', { scenarioKey: option.key })}
            title={option.title}
            description={option.description}
          />
        ))}
      </div>
    </AppShell>
  );
}
