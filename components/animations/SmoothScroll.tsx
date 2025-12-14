"use client";

import { motion, useScroll, useSpring, useTransform, useVelocity, useMotionValue } from "framer-motion";
import { ReactNode, useRef, useEffect, useState, createContext, useContext, useMemo } from "react";

/* ============================================
   MOTION DESIGN SYSTEM
   Scroll-linked animations, velocity awareness,
   reduced motion support, and morphing shapes
   ============================================ */

// Context for scroll velocity awareness - now uses motion values instead of state
interface ScrollVelocityContextType {
  velocityValue: ReturnType<typeof useMotionValue<number>>;
  isScrollingFast: boolean;
}

const ScrollVelocityContext = createContext<ScrollVelocityContextType | null>(null);

export const useScrollVelocity = () => {
  const context = useContext(ScrollVelocityContext);
  // Return safe defaults if no provider
  return context ?? { velocityValue: null, isScrollingFast: false };
};

// Optimized scroll velocity provider - NO setState in animation frame
export function ScrollVelocityProvider({ children }: { children: ReactNode }) {
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const velocityValue = useMotionValue(0);
  const [isScrollingFast, setIsScrollingFast] = useState(false);
  const lastUpdateRef = useRef(0);
  
  // Throttled velocity check - only updates state every 100ms, not every frame
  useEffect(() => {
    const unsubscribe = scrollVelocity.on("change", (latest) => {
      const now = Date.now();
      const absVelocity = Math.abs(latest);
      
      // Update motion value (no re-render)
      velocityValue.set(absVelocity);
      
      // Throttle state updates to every 100ms
      if (now - lastUpdateRef.current > 100) {
        const isFast = absVelocity > 1000;
        setIsScrollingFast(prev => prev !== isFast ? isFast : prev);
        lastUpdateRef.current = now;
      }
    });
    
    return unsubscribe;
  }, [scrollVelocity, velocityValue]);
  
  const contextValue = useMemo(() => ({ velocityValue, isScrollingFast }), [velocityValue, isScrollingFast]);
  
  return (
    <ScrollVelocityContext.Provider value={contextValue}>
      {children}
    </ScrollVelocityContext.Provider>
  );
}

// Hook to check for reduced motion preference
export function useReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);
  
  return prefersReducedMotion;
}

// Hook to detect mobile devices - with passive resize listener
export function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || 'ontouchstart' in window);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile, { passive: true });
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  return isMobile;
}

// Hook to detect device performance tier
export function useDeviceTier(): 'high' | 'medium' | 'low' {
  const [tier, setTier] = useState<'high' | 'medium' | 'low'>('high');
  
  useEffect(() => {
    // Check for low-power mode indicators
    const isMobile = window.innerWidth < 768 || 'ontouchstart' in window;
    const isLowMemory = 'deviceMemory' in navigator && (navigator as { deviceMemory?: number }).deviceMemory !== undefined && (navigator as { deviceMemory: number }).deviceMemory < 4;
    const isSlowCPU = 'hardwareConcurrency' in navigator && navigator.hardwareConcurrency < 4;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion || (isMobile && (isLowMemory || isSlowCPU))) {
      setTier('low');
    } else if (isMobile) {
      setTier('medium');
    } else {
      setTier('high');
    }
  }, []);
  
  return tier;
}

interface SmoothSectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
}

// Ultra-smooth spring configuration - optimized for 60fps+
const ultraSmoothSpring = {
  stiffness: 100,
  damping: 30,
  restDelta: 0.001,
};

// Smooth section wrapper with scroll-linked opacity and transform
export function SmoothSection({ children, className = "", id }: SmoothSectionProps) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Optimized spring for buttery smooth scroll
  const smoothProgress = useSpring(scrollYProgress, ultraSmoothSpring);

  // Simplified transforms - less work per frame
  const opacity = useTransform(smoothProgress, [0, 0.3, 0.7, 1], [0.3, 1, 1, 0.3]);
  const y = useTransform(smoothProgress, [0, 0.3, 0.7, 1], [20, 0, 0, -20]);

  return (
    <motion.section
      ref={ref}
      id={id}
      style={{ 
        opacity, 
        y,
        willChange: 'transform, opacity',
      }}
      className={className}
    >
      {children}
    </motion.section>
  );
}

