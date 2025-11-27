'use client';

import { motion } from 'framer-motion';

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
  gradient?: boolean;
}

export function SectionHeading({
  title,
  subtitle,
  centered = true,
  gradient = true,
}: SectionHeadingProps) {
  return (
    <motion.div
      className={`mb-12 ${centered ? 'text-center' : ''}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <h2
        className={`text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight ${
          gradient ? 'bg-clip-text text-transparent bg-gradient-to-r from-primary-500 dark:from-primary-400 via-accent-500 dark:via-accent-400 to-primary-500 dark:to-primary-400' : 'text-gray-900 dark:text-white'
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-lg text-gray-600 dark:text-neutral-400 max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
