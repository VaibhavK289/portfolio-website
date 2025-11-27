"use client";
import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const FloatingDock = ({
  items,
  desktopClassName,
  mobileClassName,
}: {
  items: { title: string; icon: React.ReactNode; href: string }[];
  desktopClassName?: string;
  mobileClassName?: string;
}) => {
  return (
    <>
      <FloatingDockDesktop items={items} className={desktopClassName} />
      <FloatingDockMobile items={items} className={mobileClassName} />
    </>
  );
};

const FloatingDockMobile = ({
  items,
  className,
}: {
  items: { title: string; icon: React.ReactNode; href: string }[];
  className?: string;
}) => {
  const [open, setOpen] = useState(false);
  return (
    <div className={cn("relative block md:hidden", className)}>
      <AnimatedTouchToggle open={open} setOpen={setOpen} />
      {open && (
        <motion.div
          layoutId="nav"
          className="absolute bottom-full mb-2 inset-x-0 flex flex-col gap-2"
        >
          {items.map((item, idx) => (
            <motion.a
              key={item.title}
              href={item.href}
              initial={{ opacity: 0, y: 10 }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                y: 10,
                transition: {
                  delay: idx * 0.05,
                },
              }}
              transition={{ delay: (items.length - 1 - idx) * 0.05 }}
              className="h-10 w-10 rounded-full bg-gray-50 dark:bg-neutral-900 flex items-center justify-center"
            >
              <div className="h-4 w-4">{item.icon}</div>
            </motion.a>
          ))}
        </motion.div>
      )}
    </div>
  );
};

const AnimatedTouchToggle = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <button
      onClick={() => setOpen(!open)}
      className="h-10 w-10 rounded-full bg-gray-50 dark:bg-neutral-800 flex items-center justify-center"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5 text-neutral-500 dark:text-neutral-400"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d={open ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
        />
      </svg>
    </button>
  );
};

const FloatingDockDesktop = ({
  items,
  className,
}: {
  items: { title: string; icon: React.ReactNode; href: string }[];
  className?: string;
}) => {
  const mouseX = useRef(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <motion.div
      onMouseMove={(e) => {
        mouseX.current = e.clientX;
      }}
      className={cn(
        "mx-auto hidden md:flex h-16 gap-4 items-end rounded-2xl bg-gray-50 dark:bg-neutral-900 px-4 pb-3",
        className
      )}
    >
      {items.map((item, idx) => (
        <IconContainer
          key={item.title}
          {...item}
          isHovered={hoveredIndex === idx}
          onHover={() => setHoveredIndex(idx)}
          onLeave={() => setHoveredIndex(null)}
        />
      ))}
    </motion.div>
  );
};

function IconContainer({
  title,
  icon,
  href,
  isHovered,
  onHover,
  onLeave,
}: {
  title: string;
  icon: React.ReactNode;
  href: string;
  isHovered: boolean;
  onHover: () => void;
  onLeave: () => void;
}) {
  return (
    <a href={href}>
      <motion.div
        onMouseEnter={onHover}
        onMouseLeave={onLeave}
        className="aspect-square rounded-full bg-gray-200 dark:bg-neutral-800 flex items-center justify-center relative"
        animate={{
          height: isHovered ? 48 : 40,
          width: isHovered ? 48 : 40,
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 30,
        }}
      >
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 10, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: 2, x: "-50%" }}
            className="px-2 py-0.5 whitespace-pre rounded-lg bg-gray-100 border dark:bg-neutral-800 dark:border-neutral-900 dark:text-white border-gray-200 text-neutral-700 absolute left-1/2 -translate-x-1/2 -top-8 w-fit text-xs"
          >
            {title}
          </motion.div>
        )}
        <div className="h-4 w-4 flex items-center justify-center">{icon}</div>
      </motion.div>
    </a>
  );
}