// Fade section - simpler opacity-only transition
export function FadeSection({ children, className = "", id }: SmoothSectionProps) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"],
  });

  const smoothProgress = useSpring(scrollYProgress, ultraSmoothSpring);

  const opacity = useTransform(smoothProgress, [0, 1], [0.2, 1]);
  const y = useTransform(smoothProgress, [0, 1], [15, 0]);

  return (
    <motion.section
      ref={ref}
      id={id}
      style={{ 
        opacity, 
        y,
        willChange: 'transform, opacity',
      }}
      className={className}
    >
      {children}
    </motion.section>
  );
}

// Parallax wrapper for background elements
interface ParallaxLayerProps {
  children: ReactNode;
  className?: string;
  speed?: number;
  direction?: "up" | "down";
}

export function ParallaxLayer({
  children,
  className = "",
  speed = 0.3,
  direction = "up",
}: ParallaxLayerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const smoothY = useSpring(scrollYProgress, ultraSmoothSpring);
  const multiplier = direction === "up" ? -1 : 1;
  const y = useTransform(smoothY, [0, 1], [0, speed * 100 * multiplier]);

  return (
    <motion.div 
      ref={ref} 
      style={{ 
        y,
        willChange: 'transform',
      }} 
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Scroll-triggered reveal
interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  direction?: "up" | "down" | "left" | "right";
  delay?: number;
}

export function ScrollReveal({
  children,
  className = "",
  direction = "up",
  delay = 0,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const isMobile = useIsMobile();
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.9", "start 0.4"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 50,
    damping: 20,
    restDelta: 0.0001,
  });

  // Simplified animation for reduced motion or mobile
  const simpleMode = reducedMotion || isMobile;
  
  const directionConfig = {
    up: { y: simpleMode ? [20, 0] : [40, 0], x: [0, 0] },
    down: { y: simpleMode ? [-20, 0] : [-40, 0], x: [0, 0] },
    left: { y: [0, 0], x: simpleMode ? [20, 0] : [40, 0] },
    right: { y: [0, 0], x: simpleMode ? [-20, 0] : [-40, 0] },
  };

  const config = directionConfig[direction];
  const opacity = useTransform(smoothProgress, [0, 1], [reducedMotion ? 0.5 : 0, 1]);
  const y = useTransform(smoothProgress, [0, 1], config.y);
  const x = useTransform(smoothProgress, [0, 1], config.x);

  return (
    <motion.div
      ref={ref}
      style={{ opacity, y, x, translateZ: 0 }}
      className={`${className} will-change-transform`}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
}

// Horizontal scroll section
interface HorizontalScrollProps {
  children: ReactNode;
  className?: string;
}

export function HorizontalScroll({ children, className = "" }: HorizontalScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-75%"]);

  return (
    <div ref={containerRef} className={`relative h-[300vh] ${className}`}>
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        <motion.div style={{ x }} className="flex gap-8">
          {children}
        </motion.div>
      </div>
    </div>
  );
}

// Progress indicator for scroll - optimized with GPU acceleration
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, ultraSmoothSpring);

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary-500 via-accent-500 to-primary-500 origin-left z-50"
      style={{ 
        scaleX,
        willChange: 'transform',
      }}
    />
  );
}

// Seamless background gradient that transitions between sections
export function SeamlessBackground() {
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, ultraSmoothSpring);
  
  const background = useTransform(
    smoothProgress,
    [0, 0.25, 0.5, 0.75, 1],
    [
      "radial-gradient(ellipse at top, rgba(6, 182, 212, 0.12) 0%, transparent 50%)",
      "radial-gradient(ellipse at center, rgba(168, 85, 247, 0.12) 0%, transparent 50%)",
      "radial-gradient(ellipse at bottom, rgba(147, 51, 234, 0.12) 0%, transparent 50%)",
      "radial-gradient(ellipse at center, rgba(6, 182, 212, 0.12) 0%, transparent 50%)",
      "radial-gradient(ellipse at top, rgba(168, 85, 247, 0.12) 0%, transparent 50%)",
    ]
  );

  return (
    <motion.div
      className="fixed inset-0 pointer-events-none z-0"
      style={{ background }}
    />
  );
}

