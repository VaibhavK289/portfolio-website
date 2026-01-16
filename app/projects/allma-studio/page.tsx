'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import { useRef } from 'react';
import { 
  ArrowLeft, 
  Github, 
  Brain, 
  FileText, 
  Lock,
  Shield,
  ChevronRight,
  Code2,
  Layers,
  Sparkles,
  Cpu,
  Database,
  Globe,
  Server,
  MessageSquare,
  Wifi,
  WifiOff,
  HardDrive,
  Workflow,
  Eye,
  Zap,
  Play,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { getProjectBySlug } from '@/data/projects';
import { AllmaPreviewSection } from '@/components/AllmaPreviewSection';
import {
  Spotlight,
  BackgroundBeams,
  SparklesCore,
  HoverBorderGradient,
} from '@/components/ui/aceternity';
import {
  ScrollReveal,
  ScrollProgress,
  cardContainerVariants,
  cardVariants,
  NeuralNode,
  DataFlowLine,
  PrivacyShield,
  LocalLLMPulse,
  DocumentVector,
  aiCardContainerVariants,
  aiCardVariants,
  aiBadgeVariants,
  aiEasings,
} from '@/components/animations';
import { useLowPerformance } from '@/lib/utils';

// Shared Background Component - exported for use in other Allma pages
export function AllmaBackground() {
  const isLowPerf = useLowPerformance();
  
  if (isLowPerf) {
    return (
      <>
        {/* Static gradient orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 right-20 w-96 h-96 bg-violet-600/15 rounded-full blur-3xl" />
          <div className="absolute bottom-20 left-20 w-80 h-80 bg-indigo-600/15 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-cyan-500/8 rounded-full blur-3xl" />
        </div>
        {/* Static grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(139,92,246,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(139,92,246,0.02)_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none" />
      </>
    );
  }
  
  return (
    <>
      {/* Animated gradient orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          className="absolute top-20 right-20 w-96 h-96 bg-violet-600/20 rounded-full blur-3xl"
          animate={{ scale: [1, 1.1, 1], opacity: [0.15, 0.3, 0.15] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div 
          className="absolute bottom-20 left-20 w-80 h-80 bg-indigo-600/20 rounded-full blur-3xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.25, 0.1] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        />
        <motion.div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-cyan-500/10 rounded-full blur-3xl"
          animate={{ scale: [1, 1.15, 1], opacity: [0.08, 0.15, 0.08] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
        />
      </div>
      
      {/* Neural grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(139,92,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(139,92,246,0.03)_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none" />
      
      {/* Floating neural nodes - desktop only */}
      <div className="hidden lg:block">
        <div className="absolute top-32 left-20 opacity-25">
          <NeuralNode size={14} color="#8b5cf6" delay={0} />
        </div>
        <div className="absolute top-48 right-40 opacity-20">
          <NeuralNode size={10} color="#6366f1" delay={0.8} />
        </div>
        <div className="absolute bottom-40 left-32 opacity-25">
          <NeuralNode size={12} color="#a78bfa" delay={1.5} />
        </div>
        <div className="absolute top-1/3 left-1/4 opacity-15">
          <NeuralNode size={8} color="#818cf8" delay={2} />
        </div>
      </div>
      
      {/* Subtle background beams */}
      <BackgroundBeams className="opacity-20" />
    </>
  );
}

// Page Navigation Component - Violet/Indigo Theme
export function AllmaPageNav({ currentPage }: { currentPage: 'overview' | 'technical' | 'docs' | 'deep-dive' }) {
  return (
    <motion.div 
      className="sticky top-16 sm:top-20 z-40 bg-[#08080c]/80 backdrop-blur-xl border-b border-violet-900/30"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        {/* Desktop Layout */}
        <div className="hidden sm:flex items-center justify-between py-4">
          {/* Project Title with Brain Icon */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center relative">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="font-bold text-white text-sm">Allma Studio</h2>
              <p className="text-xs text-neutral-500">AI Chat Platform</p>
            </div>
          </div>
          
          {/* Page Tabs - Desktop */}
          <div className="flex items-center gap-1 p-1 bg-[#1a1a2e] rounded-xl">
            <Link
              href="/projects/allma-studio"
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                currentPage === 'overview'
                  ? 'bg-violet-500/20 text-violet-400 shadow-sm'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              Overview
            </Link>
            <Link
              href="/projects/allma-studio/technical"
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                currentPage === 'technical'
                  ? 'bg-violet-500/20 text-violet-400 shadow-sm'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              Technical
            </Link>
            <Link
              href="/projects/allma-studio/docs"
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                currentPage === 'docs'
                  ? 'bg-violet-500/20 text-violet-400 shadow-sm'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              Docs
            </Link>
            <Link
              href="/projects/allma-studio/deep-dive"
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                currentPage === 'deep-dive'
                  ? 'bg-violet-500/20 text-violet-400 shadow-sm'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              Deep-Dive
            </Link>
          </div>
          
          {/* Actions - Desktop */}
          <div className="flex items-center gap-3">
            <a
              href="https://allma-studio.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-lg border border-violet-500/50 text-violet-400 hover:bg-violet-500/10 transition-colors text-sm font-medium"
            >
              <Play className="w-4 h-4" />
              Live Demo
            </a>
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="sm:hidden">
          {/* Top row: Logo + Live Demo button */}
          <div className="flex items-center justify-between py-2.5">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center">
                <Brain className="w-4 h-4 text-white" />
              </div>
              <div>
                <h2 className="font-bold text-white text-xs">Allma Studio</h2>
                <p className="text-[10px] text-neutral-500">AI Platform</p>
              </div>
            </div>
            <a
              href="https://allma-studio.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-violet-600 to-indigo-600 text-white text-xs font-medium shadow-lg shadow-violet-500/25"
            >
              <Play className="w-3 h-3" />
              Demo
            </a>
          </div>
          
          {/* Bottom row: Scrollable tabs */}
          <div className="flex items-center gap-1 pb-2.5 overflow-x-auto scrollbar-hide -mx-3 px-3">
            <Link
              href="/projects/allma-studio"
              className={`flex-shrink-0 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-300 ${
                currentPage === 'overview'
                  ? 'bg-violet-500/20 text-violet-400 border border-violet-500/30'
                  : 'bg-[#1a1a2e] text-neutral-400'
              }`}
            >
              Overview
            </Link>
            <Link
              href="/projects/allma-studio/technical"
              className={`flex-shrink-0 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-300 ${
                currentPage === 'technical'
                  ? 'bg-violet-500/20 text-violet-400 border border-violet-500/30'
                  : 'bg-[#1a1a2e] text-neutral-400'
              }`}
            >
              Technical
            </Link>
            <Link
              href="/projects/allma-studio/docs"
              className={`flex-shrink-0 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-300 ${
                currentPage === 'docs'
                  ? 'bg-violet-500/20 text-violet-400 border border-violet-500/30'
                  : 'bg-[#1a1a2e] text-neutral-400'
              }`}
            >
              Docs
            </Link>
            <Link
              href="/projects/allma-studio/deep-dive"
              className={`flex-shrink-0 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-300 ${
                currentPage === 'deep-dive'
                  ? 'bg-violet-500/20 text-violet-400 border border-violet-500/30'
                  : 'bg-[#1a1a2e] text-neutral-400'
              }`}
            >
              Deep-Dive
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function AllmaStudioPage() {
  const project = getProjectBySlug('allma-studio');
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-neutral-950">
        <p className="text-gray-600 dark:text-neutral-400">Project not found</p>
      </div>
    );
  }

  const features = [
    {
      icon: Lock,
      title: 'Privacy First',
      description: 'All processing happens locally. Your data never leaves your machine.',
      gradient: 'from-emerald-500 to-teal-500',
    },
    {
      icon: Brain,
      title: 'Multiple LLMs',
      description: 'Switch between DeepSeek, Gemma, Qwen, and LLaMA based on your needs.',
      gradient: 'from-violet-500 to-purple-500',
    },
    {
      icon: FileText,
      title: 'RAG Pipeline',
      description: 'Upload documents and get AI responses grounded in your knowledge base.',
      gradient: 'from-cyan-500 to-blue-500',
    },
    {
      icon: Globe,
      title: 'Works Offline',
      description: 'No internet connection required. Perfect for secure environments.',
      gradient: 'from-amber-500 to-orange-500',
    },
    {
      icon: Zap,
      title: 'Free Forever',
      description: 'No subscriptions, no pay-per-token. Your hardware, your rules.',
      gradient: 'from-pink-500 to-rose-500',
    },
    {
      icon: Database,
      title: 'Vector Search',
      description: 'ChromaDB-powered semantic search for intelligent document retrieval.',
      gradient: 'from-indigo-500 to-violet-500',
    },
  ];

  const techStack = [
    { category: 'Frontend', items: ['React 18', 'Vite', 'TailwindCSS', 'Axios'] },
    { category: 'Backend', items: ['Python 3.11+', 'FastAPI', 'SQLAlchemy', 'ChromaDB'] },
    { category: 'AI/ML', items: ['Ollama', 'Nomic Embed', 'DeepSeek', 'Gemma 2'] },
    { category: 'Infrastructure', items: ['Docker', 'Kubernetes', 'Helm', 'GitHub Actions'] },
  ];

  const comparison = [
    { aspect: 'Data Storage', cloud: 'Cloud servers', local: 'Your machine' },
    { aspect: 'Cost', cloud: 'Pay per token', local: 'Free forever' },
    { aspect: 'Internet', cloud: 'Required', local: 'Not needed' },
    { aspect: 'Privacy', cloud: 'Concerns', local: '100% private' },
    { aspect: 'Response Quality', cloud: 'Generic', local: 'RAG-enhanced' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#08080c] via-[#0a0a12] to-[#0c0c14] text-white overflow-x-hidden">
      {/* Scroll Progress */}
      <ScrollProgress />

      {/* Fixed Background */}
      <div className="fixed inset-0 pointer-events-none">
        <AllmaBackground />
      </div>

      {/* Page Navigation */}
      <AllmaPageNav currentPage="overview" />

      {/* Hero Section */}
      <motion.section 
        ref={heroRef}
        className="relative min-h-[85vh] flex items-center justify-center px-4 sm:px-6 py-20 sm:py-24"
        style={{ opacity: heroOpacity, scale: heroScale }}
      >
        <Spotlight className="absolute -top-40 left-0 md:left-60" fill="#8b5cf6" />
        
        <div className="max-w-6xl mx-auto text-center relative z-10">
          {/* Back Button */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute -top-8 sm:top-0 left-0"
          >
            <Link href="/projects" className="group inline-flex items-center gap-2 text-neutral-400 hover:text-violet-400 transition-colors text-sm">
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span>Back to Projects</span>
            </Link>
          </motion.div>

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex justify-center mb-6 sm:mb-8"
          >
            <HoverBorderGradient
              containerClassName="rounded-full"
              className="flex items-center gap-2 px-4 py-2 bg-[#0a0a12]"
            >
              <Lock className="w-4 h-4 text-emerald-400" />
              <span className="text-sm font-medium text-neutral-300">Privacy-First AI Platform</span>
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            </HoverBorderGradient>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6"
          >
            <span className="block mb-2">Allma</span>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-violet-400 via-indigo-500 to-cyan-400">
              Studio
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg sm:text-xl md:text-2xl text-neutral-300 max-w-3xl mx-auto mb-8"
          >
            Your intelligent AI assistant powered by local LLMs and RAG.
            <span className="block text-base sm:text-lg text-neutral-500 mt-2">
              Complete privacy. Zero cloud dependency. Free forever.
            </span>
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <a
              href="https://allma-studio.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="group w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-violet-600 via-indigo-600 to-cyan-600 text-white font-medium flex items-center justify-center gap-2 shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40 hover:scale-105 transition-all"
            >
              <Brain className="w-5 h-5" />
              Try Live Demo
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
            
            <a
              href="https://github.com/VaibhavK289/Allma"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-neutral-800/80 hover:bg-neutral-700/80 text-white font-medium flex items-center justify-center gap-2 border border-neutral-700 hover:border-neutral-600 transition-all"
            >
              <Github className="w-5 h-5" />
              View Source
            </a>
          </motion.div>

          {/* Hero Visual */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-12 sm:mt-16 relative"
          >
            <div className="relative mx-auto max-w-4xl">
              {/* Privacy Shield Decoration */}
              <div className="absolute -left-8 sm:-left-16 top-1/2 -translate-y-1/2 hidden md:block">
                <PrivacyShield size={60} color="#10b981" />
              </div>
              
              {/* Local LLM Decoration */}
              <div className="absolute -right-8 sm:-right-16 top-1/2 -translate-y-1/2 hidden md:block">
                <LocalLLMPulse size={60} color="#8b5cf6" />
              </div>

              {/* Stats Bar */}
              <div className="flex flex-wrap justify-center gap-4 sm:gap-8">
                {[
                  { icon: WifiOff, label: 'Offline Ready', value: '100%' },
                  { icon: Brain, label: 'Local Models', value: '5+' },
                  { icon: Shield, label: 'Data Privacy', value: '100%' },
                  { icon: HardDrive, label: 'Cloud Cost', value: '$0' },
                ].map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + i * 0.1 }}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl bg-neutral-900/60 border border-neutral-800 backdrop-blur-sm"
                  >
                    <stat.icon className="w-5 h-5 text-violet-400" />
                    <div className="text-left">
                      <div className="text-lg font-bold text-white">{stat.value}</div>
                      <div className="text-xs text-neutral-500">{stat.label}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              className="flex flex-col items-center gap-2"
            >
              <span className="text-xs text-neutral-500">Scroll to explore</span>
              <div className="w-6 h-10 rounded-full border-2 border-neutral-700 flex justify-center pt-2">
                <motion.div
                  animate={{ y: [0, 12, 0], opacity: [1, 0.3, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  className="w-1.5 h-1.5 rounded-full bg-violet-500"
                />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Preview Section */}
      <AllmaPreviewSection />

      {/* Why Local AI Section */}
      <section className="relative py-16 sm:py-24 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-12">
              <motion.div
                variants={aiBadgeVariants}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-500/10 border border-violet-500/20 mb-6"
              >
                <Shield className="w-4 h-4 text-violet-400" />
                <span className="text-sm font-medium text-violet-300">Why Local AI?</span>
              </motion.div>
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                Cloud vs{' '}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-violet-400 to-cyan-400">
                  Local
                </span>
              </h2>
              <p className="text-neutral-400 max-w-2xl mx-auto">
                See why running AI locally puts you in complete control
              </p>
            </div>
          </ScrollReveal>

          {/* Comparison Table */}
          <ScrollReveal>
            <div className="rounded-2xl overflow-hidden border border-neutral-800 bg-neutral-900/50 backdrop-blur-sm">
              <div className="grid grid-cols-3 bg-neutral-800/50">
                <div className="p-4 text-center text-sm font-medium text-neutral-400">Aspect</div>
                <div className="p-4 text-center text-sm font-medium text-red-400 flex items-center justify-center gap-2">
                  <Wifi className="w-4 h-4" />
                  Cloud AI
                </div>
                <div className="p-4 text-center text-sm font-medium text-emerald-400 flex items-center justify-center gap-2">
                  <HardDrive className="w-4 h-4" />
                  Local AI
                </div>
              </div>
              {comparison.map((row, i) => (
                <motion.div
                  key={row.aspect}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="grid grid-cols-3 border-t border-neutral-800"
                >
                  <div className="p-4 text-sm text-neutral-300">{row.aspect}</div>
                  <div className="p-4 text-center text-sm text-neutral-500">{row.cloud}</div>
                  <div className="p-4 text-center text-sm text-emerald-400 font-medium">{row.local}</div>
                </motion.div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Features Grid */}
      <section className="relative py-16 sm:py-24 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-12">
              <motion.div
                variants={aiBadgeVariants}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-500/10 border border-violet-500/20 mb-6"
              >
                <Sparkles className="w-4 h-4 text-violet-400" />
                <span className="text-sm font-medium text-violet-300">Key Features</span>
              </motion.div>
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                Everything You Need for{' '}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-violet-400 to-cyan-400">
                  Private AI
                </span>
              </h2>
            </div>
          </ScrollReveal>

          <motion.div
            variants={aiCardContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
          >
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                variants={aiCardVariants}
                className="group relative p-6 rounded-2xl bg-neutral-900/60 border border-neutral-800 hover:border-violet-500/30 transition-all duration-300 backdrop-blur-sm"
              >
                {/* Icon */}
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.gradient} p-0.5 mb-4`}>
                  <div className="w-full h-full rounded-xl bg-neutral-900 flex items-center justify-center">
                    <feature.icon className="w-5 h-5 text-white" />
                  </div>
                </div>
                
                <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-sm text-neutral-400">{feature.description}</p>
                
                {/* Hover glow */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-violet-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Architecture Section */}
      <section className="relative py-16 sm:py-24 px-4 sm:px-6 bg-gradient-to-b from-transparent via-violet-950/10 to-transparent">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-12">
              <motion.div
                variants={aiBadgeVariants}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 mb-6"
              >
                <Workflow className="w-4 h-4 text-cyan-400" />
                <span className="text-sm font-medium text-cyan-300">Architecture</span>
              </motion.div>
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                How It{' '}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-violet-400">
                  Works
                </span>
              </h2>
            </div>
          </ScrollReveal>

          {/* RAG Pipeline Visualization */}
          <ScrollReveal>
            <div className="p-6 sm:p-8 rounded-2xl bg-neutral-900/60 border border-neutral-800 backdrop-blur-sm mb-8">
              <h3 className="text-lg font-semibold text-white mb-6 text-center">RAG Pipeline</h3>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-2">
                {[
                  { icon: FileText, label: 'Upload Docs' },
                  { icon: Layers, label: 'Chunking' },
                  { icon: Database, label: 'Vector Store' },
                  { icon: MessageSquare, label: 'Query' },
                  { icon: Brain, label: 'LLM + Context' },
                  { icon: Eye, label: 'Response' },
                ].map((step, i) => (
                  <div key={step.label} className="flex items-center gap-2">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className="flex flex-col items-center"
                    >
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500/20 to-cyan-500/20 border border-violet-500/30 flex items-center justify-center mb-2">
                        <step.icon className="w-5 h-5 text-violet-400" />
                      </div>
                      <span className="text-xs text-neutral-400">{step.label}</span>
                    </motion.div>
                    {i < 5 && (
                      <div className="hidden sm:block">
                        <DataFlowLine width={40} color="#8b5cf6" delay={i * 0.2} />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* Tech Stack */}
          <motion.div
            variants={aiCardContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
          >
            {techStack.map((stack) => (
              <motion.div
                key={stack.category}
                variants={aiCardVariants}
                className="p-4 rounded-xl bg-neutral-900/60 border border-neutral-800"
              >
                <h4 className="text-sm font-medium text-violet-400 mb-3">{stack.category}</h4>
                <div className="flex flex-wrap gap-2">
                  {stack.items.map((item) => (
                    <span
                      key={item}
                      className="px-2 py-1 text-xs rounded-md bg-neutral-800 text-neutral-300"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-16 sm:py-24 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <ScrollReveal>
            <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-violet-900/30 via-indigo-900/30 to-cyan-900/30 border border-violet-500/20 backdrop-blur-sm relative overflow-hidden">
              {/* Background decoration */}
              <div className="absolute top-4 left-4 opacity-30">
                <NeuralNode size={20} color="#8b5cf6" delay={0} />
              </div>
              <div className="absolute bottom-4 right-4 opacity-30">
                <NeuralNode size={16} color="#06b6d4" delay={0.5} />
              </div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
                  Ready to Take Control of Your{' '}
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-violet-400 to-cyan-400">
                    AI Experience
                  </span>
                  ?
                </h2>
                <p className="text-neutral-400 mb-8 max-w-2xl mx-auto">
                  Experience the power of local AI with complete privacy. No signup required.
                </p>
                
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <a
                    href="https://allma-studio.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-violet-600 via-indigo-600 to-cyan-600 text-white font-medium flex items-center justify-center gap-2 shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40 hover:scale-105 transition-all"
                  >
                    <Brain className="w-5 h-5" />
                    Launch Demo
                    <ChevronRight className="w-4 h-4" />
                  </a>
                  
                  <a
                    href="https://github.com/VaibhavK289/Allma"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto px-8 py-4 rounded-xl bg-neutral-800/80 hover:bg-neutral-700/80 text-white font-medium flex items-center justify-center gap-2 border border-neutral-700 transition-all"
                  >
                    <Github className="w-5 h-5" />
                    Star on GitHub
                  </a>
                </div>
              </motion.div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Footer Navigation */}
      <section className="relative py-8 px-4 sm:px-6 border-t border-neutral-800">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link
            href="/projects"
            className="group inline-flex items-center gap-2 text-neutral-400 hover:text-violet-400 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Projects
          </Link>
          
          <div className="flex items-center gap-4">
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-neutral-400 hover:text-violet-400 transition-colors"
            >
              Live Demo
            </a>
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-neutral-400 hover:text-violet-400 transition-colors"
            >
              GitHub
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
