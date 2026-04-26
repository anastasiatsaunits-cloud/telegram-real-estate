import { ReactNode } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

const borderColor = 'rgba(227,219,207,0.92)';

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
        border: `1px solid ${borderColor}`,
        boxShadow: '0 18px 40px rgba(0,0,0,0.08)',
        ...style,
      }}
    >
      {children}
    </div>
  );
}

export function MotionCard({ children, style }: CardProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 24, scale: 0.985, filter: 'blur(8px)' }}
      whileInView={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
      whileHover={reduceMotion ? undefined : { y: -3, scale: 1.004 }}
      viewport={{ once: true, amount: 0.18 }}
      whileTap={{ scale: 0.992 }}
      transition={reduceMotion ? { duration: 0.2 } : { type: 'spring', stiffness: 180, damping: 20, mass: 0.9 }}
      style={style}
    >
      {children}
    </motion.div>
  );
}

export function SectionEyebrow({ children, style }: CardProps) {
  return (
    <div
      style={{
        fontSize: 12,
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
        color: '#8f8578',
        ...style,
      }}
    >
      {children}
    </div>
  );
}

export function Pill({ children, style }: CardProps) {
  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexWrap: 'wrap',
        maxWidth: '100%',
        textAlign: 'center',
        lineHeight: 1.25,
        borderRadius: 999,
        padding: '8px 12px',
        background: '#f4ecdf',
        color: '#62584d',
        fontSize: 12,
        fontWeight: 700,
        letterSpacing: '0.06em',
        textTransform: 'uppercase',
        ...style,
      }}
    >
      {children}
    </div>
  );
}

export function InfoCard({ children, style }: CardProps) {
  return (
    <SurfaceCard
      style={{
        borderRadius: 24,
        padding: 18,
        background: '#faf7f1',
        boxShadow: 'none',
        ...style,
      }}
    >
      {children}
    </SurfaceCard>
  );
}

export function PrimaryButton({ children, href, style }: { children: ReactNode; href: string; style?: React.CSSProperties }) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.a
      href={href}
      whileHover={reduceMotion ? undefined : { y: -2, scale: 1.012 }}
      whileTap={{ scale: 0.985 }}
      transition={reduceMotion ? { duration: 0.15 } : { type: 'spring', stiffness: 260, damping: 18 }}
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
    </motion.a>
  );
}
