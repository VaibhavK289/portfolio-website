"use client";
import React, { useId, useMemo, useState, useEffect, memo } from "react";
import { cn } from "@/lib/utils";

interface SparkleType {
  id: string;
  color: string;
  size: number;
  duration: number;
  delay: number;
  style: {
    top: string;
    left: string;
    zIndex: number;
  };
}

const DEFAULT_COLOR = "var(--color-primary-500)";

// Memoized sparkle component using CSS animations instead of Framer Motion
const Sparkle = memo(function Sparkle({ 
  sparkle, 
  minSize, 
  maxSize,
  isReduced 
}: { 
  sparkle: SparkleType; 
  minSize: number; 
  maxSize: number;
  isReduced: boolean;
}) {
  if (isReduced) {
    return (
      <span
        className="absolute inline-block pointer-events-none opacity-60"
        style={{
          ...sparkle.style,
          transform: 'scale(0.8) translateZ(0)',
        }}
      >
        <svg
          width={sparkle.size * (maxSize - minSize)}
          height={sparkle.size * (maxSize - minSize)}
          viewBox="0 0 160 160"
          fill="none"
        >
          <path
            d="M80 0C80 0 84.2846 41.2925 101.496 58.504C118.707 75.7154 160 80 160 80C160 80 118.707 84.2846 101.496 101.496C84.2846 118.707 80 160 80 160C80 160 75.7154 118.707 58.504 101.496C41.2925 84.2846 0 80 0 80C0 80 41.2925 75.7154 58.504 58.504C75.7154 41.2925 80 0 80 0Z"
            fill={sparkle.color}
          />
        </svg>
      </span>
    );
  }
  
  return (
    <span
      className="absolute inline-block pointer-events-none sparkle-animate"
      style={{
        ...sparkle.style,
        animationDuration: `${sparkle.duration}s`,
        animationDelay: `${sparkle.delay}s`,
        transform: 'translateZ(0)',
      }}
    >
      <svg
        width={sparkle.size * (maxSize - minSize)}
        height={sparkle.size * (maxSize - minSize)}
        viewBox="0 0 160 160"
        fill="none"
      >
        <path
          d="M80 0C80 0 84.2846 41.2925 101.496 58.504C118.707 75.7154 160 80 160 80C160 80 118.707 84.2846 101.496 101.496C84.2846 118.707 80 160 80 160C80 160 75.7154 118.707 58.504 101.496C41.2925 84.2846 0 80 0 80C0 80 41.2925 75.7154 58.504 58.504C75.7154 41.2925 80 0 80 0Z"
          fill={sparkle.color}
        />
      </svg>
    </span>
  );
});

export const SparklesCore = memo(function SparklesCore({
  id,
  className,
  background,
  minSize = 0.5,
  maxSize = 1,
  speed = 2,
  particleColor,
  particleDensity = 50,
}: {
  id?: string;
  className?: string;
  background?: string;
  minSize?: number;
  maxSize?: number;
  speed?: number;
  particleColor?: string;
  particleDensity?: number;
}) {
  const generatedId = useId();
  const [isMounted, setIsMounted] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    setPrefersReducedMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
    setIsMobile(window.innerWidth < 768 || 'ontouchstart' in window);
  }, []);

  // Reduce particle count on mobile for performance
  const effectiveParticleDensity = useMemo(() => {
    if (prefersReducedMotion) return Math.min(particleDensity, 5);
    if (isMobile) return Math.min(particleDensity, 12);
    return Math.min(particleDensity, 25); // Cap at 25 even on desktop
  }, [particleDensity, prefersReducedMotion, isMobile]);

  // Generate sparkles with stable random values using useMemo
  const sparkles: SparkleType[] = useMemo(() => {
    // Use a seeded random for consistent values
    const seededRandom = (seed: number) => {
      const x = Math.sin(seed) * 10000;
      return x - Math.floor(x);
    };

    return Array.from({ length: effectiveParticleDensity }).map((_, i) => ({
      id: `sparkle-${i}`,
      color: particleColor || DEFAULT_COLOR,
      size: seededRandom(i * 1.5) * 10 + 5,
      duration: speed + seededRandom(i * 2.7) * 2,
      delay: seededRandom(i * 3.3) * speed,
      style: {
        top: seededRandom(i * 4.1) * 100 + "%",
        left: seededRandom(i * 5.9) * 100 + "%",
        zIndex: 2,
      },
    }));
  }, [particleColor, effectiveParticleDensity, speed]);

  // Don't render sparkles until mounted to prevent hydration mismatch
  if (!isMounted) {
    return (
      <div
        className={cn("h-full w-full overflow-hidden relative", className)}
        style={{ background: background || "transparent" }}
        id={id || generatedId}
      />
    );
  }

  return (
    <div
      className={cn("h-full w-full overflow-hidden relative", className)}
      style={{
        background: background || "transparent",
        contain: 'layout style paint',
      }}
      id={id || generatedId}
    >
      {sparkles.map((sparkle) => (
        <Sparkle
          key={sparkle.id}
          sparkle={sparkle}
          minSize={minSize}
          maxSize={maxSize}
          isReduced={prefersReducedMotion}
        />
      ))}
    </div>
  );
});
