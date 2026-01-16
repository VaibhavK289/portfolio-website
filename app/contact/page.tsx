'use client';

import { motion } from 'framer-motion';
import { Zap, Heart, Trophy, Mail, MapPin } from 'lucide-react';
import { ContactForm } from '@/components/ContactForm';
import { SocialConnectCard } from '@/components/SocialConnectCard';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { PremiumCard } from '@/components/PremiumCard';
import { personalInfo } from '@/data/socials';

// export const metadata: Metadata = {
//   title: 'Contact',
//   description: 'Get in touch with me for collaboration, job opportunities, or just to say hello.',
// };

const connectionMethods = [
  {
    icon: <Zap className="w-5 h-5" />,
    title: 'Quick Reply',
    description: 'Email or LinkedIn for urgent discussions',
    time: '24-48 hours',
  },
  {
    icon: <Heart className="w-5 h-5" />,
    title: 'Open to Opportunities',
    description: 'Full-time roles, freelance, or projects',
    status: 'Active',
  },
  {
    icon: <Trophy className="w-5 h-5" />,
    title: 'Always Learning',
    description: 'Keen to collaborate on innovative tech',
    status: 'Ready',
  },
];

const contactDetails = [
  {
    icon: <Mail className="w-5 h-5" />,
    label: 'Email',
    value: personalInfo.email,
    href: `mailto:${personalInfo.email}`,
  },
  {
    icon: <MapPin className="w-5 h-5" />,
    label: 'Location',
    value: personalInfo.location,
    href: null,
  },
];

export default function ContactPage() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen py-12 md:py-20 bg-gradient-to-b from-gray-50 via-white to-gray-50 dark:from-neutral-950 dark:via-neutral-900 dark:to-neutral-950 relative overflow-hidden"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-primary-500/5 to-transparent rounded-full blur-3xl"
          animate={{
            y: [0, 40, 0],
            x: [0, 40, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            repeatType: 'reverse',
          }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-accent-500/5 to-transparent rounded-full blur-3xl"
          animate={{
            y: [0, -40, 0],
            x: [0, -40, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            repeatType: 'reverse',
            delay: 0.5,
          }}
        />
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <SectionHeading
            title="Let's Build Something Amazing"
            subtitle="Have a project idea, want to collaborate, or just want to chat? I'm ready to connect."
          />
        </motion.div>

        {/* Connection Methods Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12 md:mb-16"
        >
          {connectionMethods.map((method, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 + index * 0.1 }}
              whileHover={{ y: -4 }}
              className="group p-6 rounded-xl bg-white dark:bg-neutral-800/50 border border-gray-200 dark:border-neutral-700 backdrop-blur-sm hover:border-primary-500/50 dark:hover:border-primary-500/50 transition-all duration-300 hover:shadow-lg dark:hover:shadow-primary-500/10"
            >
              <motion.div
                className="inline-flex p-3 rounded-lg bg-gradient-to-br from-primary-100 to-accent-100 dark:from-primary-900/30 dark:to-accent-900/30 text-primary-600 dark:text-primary-400 mb-4 group-hover:scale-110"
                transition={{ duration: 0.3 }}
              >
                {method.icon}
              </motion.div>
              <h3 className="text-base font-bold text-gray-900 dark:text-white mb-2">
                {method.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-neutral-400 mb-3">
                {method.description}
              </p>
              <p className="text-xs font-semibold text-primary-600 dark:text-primary-400">
                {method.time || method.status} ✓
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8 md:gap-6">
          {/* Left Column - Social Connect & Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            {/* Social Connect Card */}
            <PremiumCard delay={0.25}>
              <SocialConnectCard />
            </PremiumCard>

            {/* Contact Info Card */}
            <PremiumCard delay={0.3}>
              <div>
                <h3 className="text-base font-bold text-gray-900 dark:text-white mb-5">
                  Direct Contact
                </h3>

                <div className="space-y-4">
                  {contactDetails.map((detail, index) => (
                    <motion.div 
                      key={index}
                      className="flex items-start gap-3"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.35 + index * 0.1 }}
                      whileHover={{ x: 4 }}
                    >
                      <div className="p-2.5 rounded-lg bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 flex-shrink-0 mt-0.5">
                        {detail.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold text-gray-500 dark:text-neutral-500 uppercase tracking-wide mb-1">
                          {detail.label}
                        </p>
                        {detail.href ? (
                          <a
                            href={detail.href}
                            className="text-sm text-gray-900 dark:text-white hover:text-primary-600 dark:hover:text-primary-400 font-medium break-all transition-colors"
                          >
                            {detail.value}
                          </a>
                        ) : (
                          <p className="text-sm text-gray-900 dark:text-white font-medium">
                            {detail.value}
                          </p>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Availability Badge */}
                <motion.div 
                  className="mt-5 p-3 rounded-lg bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/30 dark:border-green-500/50"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <div className="flex items-center gap-2">
                    <motion.div
                      className="w-2 h-2 rounded-full bg-green-500"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                    <p className="text-xs font-medium text-green-700 dark:text-green-400">
                      Available for opportunities
                    </p>
                  </div>
                </motion.div>
              </div>
            </PremiumCard>
          </motion.div>

          {/* Right Columns - Contact Form (spans 2 columns on lg) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="lg:col-span-2"
          >
            <PremiumCard delay={0.4}>
              <div>
                <div className="mb-6">
                  <motion.h3 
                    className="text-xl font-bold text-gray-900 dark:text-white mb-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.45 }}
                  >
                    Send Me a Message
                  </motion.h3>
                  <motion.p 
                    className="text-sm text-gray-600 dark:text-neutral-400"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    Fill out the form and I'll respond within 24-48 hours. For urgent matters, reach out via email or LinkedIn.
                  </motion.p>
                </div>

                <ContactForm />
              </div>
            </PremiumCard>
          </motion.div>
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="mt-12 md:mt-16 p-8 md:p-10 rounded-2xl bg-gradient-to-r from-primary-500 to-accent-500 dark:from-primary-600 dark:to-accent-600 text-white text-center hover:shadow-2xl hover:shadow-primary-500/30 transition-all duration-300"
        >
          <h3 className="text-2xl font-bold mb-3">Ready to Start Something Great?</h3>
          <p className="mb-6 text-white/95 max-w-2xl mx-auto text-sm md:text-base">
            Whether you have a specific project in mind or just want to explore opportunities, let's create something meaningful together.
          </p>
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.55 }}
          >
            <a 
              href="https://linkedin.com/in/vaibhav-kumar-kandhway"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 rounded-lg bg-white text-primary-600 font-semibold hover:bg-gray-100 transition-all duration-300 hover:shadow-lg"
            >
              Connect on LinkedIn
            </a>
            <a 
              href="https://github.com/VaibhavK289"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 rounded-lg border-2 border-white text-white font-semibold hover:bg-white/10 transition-all duration-300"
            >
              View My GitHub
            </a>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}
