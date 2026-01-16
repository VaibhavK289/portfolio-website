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
  Check,
  MessageSquare,
  HardDrive,
  Globe,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { getProjectBySlug } from '@/data/projects';
import {
  SparklesCore,
} from '@/components/ui/aceternity';
import {
  ScrollReveal,
  ScrollProgress,
  NeuralNode,
  DataFlowLine,
  aiCardContainerVariants,
  aiCardVariants,
} from '@/components/animations';
import { AllmaPageNav, AllmaBackground } from '../page';

// Technical Hero Section
function TechnicalHero() {
  return (
    <section className="relative py-16 sm:py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6"
        >
          <Link href="/projects/allma-studio" className="group inline-flex items-center gap-2 text-neutral-400 hover:text-violet-400 transition-colors text-sm">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Overview
          </Link>
        </motion.div>

        <div className="flex flex-col lg:flex-row items-start gap-8 lg:gap-16">
          <motion.div
            className="flex-1"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-500/10 border border-violet-500/20 mb-6">
              <Code2 className="w-4 h-4 text-violet-400" />
              <span className="text-sm font-medium text-violet-300">Technical Documentation</span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
              System{' '}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-violet-400 via-indigo-500 to-cyan-400">
                Architecture
              </span>
            </h1>
            
            <p className="text-lg text-neutral-400 max-w-2xl">
              Deep dive into Allma Studio&apos;s technical implementation, from the React frontend 
              to the FastAPI backend and local LLM integration via Ollama.
            </p>
          </motion.div>

          <motion.div
            className="flex flex-wrap gap-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <a
              href="https://github.com/VaibhavK289/Allma"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-white text-sm font-medium transition-colors"
            >
              <Github className="w-4 h-4" />
              View Source
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// Architecture Diagram Section
function ArchitectureSection() {
  const layers = [
    {
      name: 'Frontend Layer',
      icon: Globe,
      color: 'violet',
      components: ['React 18 SPA', 'Vite Build', 'TailwindCSS', 'Axios HTTP'],
    },
    {
      name: 'API Gateway',
      icon: Server,
      color: 'indigo',
      components: ['FastAPI', 'Uvicorn ASGI', 'CORS Protection', 'Rate Limiting'],
    },
    {
      name: 'Orchestration',
      icon: Workflow,
      color: 'cyan',
      components: ['Request Router', 'RAG Service', 'Conversation Service', 'Document Service'],
    },
    {
      name: 'Data Layer',
      icon: Database,
      color: 'emerald',
      components: ['ChromaDB Vectors', 'SQLite Sessions', 'Nomic Embeddings', 'Document Store'],
    },
    {
      name: 'LLM Layer',
      icon: Brain,
      color: 'amber',
      components: ['Ollama Runtime', 'DeepSeek R1', 'Gemma 2', 'Qwen 2.5 Coder'],
    },
  ];

  return (
    <section className="relative py-16 sm:py-24 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-500/10 border border-violet-500/20 mb-6">
              <Layers className="w-4 h-4 text-violet-400" />
              <span className="text-sm font-medium text-violet-300">System Layers</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">
              Layered Architecture
            </h2>
            <p className="text-neutral-400 max-w-2xl mx-auto">
              A clean separation of concerns with five distinct layers
            </p>
          </div>
        </ScrollReveal>

        <motion.div
          variants={aiCardContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-4"
        >
          {layers.map((layer, i) => (
            <motion.div
              key={layer.name}
              variants={aiCardVariants}
              className="relative p-4 sm:p-6 rounded-2xl bg-neutral-900/60 border border-neutral-800 hover:border-violet-500/30 transition-all"
            >
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <div className={`w-12 h-12 rounded-xl bg-${layer.color}-500/20 flex items-center justify-center flex-shrink-0`}>
                  <layer.icon className={`w-6 h-6 text-${layer.color}-400`} />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-white mb-2">{layer.name}</h3>
                  <div className="flex flex-wrap gap-2">
                    {layer.components.map((comp) => (
                      <span
                        key={comp}
                        className="px-2 py-1 text-xs rounded-md bg-neutral-800 text-neutral-300"
                      >
                        {comp}
                      </span>
                    ))}
                  </div>
                </div>
                {i < layers.length - 1 && (
                  <div className="hidden sm:block absolute -bottom-4 left-1/2 transform -translate-x-1/2 z-10">
                    <DataFlowLine width={2} color="#8b5cf6" vertical delay={i * 0.2} />
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// Data Flow Section
function DataFlowSection() {
  const steps = [
    { icon: MessageSquare, label: 'User Query', desc: 'Natural language input' },
    { icon: Server, label: 'API Gateway', desc: 'Request validation' },
    { icon: Workflow, label: 'Orchestrator', desc: 'Route to services' },
    { icon: Database, label: 'Vector Search', desc: 'Find relevant docs' },
    { icon: Brain, label: 'LLM Processing', desc: 'Generate response' },
    { icon: Zap, label: 'Streaming', desc: 'Token-by-token output' },
  ];

  return (
    <section className="relative py-16 sm:py-24 px-4 sm:px-6 bg-gradient-to-b from-transparent via-violet-950/10 to-transparent">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 mb-6">
              <Activity className="w-4 h-4 text-cyan-400" />
              <span className="text-sm font-medium text-cyan-300">Request Lifecycle</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">
              Data Flow Pipeline
            </h2>
          </div>
        </ScrollReveal>

        <div className="relative">
          {/* Connection line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-violet-500/20 via-cyan-500/40 to-violet-500/20 transform -translate-y-1/2" />
          
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {steps.map((step, i) => (
              <motion.div
                key={step.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative flex flex-col items-center text-center"
              >
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-violet-500/20 to-cyan-500/20 border border-violet-500/30 flex items-center justify-center mb-3 relative z-10">
                  <step.icon className="w-6 h-6 text-violet-400" />
                </div>
                <h4 className="text-sm font-medium text-white mb-1">{step.label}</h4>
                <p className="text-xs text-neutral-500">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// Tech Stack Details Section
function TechStackSection() {
  const stacks = [
    {
      category: 'Frontend',
      icon: Globe,
      color: 'violet',
      items: [
        { name: 'React', version: '18.3.1', desc: 'UI Framework' },
        { name: 'Vite', version: '5.2.11', desc: 'Build Tool' },
        { name: 'TailwindCSS', version: '3.4.3', desc: 'Styling' },
        { name: 'Axios', version: '1.7.2', desc: 'HTTP Client' },
        { name: 'React Markdown', version: '9.0.1', desc: 'Markdown Rendering' },
        { name: 'Lucide React', version: '0.378.0', desc: 'Icons' },
      ],
    },
    {
      category: 'Backend',
      icon: Server,
      color: 'indigo',
      items: [
        { name: 'Python', version: '3.11+', desc: 'Runtime' },
        { name: 'FastAPI', version: '0.115.0', desc: 'Web Framework' },
        { name: 'Uvicorn', version: '0.31.1', desc: 'ASGI Server' },
        { name: 'SQLAlchemy', version: '2.0.36', desc: 'ORM' },
        { name: 'ChromaDB', version: '0.5.17', desc: 'Vector DB' },
        { name: 'httpx', version: '0.28.1', desc: 'Async HTTP' },
      ],
    },
    {
      category: 'AI/ML',
      icon: Brain,
      color: 'cyan',
      items: [
        { name: 'Ollama', version: 'Latest', desc: 'Local LLM Runtime' },
        { name: 'Nomic Embed', version: 'Text', desc: 'Embeddings Model' },
        { name: 'DeepSeek R1', version: '5.2GB', desc: 'Reasoning LLM' },
        { name: 'Gemma 2', version: '9B', desc: 'General LLM' },
        { name: 'Qwen 2.5', version: 'Coder', desc: 'Code LLM' },
        { name: 'LLaMA 3.2', version: '2GB', desc: 'Fast LLM' },
      ],
    },
    {
      category: 'Infrastructure',
      icon: HardDrive,
      color: 'emerald',
      items: [
        { name: 'Docker', version: 'Latest', desc: 'Containerization' },
        { name: 'Docker Compose', version: 'v2', desc: 'Orchestration' },
        { name: 'Kubernetes', version: 'v1.28+', desc: 'Container Orchestration' },
        { name: 'Helm', version: 'v3', desc: 'K8s Package Manager' },
        { name: 'GitHub Actions', version: 'CI/CD', desc: 'Automation' },
        { name: 'Vercel', version: 'Edge', desc: 'Frontend Hosting' },
      ],
    },
  ];

  return (
    <section className="relative py-16 sm:py-24 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-500/10 border border-violet-500/20 mb-6">
              <Cpu className="w-4 h-4 text-violet-400" />
              <span className="text-sm font-medium text-violet-300">Technology Stack</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">
              Built With Modern Tools
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {stacks.map((stack) => (
            <motion.div
              key={stack.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-6 rounded-2xl bg-neutral-900/60 border border-neutral-800"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-10 h-10 rounded-lg bg-${stack.color}-500/20 flex items-center justify-center`}>
                  <stack.icon className={`w-5 h-5 text-${stack.color}-400`} />
                </div>
                <h3 className="text-lg font-semibold text-white">{stack.category}</h3>
              </div>
              
              <div className="space-y-3">
                {stack.items.map((item) => (
                  <div key={item.name} className="flex items-center justify-between py-2 border-b border-neutral-800 last:border-0">
                    <div>
                      <span className="text-sm font-medium text-white">{item.name}</span>
                      <span className="text-xs text-neutral-500 ml-2">{item.version}</span>
                    </div>
                    <span className="text-xs text-neutral-400">{item.desc}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Security Section
function SecuritySection() {
  const features = [
    { icon: Lock, title: 'Zero Telemetry', desc: 'No data collection whatsoever' },
    { icon: Shield, title: 'CORS Protection', desc: 'Configurable cross-origin security' },
    { icon: Clock, title: 'Rate Limiting', desc: 'Built-in API throttling' },
    { icon: HardDrive, title: 'Non-root Containers', desc: 'Security-hardened Docker images' },
  ];

  return (
    <section className="relative py-16 sm:py-24 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-6">
              <Shield className="w-4 h-4 text-emerald-400" />
              <span className="text-sm font-medium text-emerald-300">Security & Privacy</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">
              Security First Design
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-4 rounded-xl bg-neutral-900/60 border border-neutral-800 hover:border-emerald-500/30 transition-colors"
            >
              <feature.icon className="w-8 h-8 text-emerald-400 mb-3" />
              <h4 className="text-sm font-medium text-white mb-1">{feature.title}</h4>
              <p className="text-xs text-neutral-400">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Navigation Footer
function NavigationFooter() {
  return (
    <section className="relative py-8 px-4 sm:px-6 border-t border-neutral-800">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <Link
          href="/projects/allma-studio"
          className="group inline-flex items-center gap-2 text-neutral-400 hover:text-violet-400 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Overview
        </Link>
        
        <Link
          href="/projects/allma-studio/docs"
          className="group inline-flex items-center gap-2 text-neutral-400 hover:text-violet-400 transition-colors"
        >
          Documentation
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </section>
  );
}

export default function AllmaTechnicalPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#08080c] via-[#0a0a12] to-[#0c0c14] text-white overflow-x-hidden">
      <ScrollProgress />
      
      <div className="fixed inset-0 pointer-events-none">
        <AllmaBackground />
      </div>

      <AllmaPageNav currentPage="technical" />

      <TechnicalHero />
      <ArchitectureSection />
      <DataFlowSection />
      <TechStackSection />
      <SecuritySection />
      <NavigationFooter />
    </div>
  );
}
