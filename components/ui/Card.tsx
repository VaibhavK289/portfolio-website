import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  glass?: boolean;
}

export function Card({ children, className = '', hover = true, glass = false }: CardProps) {
  const baseClasses = 'rounded-2xl overflow-hidden';
  const hoverClasses = hover ? 'card-hover' : '';
  const glassClasses = glass
    ? 'glass glass-border'
    : 'bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm';

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
