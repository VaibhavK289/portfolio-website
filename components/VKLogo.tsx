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
      {/* Glow effect on hover */}
      <motion.div
        className="absolute inset-0 rounded-xl blur-xl"
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: isHovered ? 0.6 : 0,
          scale: isHovered ? 1.2 : 1
        }}
        transition={{ duration: 0.3 }}
        style={{
          background: 'linear-gradient(135deg, #8b5cf6 0%, #6366f1 50%, #3b82f6 100%)',
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
          {/* Main gradient - Purple to Blue */}
          <linearGradient id="vkMainGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8b5cf6" />
            <stop offset="50%" stopColor="#7c3aed" />
            <stop offset="100%" stopColor="#6366f1" />
          </linearGradient>
          
          {/* Shine gradient for 3D effect */}
          <linearGradient id="vkShineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.4)" />
            <stop offset="50%" stopColor="rgba(255,255,255,0.1)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0)" />
          </linearGradient>
          
          {/* Text gradient */}
          <linearGradient id="vkTextGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#e0e7ff" />
          </linearGradient>
          
          {/* Drop shadow filter */}
          <filter id="vkShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#6366f1" floodOpacity="0.4"/>
          </filter>
          
          {/* Inner shadow for depth */}
          <filter id="vkInnerGlow">
            <feGaussianBlur in="SourceAlpha" stdDeviation="2" result="blur" />
            <feOffset in="blur" dx="0" dy="1" result="offsetBlur" />
            <feFlood floodColor="#a855f7" floodOpacity="0.5" result="color" />
            <feComposite in="color" in2="offsetBlur" operator="in" result="shadow" />
            <feComposite in="shadow" in2="SourceGraphic" operator="over" />
          </filter>
        </defs>

        {/* Outer glow ring on hover */}
        <motion.rect
          x="0"
          y="0"
          width="56"
          height="56"
          rx="14"
          fill="none"
          stroke="url(#vkMainGradient)"
          strokeWidth="1"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ 
            opacity: isHovered ? 0.6 : 0,
            scale: isHovered ? 1 : 0.9
          }}
          transition={{ duration: 0.3 }}
        />

        {/* Main background */}
        <rect
          x="4"
          y="4"
          width="48"
          height="48"
          rx="12"
          fill="url(#vkMainGradient)"
          filter="url(#vkShadow)"
        />
        
        {/* Glass shine overlay */}
        <rect
          x="4"
          y="4"
          width="48"
          height="24"
          rx="12"
          fill="url(#vkShineGradient)"
          clipPath="inset(0 0 50% 0 round 12px)"
        />
        
        {/* Inner border for depth */}
        <rect
          x="5"
          y="5"
          width="46"
          height="46"
          rx="11"
          fill="none"
          stroke="rgba(255,255,255,0.2)"
          strokeWidth="1"
        />

        {/* V Letter - Bold and Modern */}
        <motion.g filter={isHovered ? "url(#vkInnerGlow)" : undefined}>
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

        {/* K Letter - Bold and Modern */}
        <motion.g filter={isHovered ? "url(#vkInnerGlow)" : undefined}>
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

        {/* Sparkle accents */}
        <motion.circle
          cx="8"
          cy="8"
          r="1.5"
          fill="white"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ 
            opacity: isHovered ? [0, 1, 0] : 0,
            scale: isHovered ? [0, 1, 0] : 0
          }}
          transition={{ 
            duration: 1,
            repeat: isHovered ? Infinity : 0,
            repeatDelay: 0.5
          }}
        />
        <motion.circle
          cx="50"
          cy="12"
          r="1"
          fill="white"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ 
            opacity: isHovered ? [0, 1, 0] : 0,
            scale: isHovered ? [0, 1, 0] : 0
          }}
          transition={{ 
            duration: 1,
            delay: 0.3,
            repeat: isHovered ? Infinity : 0,
            repeatDelay: 0.5
          }}
        />
      </svg>
    </motion.div>
  );
}
