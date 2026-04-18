export function ProgressBar({ step, total }: { step: number; total: number }) {
  const safeStep = Math.max(1, Math.min(step, total));
  const percent = Math.round((safeStep / total) * 100);

  return (
    <div style={{ marginBottom: 18 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, fontSize: 13, color: '#7f6d59', fontWeight: 600 }}>
        <span>Шаг {safeStep} из {total}</span>
        <span>{percent}%</span>
      </div>
      <div style={{ height: 8, borderRadius: 999, background: '#efe5d8', overflow: 'hidden' }}>
        <div
          style={{
            width: `${percent}%`,
            height: '100%',
            borderRadius: 999,
            background: 'linear-gradient(90deg, #8f6b4a 0%, #c5a27c 100%)',
          }}
        />
      </div>
    </div>
  );
}
