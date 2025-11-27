'use client';

import { motion } from 'framer-motion';

interface VKLogoProps {
  className?: string;
  size?: number;
}

export function VKLogo({ className = '', size = 40 }: VKLogoProps) {
  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 50 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {/* Background with gradient */}
      <defs>
        <linearGradient id="vkGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#a855f7" />
          <stop offset="50%" stopColor="#8b5cf6" />
          <stop offset="100%" stopColor="#6366f1" />
        </linearGradient>
        <linearGradient id="vkShine" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#c084fc" />
          <stop offset="100%" stopColor="#a855f7" />
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="2" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Rounded square background */}
      <rect
        x="2"
        y="2"
        width="46"
        height="46"
        rx="12"
        fill="url(#vkGradient)"
      />

      {/* Subtle inner glow */}
      <rect
        x="4"
        y="4"
        width="42"
        height="42"
        rx="10"
        fill="none"
        stroke="rgba(255,255,255,0.2)"
        strokeWidth="1"
      />

      {/* V letter */}
      <motion.path
        d="M10 14L18 36L26 14"
        stroke="white"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
      />

      {/* K letter */}
      <motion.path
        d="M30 14V36"
        stroke="white"
        strokeWidth="4"
        strokeLinecap="round"
        fill="none"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.5, delay: 0.3, ease: "easeInOut" }}
      />
      <motion.path
        d="M42 14L30 25L42 36"
        stroke="white"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.6, delay: 0.5, ease: "easeInOut" }}
      />
    </motion.svg>
  );
}
