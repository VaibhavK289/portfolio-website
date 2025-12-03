'use client';

import { motion, Variants, useMotionValue, useTransform, animate, useInView, TargetAndTransition, useReducedMotion } from 'framer-motion';
import { ReactNode, useRef, useEffect, useState, memo } from 'react';

// ============================================
// INDUSTRIAL MOTION DESIGN SYSTEM
// Heavy machinery inspired animations
// Performance optimized version
// ============================================

// Industrial Easing Curves - Mechanical feel
export const industrialEasings = {
  // Heavy machinery - slow start, powerful motion
  mechanical: [0.2, 0.0, 0.0, 1.0] as const,
  // Hydraulic - smooth but powerful
  hydraulic: [0.4, 0.0, 0.2, 1.0] as const,
  // Pneumatic - quick release
  pneumatic: [0.0, 0.0, 0.2, 1.0] as const,
  // Gear mesh - stepped feel
  gear: [0.645, 0.045, 0.355, 1.0] as const,
  // Servo motor - precise
  servo: [0.25, 0.1, 0.25, 1.0] as const,
  // Industrial spring
  industrialSpring: { type: 'spring', stiffness: 150, damping: 20, mass: 1.2 },
};

// ============================================
// ROTATING GEAR COMPONENT - OPTIMIZED
// ============================================
interface RotatingGearProps {
  size?: number;
  color?: string;
  speed?: number;
  direction?: 'cw' | 'ccw';
  teeth?: number;
  className?: string;
}

// Pre-calculate gear teeth to avoid runtime calculations
const createGearTeeth = (teeth: number) => {
  return Array.from({ length: teeth }).map((_, i) => {
    const angle = (i * 360) / teeth;
    const radians = (angle * Math.PI) / 180;
    return {
      x1: 50 + Math.cos(radians) * 35,
      y1: 50 + Math.sin(radians) * 35,
      x2: 50 + Math.cos(radians) * 48,
      y2: 50 + Math.sin(radians) * 48,
    };
  });
};

export const RotatingGear = memo(function RotatingGear({
  size = 60,
  color = '#06b6d4',
  speed = 10,
  direction = 'cw',
  teeth = 12,
  className = '',
}: RotatingGearProps) {
  const prefersReducedMotion = useReducedMotion();
  const rotation = direction === 'cw' ? 360 : -360;
  const gearTeeth = createGearTeeth(teeth);
  
  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={className}
      style={{ willChange: 'transform' }}
      animate={prefersReducedMotion ? {} : { rotate: rotation }}
      transition={{ duration: speed, repeat: Infinity, ease: 'linear' }}
    >
      <g fill={color}>
        {/* Outer gear ring with teeth */}
        <circle cx="50" cy="50" r="35" fill="none" stroke={color} strokeWidth="8" opacity="0.3" />
        <circle cx="50" cy="50" r="40" fill="none" stroke={color} strokeWidth="3" />
        
        {/* Pre-calculated gear teeth */}
        {gearTeeth.map((tooth, i) => (
          <line
            key={i}
            x1={tooth.x1}
            y1={tooth.y1}
            x2={tooth.x2}
            y2={tooth.y2}
            stroke={color}
            strokeWidth="6"
            strokeLinecap="round"
          />
        ))}
        
        {/* Center hub */}
        <circle cx="50" cy="50" r="15" fill={color} opacity="0.8" />
        <circle cx="50" cy="50" r="8" fill="#0a0f1a" />
        <circle cx="50" cy="50" r="4" fill={color} />
      </g>
    </motion.svg>
  );
});

// ============================================
// INTERLOCKING GEARS SYSTEM - OPTIMIZED
// ============================================
interface GearSystemProps {
  className?: string;
}

export const GearSystem = memo(function GearSystem({ className = '' }: GearSystemProps) {
  const prefersReducedMotion = useReducedMotion();
  
  if (prefersReducedMotion) {
    return null; // Skip complex animations for accessibility
  }
  
  return (
    <div className={`relative ${className}`} style={{ willChange: 'transform' }}>
      <div className="absolute top-0 left-0">
        <RotatingGear size={80} speed={12} direction="cw" teeth={16} color="#06b6d4" />
      </div>
      <div className="absolute top-[50px] left-[60px]">
        <RotatingGear size={50} speed={8} direction="ccw" teeth={10} color="#8b5cf6" />
      </div>
      <div className="absolute top-[-10px] left-[65px]">
        <RotatingGear size={40} speed={6} direction="cw" teeth={8} color="#3b82f6" />
      </div>
    </div>
  );
});

