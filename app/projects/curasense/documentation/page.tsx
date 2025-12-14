'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  ArrowLeft,
  BookOpen,
  Shield,
  Sparkles,
  Rocket,
  Star,
  GitBranch,
  FolderTree,
  Download,
  Terminal,
  Settings,
  Key,
  Play,
  Monitor,
  Layers,
  Database,
  Brain,
  Cpu,
  Camera,
  FileText,
  Github,
  ExternalLink,
  Check,
  Copy,
  ChevronRight,
  Zap,
  Code2,
  Layout,
  Palette,
  Box,
  Server,
  MessageSquare,
  History,
  Moon,
  Smartphone,
  BarChart3,
  Search,
  Pill,
  Eye,
  Workflow,
  Lock,
  Clock
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import {
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
} from '@/components/animations';
import { useState } from 'react';

import { useLowPerformance } from '@/lib/utils';
// Shared background component - Mobile Optimized
function DocumentationBackground() {
  const isLowPerf = useLowPerformance();
  if (isLowPerf) {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-20 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-40 left-10 w-80 h-80 bg-cyan-500/15 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-violet-500/10 rounded-full blur-3xl" />
      </div>
    );
  }
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <motion.div 
        className="absolute top-20 right-20 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl"
        animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div 
        className="absolute bottom-40 left-10 w-80 h-80 bg-cyan-500/15 rounded-full blur-3xl"
        animate={{ scale: [1, 1.15, 1], opacity: [0.15, 0.3, 0.15] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
      />
      <motion.div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-violet-500/10 rounded-full blur-3xl"
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      />
      <div className="absolute inset-0 w-full h-full hidden md:block">
        <SparklesCore
          id="documentation-sparkles"
          background="transparent"
          minSize={0.3}
          maxSize={1}
          particleDensity={8}
          className="w-full h-full"
          particleColor="#10b981"
        />
      </div>
    </div>
  );
}

