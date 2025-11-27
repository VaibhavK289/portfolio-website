'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

interface VKLogoProps {
  className?: string;
  size?: number;
}

export function VKLogo({ className = '', size = 48 }: VKLogoProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className={`relative ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {/* Subtle glow effect on hover */}
      <motion.div
        className="absolute inset-0 rounded-lg blur-lg"
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: isHovered ? 0.4 : 0,
          scale: isHovered ? 1.3 : 1
        }}
        transition={{ duration: 0.3 }}
        style={{
          background: 'linear-gradient(135deg, #3b82f6 0%, #d946ef 100%)',
        }}
      />
      
      <svg
        width={size}
        height={size}
        viewBox="0 0 56 56"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="relative z-10"
      >
        <defs>
          {/* Main gradient - Blue to Purple (matching website theme) */}
          <linearGradient id="vkMainGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#d946ef" />
          </linearGradient>
          
          {/* Text gradient for the letters */}
          <linearGradient id="vkTextGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="50%" stopColor="#8b5cf6" />
            <stop offset="100%" stopColor="#d946ef" />
          </linearGradient>
          
          {/* Subtle drop shadow */}
          <filter id="vkShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="1" stdDeviation="2" floodColor="#3b82f6" floodOpacity="0.3"/>
          </filter>
        </defs>

        {/* Minimal transparent/glass background */}
        <rect
          x="4"
          y="4"
          width="48"
          height="48"
          rx="12"
          className="fill-white/10 dark:fill-white/5"
          stroke="url(#vkMainGradient)"
          strokeWidth="1.5"
          strokeOpacity={isHovered ? "0.8" : "0.4"}
        />

        {/* V Letter - Bold gradient stroke */}
        <motion.g filter="url(#vkShadow)">
          <motion.path
            d="M13 16L21 40L29 16"
            stroke="url(#vkTextGradient)"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />
        </motion.g>

        {/* K Letter - Bold gradient stroke */}
        <motion.g filter="url(#vkShadow)">
          <motion.path
            d="M33 16V40"
            stroke="url(#vkTextGradient)"
            strokeWidth="5"
            strokeLinecap="round"
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.2, ease: "easeOut" }}
          />
          <motion.path
            d="M45 16L33 28L45 40"
            stroke="url(#vkTextGradient)"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4, ease: "easeOut" }}
          />
        </motion.g>

        {/* Subtle sparkle accent on hover */}
        <motion.circle
          cx="48"
          cy="10"
          r="2"
          fill="url(#vkMainGradient)"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ 
            opacity: isHovered ? [0, 1, 0] : 0,
            scale: isHovered ? [0, 1, 0] : 0
          }}
          transition={{ 
            duration: 1.2,
            repeat: isHovered ? Infinity : 0,
            repeatDelay: 0.3
          }}
        />
      </svg>
    </motion.div>
  );
}
