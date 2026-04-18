import { ReactNode } from 'react';

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
        background: 'linear-gradient(180deg, #f8f3eb 0%, #f1ece4 100%)',
      }}
    >
      <div style={{ maxWidth: 560, margin: '0 auto' }}>
        <section
          style={{
            background: 'rgba(255,255,255,0.92)',
            borderRadius: 28,
            padding: 22,
            boxShadow: '0 14px 40px rgba(0,0,0,0.08)',
            border: '1px solid rgba(232, 222, 207, 0.9)',
            backdropFilter: 'blur(10px)',
          }}
        >
          {eyebrow ? (
            <p style={{ margin: '0 0 8px', color: '#9b7b58', fontWeight: 700, fontSize: 13, letterSpacing: '0.02em' }}>
              {eyebrow}
            </p>
          ) : null}
          <h1 style={{ margin: '0 0 12px', fontSize: 30, lineHeight: 1.08 }}>{title}</h1>
          {description ? (
            <p style={{ margin: '0 0 20px', lineHeight: 1.55, color: '#615648', fontSize: 15 }}>{description}</p>
          ) : null}
          {children}
        </section>
      </div>
    </main>
  );
}
