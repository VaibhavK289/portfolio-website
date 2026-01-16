'use client';

import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { VKLogo } from './VKLogo';

interface SocialLink {
  name: string;
  description: string;
  url: string;
  icon: React.ReactNode;
  color: string;
  bgColor: string;
  borderColor: string;
  hoverBgColor: string;
}

const socialLinks: SocialLink[] = [
  {
    name: 'LinkedIn',
    description: 'Connect for opportunities',
    url: 'https://linkedin.com/in/vaibhav-kumar-kandhway',
    icon: <Linkedin className="w-6 h-6" />,
    color: 'text-[#0A66C2]',
    bgColor: 'bg-[#0A66C2]/10 dark:bg-[#0A66C2]/20',
    borderColor: 'border-[#0A66C2]/30',
    hoverBgColor: 'hover:bg-[#0A66C2]/20 dark:hover:bg-[#0A66C2]/30',
  },
  {
    name: 'GitHub',
    description: 'Explore my code',
    url: 'https://github.com/VaibhavK289',
    icon: <Github className="w-6 h-6" />,
    color: 'text-gray-900 dark:text-white',
    bgColor: 'bg-gray-900/10 dark:bg-white/10',
    borderColor: 'border-gray-900/30 dark:border-white/30',
    hoverBgColor: 'hover:bg-gray-900/20 dark:hover:bg-white/20',
  },
  {
    name: 'Email',
    description: 'Send message',
    url: 'mailto:vaibhav.kumar.kandhway@gmail.com',
    icon: <Mail className="w-6 h-6" />,
    color: 'text-red-500',
    bgColor: 'bg-red-500/10 dark:bg-red-500/20',
    borderColor: 'border-red-500/30',
    hoverBgColor: 'hover:bg-red-500/20 dark:hover:bg-red-500/30',
  },
];

export function SocialConnectCard() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="w-full space-y-4">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h3 className="text-lg font-bold text-gray-900 dark:text-white">
          Let's Connect
        </h3>
        <p className="text-sm text-gray-600 dark:text-neutral-400 mt-1">
          Choose your platform
        </p>
      </motion.div>

      {/* Social Links - Horizontal Stack */}
      <div className="w-full grid grid-cols-1 gap-3">
        {socialLinks.map((social, index) => (
          <motion.a
            key={social.name}
            href={social.url}
            target={social.name !== 'Email' ? '_blank' : undefined}
            rel={social.name !== 'Email' ? 'noopener noreferrer' : undefined}
            initial={{ opacity: 0, x: -15 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.1 * index }}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            className={`group relative p-4 rounded-xl border-2 transition-all duration-300 ${social.bgColor} ${social.borderColor} ${social.hoverBgColor} overflow-hidden flex items-start justify-between`}
          >
            {/* Content */}
            <div className="relative z-10 flex-1">
              {/* Name and Icon Row */}
              <div className="flex items-center gap-3 mb-1">
                <motion.div
                  animate={{ y: hoveredIndex === index ? -2 : 0 }}
                  transition={{ duration: 0.3 }}
                  className={`inline-flex p-2 rounded-lg ${social.bgColor} ${social.color}`}
                >
                  {social.icon}
                </motion.div>
                <h4 className="font-semibold text-gray-900 dark:text-white text-sm">
                  {social.name}
                </h4>
              </div>

              {/* Description */}
              <p className="text-xs text-gray-600 dark:text-neutral-400 ml-11">
                {social.description}
              </p>
            </div>

            {/* Arrow Icon */}
            <motion.div
              animate={{ 
                x: hoveredIndex === index ? 4 : 0,
                opacity: hoveredIndex === index ? 1 : 0.5
              }}
              transition={{ duration: 0.3 }}
              className="flex-shrink-0 ml-3 mt-1"
            >
              <ArrowRight className={`w-4 h-4 ${social.color}`} />
            </motion.div>
          </motion.a>
        ))}
      </div>

      {/* Pro Tip */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="mt-6 p-4 rounded-xl border border-primary-500/30 dark:border-primary-500/40 bg-gradient-to-br from-primary-500/5 via-transparent to-accent-500/5 dark:from-primary-500/10 dark:via-transparent dark:to-accent-500/10 backdrop-blur-sm"
      >
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 mt-0.5">
            <VKLogo size={24} />
          </div>
          <div>
            <p className="text-xs font-semibold text-primary-600 dark:text-primary-400 mb-0.5">Pro Tip</p>
            <p className="text-xs text-gray-700 dark:text-neutral-300">
              Email or LinkedIn for fastest response. GitHub perfect for code discussions!
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
