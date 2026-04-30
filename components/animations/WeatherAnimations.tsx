'use client';

import { motion, type Variants } from 'framer-motion';

// ─── Rain Drop ────────────────────────────────────────────────────────
export function RainDrop({
  size = 3,
  color = '#38bdf8',
  delay = 0,
  left = '50%',
}: {
  size?: number;
  color?: string;
  delay?: number;
  left?: string;
}) {
  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{ left, top: -10 }}
      animate={{
        y: [0, 200, 400],
        opacity: [0, 0.8, 0],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        delay,
        ease: 'easeIn',
      }}
    >
      <div
        className="rounded-full"
        style={{
          width: size,
          height: size * 3,
          borderRadius: `${size}px / ${size * 2}px`,
          background: `linear-gradient(to bottom, transparent, ${color})`,
        }}
      />
    </motion.div>
  );
}

// ─── Cloud Float ──────────────────────────────────────────────────────
export function CloudFloat({
  size = 80,
  opacity = 0.15,
  delay = 0,
  className = '',
}: {
  size?: number;
  opacity?: number;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={`absolute pointer-events-none ${className}`}
      animate={{
        x: [-20, 20, -20],
        y: [-5, 5, -5],
      }}
      transition={{
        duration: 12,
        repeat: Infinity,
        delay,
        ease: 'easeInOut',
      }}
      style={{ opacity }}
    >
      <svg
        width={size}
        height={size * 0.6}
        viewBox="0 0 100 60"
        fill="currentColor"
        className="text-sky-300/30"
      >
        <ellipse cx="50" cy="40" rx="40" ry="18" />
        <ellipse cx="30" cy="30" rx="25" ry="22" />
        <ellipse cx="65" cy="28" rx="28" ry="20" />
        <ellipse cx="48" cy="22" rx="22" ry="18" />
      </svg>
    </motion.div>
  );
}

// ─── Wind Gust ────────────────────────────────────────────────────────
export function WindGust({
  width = 60,
  color = '#38bdf8',
  delay = 0,
}: {
  width?: number;
  color?: string;
  delay?: number;
}) {
  return (
    <motion.div
      className="pointer-events-none"
      initial={{ opacity: 0, x: -20 }}
      animate={{
        opacity: [0, 0.6, 0],
        x: [-20, width + 20],
      }}
      transition={{
        duration: 2.5,
        repeat: Infinity,
        delay,
        ease: 'easeOut',
      }}
    >
      <svg width={width} height="4" viewBox={`0 0 ${width} 4`}>
        <line
          x1="0"
          y1="2"
          x2={width}
          y2="2"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray="8 6"
        />
      </svg>
    </motion.div>
  );
}

// ─── Temperature Pulse ────────────────────────────────────────────────
export function TemperaturePulse({
  size = 12,
  color = '#f59e0b',
}: {
  size?: number;
  color?: string;
}) {
  return (
    <div className="relative" style={{ width: size, height: size }}>
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{ backgroundColor: color }}
        animate={{
          scale: [1, 1.4, 1],
          opacity: [0.6, 0.2, 0.6],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      <div
        className="absolute inset-0 rounded-full"
        style={{ backgroundColor: color }}
      />
    </div>
  );
}

// ─── Rust Ferris Badge (mini crab icon) ───────────────────────────────
export function RustBadge({ size = 16 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 106 106"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Rust gear/cog outer ring */}
      <circle cx="53" cy="53" r="44" stroke="#CE422B" strokeWidth="4" fill="none" />
      {/* Gear teeth */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => {
        const rad = (angle * Math.PI) / 180;
        const x1 = 53 + 44 * Math.cos(rad);
        const y1 = 53 + 44 * Math.sin(rad);
        const x2 = 53 + 50 * Math.cos(rad);
        const y2 = 53 + 50 * Math.sin(rad);
        return (
          <line
            key={angle}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke="#CE422B"
            strokeWidth="4"
            strokeLinecap="round"
          />
        );
      })}
      {/* Inner R letter */}
      <text
        x="53"
        y="62"
        textAnchor="middle"
        fontSize="36"
        fontWeight="bold"
        fill="#CE422B"
        fontFamily="monospace"
      >
        R
      </text>
    </svg>
  );
}

// ─── Variants ─────────────────────────────────────────────────────────
export const weatherCardContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.2,
    },
  },
};

export const weatherCardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 30,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

export const weatherBadgeVariants: Variants = {
  hidden: { opacity: 0, y: -10, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};