// ============================================
// PISTON ANIMATION - OPTIMIZED
// ============================================
interface PistonProps {
  height?: number;
  color?: string;
  speed?: number;
  className?: string;
}

export const Piston = memo(function Piston({
  height = 80,
  color = '#06b6d4',
  speed = 2,
  className = '',
}: PistonProps) {
  const prefersReducedMotion = useReducedMotion();
  
  return (
    <div className={`relative ${className}`} style={{ height, width: 30, willChange: 'transform' }}>
      {/* Cylinder */}
      <div
        className="absolute bottom-0 w-full rounded-t-lg"
        style={{
          height: height * 0.7,
          background: `linear-gradient(90deg, ${color}20, ${color}40, ${color}20)`,
          border: `2px solid ${color}50`,
        }}
      />
      
      {/* Piston head */}
      <motion.div
        className="absolute w-full rounded-sm"
        style={{
          height: 20,
          background: `linear-gradient(180deg, ${color}, ${color}90)`,
          boxShadow: `0 4px 20px ${color}60`,
          willChange: 'transform',
        }}
        animate={prefersReducedMotion ? {} : { y: [0, height * 0.4, 0] }}
        transition={{
          duration: speed,
          repeat: Infinity,
          ease: industrialEasings.mechanical,
        }}
      />
      
      {/* Connecting rod */}
      <motion.div
        className="absolute left-1/2 -translate-x-1/2 w-2 bg-gradient-to-b rounded-full"
        style={{
          background: `linear-gradient(180deg, ${color}80, ${color}40)`,
          top: 20,
          willChange: 'transform',
        }}
        animate={prefersReducedMotion ? {} : { height: [height * 0.2, height * 0.5, height * 0.2] }}
        transition={{
          duration: speed,
          repeat: Infinity,
          ease: industrialEasings.mechanical,
        }}
      />
    </div>
  );
});

// ============================================
// SENSOR PULSE EFFECT - OPTIMIZED
// Reduced pulse count for better performance
// ============================================
interface SensorPulseProps {
  size?: number;
  color?: string;
  pulseCount?: number;
  className?: string;
}

export const SensorPulse = memo(function SensorPulse({
  size = 60,
  color = '#06b6d4',
  pulseCount = 2, // Reduced default from 3
  className = '',
}: SensorPulseProps) {
  const prefersReducedMotion = useReducedMotion();
  
  return (
    <div className={`relative ${className}`} style={{ width: size, height: size, willChange: 'transform' }}>
      {/* Pulse rings - reduced count */}
      {!prefersReducedMotion && Array.from({ length: pulseCount }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute inset-0 rounded-full"
          style={{
            border: `2px solid ${color}`,
            willChange: 'transform, opacity',
          }}
          animate={{
            scale: [1, 2.5],
            opacity: [0.6, 0],
          }}
          transition={{
            duration: 2.5, // Slowed down
            repeat: Infinity,
            delay: i * 0.8,
            ease: 'easeOut',
          }}
        />
      ))}
      
      {/* Core sensor - static for reduced motion */}
      <motion.div
        className="absolute inset-0 m-auto rounded-full"
        style={{
          width: size * 0.4,
          height: size * 0.4,
          background: color,
          boxShadow: `0 0 20px ${color}80`,
          willChange: 'transform',
        }}
        animate={prefersReducedMotion ? {} : {
          scale: [1, 1.15, 1],
          opacity: [0.8, 1, 0.8],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    </div>
  );
});

// ============================================
// DATA STREAM VISUALIZATION - OPTIMIZED
// Reduced particles and slower animation
// ============================================
interface DataStreamProps {
  width?: number;
  height?: number;
  color?: string;
  particleCount?: number;
  className?: string;
}

export const DataStream = memo(function DataStream({
  width = 200,
  height = 4,
  color = '#06b6d4',
  particleCount = 3, // Reduced default from 5
  className = '',
}: DataStreamProps) {
  const prefersReducedMotion = useReducedMotion();
  
  if (prefersReducedMotion) {
    // Static fallback for reduced motion
    return (
      <div
        className={`relative overflow-hidden ${className}`}
        style={{ width, height }}
      >
        <div
          className="absolute inset-0 rounded-full opacity-50"
          style={{ background: color }}
        />
      </div>
    );
  }
  
  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{ width, height, willChange: 'transform' }}
    >
      {/* Track */}
      <div
        className="absolute inset-0 rounded-full opacity-30"
        style={{ background: color }}
      />
      
      {/* Data particles - reduced count */}
      {Array.from({ length: particleCount }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: 12,
            height: height,
            background: `linear-gradient(90deg, transparent, ${color}, transparent)`,
            boxShadow: `0 0 8px ${color}`,
            willChange: 'transform',
          }}
          animate={{ x: [-20, width + 20] }}
          transition={{
            duration: 2, // Slowed down
            repeat: Infinity,
            delay: i * 0.5,
            ease: 'linear',
          }}
        />
      ))}
    </div>
  );
});

