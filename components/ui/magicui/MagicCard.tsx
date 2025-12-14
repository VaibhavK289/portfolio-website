"use client";

import React, { useCallback, useRef, useState, useEffect, memo } from "react";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { cn } from "@/lib/utils";

interface MagicCardProps extends React.HTMLAttributes<HTMLDivElement> {
  gradientSize?: number;
  gradientColor?: string;
  gradientOpacity?: number;
  gradientFrom?: string;
  gradientTo?: string;
}

export const MagicCard = memo(function MagicCard({
  children,
  className,
  gradientSize = 200,
  gradientColor = "#262626",
  gradientOpacity = 0.8,
  gradientFrom = "#9E7AFF",
  gradientTo = "#FE8BBB",
  ...props
}: MagicCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [isHovering, setIsHovering] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768 || 'ontouchstart' in window);
  }, []);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (isMobile || !cardRef.current) return;
      const { left, top } = cardRef.current.getBoundingClientRect();
      mouseX.set(e.clientX - left);
      mouseY.set(e.clientY - top);
    },
    [mouseX, mouseY, isMobile]
  );

  const handleMouseEnter = useCallback(() => {
    if (!isMobile) setIsHovering(true);
  }, [isMobile]);

  const handleMouseLeave = useCallback(() => {
    setIsHovering(false);
  }, []);

  const background = useMotionTemplate`
    radial-gradient(${gradientSize}px circle at ${mouseX}px ${mouseY}px, ${gradientColor}, transparent 100%)
  `;

  const borderGradient = useMotionTemplate`
    radial-gradient(${gradientSize}px circle at ${mouseX}px ${mouseY}px, ${gradientFrom}, ${gradientTo}, transparent 100%)
  `;

  // Simplified version for mobile - no hover effects
  if (isMobile) {
    return (
      <div
        ref={cardRef}
        className={cn(
          "group relative flex size-full overflow-hidden rounded-[20px] bg-white dark:bg-neutral-900 border border-gray-200/80 dark:border-neutral-800 shadow-sm",
          className
        )}
        {...props}
      >
        <div className="relative z-10 w-full">{children}</div>
      </div>
    );
  }

  return (
    <div
      ref={cardRef}
      className={cn(
        "group relative flex size-full overflow-hidden rounded-[20px] bg-white dark:bg-neutral-900 border border-gray-200/80 dark:border-neutral-800 transition-all duration-300 ease-out shadow-sm hover:shadow-xl hover:shadow-primary-500/5 hover:rounded-[24px]",
        isHovering && "border-primary-500/30",
        className
      )}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      <div className="relative z-10 w-full">{children}</div>
      
      {/* Border gradient overlay */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-[20px] group-hover:rounded-[24px] transition-all duration-300 will-change-transform"
        style={{
          background: borderGradient,
          opacity: isHovering ? 1 : 0,
          transform: 'translateZ(0)',
        }}
      />
      
      {/* Inner background gradient */}
      <motion.div
        className="pointer-events-none absolute inset-px rounded-[20px] group-hover:rounded-[24px] bg-neutral-900 transition-all duration-300"
        style={{
          opacity: isHovering ? 1 : 0,
        }}
      />
      
      {/* Spotlight effect */}
      <motion.div
        className="pointer-events-none absolute inset-0 rounded-[20px] group-hover:rounded-[24px] transition-all duration-300 will-change-transform"
        style={{
          background,
          opacity: isHovering ? gradientOpacity : 0,
          transform: 'translateZ(0)',
        }}
      />
      
      {/* Content needs to be above all effects */}
      <div className="absolute inset-0 z-20 pointer-events-none">
        <div className="pointer-events-auto w-full h-full">{children}</div>
      </div>
    </div>
  );
});
