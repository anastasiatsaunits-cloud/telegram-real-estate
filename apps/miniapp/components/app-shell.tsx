import { ReactNode } from 'react';
import { SectionEyebrow, SurfaceCard } from './ui';

type AppShellProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  children: ReactNode;
};

export function AppShell({ eyebrow, title, description, children }: AppShellProps) {
  return (
    <main
      style={{
        minHeight: '100vh',
        padding: '18px 14px 32px',
        fontFamily: 'Inter, Arial, sans-serif',
        color: '#1f1f1f',
        background:
          'radial-gradient(circle at top, rgba(255,255,255,0.72) 0%, rgba(255,255,255,0) 28%), linear-gradient(180deg, #f8f3eb 0%, #f1ece4 100%)',
      }}
    >
      <div style={{ maxWidth: 560, margin: '0 auto' }}>
        <SurfaceCard
          style={{
            background: 'rgba(255,255,255,0.92)',
            borderRadius: 32,
            padding: 22,
            boxShadow: '0 20px 46px rgba(0,0,0,0.08)',
            backdropFilter: 'blur(10px)',
          }}
        >
          {eyebrow ? <SectionEyebrow style={{ marginBottom: 8, color: '#9b7b58' }}>{eyebrow}</SectionEyebrow> : null}
          <h1 style={{ margin: '0 0 12px', fontSize: 30, lineHeight: 1.08 }}>{title}</h1>
          {description ? <p style={{ margin: '0 0 20px', lineHeight: 1.55, color: '#615648', fontSize: 15 }}>{description}</p> : null}
          {children}
        </SurfaceCard>
      </div>
    </main>
  );
}
