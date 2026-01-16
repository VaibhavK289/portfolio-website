'use client';

import { motion, Variants } from 'framer-motion';

// ============================================
// AI/PRIVACY THEMED ANIMATION COMPONENTS
// For Allma Studio - Local AI Chat Platform
// Design Philosophy: Nodes, Connections, Privacy
// ============================================

// Custom easings for AI-themed animations
export const aiEasings = {
  neural: [0.22, 1, 0.36, 1] as const,      // Smooth neural flow
  data: [0.4, 0, 0.2, 1] as const,           // Data transmission
  pulse: [0.68, -0.55, 0.27, 1.55] as const, // Attention pulse
  breath: [0.37, 0, 0.63, 1] as const,       // Organic breathing
};

// Card animation variants
export const aiCardContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.15,
    },
  },
};

export const aiCardVariants: Variants = {
  hidden: { 
    opacity: 0, 
    y: 40,
    scale: 0.95,
    filter: 'blur(8px)',
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: 'blur(0px)',
    transition: {
      duration: 0.6,
      ease: aiEasings.neural,
    },
  },
};

export const aiBadgeVariants: Variants = {
  hidden: { 
    opacity: 0, 
    scale: 0.8,
    y: 10,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: aiEasings.pulse,
    },
  },
};

// ============================================
// NEURAL NETWORK NODE
// Represents AI processing nodes
// ============================================
interface NeuralNodeProps {
  size?: number;
  color?: string;
  delay?: number;
}

export function NeuralNode({ size = 12, color = '#818cf8', delay = 0 }: NeuralNodeProps) {
  return (
    <div className="relative" style={{ width: size, height: size }}>
      {/* Core */}
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{ backgroundColor: color }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.8, 1, 0.8],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          delay,
          ease: aiEasings.breath,
        }}
      />
      {/* Glow */}
      <motion.div
        className="absolute inset-0 rounded-full blur-sm"
        style={{ backgroundColor: color }}
        animate={{
          scale: [1.5, 2, 1.5],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          delay,
          ease: aiEasings.breath,
        }}
      />
    </div>
  );
}

// ============================================
// DATA FLOW LINE
// Animated connection between nodes
// ============================================
interface DataFlowLineProps {
  width?: number;
  color?: string;
  delay?: number;
  vertical?: boolean;
}

export function DataFlowLine({ 
  width = 60, 
  color = '#818cf8', 
  delay = 0,
  vertical = false 
}: DataFlowLineProps) {
  return (
    <div 
      className="relative overflow-hidden"
      style={{ 
        width: vertical ? 2 : width, 
        height: vertical ? width : 2,
      }}
    >
      <motion.div
        className="absolute rounded-full"
        style={{ 
          width: vertical ? '100%' : 20,
          height: vertical ? 20 : '100%',
          background: `linear-gradient(${vertical ? '180deg' : '90deg'}, transparent, ${color}, transparent)`,
        }}
        animate={{
          [vertical ? 'y' : 'x']: ['-100%', '200%'],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          delay,
          ease: 'linear',
        }}
      />
      {/* Static track */}
      <div 
        className="absolute inset-0 rounded-full"
        style={{ backgroundColor: color, opacity: 0.15 }}
      />
    </div>
  );
}

// ============================================
// PRIVACY SHIELD
// Visual representation of data protection
// ============================================
interface PrivacyShieldProps {
  size?: number;
  color?: string;
}

export function PrivacyShield({ size = 40, color = '#10b981' }: PrivacyShieldProps) {
  return (
    <div className="relative" style={{ width: size, height: size * 1.2 }}>
      <svg viewBox="0 0 40 48" className="w-full h-full">
        {/* Shield shape */}
        <motion.path
          d="M20 4 L4 12 L4 24 C4 36 20 44 20 44 C20 44 36 36 36 24 L36 12 L20 4 Z"
          fill="none"
          stroke={color}
          strokeWidth="2"
          animate={{
            opacity: [0.6, 1, 0.6],
            strokeWidth: [2, 2.5, 2],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: aiEasings.breath,
          }}
        />
        {/* Inner glow */}
        <motion.path
          d="M20 4 L4 12 L4 24 C4 36 20 44 20 44 C20 44 36 36 36 24 L36 12 L20 4 Z"
          fill={color}
          opacity={0.15}
          animate={{
            opacity: [0.1, 0.25, 0.1],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: aiEasings.breath,
          }}
        />
        {/* Check mark */}
        <motion.path
          d="M14 24 L18 28 L26 18"
          fill="none"
          stroke={color}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{
            duration: 0.8,
            delay: 0.5,
            ease: aiEasings.neural,
          }}
        />
      </svg>
    </div>
  );
}

// ============================================
// CHAT BUBBLE ANIMATION
// Typing indicator for AI chat
// ============================================
interface ChatTypingProps {
  color?: string;
}

export function ChatTyping({ color = '#818cf8' }: ChatTypingProps) {
  return (
    <div className="flex items-center gap-1.5">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="w-2 h-2 rounded-full"
          style={{ backgroundColor: color }}
          animate={{
            y: [0, -6, 0],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 0.8,
            repeat: Infinity,
            delay: i * 0.15,
            ease: aiEasings.pulse,
          }}
        />
      ))}
    </div>
  );
}

