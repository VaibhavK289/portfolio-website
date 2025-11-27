import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  glass?: boolean;
  shape?: 'default' | 'squircle' | 'blob' | 'hexagon';
}

export function Card({ children, className = '', hover = true, glass = false, shape = 'default' }: CardProps) {
  // Responsive radii: smaller on mobile, larger on desktop
  const shapeClasses = {
    default: 'rounded-xl md:rounded-2xl lg:rounded-3xl',
    squircle: 'shape-squircle',
    blob: 'shape-blob',
    hexagon: 'shape-hexagon',
  };
  
  const baseClasses = `${shapeClasses[shape]} overflow-hidden`;
  const hoverClasses = hover 
    ? 'hover:shadow-xl hover:shadow-primary-500/5 hover:-translate-y-1 transition-all duration-300 ease-out hover:scale-[1.02]' 
    : '';
  const glassClasses = glass
    ? 'bg-white/5 dark:bg-neutral-900/50 backdrop-blur-xl border border-white/10 dark:border-neutral-800/50'
    : 'bg-white dark:bg-neutral-900 border border-gray-200/80 dark:border-neutral-800 shadow-sm';

  return (
    <motion.div
      className={`${baseClasses} ${hoverClasses} ${glassClasses} ${className}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.div>
  );
}

interface CardHeaderProps {
  children: ReactNode;
  className?: string;
}

export function CardHeader({ children, className = '' }: CardHeaderProps) {
  return <div className={`p-6 pb-0 ${className}`}>{children}</div>;
}

interface CardContentProps {
  children: ReactNode;
  className?: string;
}

export function CardContent({ children, className = '' }: CardContentProps) {
  return <div className={`p-6 ${className}`}>{children}</div>;
}

interface CardFooterProps {
  children: ReactNode;
  className?: string;
}

export function CardFooter({ children, className = '' }: CardFooterProps) {
  return <div className={`p-6 pt-0 ${className}`}>{children}</div>;
}
