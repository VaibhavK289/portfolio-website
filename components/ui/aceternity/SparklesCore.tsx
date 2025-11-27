"use client";
import React, { useId, useMemo, useState, useEffect } from "react";
import { motion } from "framer-motion";
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

export const SparklesCore = ({
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
}) => {
  const generatedId = useId();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Generate sparkles with stable random values using useMemo
  const sparkles: SparkleType[] = useMemo(() => {
    // Use a seeded random for consistent values
    const seededRandom = (seed: number) => {
      const x = Math.sin(seed) * 10000;
      return x - Math.floor(x);
    };

    return Array.from({ length: particleDensity }).map((_, i) => ({
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
  }, [particleColor, particleDensity, speed]);

  return (
    <div
      className={cn("h-full w-full overflow-hidden relative", className)}
      style={{
        background: background || "transparent",
      }}
      id={id || generatedId}
    >
      {isMounted && sparkles.map((sparkle) => (
        <motion.span
          key={sparkle.id}
          className="absolute inline-block pointer-events-none"
          style={sparkle.style}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: sparkle.duration,
            delay: sparkle.delay,
            repeat: Infinity,
            ease: "easeInOut",
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
        </motion.span>
      ))}
    </div>
  );
};
