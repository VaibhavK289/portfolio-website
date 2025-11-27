"use client";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * DEPRECATED: TextGenerateEffect
 * The letter-by-letter typing effect slows comprehension.
 * Use GradientText instead for a more professional look.
 * 
 * Keeping for backward compatibility but recommending GradientText.
 */
export const TextGenerateEffect = ({
  words,
  className,
}: {
  words: string;
  className?: string;
  filter?: boolean;
  duration?: number;
}) => {
  // Simplified: just render the text with a subtle gradient animation
  // instead of the slow letter-by-letter typing
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.25, 0.4, 0.25, 1] }}
      className={cn(className)}
    >
      <span className="bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 dark:from-white dark:via-neutral-300 dark:to-white bg-[length:200%_auto] animate-shimmer">
        {words}
      </span>
    </motion.div>
  );
};

/**
 * GradientText - Professional alternative to TextGenerateEffect
 * Static text with a subtle animated gradient for visual interest
 * without slowing down content comprehension.
 */
export const GradientText = ({
  children,
  className,
  gradient = "primary",
  animate = true,
}: {
  children: React.ReactNode;
  className?: string;
  gradient?: "primary" | "accent" | "neutral" | "rainbow";
  animate?: boolean;
}) => {
  const gradientClasses = {
    primary: "from-primary-400 via-primary-500 to-accent-500",
    accent: "from-accent-400 via-purple-500 to-primary-500",
    neutral: "from-gray-900 via-gray-700 to-gray-900 dark:from-white dark:via-neutral-300 dark:to-white",
    rainbow: "from-cyan-400 via-violet-500 to-fuchsia-500",
  };

  return (
    <motion.span
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4, ease: [0.25, 0.4, 0.25, 1] }}
      className={cn(
        "bg-clip-text text-transparent bg-gradient-to-r",
        gradientClasses[gradient],
        animate && "bg-[length:200%_auto] animate-shimmer",
        className
      )}
    >
      {children}
    </motion.span>
  );
};
