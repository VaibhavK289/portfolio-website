'use client';

import { motion, Variants, useReducedMotion, useInView } from 'framer-motion';
import { ReactNode, useRef, memo, useEffect, useState } from 'react';

// ============================================
// HEALTHCARE MOTION DESIGN SYSTEM
// Medical, organic, and healing-inspired animations
// Blend of CuraSense and Portfolio aesthetics
// ============================================

// Healthcare Easing Curves - Organic, calming feel
export const healthcareEasings = {
  // Heartbeat - rhythmic pulse
  heartbeat: [0.4, 0.0, 0.2, 1.0] as const,
  // Breath - slow, calming
  breath: [0.25, 0.1, 0.25, 1.0] as const,
  // Neural - quick synaptic response
  neural: [0.0, 0.0, 0.2, 1.0] as const,
  // Healing - gentle growth
  healing: [0.16, 1, 0.3, 1] as const,
  // Diagnostic - precise scanning
  diagnostic: [0.645, 0.045, 0.355, 1.0] as const,
  // Organic spring - natural bounce
  organicSpring: { type: 'spring' as const, stiffness: 100, damping: 15, mass: 0.8 },
};

// Animation Variants
export const healthcareCardContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

export const healthcareCardVariants: Variants = {
  hidden: { 
    opacity: 0, 
    y: 40,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: healthcareEasings.healing,
    },
  },
};

export const healthcareBadgeVariants: Variants = {
  hidden: { 
    opacity: 0, 
    scale: 0.8,
    y: 20,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: healthcareEasings.breath,
    },
  },
};

// ============================================
// HEARTBEAT PULSE COMPONENT
// ============================================
interface HeartbeatPulseProps {
  size?: number;
  color?: string;
  className?: string;
}

export const HeartbeatPulse = memo(function HeartbeatPulse({
  size = 40,
  color = '#10b981',
  className = '',
}: HeartbeatPulseProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className={`relative ${className}`} style={{ width: size, height: size }}>
      {/* Outer pulse rings */}
      {!prefersReducedMotion && (
        <>
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{ backgroundColor: color, opacity: 0.2 }}
            animate={{
              scale: [1, 1.8, 1.8],
              opacity: [0.3, 0, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeOut',
            }}
          />
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{ backgroundColor: color, opacity: 0.2 }}
            animate={{
              scale: [1, 1.5, 1.5],
              opacity: [0.4, 0, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeOut',
              delay: 0.3,
            }}
          />
        </>
      )}
      {/* Center dot */}
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{ backgroundColor: color }}
        animate={prefersReducedMotion ? {} : {
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    </div>
  );
});

// ============================================
// DNA HELIX COMPONENT
// ============================================
interface DNAHelixProps {
  width?: number;
  height?: number;
  color1?: string;
  color2?: string;
  className?: string;
}

