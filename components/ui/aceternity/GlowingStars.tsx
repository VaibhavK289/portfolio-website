"use client";
import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const GlowingStarsBackgroundCard = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  const stars = 40;

  const generateStars = () => {
    const seededRandom = (seed: number) => {
      const x = Math.sin(seed * 9999) * 10000;
      return x - Math.floor(x);
    };

    return [...Array(stars)].map((_, i) => (
      <motion.div
        key={`star-${i}`}
        className="absolute w-1 h-1 rounded-full bg-white/50"
        style={{
          top: `${seededRandom(i * 3.7) * 100}%`,
          left: `${seededRandom(i * 5.3) * 100}%`,
        }}
        animate={{
          opacity: [0, 1, 0],
          scale: [0, 1, 0],
        }}
        transition={{
          duration: 2 + seededRandom(i * 7.1) * 3,
          repeat: Infinity,
          delay: seededRandom(i * 11.3) * 5,
        }}
      />
    ));
  };

  return (
    <div
      className={cn(
        "relative bg-neutral-950 rounded-xl overflow-hidden min-h-[20rem]",
        className
      )}
    >
      <div className="absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary-500/5 to-primary-500/20" />
        {generateStars()}
      </div>
      <div className="relative z-10 h-full">{children}</div>
    </div>
  );
};

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
