'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-11 h-11 rounded-xl bg-gray-100 dark:bg-neutral-900 animate-pulse" />
    );
  }

  const isDark = theme === 'dark';

  return (
    <motion.button
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className="relative w-11 h-11 rounded-xl bg-gray-100/80 dark:bg-neutral-900/80 backdrop-blur-sm border border-gray-200/50 dark:border-neutral-700/50 overflow-hidden group hover:border-primary-500/30 transition-colors duration-300"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
    >
      {/* Background glow on hover */}
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: isDark 
            ? 'radial-gradient(circle at center, rgba(250, 204, 21, 0.15), transparent 70%)'
            : 'radial-gradient(circle at center, rgba(139, 92, 246, 0.15), transparent 70%)'
        }}
      />
      
      {/* Rotating container */}
      <div className="relative w-full h-full flex items-center justify-center">
        <AnimatePresence mode="wait">
          {isDark ? (
            <motion.div
              key="moon"
              initial={{ scale: 0, rotate: -90, opacity: 0 }}
              animate={{ scale: 1, rotate: 0, opacity: 1 }}
              exit={{ scale: 0, rotate: 90, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="absolute"
            >
              {/* Moon with stars */}
              <div className="relative">
                <Moon className="w-5 h-5 text-yellow-400" />
                {/* Tiny stars around moon */}
                <motion.span
                  className="absolute -top-1 -right-1 w-1 h-1 rounded-full bg-yellow-300"
                  animate={{ opacity: [0.5, 1, 0.5], scale: [0.8, 1.2, 0.8] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <motion.span
                  className="absolute -bottom-0.5 -left-1 w-0.5 h-0.5 rounded-full bg-yellow-300"
                  animate={{ opacity: [0.3, 1, 0.3], scale: [1, 1.5, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
                />
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="sun"
              initial={{ scale: 0, rotate: 90, opacity: 0 }}
              animate={{ scale: 1, rotate: 0, opacity: 1 }}
              exit={{ scale: 0, rotate: -90, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="absolute"
            >
              {/* Sun with rays */}
              <div className="relative">
                <Sun className="w-5 h-5 text-orange-500" />
                {/* Animated rays */}
                <motion.div
                  className="absolute inset-0 flex items-center justify-center"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
                >
                  {[...Array(4)].map((_, i) => (
                    <motion.span
                      key={i}
                      className="absolute w-1 h-1 rounded-full bg-orange-400/50"
                      style={{
                        top: i === 0 ? -6 : i === 2 ? 'auto' : '50%',
                        bottom: i === 2 ? -6 : 'auto',
                        left: i === 3 ? -6 : i === 1 ? 'auto' : '50%',
                        right: i === 1 ? -6 : 'auto',
                        transform: 'translate(-50%, -50%)',
                      }}
                      animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                    />
                  ))}
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      {/* Subtle gradient border on hover */}
      <motion.div
        className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.3), rgba(217, 70, 239, 0.3))',
          mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          maskComposite: 'xor',
          WebkitMaskComposite: 'xor',
          padding: '1px',
        }}
      />
    </motion.button>
  );
}
