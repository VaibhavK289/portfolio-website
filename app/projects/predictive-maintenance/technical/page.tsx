'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  ArrowLeft, 
  Github, 
  Brain, 
  FileText, 
  Cpu,
  Activity,
  Shield,
  Clock,
  Play,
  ChevronRight,
  Code2,
  Layers,
  Sparkles,
  Gauge,
  Zap,
  Settings,
  BarChart3,
  Cog,
  Factory,
  Thermometer,
  Radio,
  CircuitBoard,
  TrendingUp,
  Database,
  Server,
  Workflow,
  GitBranch,
  Terminal,
  Box,
  Boxes,
  Network,
  HardDrive
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { getProjectBySlug } from '@/data/projects';
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
} from '@/components/animations';

// Industrial-themed Background Component
function PredictiveCareBackground() {
  return (
    <>
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          className="absolute top-20 right-20 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl"
          animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div 
          className="absolute bottom-20 left-20 w-80 h-80 bg-violet-600/25 rounded-full blur-3xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.35, 0.15] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        />
        <motion.div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-3xl"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>
      
      <div className="absolute inset-0 w-full h-full">
        <SparklesCore
          id="predictivecare-tech-sparkles"
          background="transparent"
          minSize={0.4}
          maxSize={1.2}
          particleDensity={15}
          className="w-full h-full"
          particleColor="#06b6d4"
        />
      </div>

      <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.03)_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none" />
    </>
  );
}

// Page Navigation Component - Mobile Optimized
function PredictiveCarePageNav({ currentPage }: { currentPage: 'overview' | 'technical' | 'docs' | 'deep-dive' }) {
  return (
    <motion.div 
      className="sticky top-16 sm:top-20 z-40 bg-[#0a0f1a]/90 backdrop-blur-xl border-b border-cyan-900/30"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        {/* Desktop Layout */}
        <div className="hidden sm:flex items-center justify-between py-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center"><Factory className="w-5 h-5 text-white" /></div>
            <div><h2 className="font-bold text-white text-sm">PredictiveCare</h2><p className="text-xs text-neutral-500">Industrial Maintenance AI</p></div>
          </div>
          <div className="flex items-center gap-1 p-1 bg-[#1a2438] rounded-xl">
            <Link href="/projects/predictive-maintenance" className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${currentPage === 'overview' ? 'bg-cyan-500/20 text-cyan-400 shadow-sm' : 'text-neutral-400 hover:text-white'}`}>Overview</Link>
            <Link href="/projects/predictive-maintenance/technical" className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${currentPage === 'technical' ? 'bg-cyan-500/20 text-cyan-400 shadow-sm' : 'text-neutral-400 hover:text-white'}`}>Technical</Link>
            <Link href="/projects/predictive-maintenance/docs" className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${currentPage === 'docs' ? 'bg-cyan-500/20 text-cyan-400 shadow-sm' : 'text-neutral-400 hover:text-white'}`}>Docs</Link>
            <Link href="/projects/predictive-maintenance/deep-dive" className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${currentPage === 'deep-dive' ? 'bg-cyan-500/20 text-cyan-400 shadow-sm' : 'text-neutral-400 hover:text-white'}`}>Deep-Dive</Link>
          </div>
          <div className="flex items-center gap-3">
            <Button href="https://predictivecare-ai.vercel.app/dashboard" variant="outline" external className="text-sm border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10"><Gauge className="w-4 h-4" />Dashboard</Button>
          </div>
        </div>
        {/* Mobile Layout */}
        <div className="sm:hidden">
          <div className="flex items-center justify-between py-2.5">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center"><Factory className="w-4 h-4 text-white" /></div>
              <div><h2 className="font-bold text-white text-xs">PredictiveCare</h2><p className="text-[10px] text-neutral-500">Technical</p></div>
            </div>
            <a href="https://predictivecare-ai.vercel.app/dashboard" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-xs font-medium shadow-lg shadow-cyan-500/25"><Gauge className="w-3 h-3" />Dashboard</a>
          </div>
          <div className="flex items-center gap-1 pb-2.5 overflow-x-auto scrollbar-hide -mx-3 px-3">
            <Link href="/projects/predictive-maintenance" className={`flex-shrink-0 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-300 ${currentPage === 'overview' ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30' : 'bg-[#1a2438] text-neutral-400'}`}>Overview</Link>
            <Link href="/projects/predictive-maintenance/technical" className={`flex-shrink-0 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-300 ${currentPage === 'technical' ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30' : 'bg-[#1a2438] text-neutral-400'}`}>Technical</Link>
            <Link href="/projects/predictive-maintenance/docs" className={`flex-shrink-0 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-300 ${currentPage === 'docs' ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30' : 'bg-[#1a2438] text-neutral-400'}`}>Docs</Link>
            <Link href="/projects/predictive-maintenance/deep-dive" className={`flex-shrink-0 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-300 ${currentPage === 'deep-dive' ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30' : 'bg-[#1a2438] text-neutral-400'}`}>Deep-Dive</Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// Hero Section for Technical Page
