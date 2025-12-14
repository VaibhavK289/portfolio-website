"use client";
import React, { useMemo, useState, useEffect, memo } from "react";
import { cn } from "@/lib/utils";

// Individual star component using CSS animation
const Star = memo(function Star({ 
  top, 
  left, 
  duration, 
  delay 
}: { 
  top: string; 
  left: string; 
  duration: number; 
  delay: number; 
}) {
  return (
    <div
      className="absolute w-1 h-1 rounded-full bg-white/50 glowing-star"
      style={{
        top,
        left,
        animationDuration: `${duration}s`,
        animationDelay: `${delay}s`,
        transform: 'translateZ(0)',
      }}
    />
  );
});

export const GlowingStarsBackgroundCard = memo(function GlowingStarsBackgroundCard({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) {
  const [isMobile, setIsMobile] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  
  useEffect(() => {
    setIsMobile(window.innerWidth < 768 || 'ontouchstart' in window);
    setPrefersReducedMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  }, []);
  
  // Reduce star count based on device
  const starCount = prefersReducedMotion ? 5 : isMobile ? 15 : 25;

  const stars = useMemo(() => {
    const seededRandom = (seed: number) => {
      const x = Math.sin(seed * 9999) * 10000;
      return x - Math.floor(x);
    };

    return [...Array(starCount)].map((_, i) => ({
      id: `star-${i}`,
      top: `${seededRandom(i * 3.7) * 100}%`,
      left: `${seededRandom(i * 5.3) * 100}%`,
      duration: 2 + seededRandom(i * 7.1) * 3,
      delay: seededRandom(i * 11.3) * 5,
    }));
  }, [starCount]);

  return (
    <div
      className={cn(
        "relative bg-neutral-950 rounded-xl overflow-hidden min-h-[20rem]",
        className
      )}
      style={{ contain: 'layout style paint' }}
    >
      <div className="absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary-500/5 to-primary-500/20" />
        {stars.map((star) => (
          <Star
            key={star.id}
            top={star.top}
            left={star.left}
            duration={star.duration}
            delay={star.delay}
          />
        ))}
      </div>
      <div className="relative z-10 h-full">{children}</div>
    </div>
  );
});

export const GlowingStarsDescription = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <p className={cn("text-base text-white max-w-[16rem]", className)}>
      {children}
    </p>
  );
};

export const GlowingStarsTitle = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <h2 className={cn("font-bold text-2xl text-white", className)}>
      {children}
    </h2>
  );
};