// ============================================
// OLLAMA LOGO PULSE
// Animated representation of local LLM
// ============================================
interface LocalLLMPulseProps {
  size?: number;
  color?: string;
}

export function LocalLLMPulse({ size = 48, color = '#8b5cf6' }: LocalLLMPulseProps) {
  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      {/* Outer pulse rings */}
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="absolute inset-0 rounded-xl border-2"
          style={{ borderColor: color }}
          animate={{
            scale: [1, 1.5 + i * 0.3],
            opacity: [0.5, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: i * 0.4,
            ease: 'easeOut',
          }}
        />
      ))}
      {/* Center icon */}
      <motion.div
        className="relative w-8 h-8 rounded-lg flex items-center justify-center"
        style={{ backgroundColor: `${color}20` }}
        animate={{
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: aiEasings.breath,
        }}
      >
        <svg viewBox="0 0 24 24" className="w-5 h-5" fill={color}>
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
        </svg>
      </motion.div>
    </div>
  );
}

// ============================================
// DOCUMENT RAG ANIMATION
// Shows document to vector conversion
// ============================================
interface DocumentVectorProps {
  size?: number;
}

export function DocumentVector({ size = 60 }: DocumentVectorProps) {
  return (
    <div className="relative flex items-center gap-3" style={{ height: size }}>
      {/* Document */}
      <motion.div
        className="relative w-10 h-12 rounded-lg bg-gradient-to-br from-violet-500/20 to-violet-500/10 border border-violet-500/30 flex items-center justify-center"
        animate={{
          opacity: [0.7, 1, 0.7],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: aiEasings.breath,
        }}
      >
        <svg viewBox="0 0 24 24" className="w-5 h-5 text-violet-400" fill="currentColor">
          <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6zm-1 2l5 5h-5V4zM6 20V4h6v6h6v10H6z"/>
          <path d="M8 12h8v2H8zm0 4h8v2H8z"/>
        </svg>
      </motion.div>
      
      {/* Arrow with data flow */}
      <div className="relative w-8">
        <DataFlowLine width={32} color="#8b5cf6" />
      </div>
      
      {/* Vector representation */}
      <motion.div
        className="relative w-10 h-12 rounded-lg bg-gradient-to-br from-cyan-500/20 to-cyan-500/10 border border-cyan-500/30 flex flex-col items-center justify-center gap-0.5"
        animate={{
          opacity: [0.7, 1, 0.7],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: aiEasings.breath,
          delay: 0.5,
        }}
      >
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-5 h-0.5 rounded-full bg-cyan-400"
            animate={{
              scaleX: [0.5, 1, 0.5],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              delay: i * 0.2,
            }}
          />
        ))}
      </motion.div>
    </div>
  );
}

// ============================================
// AI NETWORK GRID
// Background decoration showing AI connections
// ============================================
interface AINetworkGridProps {
  rows?: number;
  cols?: number;
  color?: string;
}

export function AINetworkGrid({ rows = 4, cols = 6, color = '#818cf8' }: AINetworkGridProps) {
  return (
    <div 
      className="relative grid gap-8 opacity-20"
      style={{ 
        gridTemplateColumns: `repeat(${cols}, 1fr)`,
        gridTemplateRows: `repeat(${rows}, 1fr)`,
      }}
    >
      {Array.from({ length: rows * cols }).map((_, i) => (
        <NeuralNode 
          key={i} 
          size={6} 
          color={color} 
          delay={Math.random() * 2}
        />
      ))}
    </div>
  );
}

// ============================================
// STREAMING TEXT ANIMATION
// Simulates AI text generation
// ============================================
interface StreamingTextProps {
  text: string;
  color?: string;
  speed?: number;
}

export function StreamingText({ text, color = '#e2e8f0', speed = 50 }: StreamingTextProps) {
  return (
    <motion.span
      style={{ color }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {text.split('').map((char, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 0.05,
            delay: i * (speed / 1000),
          }}
        >
          {char}
        </motion.span>
      ))}
    </motion.span>
  );
}

// ============================================
// AI CARD WRAPPER
// Themed card with AI effects
// ============================================
interface AICardProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
}

export function AICard({ children, className = '', glowColor = '#818cf8' }: AICardProps) {
  return (
    <motion.div
      className={`relative rounded-2xl bg-gradient-to-br from-slate-900/90 to-slate-800/90 border border-slate-700/50 backdrop-blur-sm overflow-hidden ${className}`}
      whileHover={{ 
        scale: 1.02,
        borderColor: `${glowColor}50`,
      }}
      transition={{ duration: 0.3, ease: aiEasings.data }}
    >
      {/* Glow effect on hover */}
      <motion.div
        className="absolute inset-0 opacity-0 pointer-events-none"
        style={{
          background: `radial-gradient(circle at center, ${glowColor}15 0%, transparent 70%)`,
        }}
        whileHover={{ opacity: 1 }}
      />
      
      {/* Corner accents */}
      <div className="absolute top-0 left-0 w-8 h-8 border-l border-t border-slate-600/30 rounded-tl-2xl" />
      <div className="absolute top-0 right-0 w-8 h-8 border-r border-t border-slate-600/30 rounded-tr-2xl" />
      
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
}
