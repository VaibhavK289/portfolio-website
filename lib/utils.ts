import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { useState, useEffect } from "react";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Hook to detect if user is on a mobile/low-performance device
export function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => {
      // Check screen width
      const isSmallScreen = window.innerWidth < 768;
      // Check for touch device
      const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      // Check for reduced motion preference
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      
      setIsMobile(isSmallScreen || (isTouchDevice && isSmallScreen) || prefersReducedMotion);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  return isMobile;
}

// Hook for detecting low-performance devices
export function useLowPerformance() {
  const [isLowPerf, setIsLowPerf] = useState(false);
  
  useEffect(() => {
    const checkPerformance = () => {
      // Check device memory (if available)
      const nav = navigator as Navigator & { deviceMemory?: number; hardwareConcurrency?: number };
      const lowMemory = nav.deviceMemory !== undefined && nav.deviceMemory < 4;
      // Check CPU cores
      const lowCPU = nav.hardwareConcurrency !== undefined && nav.hardwareConcurrency < 4;
      // Check screen size (mobile)
      const isMobile = window.innerWidth < 768;
      // Check reduced motion preference
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      
      setIsLowPerf(lowMemory || lowCPU || isMobile || prefersReducedMotion);
    };
    
    checkPerformance();
  }, []);
  
  return isLowPerf;
}
