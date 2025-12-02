'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  ArrowLeft, 
  Github, 
  Brain, 
  FileText, 
  Pill, 
  Image as ImageIcon,
  Activity,
  Shield,
  Clock,
  Play,
  ChevronRight,
  Code2,
  Layers,
  Sparkles
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { getProjectBySlug } from '@/data/projects';
import { CuraSensePreviewSection } from '@/components/CuraSensePreviewSection';
import {
  Spotlight,
  BackgroundBeams,
  SparklesCore,
  HoverBorderGradient,
} from '@/components/ui/aceternity';
import {
  ScrollReveal,
  TiltCard,
  ScrollProgress,
  cardContainerVariants,
  cardVariants,
  easings,
  badgeVariants,
} from '@/components/animations';

// Shared background component for CuraSense pages
export function CuraSenseBackground() {
  return (
    <>
      {/* Gradient Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          className="absolute top-20 right-20 w-96 h-96 bg-emerald-500/25 rounded-full blur-3xl"
          animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div 
          className="absolute bottom-20 left-20 w-80 h-80 bg-cyan-500/20 rounded-full blur-3xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        />
        <motion.div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-violet-500/10 rounded-full blur-3xl"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div 
          className="absolute top-40 left-1/3 w-72 h-72 bg-teal-500/15 rounded-full blur-3xl"
          animate={{ scale: [1, 1.15, 1], opacity: [0.2, 0.35, 0.2] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
        />
      </div>
      
      {/* Sparkles */}
      <div className="absolute inset-0 w-full h-full">
        <SparklesCore
          id="curasense-sparkles"
          background="transparent"
          minSize={0.4}
          maxSize={1.2}
          particleDensity={25}
          className="w-full h-full"
          particleColor="var(--color-sparkle)"
        />
      </div>
    </>
  );
}

