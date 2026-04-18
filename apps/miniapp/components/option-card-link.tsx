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
        borderRadius: 20,
        padding: 18,
        background: 'linear-gradient(180deg, #fffaf6 0%, #fff5ea 100%)',
        color: '#1f1f1f',
        boxShadow: '0 8px 20px rgba(0,0,0,0.04)',
      }}
    >
      <div style={{ fontSize: 17, fontWeight: 700 }}>{title}</div>
      {description ? <div style={{ marginTop: 6, color: '#7d7367', fontSize: 14, lineHeight: 1.5 }}>{description}</div> : null}
    </Link>
  );
}
