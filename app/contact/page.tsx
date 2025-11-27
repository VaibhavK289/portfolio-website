'use client';

import { motion } from 'framer-motion';
import { Mail, MapPin, Clock, Send } from 'lucide-react';
import { ContactForm } from '@/components/ContactForm';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { personalInfo, socials } from '@/data/socials';
import { Github, Linkedin, Twitter } from 'lucide-react';
import { MagicCard } from '@/components/ui/magicui';

// export const metadata: Metadata = {
//   title: 'Contact',
//   description: 'Get in touch with me for collaboration, job opportunities, or just to say hello.',
// };

const iconMap: { [key: string]: React.ElementType } = {
  Github,
  Linkedin,
  Twitter,
  Mail,
};

export default function ContactPage() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen py-20 bg-neutral-950"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <SectionHeading
            title="Get In Touch"
            subtitle="Have a project in mind or want to collaborate? I'd love to hear from you!"
          />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <MagicCard className="mb-8 cursor-pointer" gradientColor="#262626">
              <div className="p-8">
                <h3 className="text-xl font-bold text-white mb-6">
                  Contact Information
                </h3>

                <div className="space-y-6">
                  <motion.div 
                    className="flex items-start gap-4"
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="p-3 rounded-xl bg-primary-900/30 text-primary-400">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm text-neutral-500 mb-1">Email</p>
                      <a
                        href={`mailto:${personalInfo.email}`}
                        className="text-white hover:text-primary-400 font-medium transition-colors"
                      >
                        {personalInfo.email}
                      </a>
                    </div>
                  </motion.div>

                  <motion.div 
                    className="flex items-start gap-4"
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="p-3 rounded-xl bg-primary-900/30 text-primary-400">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm text-neutral-500 mb-1">Location</p>
                      <p className="text-white font-medium">
                        {personalInfo.location}
                      </p>
                    </div>
                  </motion.div>

                  <motion.div 
                    className="flex items-start gap-4"
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="p-3 rounded-xl bg-primary-900/30 text-primary-400">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm text-neutral-500 mb-1">Availability</p>
                      <p className="text-white font-medium">
                        Open to opportunities
                      </p>
                    </div>
                  </motion.div>
                </div>
              </div>
            </MagicCard>

            {/* Social Links */}
            <MagicCard className="cursor-pointer" gradientColor="#262626">
              <div className="p-8">
                <h3 className="text-xl font-bold text-white mb-6">
                  Connect With Me
                </h3>

                <div className="grid grid-cols-2 gap-4">
                  {socials.map((social, index) => {
                    const Icon = iconMap[social.icon] || Mail;
                    return (
                      <motion.a
                        key={social.name}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                        whileHover={{ scale: 1.05, y: -2 }}
                        className="flex items-center gap-3 p-4 rounded-xl bg-neutral-800/50 border border-neutral-700 hover:border-primary-500/50 hover:bg-primary-950/50 transition-all group"
                      >
                        <Icon className="w-5 h-5 text-neutral-400 group-hover:text-primary-400" />
                        <span className="font-medium text-white group-hover:text-primary-400">
                          {social.name}
                        </span>
                      </motion.a>
                    );
                  })}
                </div>
              </div>
            </MagicCard>

            {/* Quick Response Note */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="mt-8 p-6 rounded-2xl bg-gradient-to-br from-primary-950/50 to-accent-950/50 border border-primary-800"
            >
              <div className="flex items-start gap-4">
                <motion.div 
                  className="p-2 rounded-lg bg-primary-900/50"
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                >
                  <Send className="w-5 h-5 text-primary-400" />
                </motion.div>
                <div>
                  <h4 className="font-semibold text-white mb-1">
                    Quick Response
                  </h4>
                  <p className="text-sm text-neutral-400">
                    I typically respond within 24-48 hours. Looking forward to hearing from you!
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <MagicCard className="h-full cursor-pointer" gradientColor="#262626">
              <div className="p-8">
                <h3 className="text-xl font-bold text-white mb-6">
                  Send a Message
                </h3>
                <ContactForm />
              </div>
            </MagicCard>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
