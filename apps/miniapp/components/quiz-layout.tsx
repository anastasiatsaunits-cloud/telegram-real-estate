import Link from 'next/link';
import { ReactNode } from 'react';

type QuizLayoutProps = {
  step: string;
  title: string;
  description: string;
  children: ReactNode;
  backHref?: string;
};

export function QuizLayout({ step, title, description, children, backHref = '/' }: QuizLayoutProps) {
  return (
    <main
      style={{
        minHeight: '100vh',
        padding: '24px 20px 40px',
        fontFamily: 'Inter, Arial, sans-serif',
        color: '#1f1f1f',
      }}
    >
      <div style={{ marginBottom: 20 }}>
        <Link href={backHref} style={{ color: '#8b7355', textDecoration: 'none', fontWeight: 600 }}>
          ← Назад
        </Link>
      </div>

      <section
        style={{
          background: '#ffffff',
          borderRadius: 24,
          padding: 24,
          boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
        }}
      >
        <p style={{ margin: '0 0 8px', color: '#8b7355', fontWeight: 600 }}>{step}</p>
        <h1 style={{ margin: '0 0 12px', fontSize: 30 }}>{title}</h1>
        <p style={{ margin: '0 0 20px', color: '#5c5348', lineHeight: 1.5 }}>{description}</p>
        {children}
      </section>
    </main>
  );
}
