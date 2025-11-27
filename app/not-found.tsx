'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Home, Search } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { SparklesCore } from '@/components/ui/aceternity';
import { VKLogo } from '@/components/VKLogo';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-neutral-950 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <SparklesCore
          id="404-sparkles"
          background="transparent"
          minSize={0.4}
          maxSize={1}
          particleDensity={20}
          className="w-full h-full"
          particleColor="var(--color-primary-400)"
        />
      </div>
      
      {/* Gradient Orbs */}
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-accent-500/10 rounded-full blur-3xl" />

      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-2xl mx-auto">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex justify-center mb-8"
        >
          <VKLogo size={80} />
        </motion.div>

        {/* 404 Text */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-6"
        >
          <h1 className="text-8xl sm:text-9xl font-bold bg-gradient-to-r from-primary-500 via-accent-500 to-primary-500 bg-clip-text text-transparent">
            404
          </h1>
        </motion.div>

        {/* Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-8"
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Page Not Found
          </h2>
          <p className="text-gray-600 dark:text-neutral-400 text-lg max-w-md mx-auto">
            Oops! The page you&apos;re looking for seems to have wandered off into the digital void.
          </p>
        </motion.div>

        {/* Animated Decoration */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex justify-center gap-2 mb-10"
        >
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="w-2 h-2 rounded-full bg-gradient-to-r from-primary-500 to-accent-500"
              animate={{
                y: [0, -8, 0],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: i * 0.1,
              }}
            />
          ))}
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Button
            href="/"
            variant="primary"
            size="lg"
            className="w-full sm:w-auto"
          >
            <Home className="w-5 h-5" />
            Back to Home
          </Button>
          
          <Button
            href="/projects"
            variant="outline"
            size="lg"
            className="w-full sm:w-auto border-gray-300 dark:border-neutral-700 text-gray-700 dark:text-neutral-300 hover:bg-gray-100 dark:hover:bg-neutral-800"
          >
            <Search className="w-5 h-5" />
            View Projects
          </Button>
        </motion.div>

        {/* Quick Links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-12 pt-8 border-t border-gray-200 dark:border-neutral-800"
        >
          <p className="text-sm text-gray-500 dark:text-neutral-500 mb-4">
            Or try one of these pages:
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {[
              { label: 'About', href: '/about' },
              { label: 'Projects', href: '/projects' },
              { label: 'Contact', href: '/contact' },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-primary-600 dark:text-primary-400 hover:underline underline-offset-4 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