// Page Navigation Component - Mobile Optimized
function DocumentationPageNav() {
  return (
    <motion.div 
      className="sticky top-16 sm:top-20 z-40 bg-white/80 dark:bg-[#0a0e17]/80 backdrop-blur-xl border-b border-gray-200 dark:border-emerald-900/30"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        {/* Desktop Layout */}
        <div className="hidden sm:flex items-center justify-between py-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center"><Shield className="w-5 h-5 text-white" /></div>
            <div><h2 className="font-bold text-gray-900 dark:text-white text-sm">CuraSense</h2><p className="text-xs text-gray-500 dark:text-neutral-500">Documentation</p></div>
          </div>
          <div className="flex items-center gap-1 p-1 bg-gray-100 dark:bg-[#1a2438] rounded-xl">
            <Link href="/projects/curasense" className="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 text-gray-600 dark:text-neutral-400 hover:text-gray-900 dark:hover:text-white">Overview</Link>
            <Link href="/projects/curasense/technical" className="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 text-gray-600 dark:text-neutral-400 hover:text-gray-900 dark:hover:text-white">Technical</Link>
            <Link href="/projects/curasense/documentation" className="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 bg-white dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 shadow-sm">Docs</Link>
            <Link href="/projects/curasense/deep-dive" className="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 text-gray-600 dark:text-neutral-400 hover:text-gray-900 dark:hover:text-white">Deep-Dive</Link>
          </div>
          <div className="flex items-center gap-3"><Button href="https://github.com/VaibhavK289/curasense-diagnosis" variant="outline" external className="text-sm"><Github className="w-4 h-4" />Source</Button></div>
        </div>
        {/* Mobile Layout */}
        <div className="sm:hidden">
          <div className="flex items-center justify-between py-2.5">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center"><Shield className="w-4 h-4 text-white" /></div>
              <div><h2 className="font-bold text-gray-900 dark:text-white text-xs">CuraSense</h2><p className="text-[10px] text-gray-500 dark:text-neutral-500">Documentation</p></div>
            </div>
            <a href="https://github.com/VaibhavK289/curasense-diagnosis" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-xs font-medium shadow-lg shadow-emerald-500/25"><Github className="w-3 h-3" />Source</a>
          </div>
          <div className="flex items-center gap-1 pb-2.5 overflow-x-auto scrollbar-hide -mx-3 px-3">
            <Link href="/projects/curasense" className="flex-shrink-0 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-300 bg-gray-100 dark:bg-[#1a2438] text-gray-600 dark:text-neutral-400">Overview</Link>
            <Link href="/projects/curasense/technical" className="flex-shrink-0 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-300 bg-gray-100 dark:bg-[#1a2438] text-gray-600 dark:text-neutral-400">Technical</Link>
            <Link href="/projects/curasense/documentation" className="flex-shrink-0 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-300 bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30">Docs</Link>
            <Link href="/projects/curasense/deep-dive" className="flex-shrink-0 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-300 bg-gray-100 dark:bg-[#1a2438] text-gray-600 dark:text-neutral-400">Deep-Dive</Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// Code Block Component
function CodeBlock({ code, language = 'bash', title }: { code: string; language?: string; title?: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group">
      <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500/20 via-cyan-500/20 to-violet-500/20 rounded-2xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity" />
      <div className="relative bg-gray-900 dark:bg-[#0c1628] rounded-xl border border-gray-800 dark:border-[#2d3f5f] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 bg-gray-800 dark:bg-[#0a0e17] border-b border-gray-700 dark:border-[#2d3f5f]">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
            </div>
            {title && <span className="text-xs text-gray-400 font-mono">{title}</span>}
          </div>
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-gray-700/50 hover:bg-gray-600/50 text-gray-400 hover:text-white text-xs transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            {copied ? 'Copied!' : 'Copy'}
          </button>
        </div>
        {/* Code */}
        <pre className="p-4 overflow-x-auto">
          <code className="text-sm text-gray-300 font-mono">{code}</code>
        </pre>
      </div>
    </div>
  );
}

// Hero Section
function DocumentationHero() {
  return (
    <section className="relative py-24 overflow-hidden bg-gradient-to-br from-gray-50 via-white to-emerald-50/20 dark:from-[#0a0e17] dark:via-[#0c1628] dark:to-[#0a1220]">
      <DocumentationBackground />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link
            href="/projects/curasense"
            className="inline-flex items-center gap-2 text-gray-500 dark:text-neutral-400 hover:text-primary-500 dark:hover:text-cyan-400 mb-8 group transition-colors"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Overview
          </Link>
        </motion.div>
        
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: easings.smooth }}
          >
            <motion.span 
              className="inline-block px-4 py-2 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 text-sm font-medium mb-6 border border-emerald-500/20"
            >
              <BookOpen className="w-4 h-4 inline mr-2" />
              Full Documentation
            </motion.span>
            
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
              Getting{' '}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 via-cyan-500 to-violet-500">
                Started
              </span>
            </h1>
            
            <p className="text-xl text-gray-600 dark:text-neutral-400 mb-8 leading-relaxed">
              Complete setup guide, installation instructions, and configuration documentation for CuraSense - your AI-powered medical diagnosis system.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Button href="https://github.com/VaibhavK289/curasense-diagnosis" variant="primary" external>
                <Github className="w-4 h-4" />
                Clone Repository
              </Button>
              <Button href="https://curasense-frontend.vercel.app/" variant="outline" external>
                <ExternalLink className="w-4 h-4" />
                Live Demo
              </Button>
            </div>
          </motion.div>
          
          {/* Quick Links */}
          <motion.div
            className="grid grid-cols-2 gap-4"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {[
              { icon: Download, label: 'Installation', href: '#installation', color: 'text-cyan-500' },
              { icon: Settings, label: 'Configuration', href: '#configuration', color: 'text-violet-500' },
              { icon: FolderTree, label: 'Project Structure', href: '#structure', color: 'text-emerald-500' },
              { icon: Rocket, label: 'Running', href: '#running', color: 'text-amber-500' },
            ].map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="p-4 rounded-2xl bg-white/80 dark:bg-[#1a2438]/80 border border-gray-200 dark:border-[#2d3f5f] backdrop-blur-sm hover:border-emerald-500/30 transition-all duration-300 group"
              >
                <item.icon className={`w-6 h-6 ${item.color} mb-2 group-hover:scale-110 transition-transform`} />
                <p className="font-semibold text-gray-900 dark:text-white">{item.label}</p>
              </a>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// What's New Section
function WhatsNewSection() {
  const features = [
    { icon: Layout, title: 'Next.js 16 Frontend', description: 'Complete redesign with React 19 and TypeScript', color: 'text-cyan-500' },
    { icon: Sparkles, title: 'Framer Motion', description: 'Smooth, professional animations throughout', color: 'text-violet-500' },
    { icon: Palette, title: 'Modern UI/UX', description: 'Radix UI components with Tailwind CSS 4', color: 'text-emerald-500' },
    { icon: Smartphone, title: 'Fully Responsive', description: 'Works seamlessly on desktop, tablet, and mobile', color: 'text-amber-500' },
    { icon: Moon, title: 'Dark/Light Mode', description: 'Theme switching with next-themes', color: 'text-pink-500' },
    { icon: History, title: 'Report History', description: 'Track and manage all your past diagnoses', color: 'text-blue-500' },
    { icon: MessageSquare, title: 'AI Chat Assistant', description: 'Interactive chat for follow-up questions', color: 'text-purple-500' },
    { icon: Box, title: 'State Management', description: 'Zustand for efficient client-state management', color: 'text-teal-500' },
  ];

  return (
    <section className="py-24 bg-gray-50 dark:bg-[#0a0e17] relative overflow-hidden">
      <DocumentationBackground />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <ScrollReveal>
          <div className="text-center mb-16">
            <motion.span className="inline-block px-4 py-2 rounded-full bg-violet-500/15 text-violet-600 dark:text-violet-400 text-sm font-medium mb-4 border border-violet-500/20">
              <Star className="w-4 h-4 inline mr-2" />
              What's New
            </motion.span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Latest{' '}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-violet-400 via-purple-500 to-pink-500">
                Updates
              </span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-neutral-400 max-w-2xl mx-auto">
              Discover all the new features and improvements in the latest version
            </p>
          </div>
        </ScrollReveal>

        <motion.div 
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={cardContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {features.map((feature) => (
            <motion.div key={feature.title} variants={cardVariants} whileHover={{ y: -8 }}>
              <div className="h-full p-6 rounded-2xl bg-white dark:bg-[#1a2438]/80 border border-gray-200 dark:border-[#2d3f5f] backdrop-blur-sm hover:border-emerald-500/30 transition-all duration-300">
                <feature.icon className={`w-8 h-8 ${feature.color} mb-4`} />
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-600 dark:text-neutral-400">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// Core Features Section
function CoreFeaturesSection() {
  const features = [
    {
      icon: Brain,
      title: 'Multi-Agent AI Workflows',
      description: 'Orchestrated diagnosis using CrewAI and LangGraph for comprehensive analysis',
      color: 'from-emerald-500 to-teal-500',
    },
    {
      icon: FileText,
      title: 'Prescription Analysis',
      description: 'Upload and analyze medical prescriptions and blood test reports with AI',
      color: 'from-cyan-500 to-blue-500',
    },
    {
      icon: Eye,
      title: 'X-Ray & CT Analysis',
      description: 'Vision AI for analyzing X-rays, CT scans, and MRI images accurately',
      color: 'from-violet-500 to-purple-500',
    },
    {
      icon: Pill,
      title: 'Medicine Comparison',
      description: 'Compare medications, check interactions, and find safer alternatives',
      color: 'from-amber-500 to-orange-500',
    },
    {
      icon: Search,
      title: 'RAG System',
      description: 'Semantic search with ChromaDB vector database for intelligent retrieval',
      color: 'from-pink-500 to-rose-500',
    },
    {
      icon: Zap,
      title: 'Real-time Streaming',
      description: 'Live diagnosis updates with Server-Sent Events for instant feedback',
      color: 'from-blue-500 to-indigo-500',
    },
    {
      icon: Lock,
      title: 'Secure',
      description: 'Session-based data isolation with 15-minute TTL for privacy compliance',
      color: 'from-teal-500 to-green-500',
    },
    {
      icon: Clock,
      title: 'Fast Processing',
      description: 'Sub-30 second response time for comprehensive medical analysis',
      color: 'from-purple-500 to-pink-500',
    },
  ];

  return (
    <section className="py-24 bg-white dark:bg-[#0c1628]/70 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50 dark:from-[#0a0e17] via-transparent to-gray-50 dark:to-[#0a0e17] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <ScrollReveal>
          <div className="text-center mb-16">
            <motion.span className="inline-block px-4 py-2 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 text-sm font-medium mb-4 border border-emerald-500/20">
              Core Features
            </motion.span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Powerful{' '}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 via-cyan-500 to-violet-500">
                Capabilities
              </span>
            </h2>
          </div>
        </ScrollReveal>

        <motion.div 
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={cardContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {features.map((feature) => (
            <motion.div key={feature.title} variants={cardVariants} whileHover={{ y: -8 }} className="group">
              <TiltCard className="h-full">
                <div className="h-full p-6 rounded-2xl bg-gray-50 dark:bg-[#1a2438]/80 border border-gray-200 dark:border-[#2d3f5f] backdrop-blur-sm">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg`}>
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-bold text-gray-900 dark:text-white mb-2">{feature.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-neutral-400">{feature.description}</p>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// Prerequisites Section
function PrerequisitesSection() {
  const prerequisites = [
    { name: 'Node.js 18+', description: 'For Next.js frontend', icon: Server },
    { name: 'Python 3.10+', description: 'For ML backend', icon: Code2 },
    { name: 'Conda', description: 'Miniconda or Anaconda', icon: Terminal },
  ];

  const apiKeys = [
    { name: 'Gemini API', url: 'https://makersuite.google.com/app/apikey', description: 'For AI models' },
    { name: 'Groq API', url: 'https://console.groq.com/', description: 'For LLM inference' },
    { name: 'Tavily API', url: 'https://tavily.com/', description: 'For web search' },
  ];

  return (
    <section id="prerequisites" className="py-24 bg-gray-50 dark:bg-[#0a0e17] relative overflow-hidden">
      <DocumentationBackground />
      
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <ScrollReveal>
          <div className="text-center mb-16">
            <motion.span className="inline-block px-4 py-2 rounded-full bg-cyan-500/15 text-cyan-600 dark:text-cyan-400 text-sm font-medium mb-4 border border-cyan-500/20">
              Prerequisites
            </motion.span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Before You{' '}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
                Begin
              </span>
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 gap-8">
          {/* System Requirements */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="p-6 rounded-2xl bg-white dark:bg-[#1a2438]/80 border border-gray-200 dark:border-[#2d3f5f]"
          >
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
              <Cpu className="w-5 h-5 text-cyan-500" />
              System Requirements
            </h3>
            <div className="space-y-4">
              {prerequisites.map((prereq) => (
                <div key={prereq.name} className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/10 flex items-center justify-center flex-shrink-0">
                    <prereq.icon className="w-5 h-5 text-cyan-500" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">{prereq.name}</p>
                    <p className="text-sm text-gray-600 dark:text-neutral-400">{prereq.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* API Keys */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="p-6 rounded-2xl bg-white dark:bg-[#1a2438]/80 border border-gray-200 dark:border-[#2d3f5f]"
          >
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
              <Key className="w-5 h-5 text-violet-500" />
              API Keys Required
            </h3>
            <div className="space-y-4">
              {apiKeys.map((api) => (
                <a
                  key={api.name}
                  href={api.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 group"
                >
                  <div className="w-10 h-10 rounded-xl bg-violet-500/10 flex items-center justify-center flex-shrink-0 group-hover:bg-violet-500/20 transition-colors">
                    <ExternalLink className="w-5 h-5 text-violet-500" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white group-hover:text-violet-500 transition-colors">{api.name}</p>
                    <p className="text-sm text-gray-600 dark:text-neutral-400">{api.description}</p>
                  </div>
                </a>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// Installation Section
function InstallationSection() {
  return (
    <section id="installation" className="py-24 bg-white dark:bg-[#0c1628]/70 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50 dark:from-[#0a0e17] via-transparent to-gray-50 dark:to-[#0a0e17] pointer-events-none" />
      
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <ScrollReveal>
          <div className="text-center mb-16">
            <motion.span className="inline-block px-4 py-2 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 text-sm font-medium mb-4 border border-emerald-500/20">
              <Download className="w-4 h-4 inline mr-2" />
              Installation
            </motion.span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Setup{' '}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-teal-500">
                Instructions
              </span>
            </h2>
          </div>
        </ScrollReveal>

        <div className="space-y-8">
          {/* Step 1 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center text-white font-bold">
                1
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">Clone Repository</h3>
            </div>
            <CodeBlock 
              code={`git clone https://github.com/VaibhavK289/curasense-diagnosis.git
cd curasense-diagnosis`}
              title="terminal"
            />
          </motion.div>

          {/* Step 2 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center text-white font-bold">
                2
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">Setup Next.js Frontend</h3>
            </div>
            <CodeBlock 
              code={`cd curasense-frontend
npm install`}
              title="terminal"
            />
          </motion.div>

          {/* Step 3 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-500 to-purple-500 flex items-center justify-center text-white font-bold">
                3
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">Setup Python Backend</h3>
            </div>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-600 dark:text-neutral-400 mb-2 font-medium">ML Service:</p>
                <CodeBlock 
                  code={`conda create -n curasense_env python=3.10 -y
conda activate curasense_env
cd curasense-ml
pip install -r requirements.txt`}
                  title="terminal"
                />
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-neutral-400 mb-2 font-medium">FastAPI Backend:</p>
                <CodeBlock 
                  code={`conda create -n curasense_vision_env python=3.10 -y
conda activate curasense_vision_env
cd ml-fastapi
pip install -r requirements.txt`}
                  title="terminal"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// Configuration Section
function ConfigurationSection() {
  return (
    <section id="configuration" className="py-24 bg-gray-50 dark:bg-[#0a0e17] relative overflow-hidden">
      <DocumentationBackground />
      
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <ScrollReveal>
          <div className="text-center mb-16">
            <motion.span className="inline-block px-4 py-2 rounded-full bg-amber-500/15 text-amber-600 dark:text-amber-400 text-sm font-medium mb-4 border border-amber-500/20">
              <Key className="w-4 h-4 inline mr-2" />
              Configuration
            </motion.span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              API{' '}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-400 to-orange-500">
                Keys Setup
              </span>
            </h2>
          </div>
        </ScrollReveal>

        <div className="space-y-8">
          {/* Frontend .env */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <Layers className="w-5 h-5 text-cyan-500" />
              curasense-frontend/.env.local
            </h3>
            <CodeBlock 
              code={`NEXT_PUBLIC_API_URL=http://localhost:8001
NEXT_PUBLIC_ML_API_URL=http://localhost:8000`}
              language="env"
              title=".env.local"
            />
          </motion.div>

          {/* ML .env */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <Brain className="w-5 h-5 text-emerald-500" />
              curasense-ml/.env
            </h3>
            <CodeBlock 
              code={`GOOGLE_API_KEY="your_gemini_api_key"
GROQ_API_KEY="your_groq_api_key"
TAVILY_API_KEY="your_tavily_api_key"
CREWAI_TRACING_ENABLED=true`}
              language="env"
              title=".env"
            />
          </motion.div>

          {/* FastAPI .env */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <Server className="w-5 h-5 text-violet-500" />
              ml-fastapi/.env
            </h3>
            <CodeBlock 
              code={`GOOGLE_API_KEY="your_gemini_api_key"
GROQ_API_KEY="your_groq_api_key"
TAVILY_API_KEY="your_tavily_api_key"
HUGGINGFACE_TOKEN="your_hf_token"`}
              language="env"
              title=".env"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// Project Structure Section
function ProjectStructureSection() {
  const structure = `curasense-diagnosis/
├── curasense-frontend/            # 🆕 Next.js 16 Frontend
│   ├── src/
│   │   ├── app/                   # App Router pages
│   │   │   ├── diagnosis/         # Diagnosis pages
│   │   │   │   ├── prescription/  # Prescription analysis
│   │   │   │   └── xray/          # X-ray analysis
│   │   │   ├── medicine/          # Medicine comparison
│   │   │   ├── history/           # Report history
│   │   │   ├── settings/          # User settings
│   │   │   └── help/              # Help & documentation
│   │   ├── components/            # React components
│   │   │   ├── ui/                # Shadcn/UI components
│   │   │   ├── layout/            # Header, Sidebar
│   │   │   ├── motion/            # Animation components
│   │   │   └── backgrounds/       # Background effects
│   │   ├── lib/                   # Utilities & API client
│   │   └── styles/                # Design tokens
│   ├── package.json
│   └── tailwind.config.ts
│
├── curasense-ml/                  # Python ML Frontend (Legacy)
│   ├── frontend/                  # HTML/CSS/JS dashboard
│   ├── src/
│   │   ├── crew/
│   │   │   └── agents_and_tasks.py # CrewAI agents
│   │   ├── hugging_face_ner.py    # NER extraction
│   │   └── output_pydantic.py     # Data models
│   ├── app.py                     # FastAPI server
│   ├── flow.py                    # Workflow orchestration
│   └── requirements.txt
│
├── ml-fastapi/                    # Backend API
│   ├── config/
│   │   ├── main_graph.py          # Main diagnosis workflow
│   │   ├── rag.py                 # RAG system
│   │   ├── vision_graph.py        # Vision analysis
│   │   ├── medical_summarizer_graph.py
│   │   ├── vectordb.py            # ChromaDB management
│   │   └── validate_api.py        # API validation
│   ├── cron/
│   │   ├── jobs.py                # Scheduled tasks
│   │   └── storage.py             # Session storage
│   ├── main.py                    # Backend server
│   └── requirements.txt
│
├── .gitignore
├── README.md
└── start_servers.bat`;

  return (
    <section id="structure" className="py-24 bg-white dark:bg-[#0c1628]/70 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50 dark:from-[#0a0e17] via-transparent to-gray-50 dark:to-[#0a0e17] pointer-events-none" />
      
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <ScrollReveal>
          <div className="text-center mb-16">
            <motion.span className="inline-block px-4 py-2 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 text-sm font-medium mb-4 border border-emerald-500/20">
              <FolderTree className="w-4 h-4 inline mr-2" />
              Project Structure
            </motion.span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Directory{' '}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-teal-500">
                Layout
              </span>
            </h2>
          </div>
        </ScrollReveal>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <CodeBlock code={structure} title="project structure" />
        </motion.div>
      </div>
    </section>
  );
}

// Running Section
function RunningSection() {
  const accessPoints = [
    { name: 'Next.js Frontend', url: 'http://localhost:3000', icon: Monitor, color: 'text-cyan-500' },
    { name: 'Legacy Dashboard', url: 'http://localhost:8000', icon: BarChart3, color: 'text-violet-500' },
    { name: 'API Documentation', url: 'http://localhost:8001/docs', icon: BookOpen, color: 'text-emerald-500' },
  ];

  return (
    <section id="running" className="py-24 bg-gray-50 dark:bg-[#0a0e17] relative overflow-hidden">
      <DocumentationBackground />
      
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <ScrollReveal>
          <div className="text-center mb-16">
            <motion.span className="inline-block px-4 py-2 rounded-full bg-cyan-500/15 text-cyan-600 dark:text-cyan-400 text-sm font-medium mb-4 border border-cyan-500/20">
              <Rocket className="w-4 h-4 inline mr-2" />
              Running
            </motion.span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Start the{' '}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
                Application
              </span>
            </h2>
          </div>
        </ScrollReveal>

        <div className="space-y-8">
          {/* Option 1 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Option 1: Run All Services Manually</h3>
            
            <div className="space-y-6">
              <div>
                <p className="text-sm text-gray-600 dark:text-neutral-400 mb-2 font-medium flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-cyan-500" />
                  Terminal 1 - Next.js Frontend:
                </p>
                <CodeBlock 
                  code={`cd curasense-frontend
npm run dev`}
                  title="terminal 1"
                />
              </div>

              <div>
                <p className="text-sm text-gray-600 dark:text-neutral-400 mb-2 font-medium flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-emerald-500" />
                  Terminal 2 - ML Backend:
                </p>
                <CodeBlock 
                  code={`cd curasense-ml
conda activate curasense_env
uvicorn app:app --host 0.0.0.0 --port 8000 --reload`}
                  title="terminal 2"
                />
              </div>

              <div>
                <p className="text-sm text-gray-600 dark:text-neutral-400 mb-2 font-medium flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-violet-500" />
                  Terminal 3 - FastAPI Backend:
                </p>
                <CodeBlock 
                  code={`cd ml-fastapi
conda activate curasense_vision_env
uvicorn main:app --host 0.0.0.0 --port 8001 --reload`}
                  title="terminal 3"
                />
              </div>
            </div>
          </motion.div>

          {/* Option 2 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Option 2: Use Batch Script (Windows)</h3>
            <CodeBlock code="start_servers.bat" title="terminal" />
          </motion.div>

          {/* Access Points */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="p-6 rounded-2xl bg-white dark:bg-[#1a2438]/80 border border-gray-200 dark:border-[#2d3f5f]"
          >
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
              <Play className="w-5 h-5 text-emerald-500" />
              Access Points
            </h3>
            <div className="grid sm:grid-cols-3 gap-4">
              {accessPoints.map((point) => (
                <div key={point.name} className="p-4 rounded-xl bg-gray-50 dark:bg-[#0a0e17] border border-gray-200 dark:border-[#2d3f5f]">
                  <point.icon className={`w-6 h-6 ${point.color} mb-2`} />
                  <p className="font-semibold text-gray-900 dark:text-white text-sm">{point.name}</p>
                  <code className="text-xs text-gray-500 dark:text-neutral-500">{point.url}</code>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// Tech Stack Section
function TechStackSection() {
  const techStack = [
    { name: 'Next.js 16', description: 'React framework with App Router', icon: Layers },
    { name: 'React 19', description: 'UI library', icon: Code2 },
    { name: 'TypeScript 5', description: 'Type safety', icon: FileText },
    { name: 'Tailwind CSS 4', description: 'Styling', icon: Palette },
    { name: 'Framer Motion', description: 'Animations', icon: Sparkles },
    { name: 'Radix UI', description: 'Accessible components', icon: Box },
    { name: 'Zustand', description: 'State management', icon: Database },
    { name: 'Lucide Icons', description: 'Icon library', icon: Camera },
  ];

  return (
    <section className="py-24 bg-white dark:bg-[#0c1628]/70 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50 dark:from-[#0a0e17] via-transparent to-gray-50 dark:to-[#0a0e17] pointer-events-none" />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <ScrollReveal>
          <div className="text-center mb-16">
            <motion.span className="inline-block px-4 py-2 rounded-full bg-violet-500/15 text-violet-600 dark:text-violet-400 text-sm font-medium mb-4 border border-violet-500/20">
              Frontend Tech Stack
            </motion.span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Built With{' '}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-violet-400 via-purple-500 to-pink-500">
                Modern Tools
              </span>
            </h2>
          </div>
        </ScrollReveal>

        <motion.div 
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4"
          variants={cardContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {techStack.map((tech) => (
            <motion.div key={tech.name} variants={cardVariants} whileHover={{ y: -4 }}>
              <div className="p-4 rounded-xl bg-gray-50 dark:bg-[#1a2438]/80 border border-gray-200 dark:border-[#2d3f5f] hover:border-violet-500/30 transition-all duration-300">
                <tech.icon className="w-6 h-6 text-violet-500 mb-2" />
                <p className="font-semibold text-gray-900 dark:text-white text-sm">{tech.name}</p>
                <p className="text-xs text-gray-600 dark:text-neutral-400">{tech.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// CTA Section
function CTASection() {
  return (
    <section className="py-24 bg-gray-50 dark:bg-[#0a0e17] relative overflow-hidden">
      <DocumentationBackground />
      
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
            <Github className="w-8 h-8 text-white" />
          </motion.div>
          
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-gray-600 dark:text-neutral-400 mb-8 max-w-xl mx-auto">
            Clone the repository, set up your API keys, and start building with CuraSense.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4">
            <HoverBorderGradient
              containerClassName="rounded-full"
              href="https://github.com/VaibhavK289/curasense-diagnosis"
              className="dark:bg-black bg-white text-black dark:text-white flex items-center gap-2 px-6 py-2"
            >
              <Github className="w-5 h-5" />
              <span>View on GitHub</span>
            </HoverBorderGradient>
            <Button href="https://curasense-frontend.vercel.app/" variant="outline" external>
              <ExternalLink className="w-4 h-4" />
              Try Live Demo
            </Button>
          </div>
          
          <div className="mt-8 pt-8 border-t border-gray-200 dark:border-emerald-900/30">
            <p className="text-sm text-gray-500 dark:text-neutral-500">
              Made with ❤️ by CuraSense Team • MIT License
            </p>
            <div className="flex justify-center gap-4 mt-4">
              <a href="https://github.com/VaibhavK289/curasense-diagnosis" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-500 dark:text-neutral-500 hover:text-emerald-500 transition-colors">
                ⭐ Star this repo
              </a>
              <a href="https://github.com/VaibhavK289/curasense-diagnosis/issues" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-500 dark:text-neutral-500 hover:text-emerald-500 transition-colors">
                🐛 Report Bug
              </a>
              <a href="https://github.com/VaibhavK289/curasense-diagnosis/issues" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-500 dark:text-neutral-500 hover:text-emerald-500 transition-colors">
                💡 Request Feature
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// Main Page Component
export default function CuraSenseDocumentationPage() {
  return (
    <div className="relative">
      <ScrollProgress />
      <DocumentationHero />
      <DocumentationPageNav />
      <WhatsNewSection />
      <CoreFeaturesSection />
      <PrerequisitesSection />
      <InstallationSection />
      <ConfigurationSection />
      <ProjectStructureSection />
      <RunningSection />
      <TechStackSection />
      <CTASection />
    </div>
  );
}