// Page Navigation Component
function CuraSensePageNav({ currentPage }: { currentPage: 'overview' | 'technical' }) {
  return (
    <motion.div 
      className="sticky top-20 z-40 bg-white/80 dark:bg-[#0a0e17]/80 backdrop-blur-xl border-b border-gray-200 dark:border-emerald-900/30"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-4">
          {/* Project Title */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="font-bold text-gray-900 dark:text-white text-sm">CuraSense</h2>
              <p className="text-xs text-gray-500 dark:text-neutral-500">AI Healthcare Platform</p>
            </div>
          </div>
          
          {/* Page Tabs */}
          <div className="flex items-center gap-1 p-1 bg-gray-100 dark:bg-[#1a2438] rounded-xl">
            <Link
              href="/projects/curasense"
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                currentPage === 'overview'
                  ? 'bg-white dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 shadow-sm'
                  : 'text-gray-600 dark:text-neutral-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              Overview
            </Link>
            <Link
              href="/projects/curasense/technical"
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                currentPage === 'technical'
                  ? 'bg-white dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 shadow-sm'
                  : 'text-gray-600 dark:text-neutral-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              Technical
            </Link>
          </div>
          
          {/* Actions */}
          <div className="hidden sm:flex items-center gap-3">
            <Button href="https://curasense-frontend.vercel.app/" variant="outline" external className="text-sm">
              <Play className="w-4 h-4" />
              Live Demo
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// Hero Section
function HeroSection() {
  const project = getProjectBySlug('curasense');
  if (!project) return null;

  return (
    <section className="relative min-h-[85vh] flex items-center overflow-hidden bg-gradient-to-br from-gray-50 via-white to-emerald-50/20 dark:from-[#0a0e17] dark:via-[#0c1628] dark:to-[#0a1220]">
      {/* Spotlight Effect */}
      <div className="hidden dark:block">
        <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="#10b981" />
      </div>
      
      <CuraSenseBackground />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Back Link */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-gray-500 dark:text-neutral-400 hover:text-primary-500 dark:hover:text-cyan-400 mb-12 group transition-colors"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Projects
          </Link>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 0.8, ease: easings.dramatic }}
          >
            {/* Badge */}
            <motion.div
              variants={badgeVariants}
              initial="hidden"
              animate="visible"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-emerald-500/15 to-cyan-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-sm font-medium mb-6 backdrop-blur-sm"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              Featured Project • {project.year}
            </motion.div>

            {/* Title */}
            <motion.h1 
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 via-cyan-500 to-violet-500">
                CuraSense
              </span>
              <br />
              <span className="text-gray-900 dark:text-white">AI Healthcare</span>
            </motion.h1>

            {/* Description */}
            <motion.p
              className="text-xl text-gray-600 dark:text-neutral-400 mb-8 leading-relaxed"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              {project.description}
            </motion.p>

            {/* Action Buttons */}
            <motion.div 
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <HoverBorderGradient
                containerClassName="rounded-full"
                href={project.liveUrl}
                className="dark:bg-black bg-white text-black dark:text-white flex items-center gap-2 px-6 py-2"
              >
                <Play className="w-4 h-4" />
                <span>Try Live Demo</span>
              </HoverBorderGradient>
              
              <Button href={project.githubUrl} variant="outline" external>
                <Github className="w-4 h-4" />
                View Source
              </Button>
            </motion.div>

            {/* Quick Navigation */}
            <motion.div
              className="mt-12 pt-8 border-t border-gray-200 dark:border-emerald-900/30"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <p className="text-sm text-gray-500 dark:text-neutral-500 mb-4">Explore this project</p>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/projects/curasense/technical"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-100 dark:bg-[#1a2438] text-gray-700 dark:text-neutral-300 hover:bg-gray-200 dark:hover:bg-[#2d3f5f] transition-colors text-sm font-medium group"
                >
                  <Code2 className="w-4 h-4 text-emerald-500" />
                  Technical Deep-Dive
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>
          </motion.div>

          {/* Visual Element */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotateY: -10 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: easings.dramatic }}
            className="relative hidden lg:block"
          >
            {/* Floating Decorations */}
            <motion.div
              animate={{ y: [-10, 10, -10], rotate: [0, 5, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -top-8 -right-8 w-20 h-20 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-2xl shadow-emerald-500/30 z-20"
            >
              <Brain className="w-10 h-10 text-white" />
            </motion.div>
            
            <motion.div
              animate={{ y: [10, -10, 10], rotate: [0, -5, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
              className="absolute -bottom-6 -left-6 w-16 h-16 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-xl shadow-cyan-500/30 z-20"
            >
              <Activity className="w-8 h-8 text-white" />
            </motion.div>

            <motion.div
              animate={{ y: [-5, 15, -5], x: [0, 5, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
              className="absolute top-1/2 -right-4 w-14 h-14 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center shadow-lg shadow-violet-500/30 z-20 rotate-12"
            >
              <Shield className="w-7 h-7 text-white" />
            </motion.div>

            {/* Main Card */}
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-emerald-500/35 via-cyan-500/25 to-violet-500/30 rounded-3xl blur-2xl opacity-70" />
              <div className="relative rounded-2xl overflow-hidden border border-emerald-500/20 dark:border-emerald-900/50 bg-white/80 dark:bg-[#0c1628]/90 backdrop-blur-sm shadow-2xl">
                {project.image ? (
                  <div className="relative aspect-[4/3]">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover object-top"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                  </div>
                ) : (
                  <div className="aspect-[4/3] bg-gradient-to-br from-cyan-500/20 to-violet-500/20 flex items-center justify-center">
                    <span className="text-8xl font-bold text-primary-500/30">CS</span>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Background Beams */}
      <div className="hidden dark:block">
        <BackgroundBeams className="opacity-30" />
      </div>
    </section>
  );
}

// Features Section
function FeaturesSection() {
  const features = [
    {
      icon: FileText,
      title: 'Prescription Analysis',
      description: 'AI-powered PDF parsing and medical insight extraction from prescriptions and blood reports',
      gradient: 'from-cyan-500 to-blue-500',
      bgGradient: 'from-cyan-500/10 to-cyan-500/5',
      borderColor: 'border-cyan-500/20',
      iconBg: 'bg-gradient-to-br from-cyan-400 to-cyan-600',
    },
    {
      icon: ImageIcon,
      title: 'Medical Imaging',
      description: 'X-ray, CT, and MRI analysis with Gemini Vision for accurate diagnostics',
      gradient: 'from-emerald-500 to-teal-500',
      bgGradient: 'from-emerald-500/10 to-emerald-500/5',
      borderColor: 'border-emerald-500/20',
      iconBg: 'bg-gradient-to-br from-emerald-400 to-emerald-600',
    },
    {
      icon: Pill,
      title: 'Drug Comparison',
      description: 'Medication interactions, alternatives lookup, and comprehensive drug information',
      gradient: 'from-violet-500 to-purple-500',
      bgGradient: 'from-violet-500/10 to-violet-500/5',
      borderColor: 'border-violet-500/20',
      iconBg: 'bg-gradient-to-br from-violet-400 to-violet-600',
    },
  ];

  return (
    <section className="py-24 bg-gray-50 dark:bg-[#0a0e17] relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-white/50 dark:from-[#0c1628]/50 via-transparent to-transparent pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-gradient-radial from-emerald-500/8 via-cyan-500/5 to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <ScrollReveal>
          <div className="text-center mb-16">
            <motion.span 
              className="inline-block px-4 py-2 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 text-sm font-medium mb-4 border border-emerald-500/20"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
            >
              Core Features
            </motion.span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Powered by{' '}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 via-cyan-500 to-violet-500">
                Advanced AI
              </span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-neutral-400 max-w-2xl mx-auto">
              Three specialized AI models working together for comprehensive healthcare support
            </p>
          </div>
        </ScrollReveal>

        <motion.div 
          className="grid md:grid-cols-3 gap-6"
          variants={cardContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              variants={cardVariants}
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
              className="group"
            >
              <TiltCard className="h-full">
                <div className={`relative h-full p-8 rounded-3xl bg-gradient-to-br ${feature.bgGradient} border ${feature.borderColor} backdrop-blur-sm hover:border-opacity-50 transition-all duration-300`}>
                  <div className={`absolute -inset-0.5 rounded-3xl bg-gradient-to-r ${feature.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-xl`} />
                  
                  <div className="relative mb-6">
                    <div className={`w-16 h-16 rounded-2xl ${feature.iconBg} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <feature.icon className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  
                  <h3 className="relative text-xl font-bold text-gray-900 dark:text-white mb-3">
                    {feature.title}
                  </h3>
                  <p className="relative text-gray-600 dark:text-neutral-400 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// Stats Section
function StatsSection() {
  const stats = [
    { value: '10+', label: 'Reports Analyzed', icon: FileText, color: 'text-cyan-500' },
    { value: '98.5%', label: 'Accuracy Rate', icon: Activity, color: 'text-emerald-500' },
    { value: '<30s', label: 'Response Time', icon: Clock, color: 'text-violet-500' },
    { value: '3', label: 'AI Models', icon: Brain, color: 'text-amber-500' },
  ];

  return (
    <section className="py-16 bg-white dark:bg-[#0c1628]/60 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50 dark:from-neutral-950 via-transparent to-gray-50 dark:to-neutral-950 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          className="grid grid-cols-2 lg:grid-cols-4 gap-6"
          variants={cardContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {stats.map((stat) => (
            <motion.div key={stat.label} variants={cardVariants}>
              <TiltCard className="h-full">
                <div className="relative p-6 rounded-2xl bg-gray-50 dark:bg-neutral-900/80 border border-gray-200 dark:border-neutral-800 text-center backdrop-blur-sm hover:border-primary-500/50 transition-all duration-300 h-full">
                  <div className="flex justify-center mb-4">
                    <div className="w-12 h-12 rounded-xl bg-gray-100 dark:bg-neutral-800 flex items-center justify-center">
                      <stat.icon className={`w-6 h-6 ${stat.color}`} />
                    </div>
                  </div>
                  <div className={`text-3xl sm:text-4xl font-bold ${stat.color} mb-2`}>
                    {stat.value}
                  </div>
                  <div className="text-sm font-medium text-gray-500 dark:text-neutral-500">
                    {stat.label}
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// Interactive Preview Section
function PreviewSection() {
  return (
    <section className="py-24 bg-gray-50 dark:bg-[#0a0e17] relative overflow-hidden">
      <CuraSenseBackground />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <ScrollReveal>
          <div className="text-center mb-12">
            <motion.span className="inline-block px-4 py-2 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-sm font-medium mb-4">
              Interactive Demo
            </motion.span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Experience{' '}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-500 to-cyan-500">
                CuraSense
              </span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-neutral-400 max-w-2xl mx-auto">
              Click on the preview below to explore the platform in an interactive window
            </p>
          </div>
        </ScrollReveal>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <CuraSensePreviewSection />
        </motion.div>
      </div>
    </section>
  );
}

// CTA Section
function CTASection() {
  return (
    <section className="py-24 bg-white dark:bg-[#0c1628]/70 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50 dark:from-[#0a0e17] via-transparent to-gray-50 dark:to-[#0a0e17] pointer-events-none" />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          className="text-center p-12 rounded-3xl bg-gradient-to-br from-emerald-500/10 via-cyan-500/5 to-violet-500/10 border border-emerald-500/20 backdrop-blur-sm"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center mx-auto mb-6"
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          >
            <Layers className="w-8 h-8 text-white" />
          </motion.div>
          
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Explore the Technical Architecture
          </h2>
          <p className="text-gray-600 dark:text-neutral-400 mb-8 max-w-xl mx-auto">
            Dive deep into the system design, multi-agent workflows, and implementation details behind CuraSense.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/projects/curasense/technical"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-medium hover:opacity-90 transition-opacity"
            >
              <Code2 className="w-5 h-5" />
              View Technical Details
              <ChevronRight className="w-5 h-5" />
            </Link>
            <HoverBorderGradient
              containerClassName="rounded-full"
              href="/contact"
              className="dark:bg-black bg-white text-black dark:text-white flex items-center gap-2 px-6 py-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>Start a Project</span>
            </HoverBorderGradient>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// Main Page Component
export default function CuraSenseOverviewPage() {
  return (
    <div className="relative">
      <ScrollProgress />
      <HeroSection />
      <CuraSensePageNav currentPage="overview" />
      <FeaturesSection />
      <StatsSection />
      <PreviewSection />
      <CTASection />
    </div>
  );
}