// ============================================
// TEMPERATURE GAUGE
// ============================================
interface TemperatureGaugeProps {
  value?: number; // 0-100
  size?: number;
  className?: string;
}

export function TemperatureGauge({
  value = 65,
  size = 80,
  className = '',
}: TemperatureGaugeProps) {
  const gaugeRef = useRef(null);
  const isInView = useInView(gaugeRef, { once: true });
  const progress = useMotionValue(0);
  const rotation = useTransform(progress, [0, 100], [-135, 135]);

  useEffect(() => {
    if (isInView) {
      animate(progress, value, {
        duration: 2,
        ease: industrialEasings.servo,
      });
    }
  }, [isInView, value, progress]);

  const getColor = () => {
    if (value < 40) return '#22c55e';
    if (value < 70) return '#06b6d4';
    if (value < 85) return '#f59e0b';
    return '#ef4444';
  };

  return (
    <div ref={gaugeRef} className={`relative ${className}`} style={{ width: size, height: size * 0.6 }}>
      {/* Gauge background arc */}
      <svg width={size} height={size * 0.6} viewBox="0 0 100 60" className="absolute top-0 left-0">
        <path
          d="M 10 55 A 40 40 0 0 1 90 55"
          fill="none"
          stroke="#1a2438"
          strokeWidth="8"
          strokeLinecap="round"
        />
        <motion.path
          d="M 10 55 A 40 40 0 0 1 90 55"
          fill="none"
          stroke={getColor()}
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray="126"
          initial={{ strokeDashoffset: 126 }}
          animate={isInView ? { strokeDashoffset: 126 - (value / 100) * 126 } : {}}
          transition={{ duration: 2, ease: industrialEasings.servo }}
        />
      </svg>
      
      {/* Needle */}
      <motion.div
        className="absolute bottom-0 left-1/2 origin-bottom"
        style={{
          width: 4,
          height: size * 0.35,
          background: `linear-gradient(to top, ${getColor()}, ${getColor()}80)`,
          borderRadius: 2,
          marginLeft: -2,
          rotate: rotation,
        }}
      />
      
      {/* Center pivot */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 rounded-full"
        style={{
          width: 12,
          height: 12,
          background: getColor(),
          marginBottom: -6,
          boxShadow: `0 0 10px ${getColor()}60`,
        }}
      />
    </div>
  );
}

// ============================================
// CIRCUIT BOARD PATTERN
// ============================================
interface CircuitPatternProps {
  className?: string;
}

export function CircuitPattern({ className = '' }: CircuitPatternProps) {
  return (
    <svg className={`absolute inset-0 w-full h-full ${className}`} opacity="0.1">
      <defs>
        <pattern id="circuit" x="0" y="0" width="50" height="50" patternUnits="userSpaceOnUse">
          {/* Horizontal lines */}
          <line x1="0" y1="25" x2="20" y2="25" stroke="#06b6d4" strokeWidth="1" />
          <line x1="30" y1="25" x2="50" y2="25" stroke="#06b6d4" strokeWidth="1" />
          {/* Vertical lines */}
          <line x1="25" y1="0" x2="25" y2="15" stroke="#06b6d4" strokeWidth="1" />
          <line x1="25" y1="35" x2="25" y2="50" stroke="#06b6d4" strokeWidth="1" />
          {/* Connection nodes */}
          <circle cx="25" cy="25" r="3" fill="#06b6d4" />
          <circle cx="10" cy="25" r="2" fill="#8b5cf6" />
          <circle cx="40" cy="25" r="2" fill="#8b5cf6" />
          <circle cx="25" cy="10" r="2" fill="#3b82f6" />
          <circle cx="25" cy="40" r="2" fill="#3b82f6" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#circuit)" />
    </svg>
  );
}

// ============================================
// INDUSTRIAL LOADING SPINNER
// ============================================
interface IndustrialSpinnerProps {
  size?: number;
  color?: string;
  className?: string;
}

export function IndustrialSpinner({
  size = 60,
  color = '#06b6d4',
  className = '',
}: IndustrialSpinnerProps) {
  return (
    <div className={`relative ${className}`} style={{ width: size, height: size }}>
      {/* Outer ring */}
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
          border: `3px solid ${color}20`,
          borderTop: `3px solid ${color}`,
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
      />
      
      {/* Middle ring - counter rotate */}
      <motion.div
        className="absolute rounded-full"
        style={{
          inset: 8,
          border: `2px solid ${color}30`,
          borderRight: `2px solid ${color}`,
        }}
        animate={{ rotate: -360 }}
        transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
      />
      
      {/* Inner core */}
      <motion.div
        className="absolute rounded-full"
        style={{
          inset: 16,
          background: `radial-gradient(circle, ${color}40, transparent)`,
        }}
        animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  );
}

// ============================================
// MACHINE STATUS INDICATOR
// ============================================
interface StatusIndicatorProps {
  status: 'operational' | 'warning' | 'critical' | 'offline';
  size?: number;
  showPulse?: boolean;
  className?: string;
}

export function StatusIndicator({
  status,
  size = 12,
  showPulse = true,
  className = '',
}: StatusIndicatorProps) {
  const colors = {
    operational: '#22c55e',
    warning: '#f59e0b',
    critical: '#ef4444',
    offline: '#6b7280',
  };

  const color = colors[status];

  return (
    <div className={`relative ${className}`} style={{ width: size, height: size }}>
      {showPulse && status !== 'offline' && (
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{ background: color }}
          animate={{ scale: [1, 2], opacity: [0.5, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeOut' }}
        />
      )}
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background: color,
          boxShadow: status !== 'offline' ? `0 0 ${size}px ${color}60` : 'none',
        }}
      />
    </div>
  );
}

// ============================================
// INDUSTRIAL CARD HOVER EFFECT
// ============================================
interface IndustrialCardProps {
  children: ReactNode;
  className?: string;
  glowColor?: string;
}

export function IndustrialCard({
  children,
  className = '',
  glowColor = '#06b6d4',
}: IndustrialCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <motion.div
      ref={cardRef}
      className={`relative overflow-hidden ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ y: -5, scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      {/* Spotlight effect */}
      <motion.div
        className="absolute pointer-events-none"
        style={{
          width: 200,
          height: 200,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${glowColor}30, transparent 70%)`,
          left: mousePosition.x - 100,
          top: mousePosition.y - 100,
        }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />
      
      {/* Content */}
      <div className="relative z-10">{children}</div>
      
      {/* Border glow on hover */}
      <motion.div
        className="absolute inset-0 rounded-inherit pointer-events-none"
        style={{
          border: `1px solid ${glowColor}`,
          borderRadius: 'inherit',
        }}
        animate={{ opacity: isHovered ? 0.5 : 0 }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
}

// ============================================
// ANIMATED ICON WRAPPER
// ============================================
interface AnimatedIconProps {
  children: ReactNode;
  type?: 'pulse' | 'rotate' | 'bounce' | 'shake' | 'float';
  color?: string;
  className?: string;
}

export function AnimatedIcon({
  children,
  type = 'pulse',
  color = '#06b6d4',
  className = '',
}: AnimatedIconProps) {
  const animations = {
    pulse: {
      scale: [1, 1.15, 1],
      transition: { duration: 2, repeat: Infinity, ease: 'easeInOut' },
    },
    rotate: {
      rotate: 360,
      transition: { duration: 8, repeat: Infinity, ease: 'linear' as const },
    },
    bounce: {
      y: [0, -8, 0],
      transition: { duration: 1.5, repeat: Infinity, ease: 'easeInOut' as const },
    },
    shake: {
      rotate: [0, -5, 5, -5, 0],
      transition: { duration: 0.5, repeat: Infinity, repeatDelay: 2 },
    },
    float: {
      y: [0, -5, 0],
      x: [0, 3, 0],
      transition: { duration: 3, repeat: Infinity, ease: 'easeInOut' as const },
    },
  } as const;

  return (
    <motion.div
      className={className}
      animate={animations[type] as unknown as TargetAndTransition}
      style={{ color }}
    >
      {children}
    </motion.div>
  );
}

// ============================================
// INDUSTRIAL HERO VARIANTS
// ============================================
export const industrialHeroVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 60,
    scale: 0.95,
    filter: 'blur(10px)',
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: 'blur(0px)',
    transition: {
      duration: 1,
      ease: industrialEasings.mechanical,
    },
  },
};

