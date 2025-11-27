"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ReactNode } from "react";
import { usePathname } from "next/navigation";

/* ============================================
   PAGE TRANSITIONS
   Smooth fade/slide between routes
   ============================================ */

interface PageTransitionProps {
  children: ReactNode;
}

// Easing curves as const tuples for TypeScript
const smoothEase = [0.25, 0.4, 0.25, 1] as const;
const exitEase = [0.4, 0, 1, 1] as const;

export function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
        animate={{ 
          opacity: 1, 
          y: 0, 
          filter: "blur(0px)",
          transition: {
            duration: 0.4,
            ease: smoothEase,
          }
        }}
        exit={{ 
          opacity: 0, 
          y: -10, 
          filter: "blur(4px)",
          transition: {
            duration: 0.3,
            ease: exitEase,
          }
        }}
        className="w-full"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

// Alternative slide transition
export function SlideTransition({ children }: PageTransitionProps) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        initial={{ opacity: 0, x: 60 }}
        animate={{ 
          opacity: 1, 
          x: 0,
          transition: {
            duration: 0.5,
            ease: smoothEase,
          }
        }}
        exit={{ 
          opacity: 0, 
          x: -60,
          transition: {
            duration: 0.3,
            ease: exitEase,
          }
        }}
        className="w-full"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

// Overlay transition with color wipe
export function OverlayTransition({ children }: PageTransitionProps) {
  const pathname = usePathname();

  return (
    <>
      <AnimatePresence mode="wait">
        <motion.div
          key={pathname}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="w-full"
        >
          {children}
        </motion.div>
      </AnimatePresence>
      
      {/* Animated overlay */}
      <AnimatePresence>
        <motion.div
          key={`overlay-${pathname}`}
          initial={{ scaleY: 1 }}
          animate={{ scaleY: 0 }}
          exit={{ scaleY: 1 }}
          transition={{ duration: 0.5, ease: smoothEase }}
          className="fixed inset-0 bg-gradient-to-b from-primary-500 to-accent-500 origin-top z-50 pointer-events-none"
          style={{ transformOrigin: "top" }}
        />
      </AnimatePresence>
    </>
  );
}
