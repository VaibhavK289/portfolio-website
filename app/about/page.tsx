'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Download, GraduationCap } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { SkillsSection } from '@/components/SkillsSection';
import { personalInfo } from '@/data/socials';
import { MagicCard } from '@/components/ui/magicui';

// export const metadata: Metadata = {
//   title: 'About',
//   description: 'Learn more about my journey as an aspiring full-stack developer, my skills, projects, and passion for building great software.',
// };

const experiences = [
  {
    title: 'Full-Stack Development',
    company: 'Personal Projects',
    period: '2023 - Present',
    description: 'Building and shipping production-ready applications. CuraSense (ML-powered disease prediction), EmoSync (real-time sentiment analysis), Nexora (e-commerce platform). Stack: React, Next.js, Node.js, PostgreSQL.',
  },
  {
    title: 'Open Source & Learning',
    company: 'GitHub',
    period: '2023 - Present',
    description: 'Contributing to open source, building in public, and continuously shipping. Focus areas: TypeScript, modern React patterns, performance optimization.',
  },
];

const education = [
  {
    degree: 'Bachelor of Technology in Computer Science',
    school: 'Vellore Institute of Technology (VIT)',
    period: '2021 - 2025',
    description: 'Focused on computer science fundamentals, data structures, algorithms, machine learning, and full-stack web development.',
  },
];

const interests = [
  { icon: '💻', label: 'Open Source' },
  { icon: '📚', label: 'Learning' },
  { icon: '🎮', label: 'Gaming' },
  { icon: '🎵', label: 'Music' },
  { icon: '✈️', label: 'Travel' },
  { icon: '☕', label: 'Coffee' },
];

