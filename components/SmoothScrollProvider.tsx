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
    
    // Check for low-power devices
    const isLowPower = 'deviceMemory' in navigator && 
      (navigator as { deviceMemory?: number }).deviceMemory !== undefined && 
      (navigator as { deviceMemory: number }).deviceMemory < 4;
    
    if (prefersReducedMotion) {
      return; // Skip smooth scroll for accessibility
    }

    // Initialize Lenis with settings optimized for device
    const lenis = new Lenis({
      duration: isMobile ? 0.6 : isLowPower ? 0.8 : 1.0, // Faster on mobile/low-power
      easing: silkyEasing,
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: isMobile ? 0.4 : isLowPower ? 0.5 : 0.7, // Less aggressive on mobile
      touchMultiplier: 1.2,
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

    // Throttled resize handler
    let resizeTimeout: NodeJS.Timeout | null = null;
    const handleResize = () => {
      if (resizeTimeout) return;
      resizeTimeout = setTimeout(() => {
        const newIsMobile = window.innerWidth < 768;
        if (lenis) {
          lenis.options.wheelMultiplier = newIsMobile ? 0.4 : 0.7;
        }
        resizeTimeout = null;
      }, 150);
    };
    
    window.addEventListener('resize', handleResize, { passive: true });

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      if (resizeTimeout) clearTimeout(resizeTimeout);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  return <>{children}</>;
}
