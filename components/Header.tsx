'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import { Menu, X, Sparkles } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import { VKLogo } from './VKLogo';
import { navLinks } from '@/data/socials';

// Magnetic effect hook for nav items
function useMagnetic(strength: number = 0.3) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const springConfig = { damping: 15, stiffness: 150 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouse = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) * strength);
    y.set((e.clientY - centerY) * strength);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return { springX, springY, handleMouse, reset };
}

// NavLink component with hover effects
function NavLink({ href, label, isActive, index }: { href: string; label: string; isActive: boolean; index: number }) {
  const [isHovered, setIsHovered] = useState(false);
  const { springX, springY, handleMouse, reset } = useMagnetic(0.2);

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link href={href}>
        <motion.span
          className="relative px-4 py-2 block"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => { setIsHovered(false); reset(); }}
          onMouseMove={handleMouse}
          style={{ x: springX, y: springY }}
        >
          {/* Background glow on hover */}
          <motion.span
            className="absolute inset-0 rounded-full bg-gradient-to-r from-primary-500/10 via-accent-500/10 to-primary-500/10"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ 
              opacity: isHovered ? 1 : 0, 
              scale: isHovered ? 1 : 0.8 
            }}
            transition={{ duration: 0.2 }}
          />
          
          {/* Active background pill */}
          {isActive && (
            <motion.span
              className="absolute inset-0 rounded-full bg-gradient-to-r from-primary-500/20 to-accent-500/20 dark:from-primary-500/10 dark:to-accent-500/10"
              layoutId="activeNavBg"
              transition={{ type: 'spring', stiffness: 380, damping: 30 }}
            />
          )}
          
          {/* Text */}
          <span className={`relative z-10 font-medium text-sm tracking-wide transition-colors duration-200 ${
            isActive 
              ? 'text-primary-600 dark:text-primary-400' 
              : 'text-gray-600 dark:text-neutral-400 group-hover:text-gray-900 dark:group-hover:text-white'
          }`}>
            {label}
          </span>
          
          {/* Underline indicator */}
          <motion.span
            className="absolute -bottom-0.5 left-1/2 h-[2px] bg-gradient-to-r from-primary-500 to-accent-500 rounded-full"
            initial={{ width: 0, x: '-50%' }}
            animate={{ 
              width: isActive ? '60%' : isHovered ? '40%' : 0,
              x: '-50%'
            }}
            transition={{ duration: 0.2 }}
          />
          
          {/* Sparkle on active */}
          {isActive && (
            <motion.span
              className="absolute -top-1 -right-1"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', stiffness: 400, damping: 15 }}
            >
              <Sparkles className="w-3 h-3 text-accent-500" />
            </motion.span>
          )}
        </motion.span>
      </Link>
    </motion.div>
  );
}

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Check if link is active
  const isActiveLink = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'py-2'
            : 'py-4'
        }`}
      >
        {/* Glassmorphism background */}
        <motion.div
          className="absolute inset-0 transition-all duration-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: isScrolled ? 1 : 0 }}
        >
          {/* Gradient border bottom */}
          <div className="absolute inset-x-0 bottom-0 h-[1px] bg-gradient-to-r from-transparent via-primary-500/50 to-transparent" />
          
          {/* Glass background */}
          <div className="absolute inset-0 bg-white/70 dark:bg-neutral-950/70 backdrop-blur-xl" />
          
          {/* Subtle gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary-500/[0.02] via-transparent to-accent-500/[0.02]" />
        </motion.div>

        <nav className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo with entrance animation */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Link href="/" className="flex items-center gap-3 group">
                <VKLogo size={42} />
                {/* Brand text - hidden on mobile */}
                <motion.span 
                  className="hidden sm:block font-bold text-lg bg-gradient-to-r from-gray-800 via-gray-500 to-gray-800 dark:from-white dark:via-gray-400 dark:to-white bg-clip-text text-transparent"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  Vaibhav
                </motion.span>
              </Link>
            </motion.div>

            {/* Desktop Navigation - Floating pill style */}
            <motion.div 
              className="hidden md:flex items-center"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="flex items-center gap-1 px-2 py-1.5 rounded-full bg-white/5 dark:bg-white/5 backdrop-blur-md border border-white/10 dark:border-white/10">
                {navLinks.map((link, index) => (
                  <NavLink
                    key={link.href}
                    href={link.href}
                    label={link.label}
                    isActive={isActiveLink(link.href)}
                    index={index}
                  />
                ))}
              </div>
            </motion.div>

            {/* Right side actions */}
            <motion.div 
              className="flex items-center gap-3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              {/* CTA Button - Desktop only */}
              <motion.div
                className="hidden lg:block"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link
                  href="/contact"
                  className="relative group px-5 py-2.5 rounded-full font-medium text-sm overflow-hidden inline-flex"
                >
                  {/* Gradient background */}
                  <span className="absolute inset-0 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full" />
                  
                  {/* Text */}
                  <span className="relative z-10 text-white flex items-center gap-2">
                    Let&apos;s Talk
                    <motion.span
                      animate={{ x: [0, 3, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                    >
                      →
                    </motion.span>
                  </span>
                </Link>
              </motion.div>

              <ThemeToggle />
              
              {/* Mobile menu button */}
              <motion.button
                className="md:hidden relative p-2.5 rounded-[12px] bg-gray-100/80 dark:bg-neutral-900/80 backdrop-blur-sm border border-gray-200/50 dark:border-neutral-800/50 text-gray-600 dark:text-neutral-400 hover:rounded-[14px] transition-all duration-200 ease-out"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Toggle menu"
              >
                <AnimatePresence mode="wait">
                  {isMobileMenuOpen ? (
                    <motion.div
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <X className="w-5 h-5" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Menu className="w-5 h-5" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            </motion.div>
          </div>
        </nav>
      </motion.header>

      {/* Mobile Navigation - Full screen overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-40 bg-black/20 dark:bg-black/40 backdrop-blur-sm md:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            
            {/* Menu panel */}
            <motion.div
              initial={{ opacity: 0, x: '100%' }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 z-50 w-[280px] bg-white/95 dark:bg-neutral-950/95 backdrop-blur-xl border-l border-gray-200/50 dark:border-neutral-800/50 md:hidden"
            >
              {/* Close button */}
              <div className="flex justify-end p-4">
                <motion.button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 rounded-[12px] bg-gray-100 dark:bg-neutral-900 text-gray-600 dark:text-neutral-400 hover:rounded-[14px] transition-all duration-200 ease-out"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <X className="w-5 h-5" />
                </motion.button>
              </div>
              
              {/* Navigation links */}
              <nav className="px-4 py-6">
                <div className="space-y-2">
                  {navLinks.map((link, index) => (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 + 0.1 }}
                    >
                      <Link
                        href={link.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`flex items-center gap-3 px-4 py-3 rounded-[12px] font-medium transition-all duration-200 ease-out hover:rounded-[14px] ${
                          isActiveLink(link.href)
                            ? 'bg-gradient-to-r from-primary-500/10 to-accent-500/10 text-primary-600 dark:text-primary-400'
                            : 'text-gray-600 dark:text-neutral-400 hover:bg-gray-100 dark:hover:bg-neutral-900'
                        }`}
                      >
                        {isActiveLink(link.href) && (
                          <motion.span
                            layoutId="mobileActiveIndicator"
                            className="w-1 h-6 rounded-full bg-gradient-to-b from-primary-500 to-accent-500"
                          />
                        )}
                        <span>{link.label}</span>
                        {isActiveLink(link.href) && (
                          <Sparkles className="w-4 h-4 text-accent-500 ml-auto" />
                        )}
                      </Link>
                    </motion.div>
                  ))}
                </div>
                
                {/* Mobile CTA */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="mt-8 px-4"
                >
                  <Link
                    href="/contact"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center justify-center gap-2 w-full py-3 rounded-[12px] bg-gradient-to-r from-primary-500 to-accent-500 text-white font-medium hover:rounded-[14px] transition-all duration-200 ease-out"
                  >
                    Let&apos;s Talk
                    <motion.span
                      animate={{ x: [0, 3, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      →
                    </motion.span>
                  </Link>
                </motion.div>
              </nav>
              
              {/* Bottom decoration */}
              <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-primary-500/5 to-transparent pointer-events-none" />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