function TechnicalHeroSection() {
  const project = getProjectBySlug('predictive-maintenance');
  if (!project) return null;

  return (
    <section className="relative py-20 overflow-hidden bg-gradient-to-br from-[#050810] via-[#0a0f1a] to-[#0d1425]">
      <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="#8b5cf6" />
      <PredictiveCareBackground />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link
            href="/projects/predictive-maintenance"
            className="inline-flex items-center gap-2 text-neutral-400 hover:text-cyan-400 mb-8 group transition-colors"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Overview
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: easings.dramatic }}
          className="text-center"
        >
          <motion.span 
            className="inline-block px-4 py-2 rounded-full bg-violet-500/15 text-violet-400 text-sm font-medium mb-6 border border-violet-500/20"
          >
            Technical Deep-Dive
          </motion.span>
          
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
            System{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500">
              Architecture
            </span>
          </h1>
          
          <p className="text-xl text-neutral-400 max-w-3xl mx-auto mb-8">
            Explore the technical implementation of our enterprise-grade IoT predictive maintenance platform
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Button href={project.githubUrl} variant="outline" external className="border-violet-500/30 text-violet-400 hover:bg-violet-500/10">
              <Github className="w-4 h-4" />
              View Source Code
            </Button>
            <Button href="https://predictivecare-ai.vercel.app/features" variant="outline" external className="border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10">
              <Zap className="w-4 h-4" />
              Explore Features
            </Button>
          </div>
        </motion.div>
      </div>

      <BackgroundBeams className="opacity-20" />
    </section>
  );
}

