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
        borderRadius: 18,
        padding: 18,
        background: '#fffaf6',
        color: '#1f1f1f',
      }}
    >
      <div style={{ fontSize: 17, fontWeight: 700 }}>{title}</div>
      {description ? <div style={{ marginTop: 6, color: '#7d7367', fontSize: 14 }}>{description}</div> : null}
    </Link>
  );
}
