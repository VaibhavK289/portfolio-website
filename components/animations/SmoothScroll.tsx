"use client";

import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { ReactNode, useRef } from "react";

interface SmoothSectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
}

// Smooth section wrapper with scroll-linked opacity and transform
export function SmoothSection({ children, className = "", id }: SmoothSectionProps) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Smooth spring animation for scroll progress
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Transform values for parallax-like effect
  const opacity = useTransform(smoothProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const y = useTransform(smoothProgress, [0, 0.2, 0.8, 1], [60, 0, 0, -60]);
  const scale = useTransform(smoothProgress, [0, 0.2, 0.8, 1], [0.95, 1, 1, 0.95]);

  return (
    <motion.section
      ref={ref}
      id={id}
      style={{ opacity, y, scale }}
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

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
  });

  const opacity = useTransform(smoothProgress, [0, 1], [0, 1]);
  const y = useTransform(smoothProgress, [0, 1], [40, 0]);

  return (
    <motion.section
      ref={ref}
      id={id}
      style={{ opacity, y }}
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
  speed = 0.5,
  direction = "up",
}: ParallaxLayerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const multiplier = direction === "up" ? -1 : 1;
  const y = useTransform(scrollYProgress, [0, 1], [0, speed * 200 * multiplier]);

  return (
    <motion.div ref={ref} style={{ y }} className={className}>
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
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.9", "start 0.4"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
  });

  const directionConfig = {
    up: { y: [50, 0], x: [0, 0] },
    down: { y: [-50, 0], x: [0, 0] },
    left: { y: [0, 0], x: [50, 0] },
    right: { y: [0, 0], x: [-50, 0] },
  };

  const config = directionConfig[direction];
  const opacity = useTransform(smoothProgress, [0, 1], [0, 1]);
  const y = useTransform(smoothProgress, [0, 1], config.y);
  const x = useTransform(smoothProgress, [0, 1], config.x);

  return (
    <motion.div
      ref={ref}
      style={{ opacity, y, x }}
      className={className}
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

// Progress indicator for scroll
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-500 via-accent-500 to-primary-500 origin-left z-50"
      style={{ scaleX }}
    />
  );
}

// Seamless background gradient that transitions between sections
export function SeamlessBackground() {
  const { scrollYProgress } = useScroll();
  
  const background = useTransform(
    scrollYProgress,
    [0, 0.25, 0.5, 0.75, 1],
    [
      "radial-gradient(ellipse at top, rgba(59, 130, 246, 0.1) 0%, transparent 50%)",
      "radial-gradient(ellipse at center, rgba(168, 85, 247, 0.1) 0%, transparent 50%)",
      "radial-gradient(ellipse at bottom, rgba(236, 72, 153, 0.1) 0%, transparent 50%)",
      "radial-gradient(ellipse at center, rgba(59, 130, 246, 0.1) 0%, transparent 50%)",
      "radial-gradient(ellipse at top, rgba(168, 85, 247, 0.1) 0%, transparent 50%)",
    ]
  );

  return (
    <motion.div
      className="fixed inset-0 pointer-events-none z-0"
      style={{ background }}
    />
  );
}

// Floating particles that react to scroll
export function ScrollParticles() {
  const { scrollYProgress } = useScroll();
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