// Floating particles that react to scroll - disabled on mobile/reduced motion
export function ScrollParticles() {
  const { scrollYProgress } = useScroll();
  const reducedMotion = useReducedMotion();
  const isMobile = useIsMobile();
  
  // Skip rendering for reduced motion or mobile (performance)
  if (reducedMotion || isMobile) return null;
  
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -500]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -300]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -700]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 360]);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      <motion.div
        style={{ y: y1, rotate }}
        className="absolute top-1/4 left-1/4 w-2 h-2 rounded-full bg-primary-500/30"
      />
      <motion.div
        style={{ y: y2 }}
        className="absolute top-1/3 right-1/4 w-3 h-3 rounded-full bg-accent-500/20"
      />
      <motion.div
        style={{ y: y3, rotate }}
        className="absolute top-1/2 left-1/3 w-1.5 h-1.5 rounded-full bg-primary-400/25"
      />
      <motion.div
        style={{ y: y1 }}
        className="absolute top-2/3 right-1/3 w-2.5 h-2.5 rounded-full bg-accent-400/20"
      />
      <motion.div
        style={{ y: y2, rotate }}
        className="absolute top-3/4 left-1/2 w-2 h-2 rounded-full bg-primary-500/15"
      />
    </div>
  );
}

/* ============================================
   SCROLL-LINKED MORPHING SHAPES
   Geometric shapes that transform as you scroll
   ============================================ */

interface ScrollMorphShapeProps {
  className?: string;
}

// Circle that morphs to hexagon as you scroll
export function ScrollMorphCircleToHex({ className = "" }: ScrollMorphShapeProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  
  const reducedMotion = useReducedMotion();
  const smoothProgress = useSpring(scrollYProgress, ultraSmoothSpring);
  
  // Morph border-radius from circle to hexagon-ish
  const borderRadius = useTransform(
    smoothProgress,
    [0, 0.5, 1],
    reducedMotion ? ["50%", "50%", "50%"] : ["50%", "30%", "10%"]
  );
  
  const rotate = useTransform(
    smoothProgress,
    [0, 1],
    reducedMotion ? [0, 0] : [0, 45]
  );
  
  const scale = useTransform(
    smoothProgress,
    [0, 0.5, 1],
    [0.8, 1.1, 0.9]
  );

  return (
    <motion.div
      ref={ref}
      className={`${className} will-change-transform`}
      style={{ borderRadius, rotate, scale }}
    />
  );
}

// Shape that expands/contracts with scroll
export function ScrollExpandShape({ className = "" }: ScrollMorphShapeProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  
  const smoothProgress = useSpring(scrollYProgress, ultraSmoothSpring);
  
  const scaleX = useTransform(smoothProgress, [0, 0.5, 1], [0.3, 1, 0.3]);
  const scaleY = useTransform(smoothProgress, [0, 0.5, 1], [1, 0.6, 1]);
  const opacity = useTransform(smoothProgress, [0, 0.3, 0.7, 1], [0.2, 0.6, 0.6, 0.2]);

  return (
    <motion.div
      ref={ref}
      className={`${className} will-change-transform`}
      style={{ scaleX, scaleY, opacity }}
    />
  );
}

// Blob shape that morphs its clip-path as you scroll
export function ScrollMorphBlob({ className = "" }: ScrollMorphShapeProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const isMobile = useIsMobile();
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  
  // All hooks must be called before conditional returns
  const smoothProgress = useSpring(scrollYProgress, ultraSmoothSpring);
  
  // SVG morph between blob states
  const pathD = useTransform(
    smoothProgress,
    [0, 0.5, 1],
    [
      "M50,0 C80,10 100,40 100,50 C100,80 80,100 50,100 C20,100 0,80 0,50 C0,20 20,0 50,0",
      "M50,10 C70,0 100,30 90,50 C100,70 70,100 50,90 C30,100 0,70 10,50 C0,30 30,0 50,10",
      "M50,5 C75,5 95,25 95,50 C95,75 75,95 50,95 C25,95 5,75 5,50 C5,25 25,5 50,5",
    ]
  );
  
  const rotate = useTransform(smoothProgress, [0, 1], reducedMotion ? [0, 0] : [0, 180]);
  
  // Render simplified version for mobile/reduced motion
  if (reducedMotion || isMobile) {
    return <div ref={ref} className={className} />;
  }

  return (
    <motion.div ref={ref} className={`${className} relative will-change-transform`} style={{ rotate }}>
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <motion.path
          d={pathD}
          fill="currentColor"
        />
      </svg>
    </motion.div>
  );
}

// Rotating geometric accent that responds to scroll
export function ScrollRotateShape({ className = "" }: ScrollMorphShapeProps) {
  const { scrollYProgress } = useScroll();
  const reducedMotion = useReducedMotion();
  
  const rotate = useTransform(
    scrollYProgress,
    [0, 1],
    reducedMotion ? [0, 0] : [0, 360]
  );
  
  const scale = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [0.9, 1.1, 0.9]
  );

  return (
    <motion.div
      className={`${className} will-change-transform`}
      style={{ rotate, scale }}
    />
  );
}

