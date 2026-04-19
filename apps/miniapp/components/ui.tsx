import { ReactNode } from 'react';
import { motion } from 'framer-motion';

type CardProps = {
  children: ReactNode;
  style?: React.CSSProperties;
};

export function SurfaceCard({ children, style }: CardProps) {
  return (
    <div
      style={{
        background: '#fffdf9',
        borderRadius: 28,
        border: '1px solid rgba(227,219,207,0.92)',
        boxShadow: '0 18px 40px rgba(0,0,0,0.08)',
        ...style,
      }}
    >
      {children}
    </div>
  );
}

export function MotionCard({ children, style }: CardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      style={style}
    >
      {children}
    </motion.div>
  );
}

export function PrimaryButton({ children, href, style }: { children: ReactNode; href: string; style?: React.CSSProperties }) {
  return (
    <a
      href={href}
      style={{
        display: 'block',
        textDecoration: 'none',
        textAlign: 'center',
        background: '#0f4b22',
        color: '#ffffff',
        padding: '18px 16px',
        borderRadius: 18,
        fontWeight: 700,
        fontSize: 18,
        boxShadow: '0 10px 24px rgba(15,75,34,0.24)',
        ...style,
      }}
    >
      {children}
    </a>
  );
}
