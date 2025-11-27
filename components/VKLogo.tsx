'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

interface VKLogoProps {
  className?: string;
  size?: number;
}

export function VKLogo({ className = '', size = 48 }: VKLogoProps) {
  const [isHovered, setIsHovered] = useState(false);

  // Scale factor for consistent sizing
  const scale = size / 48;

  return (
    <motion.div
      className={`relative cursor-pointer ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      style={{ width: size, height: size }}
    >
      {/* Ambient glow - subtle and elegant */}
      <motion.div
        className="absolute rounded-2xl"
        style={{
          inset: -4 * scale,
          background: 'radial-gradient(circle at 30% 30%, rgba(59, 130, 246, 0.15), rgba(217, 70, 239, 0.1), transparent 70%)',
          filter: `blur(${8 * scale}px)`,
        }}
        animate={{
          opacity: isHovered ? 1 : 0.5,
          scale: isHovered ? 1.1 : 1,
        }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
      />

      <svg
        width={size}
        height={size}
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="relative z-10"
      >
        <defs>
          {/* Premium gradient - sophisticated color blend */}
          <linearGradient id="vkPremiumGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <motion.stop
              offset="0%"
              animate={{ stopColor: isHovered ? '#60a5fa' : '#3b82f6' }}
              transition={{ duration: 0.3 }}
            />
            <motion.stop
              offset="50%"
              animate={{ stopColor: isHovered ? '#a78bfa' : '#8b5cf6' }}
              transition={{ duration: 0.3 }}
            />
            <motion.stop
              offset="100%"
              animate={{ stopColor: isHovered ? '#f472b6' : '#d946ef' }}
              transition={{ duration: 0.3 }}
            />
          </linearGradient>

          {/* Background gradient - dark glass effect */}
          <linearGradient id="vkBgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(30, 30, 40, 0.95)" />
            <stop offset="100%" stopColor="rgba(15, 15, 25, 0.98)" />
          </linearGradient>

          {/* Subtle inner highlight */}
          <linearGradient id="vkHighlight" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.1)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0)" />
          </linearGradient>

          {/* Border gradient */}
          <linearGradient id="vkBorderGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(59, 130, 246, 0.5)" />
            <stop offset="50%" stopColor="rgba(139, 92, 246, 0.3)" />
            <stop offset="100%" stopColor="rgba(217, 70, 239, 0.5)" />
          </linearGradient>

          {/* Glow filter for letters */}
          <filter id="vkGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="1.5" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Clip path for shine effect */}
          <clipPath id="vkClip">
            <rect x="2" y="2" width="44" height="44" rx="12" />
          </clipPath>
        </defs>

        {/* Main container - rounded square */}
        <rect
          x="2"
          y="2"
          width="44"
          height="44"
          rx="12"
          fill="url(#vkBgGradient)"
        />

        {/* Gradient border */}
        <rect
          x="2.5"
          y="2.5"
          width="43"
          height="43"
          rx="11.5"
          fill="none"
          stroke="url(#vkBorderGradient)"
          strokeWidth="1"
        />

        {/* Top highlight for depth */}
        <rect
          x="2"
          y="2"
          width="44"
          height="22"
          rx="12"
          fill="url(#vkHighlight)"
          clipPath="url(#vkClip)"
        />

        {/* Animated shine sweep on hover */}
        <motion.rect
          x="-20"
          y="2"
          width="20"
          height="44"
          fill="linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)"
          clipPath="url(#vkClip)"
          animate={{
            x: isHovered ? 70 : -20,
          }}
          transition={{
            duration: 0.6,
            ease: 'easeInOut',
          }}
        />

        {/* V Letter - elegant strokes */}
        <motion.path
          d="M11 13L18.5 35L26 13"
          stroke="url(#vkPremiumGradient)"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          filter={isHovered ? 'url(#vkGlow)' : undefined}
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ 
            pathLength: 1, 
            opacity: 1,
          }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        />

        {/* K Letter - vertical stem */}
        <motion.path
          d="M30 13V35"
          stroke="url(#vkPremiumGradient)"
          strokeWidth="4"
          strokeLinecap="round"
          fill="none"
          filter={isHovered ? 'url(#vkGlow)' : undefined}
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3, ease: 'easeOut' }}
        />

        {/* K Letter - diagonal arms */}
        <motion.path
          d="M40 13L30 24L40 35"
          stroke="url(#vkPremiumGradient)"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          filter={isHovered ? 'url(#vkGlow)' : undefined}
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5, ease: 'easeOut' }}
        />

        {/* Decorative dot accent */}
        <motion.circle
          cx="42"
          cy="8"
          r="2"
          fill="url(#vkPremiumGradient)"
          initial={{ scale: 0, opacity: 0 }}
          animate={{
            scale: isHovered ? 1 : 0,
            opacity: isHovered ? 1 : 0,
          }}
          transition={{ duration: 0.3, delay: 0.1 }}
        />

        {/* Secondary decorative dot */}
        <motion.circle
          cx="6"
          cy="40"
          r="1.5"
          fill="url(#vkPremiumGradient)"
          initial={{ scale: 0, opacity: 0 }}
          animate={{
            scale: isHovered ? 1 : 0,
            opacity: isHovered ? 0.7 : 0,
          }}
          transition={{ duration: 0.3, delay: 0.2 }}
        />
      </svg>
    </motion.div>
  );
}
