"use client";

import React, { useCallback, useRef, useState } from "react";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { cn } from "@/lib/utils";

interface MagicCardProps extends React.HTMLAttributes<HTMLDivElement> {
  gradientSize?: number;
  gradientColor?: string;
  gradientOpacity?: number;
  gradientFrom?: string;
  gradientTo?: string;
}

export function MagicCard({
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

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (cardRef.current) {
        const { left, top } = cardRef.current.getBoundingClientRect();
        mouseX.set(e.clientX - left);
        mouseY.set(e.clientY - top);
      }
    },
    [mouseX, mouseY]
  );

  const handleMouseEnter = useCallback(() => {
    setIsHovering(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovering(false);
  }, []);

  const background = useMotionTemplate`
    radial-gradient(${gradientSize}px circle at ${mouseX}px ${mouseY}px, ${gradientColor}, transparent 100%)
  `;

  const borderGradient = useMotionTemplate`
    radial-gradient(${gradientSize}px circle at ${mouseX}px ${mouseY}px, ${gradientFrom}, ${gradientTo}, transparent 100%)
  `;

  return (
    <div
      ref={cardRef}
      className={cn(
        "group relative flex size-full overflow-hidden rounded-xl bg-neutral-900 border border-neutral-800 transition-colors duration-300",
        isHovering && "border-transparent",
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
        className="pointer-events-none absolute -inset-px rounded-xl transition-opacity duration-300"
        style={{
          background: borderGradient,
          opacity: isHovering ? 1 : 0,
        }}
      />
      
      {/* Inner background gradient */}
      <motion.div
        className="pointer-events-none absolute inset-px rounded-xl bg-neutral-900 transition-opacity duration-300"
        style={{
          opacity: isHovering ? 1 : 0,
        }}
      />
      
      {/* Spotlight effect */}
      <motion.div
        className="pointer-events-none absolute inset-0 rounded-xl transition-opacity duration-300"
        style={{
          background,
          opacity: isHovering ? gradientOpacity : 0,
        }}
      />
      
      {/* Content needs to be above all effects */}
      <div className="absolute inset-0 z-20 pointer-events-none">
        <div className="pointer-events-auto w-full h-full">{children}</div>
      </div>
    </div>
  );
}
