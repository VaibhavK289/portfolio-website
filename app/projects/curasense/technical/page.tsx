'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  ArrowLeft,
  ArrowRight,
  Brain, 
  FileText, 
  Server,
  Database,
  Layers,
  Code2,
  GitBranch,
  Cpu,
  Shield,
  Zap,
  Activity,
  ChevronRight,
  ExternalLink,
  Github,
  Terminal,
  Workflow,
  Network,
  Lock,
  Clock,
  Check
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { getProjectBySlug } from '@/data/projects';
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

// Shared background component
function TechnicalBackground() {
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
      <div className="absolute inset-0 w-full h-full">
        <SparklesCore
          id="technical-sparkles"
          background="transparent"
          minSize={0.3}
          maxSize={1}
          particleDensity={15}
          className="w-full h-full"
          particleColor="#10b981"
        />
      </div>
    </div>
  );
}

// Page Navigation Component
function TechnicalPageNav() {
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
              <p className="text-xs text-gray-500 dark:text-neutral-500">Technical Documentation</p>
            </div>
          </div>
          
          {/* Page Tabs */}
          <div className="flex items-center gap-1 p-1 bg-gray-100 dark:bg-[#1a2438] rounded-xl">
            <Link
              href="/projects/curasense"
              className="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 text-gray-600 dark:text-neutral-400 hover:text-gray-900 dark:hover:text-white"
            >
              Overview
            </Link>
            <Link
              href="/projects/curasense/technical"
              className="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 bg-white dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 shadow-sm"
            >
              Technical
            </Link>
          </div>
          
          {/* Actions */}
          <div className="hidden sm:flex items-center gap-3">
            <Button href="https://github.com/VaibhavK289/curasense-diagnosis" variant="outline" external className="text-sm">
              <Github className="w-4 h-4" />
              Source
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// Hero Section
function TechnicalHero() {
  return (
    <section className="relative py-24 overflow-hidden bg-gradient-to-br from-gray-50 via-white to-emerald-50/20 dark:from-[#0a0e17] dark:via-[#0c1628] dark:to-[#0a1220]">
      <TechnicalBackground />
      
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
              className="inline-block px-4 py-2 rounded-full bg-cyan-500/15 text-cyan-600 dark:text-cyan-400 text-sm font-medium mb-6 border border-cyan-500/20"
            >
              Technical Documentation
            </motion.span>
            
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
              System{' '}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 via-cyan-500 to-violet-500">
                Architecture
              </span>
            </h1>
            
            <p className="text-xl text-gray-600 dark:text-neutral-400 mb-8 leading-relaxed">
              A comprehensive look at the technical implementation, system design, and engineering decisions behind CuraSense's AI-powered healthcare platform.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Button href="https://github.com/VaibhavK289/curasense-diagnosis" variant="primary" external>
                <Github className="w-4 h-4" />
                View Repository
              </Button>
              <Button href="https://curasense-frontend.vercel.app/" variant="outline" external>
                <ExternalLink className="w-4 h-4" />
                Live Demo
              </Button>
            </div>
          </motion.div>
          
          {/* Quick Stats */}
          <motion.div
            className="grid grid-cols-2 gap-4"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {[
              { icon: Layers, label: 'Frontend', value: 'Next.js 14', color: 'text-cyan-500' },
              { icon: Server, label: 'Backend', value: 'FastAPI', color: 'text-violet-500' },
              { icon: Brain, label: 'AI Engine', value: 'Gemini Pro', color: 'text-emerald-500' },
              { icon: Database, label: 'Vector DB', value: 'ChromaDB', color: 'text-amber-500' },
            ].map((item) => (
              <div key={item.label} className="p-4 rounded-2xl bg-white/80 dark:bg-[#1a2438]/80 border border-gray-200 dark:border-[#2d3f5f] backdrop-blur-sm">
                <item.icon className={`w-6 h-6 ${item.color} mb-2`} />
                <p className="text-xs text-gray-500 dark:text-neutral-500">{item.label}</p>
                <p className="font-semibold text-gray-900 dark:text-white">{item.value}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// Architecture Overview Section
function ArchitectureSection() {
  const layers = [
    {
      title: 'Presentation Layer',
      subtitle: 'Next.js 14 Frontend',
      icon: Layers,
      color: 'from-cyan-500 to-blue-500',
      bgColor: 'bg-cyan-500/10',
      borderColor: 'border-cyan-500/20',
      items: [
        'App Router with Server & Client Components',
        'Tailwind CSS with custom design system',
        'Framer Motion for fluid animations',
        'Clerk Authentication integration',
        'Real-time SSE updates for live diagnosis'
      ]
    },
    {
      title: 'API Layer',
      subtitle: 'FastAPI Backend',
      icon: Server,
      color: 'from-violet-500 to-purple-500',
      bgColor: 'bg-violet-500/10',
      borderColor: 'border-violet-500/20',
      items: [
        'High-performance async Python API',
        'RESTful endpoints with OpenAPI docs',
        'Server-Sent Events for streaming',
        'Request validation with Pydantic',
        'CORS and security middleware'
      ]
    },
    {
      title: 'Intelligence Layer',
      subtitle: 'Multi-Agent AI System',
      icon: Brain,
      color: 'from-emerald-500 to-teal-500',
      bgColor: 'bg-emerald-500/10',
      borderColor: 'border-emerald-500/20',
      items: [
        'CrewAI for agent orchestration',
        'LangGraph for workflow management',
        'Gemini Pro for text analysis',
        'Gemini Vision for medical imaging',
        'RAG pipeline with ChromaDB'
      ]
    },
    {
      title: 'Data Layer',
      subtitle: 'Storage & Retrieval',
      icon: Database,
      color: 'from-amber-500 to-orange-500',
      bgColor: 'bg-amber-500/10',
      borderColor: 'border-amber-500/20',
      items: [
        'ChromaDB vector database',
        'Semantic search capabilities',
        'PDF parsing and extraction',
        'Session-based data isolation',
        '15-minute TTL for HIPAA compliance'
      ]
    },
  ];

  return (
    <section className="py-24 bg-gray-50 dark:bg-[#0a0e17] relative overflow-hidden">
      <TechnicalBackground />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <ScrollReveal>
          <div className="text-center mb-16">
            <motion.span className="inline-block px-4 py-2 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 text-sm font-medium mb-4 border border-emerald-500/20">
              System Design
            </motion.span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Layered{' '}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 via-cyan-500 to-violet-500">
                Architecture
              </span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-neutral-400 max-w-2xl mx-auto">
              A modular, scalable architecture designed for reliability and maintainability
            </p>
          </div>
        </ScrollReveal>

        <motion.div 
          className="grid md:grid-cols-2 gap-6"
          variants={cardContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {layers.map((layer, index) => (
            <motion.div
              key={layer.title}
              variants={cardVariants}
              whileHover={{ y: -8 }}
              className="group"
            >
              <div className={`relative h-full p-8 rounded-3xl ${layer.bgColor} border ${layer.borderColor} backdrop-blur-sm transition-all duration-300`}>
                <div className="flex items-center gap-4 mb-6">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${layer.color} flex items-center justify-center shadow-lg`}>
                    <layer.icon className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">{layer.title}</h3>
                    <p className="text-sm text-gray-500 dark:text-neutral-500">{layer.subtitle}</p>
                  </div>
                </div>
                
                <div className="space-y-3">
                  {layer.items.map((item) => (
                    <div key={item} className="flex items-start gap-3 text-gray-600 dark:text-neutral-400">
                      <Check className={`w-5 h-5 mt-0.5 flex-shrink-0 ${layer.color.includes('cyan') ? 'text-cyan-500' : layer.color.includes('violet') ? 'text-violet-500' : layer.color.includes('emerald') ? 'text-emerald-500' : 'text-amber-500'}`} />
                      <span className="text-sm">{item}</span>
                    </div>
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

// Multi-Agent Workflow Section
function WorkflowSection() {
  const agents = [
    {
      name: 'Document Analyzer',
      role: 'Extraction & Parsing',
      description: 'Extracts text, tables, and structured data from uploaded PDFs and images',
      icon: FileText,
      color: 'bg-cyan-500',
    },
    {
      name: 'Medical Expert',
      role: 'Clinical Interpretation',
      description: 'Provides expert-level medical interpretation and analysis',
      icon: Brain,
      color: 'bg-emerald-500',
    },
    {
      name: 'Drug Interaction',
      role: 'Safety Analysis',
      description: 'Checks for medication conflicts and provides safety recommendations',
      icon: Shield,
      color: 'bg-violet-500',
    },
    {
      name: 'Report Generator',
      role: 'Output Synthesis',
      description: 'Compiles findings into comprehensive, readable reports',
      icon: Terminal,
      color: 'bg-amber-500',
    },
  ];

  return (
    <section className="py-24 bg-white dark:bg-[#0c1628]/70 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50 dark:from-[#0a0e17] via-transparent to-gray-50 dark:to-[#0a0e17] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <ScrollReveal>
          <div className="text-center mb-16">
            <motion.span className="inline-block px-4 py-2 rounded-full bg-violet-500/15 text-violet-600 dark:text-violet-400 text-sm font-medium mb-4 border border-violet-500/20">
              AI Orchestration
            </motion.span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Multi-Agent{' '}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-violet-400 via-purple-500 to-pink-500">
                Workflow
              </span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-neutral-400 max-w-2xl mx-auto">
              Specialized AI agents working in concert to deliver accurate medical insights
            </p>
          </div>
        </ScrollReveal>

        {/* Workflow Diagram */}
        <motion.div 
          className="relative"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Connection Lines */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-500 via-emerald-500 via-violet-500 to-amber-500 opacity-30" style={{ transform: 'translateY(-50%)' }} />
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {agents.map((agent, index) => (
              <motion.div
                key={agent.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className="group"
              >
                <div className="relative p-6 rounded-2xl bg-white dark:bg-[#1a2438]/80 border border-gray-200 dark:border-[#2d3f5f] backdrop-blur-sm hover:border-emerald-500/30 transition-all duration-300 text-center h-full">
                  {/* Step Number */}
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-gray-100 dark:bg-[#0a0e17] border border-gray-200 dark:border-[#2d3f5f] flex items-center justify-center">
                    <span className="text-xs font-bold text-gray-500 dark:text-neutral-400">{index + 1}</span>
                  </div>
                  
                  <div className={`w-16 h-16 rounded-2xl ${agent.color} flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <agent.icon className="w-8 h-8 text-white" />
                  </div>
                  
                  <h3 className="font-bold text-gray-900 dark:text-white mb-1">{agent.name}</h3>
                  <p className="text-xs text-emerald-500 dark:text-emerald-400 font-medium mb-3">{agent.role}</p>
                  <p className="text-sm text-gray-600 dark:text-neutral-400">{agent.description}</p>
                  
                  {/* Arrow */}
                  {index < agents.length - 1 && (
                    <div className="hidden lg:flex absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-white dark:bg-[#1a2438] border border-gray-200 dark:border-[#2d3f5f] items-center justify-center z-10">
                      <ChevronRight className="w-4 h-4 text-gray-400 dark:text-neutral-500" />
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// Code Sample Section
function CodeSection() {
  return (
    <section className="py-24 bg-gray-50 dark:bg-[#0a0e17] relative overflow-hidden">
      <TechnicalBackground />
      
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <ScrollReveal>
          <div className="text-center mb-12">
            <motion.span className="inline-block px-4 py-2 rounded-full bg-cyan-500/15 text-cyan-600 dark:text-cyan-400 text-sm font-medium mb-4 border border-cyan-500/20">
              Implementation
            </motion.span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Processing{' '}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
                Pipeline
              </span>
            </h2>
          </div>
        </ScrollReveal>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative"
        >
          <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500/20 via-emerald-500/20 to-violet-500/20 rounded-3xl blur-xl" />
          <div className="relative bg-gray-900 dark:bg-[#0c1628] rounded-2xl border border-gray-800 dark:border-[#2d3f5f] overflow-hidden">
            {/* Window Header */}
            <div className="flex items-center gap-2 px-4 py-3 bg-gray-800 dark:bg-[#0a0e17] border-b border-gray-700 dark:border-[#2d3f5f]">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
              <span className="ml-4 text-xs text-gray-400">document_processing.py</span>
            </div>
            
            {/* Code Content */}
            <pre className="p-6 overflow-x-auto text-sm">
              <code className="text-gray-300">
                <span className="text-violet-400">async def</span> <span className="text-cyan-400">process_medical_document</span><span className="text-gray-400">(</span><span className="text-orange-400">file</span><span className="text-gray-400">:</span> <span className="text-emerald-400">UploadFile</span><span className="text-gray-400">):</span>{'\n'}
                <span className="text-gray-500">    """Process uploaded medical document through AI pipeline."""</span>{'\n'}
                {'\n'}
                <span className="text-gray-500">    # Step 1: Extract content from PDF/Image</span>{'\n'}
                <span className="text-gray-300">    content</span> <span className="text-gray-400">=</span> <span className="text-violet-400">await</span> <span className="text-cyan-400">extract_document_content</span><span className="text-gray-400">(</span><span className="text-gray-300">file</span><span className="text-gray-400">)</span>{'\n'}
                {'\n'}
                <span className="text-gray-500">    # Step 2: Initialize multi-agent crew</span>{'\n'}
                <span className="text-gray-300">    crew</span> <span className="text-gray-400">=</span> <span className="text-emerald-400">MedicalAnalysisCrew</span><span className="text-gray-400">(</span>{'\n'}
                <span className="text-gray-300">        agents</span><span className="text-gray-400">=[</span>{'\n'}
                <span className="text-gray-300">            document_analyzer</span><span className="text-gray-400">,</span>{'\n'}
                <span className="text-gray-300">            medical_expert</span><span className="text-gray-400">,</span>{'\n'}
                <span className="text-gray-300">            drug_interaction_checker</span><span className="text-gray-400">,</span>{'\n'}
                <span className="text-gray-300">            report_generator</span>{'\n'}
                <span className="text-gray-400">        ],</span>{'\n'}
                <span className="text-gray-300">        verbose</span><span className="text-gray-400">=</span><span className="text-orange-400">True</span>{'\n'}
                <span className="text-gray-400">    )</span>{'\n'}
                {'\n'}
                <span className="text-gray-500">    # Step 3: Stream results via SSE</span>{'\n'}
                <span className="text-violet-400">    async for</span> <span className="text-gray-300">update</span> <span className="text-violet-400">in</span> <span className="text-gray-300">crew</span><span className="text-gray-400">.</span><span className="text-cyan-400">execute_async</span><span className="text-gray-400">(</span><span className="text-gray-300">content</span><span className="text-gray-400">):</span>{'\n'}
                <span className="text-violet-400">        yield</span> <span className="text-cyan-400">ServerSentEvent</span><span className="text-gray-400">(</span><span className="text-gray-300">update</span><span className="text-gray-400">)</span>{'\n'}
              </code>
            </pre>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// Tech Stack Grid
function TechStackSection() {
  const project = getProjectBySlug('curasense');
  
  const techCategories = [
    {
      category: 'Frontend',
      icon: Layers,
      color: 'text-cyan-500',
      technologies: ['Next.js 14', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Radix UI']
    },
    {
      category: 'Backend',
      icon: Server,
      color: 'text-violet-500',
      technologies: ['Python', 'FastAPI', 'CrewAI', 'LangGraph', 'Pydantic']
    },
    {
      category: 'AI/ML',
      icon: Brain,
      color: 'text-emerald-500',
      technologies: ['Gemini Pro', 'Gemini Vision', 'LangChain', 'RAG Pipeline']
    },
    {
      category: 'Infrastructure',
      icon: Network,
      color: 'text-amber-500',
      technologies: ['Vercel', 'Railway', 'ChromaDB', 'Clerk Auth']
    },
  ];

  return (
    <section className="py-24 bg-white dark:bg-[#0c1628]/70 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50 dark:from-[#0a0e17] via-transparent to-gray-50 dark:to-[#0a0e17] pointer-events-none" />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <ScrollReveal>
          <div className="text-center mb-16">
            <motion.span className="inline-block px-4 py-2 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 text-sm font-medium mb-4 border border-emerald-500/20">
              Technologies
            </motion.span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Built With{' '}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 via-cyan-500 to-violet-500">
                Modern Stack
              </span>
            </h2>
          </div>
        </ScrollReveal>

        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={cardContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {techCategories.map((cat) => (
            <motion.div key={cat.category} variants={cardVariants} className="group">
              <div className="h-full p-6 rounded-2xl bg-gray-50 dark:bg-[#1a2438]/80 border border-gray-200 dark:border-[#2d3f5f] hover:border-emerald-500/30 transition-all duration-300">
                <div className="flex items-center gap-3 mb-4">
                  <cat.icon className={`w-6 h-6 ${cat.color}`} />
                  <h3 className="font-bold text-gray-900 dark:text-white">{cat.category}</h3>
                </div>
                <div className="space-y-2">
                  {cat.technologies.map((tech) => (
                    <div key={tech} className="flex items-center gap-2 text-sm text-gray-600 dark:text-neutral-400">
                      <div className={`w-1.5 h-1.5 rounded-full ${cat.color.replace('text-', 'bg-')}`} />
                      {tech}
                    </div>
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

// Security & Performance Section
function SecuritySection() {
  const features = [
    {
      icon: Lock,
      title: 'HIPAA-Compliant Design',
      description: 'Session-based data isolation with 15-minute TTL ensures patient data privacy',
      color: 'text-emerald-500',
    },
    {
      icon: Clock,
      title: 'Sub-30s Response Time',
      description: 'Optimized pipeline delivers comprehensive analysis in under 30 seconds',
      color: 'text-cyan-500',
    },
    {
      icon: Zap,
      title: 'Real-time Streaming',
      description: 'Server-Sent Events provide live updates during AI processing',
      color: 'text-violet-500',
    },
    {
      icon: Activity,
      title: '98.5% Accuracy',
      description: 'Multi-agent validation ensures high accuracy in medical analysis',
      color: 'text-amber-500',
    },
  ];

  return (
    <section className="py-24 bg-gray-50 dark:bg-[#0a0e17] relative overflow-hidden">
      <TechnicalBackground />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <ScrollReveal>
          <div className="text-center mb-16">
            <motion.span className="inline-block px-4 py-2 rounded-full bg-violet-500/15 text-violet-600 dark:text-violet-400 text-sm font-medium mb-4 border border-violet-500/20">
              Security & Performance
            </motion.span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Enterprise{' '}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-violet-400 to-purple-500">
                Grade
              </span>
            </h2>
          </div>
        </ScrollReveal>

        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={cardContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {features.map((feature) => (
            <motion.div key={feature.title} variants={cardVariants} whileHover={{ y: -8 }} className="group">
              <TiltCard className="h-full">
                <div className="h-full p-6 rounded-2xl bg-white dark:bg-[#1a2438]/80 border border-gray-200 dark:border-[#2d3f5f] backdrop-blur-sm text-center">
                  <div className="w-14 h-14 rounded-2xl bg-gray-100 dark:bg-[#0a0e17] flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className={`w-7 h-7 ${feature.color}`} />
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

// CTA Section
function CTASection() {
  return (
    <section className="py-24 bg-white dark:bg-[#0c1628]/70 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50 dark:from-[#0a0e17] via-transparent to-gray-50 dark:to-[#0a0e17] pointer-events-none" />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          className="flex flex-col sm:flex-row justify-between items-center gap-6 p-8 rounded-3xl bg-gradient-to-br from-emerald-500/10 via-cyan-500/5 to-violet-500/10 border border-emerald-500/20 backdrop-blur-sm"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Ready to explore more?</h3>
            <p className="text-gray-600 dark:text-neutral-400">Check out the source code or try the live demo</p>
          </div>
          
          <div className="flex flex-wrap gap-3">
            <Button href="/projects" variant="ghost">
              <ArrowLeft className="w-4 h-4" />
              All Projects
            </Button>
            <HoverBorderGradient
              containerClassName="rounded-full"
              href="/contact"
              className="dark:bg-black bg-white text-black dark:text-white flex items-center gap-2 px-6 py-2"
            >
              <Zap className="w-4 h-4" />
              <span>Start a Project</span>
            </HoverBorderGradient>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// Main Page Component
export default function CuraSenseTechnicalPage() {
  return (
    <div className="relative">
      <ScrollProgress />
      <TechnicalHero />
      <TechnicalPageNav />
      <ArchitectureSection />
      <WorkflowSection />
      <CodeSection />
      <TechStackSection />
      <SecuritySection />
      <CTASection />
    </div>
  );
}