export const industrialCardContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.2,
    },
  },
};

export const industrialCardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 80,
    scale: 0.85,
    rotateX: -20,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    rotateX: 0,
    transition: {
      duration: 0.7,
      ease: industrialEasings.hydraulic,
    },
  },
};

export const industrialBadgeVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0,
    rotate: -15,
  },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: {
      duration: 0.6,
      ease: industrialEasings.pneumatic,
    },
  },
};

// ============================================
// WAVEFORM ANIMATION (For sensor data)
// ============================================
interface WaveformProps {
  width?: number;
  height?: number;
  color?: string;
  bars?: number;
  className?: string;
}

// Generate deterministic values based on index for consistent animation
function getWaveformValues(index: number, total: number) {
  // Use index to create pseudo-random but deterministic values
  const normalizedIndex = (index + 1) / total;
  return {
    heightMultiplier: 0.5 + (((index * 7) % 11) / 22) + normalizedIndex * 0.1,
    durationOffset: ((index * 13) % 17) / 34,
  };
}

export function Waveform({
  width = 100,
  height = 40,
  color = '#06b6d4',
  bars = 10,
  className = '',
}: WaveformProps) {
  return (
    <div
      className={`flex items-end justify-center gap-1 ${className}`}
      style={{ width, height }}
    >
      {Array.from({ length: bars }).map((_, i) => {
        const values = getWaveformValues(i, bars);
        return (
          <motion.div
            key={i}
            className="rounded-full"
            style={{
              width: (width / bars) * 0.6,
              background: `linear-gradient(to top, ${color}, ${color}80)`,
            }}
            animate={{
              height: [height * 0.3, height * values.heightMultiplier, height * 0.3],
            }}
            transition={{
              duration: 1 + values.durationOffset,
              repeat: Infinity,
              delay: i * 0.1,
              ease: 'easeInOut',
            }}
          />
        );
      })}
    </div>
  );
}

