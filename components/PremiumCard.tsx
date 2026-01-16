'use client';

import { HoverBorderGradient } from '@/components/ui/aceternity/HoverBorderGradient';
import { motion } from 'framer-motion';

interface PremiumCardProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export function PremiumCard({ children, className = '', delay = 0 }: PremiumCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      className="h-full"
    >
      <HoverBorderGradient
        containerClassName="rounded-2xl h-full"
        as="div"
        className={`bg-white dark:bg-neutral-900 rounded-2xl p-8 md:p-10 h-full flex flex-col justify-between ${className}`}
      >
        {children}
      </HoverBorderGradient>
    </motion.div>
  );
}
