"use client";

import { ReactNode, useEffect, useRef } from "react";
import Lenis from "lenis";

interface SmoothScrollProviderProps {
  children: ReactNode;
}

// Ultra-smooth exponential ease-out for silky deceleration
const silkyEasing = (t: number): number => {
  return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
};

export function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  const lenisRef = useRef<Lenis | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    // Performance: Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    // Also check for mobile devices - reduce smooth scroll intensity
    const isMobile = window.innerWidth < 768 || 'ontouchstart' in window;
    
    if (prefersReducedMotion) {
      return; // Skip smooth scroll for accessibility
    }

    // Initialize Lenis with settings optimized for device
    const lenis = new Lenis({
      duration: isMobile ? 0.8 : 1.0, // Faster on mobile
      easing: silkyEasing,
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: isMobile ? 0.5 : 0.7, // Less aggressive on mobile
      touchMultiplier: 1.5,
      infinite: false,
      autoResize: true,
    });

    lenisRef.current = lenis;

    // Optimized RAF loop using timestamp
    function raf(time: number) {
      lenis.raf(time);
      rafRef.current = requestAnimationFrame(raf);
    }
    
    rafRef.current = requestAnimationFrame(raf);

    // Listen for resize to update mobile detection
    const handleResize = () => {
      const newIsMobile = window.innerWidth < 768;
      if (lenis) {
        lenis.options.wheelMultiplier = newIsMobile ? 0.5 : 0.7;
      }
    };
    
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  return <>{children}</>;
}