// ============================================
// MACHINERY SILHOUETTE ANIMATION
// ============================================
interface MachinerySilhouetteProps {
  className?: string;
}

export function MachinerySilhouette({ className = '' }: MachinerySilhouetteProps) {
  return (
    <div className={`relative ${className}`}>
      {/* Main factory body */}
      <motion.div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-40 h-24 bg-gradient-to-t from-cyan-900/30 to-transparent rounded-t-lg"
        animate={{ opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      />
      
      {/* Smoke stacks */}
      <div className="absolute bottom-24 left-1/4 w-4 h-16 bg-gradient-to-t from-cyan-800/40 to-transparent rounded-t" />
      <div className="absolute bottom-24 left-1/2 -translate-x-1/2 w-6 h-20 bg-gradient-to-t from-cyan-800/40 to-transparent rounded-t" />
      <div className="absolute bottom-24 right-1/4 w-4 h-14 bg-gradient-to-t from-cyan-800/40 to-transparent rounded-t" />
      
      {/* Animated smoke */}
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-cyan-500/20"
          style={{
            width: 20 + i * 10,
            height: 20 + i * 10,
            left: `${25 + i * 25}%`,
            bottom: 140 + i * 30,
          }}
          animate={{
            y: [-20, -80],
            x: [0, 20, -10, 15],
            opacity: [0.4, 0],
            scale: [1, 2],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: i * 0.8,
            ease: 'easeOut',
          }}
        />
      ))}
    </div>
  );
}

const IndustrialAnimations = {
  RotatingGear,
  GearSystem,
  Piston,
  SensorPulse,
  DataStream,
  TemperatureGauge,
  CircuitPattern,
  IndustrialSpinner,
  StatusIndicator,
  IndustrialCard,
  AnimatedIcon,
  Waveform,
  MachinerySilhouette,
  industrialHeroVariants,
  industrialCardContainerVariants,
  industrialCardVariants,
  industrialBadgeVariants,
  industrialEasings,
};

export default IndustrialAnimations;
