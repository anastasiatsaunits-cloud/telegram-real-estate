import Link from 'next/link';

export function BackLink({ href }: { href: string }) {
  return (
    <div style={{ marginBottom: 14 }}>
      <Link href={href} style={{ color: '#8b7355', textDecoration: 'none', fontWeight: 700, fontSize: 14 }}>
        ← Назад
      </Link>
    </div>
  );
}
