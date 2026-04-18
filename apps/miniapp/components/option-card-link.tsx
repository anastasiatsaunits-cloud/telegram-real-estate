import Link from 'next/link';

type OptionCardLinkProps = {
  href: string;
  title: string;
  description?: string;
};

export function OptionCardLink({ href, title, description }: OptionCardLinkProps) {
  return (
    <Link
      href={href}
      style={{
        display: 'block',
        textDecoration: 'none',
        border: '1px solid #eadfce',
        borderRadius: 22,
        padding: 18,
        background: 'linear-gradient(180deg, #fffaf6 0%, #fff1e4 100%)',
        color: '#1f1f1f',
        boxShadow: '0 10px 24px rgba(62, 42, 16, 0.06)',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: 16, alignItems: 'flex-start' }}>
        <div>
          <div style={{ fontSize: 17, fontWeight: 700 }}>{title}</div>
          {description ? <div style={{ marginTop: 6, color: '#7d7367', fontSize: 14, lineHeight: 1.5 }}>{description}</div> : null}
        </div>
        <div style={{ color: '#a1815f', fontWeight: 700, fontSize: 18 }}>→</div>
      </div>
    </Link>
  );
}