// Project Structure Section
function ProjectStructureSection() {
  const structure = [
    { 
      name: 'predictive-care-next/', 
      description: 'Next.js 16 Frontend (Modern UI)',
      icon: Layers,
      color: 'cyan',
      tech: ['Next.js 16', 'React 19', 'Tailwind v4', 'Framer Motion']
    },
    { 
      name: 'ml-enterprise/', 
      description: 'Enterprise ML Backend (FastAPI + AI)',
      icon: Brain,
      color: 'violet',
      tech: ['FastAPI', 'XGBoost', 'LightGBM', 'CatBoost', 'ChromaDB']
    },
    { 
      name: 'epics-frontend/', 
      description: 'Original React Frontend',
      icon: Code2,
      color: 'blue',
      tech: ['React', 'JavaScript', 'CSS']
    },
    { 
      name: 'epics-backend/', 
      description: 'Original Node.js Backend',
      icon: Server,
      color: 'green',
      tech: ['Node.js', 'Express', 'MongoDB']
    },
    { 
      name: 'iot/', 
      description: 'Arduino IoT Sensor Code',
      icon: CircuitBoard,
      color: 'amber',
      tech: ['Arduino', 'C++', 'DHT Sensors']
    },
    { 
      name: 'ML-Model/', 
      description: 'Original ML Notebook',
      icon: FileText,
      color: 'pink',
      tech: ['Jupyter', 'Python', 'Scikit-learn']
    },
  ];

  return (
    <section className="py-24 bg-[#0a0f1a] relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#050810]/50 via-transparent to-transparent pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <ScrollReveal>
          <div className="text-center mb-16">
            <motion.span className="inline-block px-4 py-2 rounded-full bg-cyan-500/15 text-cyan-400 text-sm font-medium mb-4 border border-cyan-500/20">
              Repository Structure
            </motion.span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Project{' '}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
                Organization
              </span>
            </h2>
          </div>
        </ScrollReveal>

        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={cardContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {structure.map((item) => (
            <motion.div key={item.name} variants={cardVariants}>
              <div className={`p-6 rounded-2xl bg-[#1a2438]/60 border border-${item.color}-500/20 hover:border-${item.color}-500/40 transition-all duration-300 h-full`}>
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br from-${item.color}-400 to-${item.color}-600 flex items-center justify-center`}>
                    <item.icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-mono font-bold text-white text-sm">{item.name}</h4>
                  </div>
                </div>
                <p className="text-sm text-neutral-400 mb-4">{item.description}</p>
                <div className="flex flex-wrap gap-2">
                  {item.tech.map((t) => (
                    <span key={t} className={`px-2 py-1 text-xs rounded-full bg-${item.color}-500/10 text-${item.color}-400 border border-${item.color}-500/20`}>
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// API Endpoints Section
function APIEndpointsSection() {
  const endpoints = [
    { method: 'GET', path: '/health', description: 'Health check', color: 'green' },
    { method: 'POST', path: '/api/predict', description: 'Get failure prediction', color: 'cyan' },
    { method: 'POST', path: '/api/predict/batch', description: 'Batch predictions', color: 'blue' },
    { method: 'POST', path: '/api/analyze', description: 'Full machine analysis', color: 'violet' },
    { method: 'GET', path: '/api/recommendations', description: 'Maintenance recommendations', color: 'purple' },
    { method: 'GET', path: '/api/knowledge/stats', description: 'Knowledge base statistics', color: 'pink' },
  ];

  return (
    <section className="py-24 bg-[#0c1628]/60 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0f1a] via-transparent to-[#0a0f1a] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <ScrollReveal>
          <div className="text-center mb-16">
            <motion.span className="inline-block px-4 py-2 rounded-full bg-violet-500/15 text-violet-400 text-sm font-medium mb-4 border border-violet-500/20">
              FastAPI Backend
            </motion.span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              API{' '}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-violet-400 to-purple-500">
                Endpoints
              </span>
            </h2>
          </div>
        </ScrollReveal>

        <motion.div 
          className="max-w-3xl mx-auto space-y-4"
          variants={cardContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {endpoints.map((endpoint) => (
            <motion.div key={endpoint.path} variants={cardVariants}>
              <div className="flex items-center gap-4 p-4 rounded-xl bg-[#1a2438]/80 border border-cyan-900/30 hover:border-cyan-500/30 transition-all duration-300">
                <span className={`px-3 py-1 rounded-lg text-xs font-bold ${
                  endpoint.method === 'GET' 
                    ? 'bg-green-500/20 text-green-400' 
                    : 'bg-blue-500/20 text-blue-400'
                }`}>
                  {endpoint.method}
                </span>
                <code className="font-mono text-cyan-400 flex-1">{endpoint.path}</code>
                <span className="text-sm text-neutral-400">{endpoint.description}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ML Model Performance Section
function ModelPerformanceSection() {
  const features = [
    { name: 'Tool Wear', importance: 35, color: 'cyan' },
    { name: 'Temperature', importance: 25, color: 'blue' },
    { name: 'Torque', importance: 22, color: 'violet' },
    { name: 'Rotational Speed', importance: 18, color: 'purple' },
  ];

  return (
    <section className="py-24 bg-[#0a0f1a] relative overflow-hidden">
      <PredictiveCareBackground />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <ScrollReveal>
          <div className="text-center mb-16">
            <motion.span className="inline-block px-4 py-2 rounded-full bg-cyan-500/15 text-cyan-400 text-sm font-medium mb-4 border border-cyan-500/20">
              Model Insights
            </motion.span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Feature{' '}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
                Importance
              </span>
            </h2>
            <p className="text-lg text-neutral-400 max-w-2xl mx-auto">
              Understanding what drives our ensemble model&apos;s predictions
            </p>
          </div>
        </ScrollReveal>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Feature Importance Bars */}
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            {features.map((feature, index) => (
              <motion.div 
                key={feature.name}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="text-white font-medium">{feature.name}</span>
                  <span className={`text-${feature.color}-400 font-bold`}>{feature.importance}%</span>
                </div>
                <div className="h-3 bg-[#1a2438] rounded-full overflow-hidden">
                  <motion.div 
                    className={`h-full bg-gradient-to-r from-${feature.color}-500 to-${feature.color}-400 rounded-full`}
                    initial={{ width: 0 }}
                    whileInView={{ width: `${feature.importance}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: index * 0.1 }}
                  />
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Model Info Card */}
          <motion.div
            className="p-8 rounded-3xl bg-gradient-to-br from-cyan-500/10 via-blue-500/5 to-violet-500/10 border border-cyan-500/20 backdrop-blur-sm"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <Brain className="w-8 h-8 text-cyan-400" />
              Ensemble Model
            </h3>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 rounded-xl bg-[#0a0f1a]/60 border border-cyan-900/30">
                <span className="text-neutral-400">Model Type</span>
                <span className="text-cyan-400 font-medium">Ensemble (Stacking)</span>
              </div>
              <div className="flex justify-between items-center p-3 rounded-xl bg-[#0a0f1a]/60 border border-cyan-900/30">
                <span className="text-neutral-400">Base Models</span>
                <span className="text-violet-400 font-medium">XGBoost + LightGBM + CatBoost</span>
              </div>
              <div className="flex justify-between items-center p-3 rounded-xl bg-[#0a0f1a]/60 border border-cyan-900/30">
                <span className="text-neutral-400">Top Feature</span>
                <span className="text-blue-400 font-medium">Tool Wear (35%)</span>
              </div>
              <div className="flex justify-between items-center p-3 rounded-xl bg-[#0a0f1a]/60 border border-cyan-900/30">
                <span className="text-neutral-400">RAG System</span>
                <span className="text-purple-400 font-medium">ChromaDB + Sentence-Transformers</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// Quick Start Section
function QuickStartSection() {
  return (
    <section className="py-24 bg-[#0c1628]/60 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0f1a] via-transparent to-[#0a0f1a] pointer-events-none" />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <ScrollReveal>
          <div className="text-center mb-16">
            <motion.span className="inline-block px-4 py-2 rounded-full bg-green-500/15 text-green-400 text-sm font-medium mb-4 border border-green-500/20">
              Get Started
            </motion.span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Quick{' '}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-emerald-500">
                Start Guide
              </span>
            </h2>
          </div>
        </ScrollReveal>

        <div className="space-y-8">
          {/* Prerequisites */}
          <motion.div
            className="p-6 rounded-2xl bg-[#1a2438]/60 border border-cyan-900/30"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <Box className="w-5 h-5 text-cyan-400" />
              Prerequisites
            </h3>
            <div className="flex flex-wrap gap-3">
              <span className="px-3 py-1.5 rounded-lg bg-cyan-500/10 text-cyan-400 text-sm border border-cyan-500/20">Node.js 18+</span>
              <span className="px-3 py-1.5 rounded-lg bg-violet-500/10 text-violet-400 text-sm border border-violet-500/20">Python 3.10+</span>
              <span className="px-3 py-1.5 rounded-lg bg-blue-500/10 text-blue-400 text-sm border border-blue-500/20">PostgreSQL (optional)</span>
            </div>
          </motion.div>

          {/* ML Backend */}
          <motion.div
            className="p-6 rounded-2xl bg-[#1a2438]/60 border border-violet-900/30"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <Terminal className="w-5 h-5 text-violet-400" />
              1. Start the ML Backend
            </h3>
            <div className="bg-[#0a0f1a] rounded-xl p-4 font-mono text-sm overflow-x-auto">
              <div className="text-neutral-500"># Navigate to ML backend</div>
              <div className="text-cyan-400">cd ml-enterprise</div>
              <div className="text-neutral-500 mt-2"># Create virtual environment</div>
              <div className="text-cyan-400">python -m venv predictive_maintenance_env</div>
              <div className="text-cyan-400">.\predictive_maintenance_env\Scripts\Activate.ps1  <span className="text-neutral-500"># Windows</span></div>
              <div className="text-neutral-500 mt-2"># Install dependencies</div>
              <div className="text-cyan-400">pip install -r requirements.txt</div>
              <div className="text-neutral-500 mt-2"># Train and serve</div>
              <div className="text-cyan-400">python main.py train --model-type ensemble</div>
              <div className="text-cyan-400">python main.py serve --port 8000</div>
            </div>
          </motion.div>

          {/* Frontend */}
          <motion.div
            className="p-6 rounded-2xl bg-[#1a2438]/60 border border-cyan-900/30"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <Terminal className="w-5 h-5 text-cyan-400" />
              2. Start the Next.js Frontend
            </h3>
            <div className="bg-[#0a0f1a] rounded-xl p-4 font-mono text-sm overflow-x-auto">
              <div className="text-cyan-400">cd predictive-care-next</div>
              <div className="text-cyan-400">npm install</div>
              <div className="text-cyan-400">npm run dev</div>
              <div className="text-neutral-500 mt-2"># Visit: http://localhost:3000</div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// CTA Section
function CTASection() {
  const project = getProjectBySlug('predictive-maintenance');

  return (
    <section className="py-24 bg-[#0a0f1a] relative">
      <PredictiveCareBackground />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          className="text-center p-12 rounded-3xl bg-gradient-to-br from-violet-500/10 via-blue-500/5 to-cyan-500/10 border border-violet-500/20 backdrop-blur-sm"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-500 flex items-center justify-center mx-auto mb-6"
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          >
            <Github className="w-8 h-8 text-white" />
          </motion.div>
          
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
            Explore the Source Code
          </h2>
          <p className="text-neutral-400 mb-8 max-w-xl mx-auto">
            Dive into the full implementation on GitHub and see how we built this enterprise-grade IoT platform.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href={project?.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-violet-500 to-purple-500 text-white font-medium hover:opacity-90 transition-opacity"
            >
              <Github className="w-5 h-5" />
              View on GitHub
              <ChevronRight className="w-5 h-5" />
            </a>
            <HoverBorderGradient
              containerClassName="rounded-full"
              href="/projects/predictive-maintenance"
              className="bg-[#0a0f1a] text-white flex items-center gap-2 px-6 py-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Overview</span>
            </HoverBorderGradient>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// Main Page Component
export default function PredictiveCareTechnicalPage() {
  return (
    <div className="relative bg-[#050810]">
      <ScrollProgress />
      <TechnicalHeroSection />
      <PredictiveCarePageNav currentPage="technical" />
      <ProjectStructureSection />
      <APIEndpointsSection />
      <ModelPerformanceSection />
      <QuickStartSection />
      <CTASection />
    </div>
  );
}