export default function AboutPage() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen py-20 bg-gray-50 dark:bg-neutral-950"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h1 className="hero-heading text-4xl sm:text-5xl text-gray-900 dark:text-white mb-6">
              About <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary-400 to-accent-500">Me</span>
            </h1>
            <div className="prose prose-lg dark:prose-invert">
              <p className="text-gray-600 dark:text-neutral-400 body-text whitespace-pre-line">
                {personalInfo.longBio}
              </p>
            </div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-8 flex flex-wrap gap-4"
            >
              <Button href="/contact" variant="primary">
                Get In Touch
                <ArrowRight className="w-4 h-4" />
              </Button>
              <Button href={personalInfo.resumeUrl} variant="outline" external>
                <Download className="w-4 h-4" />
                Download Resume
              </Button>
            </motion.div>
          </motion.div>

          {/* Avatar/Visual */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex justify-center"
          >
            <div className="relative">
              {/* Geometric background accents */}
              <div className="absolute -inset-8 shape-hexagon bg-gradient-to-br from-primary-500/10 to-accent-500/10 blur-2xl" />
              
              {/* Main blob-shaped avatar container */}
              <motion.div 
                className="w-72 h-72 sm:w-80 sm:h-80 shape-blob-animated bg-gradient-to-r from-primary-500 to-accent-500 p-1.5"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <div className="w-full h-full shape-blob bg-white dark:bg-neutral-950 flex items-center justify-center">
                  <span className="text-7xl sm:text-8xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-400 to-accent-500">
                    {personalInfo.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
              </motion.div>
              
              {/* Floating geometric accents - varied shapes */}
              <motion.div 
                animate={{ y: [-10, 10, -10], rotate: [0, 5, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -top-6 -right-6 w-14 h-14 rounded-full bg-gradient-to-br from-primary-500 to-primary-600 shadow-xl shadow-primary-500/30" 
              />
              <motion.div 
                animate={{ y: [10, -10, 10], rotate: [0, -5, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                className="absolute -bottom-4 -left-4 w-12 h-12 shape-hexagon bg-gradient-to-br from-accent-500 to-purple-600 shadow-xl shadow-accent-500/30" 
              />
              <motion.div 
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                className="absolute top-1/2 -right-8 w-8 h-8 shape-diamond bg-gradient-to-br from-emerald-400 to-teal-500 shadow-lg" 
              />
            </div>
          </motion.div>
        </div>

        {/* Experience Section */}
        <section className="mb-20">
          <SectionHeading
            title="Experience"
            subtitle="My professional journey in software development"
          />

          <div className="space-y-6">
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative pl-8 pb-8 border-l-2 border-gray-200 dark:border-neutral-800 last:pb-0"
              >
                <div className="absolute left-0 top-0 -translate-x-1/2 w-4 h-4 rounded-full bg-primary-500 border-4 border-gray-50 dark:border-neutral-950" />
                <MagicCard className="cursor-pointer" gradientColor="#262626">
                  <div className="p-6">
                    <div className="flex flex-wrap items-start justify-between gap-4 mb-2">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                          {exp.title}
                        </h3>
                        <p className="text-primary-500 dark:text-primary-400 font-medium">{exp.company}</p>
                      </div>
                      <span className="px-3 py-1 bg-gray-100 dark:bg-neutral-800 text-gray-600 dark:text-neutral-400 text-sm rounded-full">
                        {exp.period}
                      </span>
                    </div>
                    <p className="text-gray-600 dark:text-neutral-400">{exp.description}</p>
                  </div>
                </MagicCard>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Education Section */}
        <section className="mb-20">
          <SectionHeading
            title="Education"
            subtitle="My academic background"
          />

          <div className="space-y-6">
            {education.map((edu, index) => (
              <div
                key={index}
                className="bg-white dark:bg-neutral-900 rounded-2xl border border-gray-200 dark:border-neutral-800 p-6 hover:border-primary-500/50 transition-colors shadow-sm"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-primary-100 dark:bg-primary-900/30 text-primary-500 dark:text-primary-400">
                    <GraduationCap className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-start justify-between gap-4 mb-2">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                          {edu.degree}
                        </h3>
                        <p className="text-primary-500 dark:text-primary-400 font-medium">{edu.school}</p>
                      </div>
                      <span className="px-3 py-1 bg-gray-100 dark:bg-neutral-800 text-gray-600 dark:text-neutral-400 text-sm rounded-full">
                        {edu.period}
                      </span>
                    </div>
                    <p className="text-gray-600 dark:text-neutral-400">{edu.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Skills Section */}
        <section className="mb-20">
          <SectionHeading
            title="Skills & Technologies"
            subtitle="The tools and technologies I work with"
          />
          <SkillsSection />
        </section>

        {/* Interests Section */}
        <section className="mb-20">
          <SectionHeading
            title="Interests & Hobbies"
            subtitle="What I enjoy outside of coding"
          />

          <div className="flex flex-wrap justify-center gap-4">
            {interests.map((interest, index) => (
              <div
                key={index}
                className="flex items-center gap-3 px-6 py-4 bg-white dark:bg-neutral-900 rounded-2xl border border-gray-200 dark:border-neutral-800 hover:border-primary-500/50 transition-colors shadow-sm"
              >
                <span className="text-2xl">{interest.icon}</span>
                <span className="font-medium text-gray-900 dark:text-white">
                  {interest.label}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center">
          <div className="bg-gradient-to-br from-primary-100 dark:from-primary-950/50 to-accent-100 dark:to-accent-950/50 rounded-3xl border border-primary-200 dark:border-primary-800 p-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Let&apos;s Build Something Amazing
            </h2>
            <p className="text-lg text-gray-600 dark:text-neutral-400 mb-8 max-w-2xl mx-auto">
              I&apos;m always excited to work on new projects and collaborate with creative minds.
              Feel free to reach out!
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button href="/contact" variant="primary" size="lg">
                Start a Conversation
                <ArrowRight className="w-5 h-5" />
              </Button>
              <Button href="/projects" variant="outline" size="lg">
                View My Work
              </Button>
            </div>
          </div>
        </section>
      </div>
    </motion.div>
  );
}