export const DNAHelix = memo(function DNAHelix({
  width = 60,
  height = 120,
  color1 = '#10b981',
  color2 = '#06b6d4',
  className = '',
}: DNAHelixProps) {
  const prefersReducedMotion = useReducedMotion();
  const points = 8;

  return (
    <motion.svg
      width={width}
      height={height}
      viewBox="0 0 60 120"
      className={className}
      animate={prefersReducedMotion ? {} : { rotateY: 360 }}
      transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
      style={{ transformStyle: 'preserve-3d' }}
    >
      {Array.from({ length: points }).map((_, i) => {
        const y = (i + 0.5) * (120 / points);
        const phase = (i * Math.PI) / 2;
        return (
          <g key={i}>
            {/* Left strand */}
            <motion.circle
              cx={30 + Math.sin(phase) * 15}
              cy={y}
              r={4}
              fill={color1}
              animate={prefersReducedMotion ? {} : {
                cx: [30 + Math.sin(phase) * 15, 30 + Math.sin(phase + Math.PI) * 15, 30 + Math.sin(phase) * 15],
              }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            />
            {/* Right strand */}
            <motion.circle
              cx={30 + Math.sin(phase + Math.PI) * 15}
              cy={y}
              r={4}
              fill={color2}
              animate={prefersReducedMotion ? {} : {
                cx: [30 + Math.sin(phase + Math.PI) * 15, 30 + Math.sin(phase) * 15, 30 + Math.sin(phase + Math.PI) * 15],
              }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            />
            {/* Connecting line */}
            <motion.line
              x1={30 + Math.sin(phase) * 15}
              y1={y}
              x2={30 + Math.sin(phase + Math.PI) * 15}
              y2={y}
              stroke={`url(#dnaGradient-${i})`}
              strokeWidth={2}
              strokeOpacity={0.5}
            />
            <defs>
              <linearGradient id={`dnaGradient-${i}`} x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor={color1} />
                <stop offset="100%" stopColor={color2} />
              </linearGradient>
            </defs>
          </g>
        );
      })}
    </motion.svg>
  );
});

// ============================================
// ECG/HEARTBEAT LINE COMPONENT
// ============================================
interface ECGLineProps {
  width?: number;
  height?: number;
  color?: string;
  className?: string;
  speed?: number;
}

export const ECGLine = memo(function ECGLine({
  width = 200,
  height = 60,
  color = '#10b981',
  className = '',
  speed = 2,
}: ECGLineProps) {
  const prefersReducedMotion = useReducedMotion();
  
  // ECG wave pattern
  const ecgPath = "M0,30 L20,30 L25,30 L30,30 L35,10 L40,50 L45,20 L50,40 L55,30 L80,30 L85,30 L90,30 L95,10 L100,50 L105,20 L110,40 L115,30 L140,30 L145,30 L150,30 L155,10 L160,50 L165,20 L170,40 L175,30 L200,30";

  return (
    <div className={`relative overflow-hidden ${className}`} style={{ width, height }}>
      <motion.svg
        width={width * 2}
        height={height}
        viewBox={`0 0 ${width * 2} ${height}`}
        className="absolute top-0 left-0"
        animate={prefersReducedMotion ? {} : { x: [-width, 0] }}
        transition={{ duration: speed, repeat: Infinity, ease: 'linear' }}
      >
        <path
          d={ecgPath}
          fill="none"
          stroke={color}
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d={ecgPath}
          fill="none"
          stroke={color}
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          transform={`translate(${width}, 0)`}
        />
      </motion.svg>
      {/* Glow effect */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `linear-gradient(90deg, transparent 0%, ${color}20 50%, transparent 100%)`,
        }}
      />
    </div>
  );
});

// ============================================
// NEURAL NETWORK COMPONENT
// ============================================
interface NeuralNetworkProps {
  width?: number;
  height?: number;
  nodeColor?: string;
  lineColor?: string;
  className?: string;
}

export const NeuralNetwork = memo(function NeuralNetwork({
  width = 200,
  height = 150,
  nodeColor = '#10b981',
  lineColor = '#06b6d4',
  className = '',
}: NeuralNetworkProps) {
  const prefersReducedMotion = useReducedMotion();
  
  // Neural network layers
  const layers = [
    [{ x: 30, y: 30 }, { x: 30, y: 75 }, { x: 30, y: 120 }],
    [{ x: 100, y: 50 }, { x: 100, y: 100 }],
    [{ x: 170, y: 75 }],
  ];

  return (
    <svg width={width} height={height} viewBox="0 0 200 150" className={className}>
      {/* Connections */}
      {layers.slice(0, -1).map((layer, layerIndex) =>
        layer.map((node, nodeIndex) =>
          layers[layerIndex + 1].map((nextNode, nextIndex) => (
            <motion.line
              key={`${layerIndex}-${nodeIndex}-${nextIndex}`}
              x1={node.x}
              y1={node.y}
              x2={nextNode.x}
              y2={nextNode.y}
              stroke={lineColor}
              strokeWidth={1.5}
              strokeOpacity={0.3}
              animate={prefersReducedMotion ? {} : {
                strokeOpacity: [0.2, 0.6, 0.2],
                strokeWidth: [1, 2, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: (layerIndex * 0.3) + (nodeIndex * 0.1) + (nextIndex * 0.1),
              }}
            />
          ))
        )
      )}
      
      {/* Nodes */}
      {layers.map((layer, layerIndex) =>
        layer.map((node, nodeIndex) => (
          <g key={`node-${layerIndex}-${nodeIndex}`}>
            {/* Outer glow */}
            <motion.circle
              cx={node.x}
              cy={node.y}
              r={12}
              fill={nodeColor}
              opacity={0.2}
              animate={prefersReducedMotion ? {} : {
                r: [12, 16, 12],
                opacity: [0.1, 0.3, 0.1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: layerIndex * 0.2,
              }}
            />
            {/* Core node */}
            <motion.circle
              cx={node.x}
              cy={node.y}
              r={8}
              fill={nodeColor}
              animate={prefersReducedMotion ? {} : {
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: layerIndex * 0.2,
              }}
            />
          </g>
        ))
      )}
    </svg>
  );
});

// ============================================
// MEDICAL CROSS PULSE COMPONENT
// ============================================
interface MedicalCrossProps {
  size?: number;
  color?: string;
  className?: string;
}

export const MedicalCross = memo(function MedicalCross({
  size = 40,
  color = '#10b981',
  className = '',
}: MedicalCrossProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      className={className}
      animate={prefersReducedMotion ? {} : {
        scale: [1, 1.05, 1],
      }}
      transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
    >
      {/* Cross shape */}
      <motion.path
        d="M15,5 L25,5 L25,15 L35,15 L35,25 L25,25 L25,35 L15,35 L15,25 L5,25 L5,15 L15,15 Z"
        fill={color}
        animate={prefersReducedMotion ? {} : {
          opacity: [0.8, 1, 0.8],
        }}
        transition={{ duration: 1.5, repeat: Infinity }}
      />
      {/* Inner glow */}
      <motion.path
        d="M17,10 L23,10 L23,17 L30,17 L30,23 L23,23 L23,30 L17,30 L17,23 L10,23 L10,17 L17,17 Z"
        fill="white"
        opacity={0.3}
      />
    </motion.svg>
  );
});

// ============================================
// FLOATING PILLS COMPONENT
// ============================================
interface FloatingPillsProps {
  count?: number;
  className?: string;
}

export const FloatingPills = memo(function FloatingPills({
  count = 5,
  className = '',
}: FloatingPillsProps) {
  const prefersReducedMotion = useReducedMotion();
  const pills = Array.from({ length: count }, (_, i) => ({
    id: i,
    left: `${15 + (i * 18)}%`,
    delay: i * 0.5,
    duration: 4 + (i % 3),
    size: 20 + (i % 3) * 5,
    color: i % 2 === 0 ? '#10b981' : '#06b6d4',
  }));

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {pills.map((pill) => (
        <motion.div
          key={pill.id}
          className="absolute rounded-full"
          style={{
            left: pill.left,
            top: '20%',
            width: pill.size,
            height: pill.size * 1.5,
            background: `linear-gradient(135deg, ${pill.color}, ${pill.color}80)`,
            borderRadius: pill.size / 2,
          }}
          animate={prefersReducedMotion ? {} : {
            y: [0, 30, 0],
            rotate: [0, 10, -10, 0],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: pill.duration,
            repeat: Infinity,
            delay: pill.delay,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
});

// ============================================
// SCANNING LINE COMPONENT
// ============================================
interface ScanLineProps {
  height?: number;
  color?: string;
  speed?: number;
  className?: string;
}

export const ScanLine = memo(function ScanLine({
  height = 200,
  color = '#10b981',
  speed = 3,
  className = '',
}: ScanLineProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className={`relative overflow-hidden ${className}`} style={{ height }}>
      <motion.div
        className="absolute left-0 right-0 h-1"
        style={{
          background: `linear-gradient(90deg, transparent, ${color}, transparent)`,
          boxShadow: `0 0 20px ${color}, 0 0 40px ${color}50`,
        }}
        animate={prefersReducedMotion ? {} : {
          top: [0, height, 0],
        }}
        transition={{
          duration: speed,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    </div>
  );
});

// ============================================
// MOLECULE STRUCTURE COMPONENT
// ============================================
interface MoleculeProps {
  size?: number;
  color1?: string;
  color2?: string;
  className?: string;
}

export const Molecule = memo(function Molecule({
  size = 100,
  color1 = '#10b981',
  color2 = '#8b5cf6',
  className = '',
}: MoleculeProps) {
  const prefersReducedMotion = useReducedMotion();
  
  const atoms = [
    { x: 50, y: 25, r: 10, color: color1 },
    { x: 25, y: 60, r: 8, color: color2 },
    { x: 75, y: 60, r: 8, color: color2 },
    { x: 50, y: 85, r: 6, color: color1 },
  ];
  
  const bonds = [
    { x1: 50, y1: 35, x2: 30, y2: 55 },
    { x1: 50, y1: 35, x2: 70, y2: 55 },
    { x1: 30, y1: 65, x2: 50, y2: 80 },
    { x1: 70, y1: 65, x2: 50, y2: 80 },
  ];

  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={className}
      animate={prefersReducedMotion ? {} : { rotate: 360 }}
      transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
    >
      {/* Bonds */}
      {bonds.map((bond, i) => (
        <motion.line
          key={i}
          x1={bond.x1}
          y1={bond.y1}
          x2={bond.x2}
          y2={bond.y2}
          stroke={color1}
          strokeWidth={2}
          strokeOpacity={0.6}
          animate={prefersReducedMotion ? {} : {
            strokeOpacity: [0.4, 0.8, 0.4],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: i * 0.2,
          }}
        />
      ))}
      
      {/* Atoms */}
      {atoms.map((atom, i) => (
        <g key={i}>
          <motion.circle
            cx={atom.x}
            cy={atom.y}
            r={atom.r + 4}
            fill={atom.color}
            opacity={0.2}
            animate={prefersReducedMotion ? {} : {
              r: [atom.r + 4, atom.r + 8, atom.r + 4],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.3,
            }}
          />
          <circle
            cx={atom.x}
            cy={atom.y}
            r={atom.r}
            fill={atom.color}
          />
        </g>
      ))}
    </motion.svg>
  );
});

// ============================================
// HEALTHCARE CARD WRAPPER
// ============================================
interface HealthcareCardProps {
  children: ReactNode;
  className?: string;
  glowColor?: string;
}

export const HealthcareCard = memo(function HealthcareCard({
  children,
  className = '',
  glowColor = '#10b981',
}: HealthcareCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      className={`relative ${className}`}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, ease: healthcareEasings.healing }}
      whileHover={{ 
        y: -5,
        transition: { duration: 0.3 }
      }}
    >
      {/* Subtle glow on hover */}
      <motion.div
        className="absolute -inset-1 rounded-3xl opacity-0 blur-xl pointer-events-none"
        style={{ backgroundColor: glowColor }}
        whileHover={{ opacity: 0.15 }}
        transition={{ duration: 0.3 }}
      />
      {children}
    </motion.div>
  );
});

// ============================================
// ANIMATED HEALTHCARE ICON
// ============================================
interface AnimatedHealthIconProps {
  type: 'pulse' | 'scan' | 'glow' | 'float';
  children: ReactNode;
  color?: string;
  className?: string;
}

export const AnimatedHealthIcon = memo(function AnimatedHealthIcon({
  type,
  children,
  color = '#10b981',
  className = '',
}: AnimatedHealthIconProps) {
  const prefersReducedMotion = useReducedMotion();
  
  const animations = {
    pulse: {
      scale: [1, 1.1, 1],
      transition: { duration: 1.5, repeat: Infinity, ease: 'easeInOut' as const },
    },
    scan: {
      opacity: [0.7, 1, 0.7],
      transition: { duration: 2, repeat: Infinity, ease: 'easeInOut' as const },
    },
    glow: {
      filter: ['brightness(1)', 'brightness(1.3)', 'brightness(1)'],
      transition: { duration: 2, repeat: Infinity, ease: 'easeInOut' as const },
    },
    float: {
      y: [-3, 3, -3],
      transition: { duration: 3, repeat: Infinity, ease: 'easeInOut' as const },
    },
  };

  return (
    <motion.div
      className={className}
      animate={prefersReducedMotion ? undefined : animations[type]}
      style={{ color }}
    >
      {children}
    </motion.div>
  );
});

// ============================================
// VITALS DISPLAY COMPONENT
// ============================================
interface VitalsDisplayProps {
  value: string;
  label: string;
  color?: string;
  className?: string;
}

export const VitalsDisplay = memo(function VitalsDisplay({
  value,
  label,
  color = '#10b981',
  className = '',
}: VitalsDisplayProps) {
  const prefersReducedMotion = useReducedMotion();
  const [displayValue, setDisplayValue] = useState('--');
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (isInView && !hasAnimated.current) {
      hasAnimated.current = true;
      const delay = prefersReducedMotion ? 0 : 500;
      const timer = setTimeout(() => setDisplayValue(value), delay);
      return () => clearTimeout(timer);
    }
  }, [isInView, value, prefersReducedMotion]);

  return (
    <div ref={ref} className={`relative ${className}`}>
      <motion.div
        className="text-3xl sm:text-4xl font-bold font-mono"
        style={{ color }}
        initial={{ opacity: 0, scale: 0.5 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.5, ease: healthcareEasings.healing }}
      >
        {displayValue}
      </motion.div>
      <div className="text-sm text-neutral-500 mt-1">{label}</div>
    </div>
  );
});
