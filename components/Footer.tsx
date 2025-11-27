'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Github, Linkedin, Twitter, Mail, Heart, Code2 } from 'lucide-react';
import { socials, navLinks } from '@/data/socials';

const iconMap: { [key: string]: React.ElementType } = {
  Github,
  Linkedin,
  Twitter,
  Mail,
};

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative border-t border-gray-200 dark:border-neutral-800 bg-gray-50 dark:bg-neutral-950">
      {/* Background gradient */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-500/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="p-2 rounded-xl bg-gradient-to-r from-primary-500 to-accent-500">
                <Code2 className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-bold text-gray-900 dark:text-white">
                Portfolio
              </span>
            </Link>
            <p className="text-gray-600 dark:text-neutral-400 max-w-md mb-6">
              Full-stack developer passionate about building modern, scalable web applications 
              with great user experiences.
            </p>
            {/* Social Links */}
            <div className="flex items-center gap-3">
              {socials.map((social) => {
                const Icon = iconMap[social.icon] || Github;
                return (
                  <motion.a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-full bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 text-gray-500 dark:text-neutral-400 hover:text-primary-500 dark:hover:text-primary-400 hover:border-primary-500/50 hover:bg-primary-50 dark:hover:bg-primary-500/10 transition-all duration-300 shadow-sm"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label={social.name}
                  >
                    <Icon className="w-5 h-5" />
                  </motion.a>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">
              Navigation
            </h3>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-600 dark:text-neutral-400 hover:text-primary-500 dark:hover:text-primary-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">
              Get in Touch
            </h3>
            <ul className="space-y-3 text-gray-600 dark:text-neutral-400">
              <li>
                <a
                  href="mailto:vaibhav.kumar.kandhway@gmail.com"
                  className="hover:text-primary-500 dark:hover:text-primary-400 transition-colors"
                >
                  vaibhav.kumar.kandhway@gmail.com
                </a>
              </li>
              <li>Vellore Institute of Technology</li>
              <li>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-1 text-primary-500 dark:text-primary-400 hover:text-primary-600 dark:hover:text-primary-300 font-medium"
                >
                  Send a message →
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-neutral-800">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-gray-600 dark:text-neutral-400 text-sm flex items-center gap-1">
              © {currentYear} Portfolio. Built with{' '}
              <Heart className="w-4 h-4 text-red-500 fill-red-500" /> using Next.js
            </p>
            <p className="text-gray-500 dark:text-neutral-500 text-sm">
              Designed & Developed by Vaibhav Kumar Kandhway
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
