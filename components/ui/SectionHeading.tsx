'use client';

import { motion } from 'framer-motion';

// Easing curves
const easings = {
  smooth: [0.25, 0.4, 0.25, 1] as const,
  dramatic: [0.16, 1, 0.3, 1] as const,
};

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
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
    >
      {/* Title with slide-in from left animation */}
      <motion.h2
        className={`text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight ${
          gradient ? 'bg-clip-text text-transparent bg-gradient-to-r from-primary-500 dark:from-primary-400 via-accent-500 dark:via-accent-400 to-primary-500 dark:to-primary-400' : 'text-gray-900 dark:text-white'
        }`}
        initial={{ opacity: 0, x: -30, filter: "blur(4px)" }}
        whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: easings.dramatic }}
      >
        {title}
      </motion.h2>
      
      {/* Subtitle with delayed fade-up */}
      {subtitle && (
        <motion.p 
          className="mt-4 text-lg text-gray-600 dark:text-neutral-400 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2, ease: easings.smooth }}
        >
          {subtitle}
        </motion.p>
      )}
      
      {/* Animated underline accent */}
      <motion.div
        className="mt-4 mx-auto h-1 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full"
        initial={{ width: 0, opacity: 0 }}
        whileInView={{ width: centered ? 80 : 60, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3, ease: easings.dramatic }}
      />
    </motion.div>
  );
}
