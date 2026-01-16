'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  ArrowLeft,
  ArrowRight,
  Lightbulb,
  Target,
  Brain,
  Shield,
  Zap,
  Users,
  FileText,
  Search,
  MessageSquare,
  CheckCircle2,
  XCircle,
  TrendingUp,
  Globe,
  Lock,
  Server,
  Cpu,
  Database,
  Activity,
  Layers,
  Sparkles,
  CloudOff,
  Eye,
  Workflow,
  Star,
  ChevronRight,
} from 'lucide-react';
import {
  ScrollReveal,
  ScrollProgress,
} from '@/components/animations';
import { AllmaPageNav, AllmaBackground } from '../page';

// Deep Dive Hero
function DeepDiveHero() {
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

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-500/10 border border-violet-500/20 mb-6">
            <Lightbulb className="w-4 h-4 text-violet-400" />
            <span className="text-sm font-medium text-violet-300">Research & Analysis</span>
          </div>
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            Deep Dive:{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-violet-400 via-indigo-500 to-cyan-400">
              Project Genesis
            </span>
          </h1>
          
          <p className="text-lg text-neutral-400 max-w-2xl">
            Understanding the problem space, design decisions, and technical innovations behind Allma Studio.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

// Problem Statement Section
function ProblemStatementSection() {
  const problems = [
    {
      icon: Globe,
      problem: 'Cloud-Only AI Solutions',
      description: 'Most AI assistants require internet connectivity and send data to external servers',
      impact: 'Privacy concerns, data leakage, subscription costs, dependency on third-party services',
    },
    {
      icon: Lock,
      problem: 'No Control Over Data',
      description: 'Users cannot control where their conversations and documents are processed',
      impact: 'Compliance issues, intellectual property risks, sensitive information exposure',
    },
    {
      icon: Cpu,
      problem: 'Hardware Underutilization',
      description: 'Modern consumer GPUs are capable of running powerful AI models locally',
      impact: 'Wasted potential, unnecessary cloud costs, latency in responses',
    },
    {
      icon: Layers,
      problem: 'No Document Context',
      description: 'Most local AI tools lack the ability to understand uploaded documents',
      impact: 'Limited usefulness for research, analysis, and knowledge work',
    },
  ];

  return (
    <section className="relative py-12 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4 flex items-center gap-3">
            <Target className="w-6 h-6 text-red-400" />
            The Problem Space
          </h2>
          <p className="text-neutral-400 mb-8 max-w-2xl">
            Why did this project need to exist? Understanding the gaps in the current AI landscape.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {problems.map((item, index) => (
            <motion.div
              key={item.problem}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="p-6 rounded-2xl bg-neutral-900/60 border border-neutral-800 hover:border-red-500/30 transition-colors"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center shrink-0">
                  <item.icon className="w-6 h-6 text-red-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">{item.problem}</h3>
                  <p className="text-sm text-neutral-400 mb-3">{item.description}</p>
                  <div className="flex items-center gap-2 text-xs text-red-400">
                    <XCircle className="w-3 h-3" />
                    <span>{item.impact}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Solution Approach Section
function SolutionApproachSection() {
  const solutions = [
    {
      icon: CloudOff,
      title: 'Fully Offline Operation',
      description: 'All processing happens locally - no internet required after initial setup',
      benefit: 'Complete privacy, zero data transmission',
    },
    {
      icon: Brain,
      title: 'RAG-Enhanced Context',
      description: 'Retrieval-Augmented Generation for intelligent document understanding',
      benefit: 'Contextual, accurate responses from your documents',
    },
    {
      icon: Database,
      title: 'Local Vector Store',
      description: 'ChromaDB persists embeddings locally for fast semantic search',
      benefit: 'Your knowledge base stays on your machine',
    },
    {
      icon: Sparkles,
      title: 'Model Flexibility',
      description: 'Choose any Ollama-compatible model based on your needs',
      benefit: 'Balance between capability and performance',
    },
  ];

  return (
    <section className="relative py-12 px-4 sm:px-6 bg-gradient-to-b from-transparent via-violet-950/10 to-transparent">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4 flex items-center gap-3">
            <Lightbulb className="w-6 h-6 text-amber-400" />
            The Solution
          </h2>
          <p className="text-neutral-400 mb-8 max-w-2xl">
            How Allma Studio addresses each problem with thoughtful design decisions.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {solutions.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="p-6 rounded-2xl bg-neutral-900/60 border border-neutral-800 hover:border-emerald-500/30 transition-colors"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center shrink-0">
                  <item.icon className="w-6 h-6 text-emerald-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                  <p className="text-sm text-neutral-400 mb-3">{item.description}</p>
                  <div className="flex items-center gap-2 text-xs text-emerald-400">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>{item.benefit}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// RAG Pipeline Deep Dive
function RAGPipelineSection() {
  const stages = [
    {
      stage: '01',
      title: 'Document Ingestion',
      description: 'User uploads documents (PDF, TXT, MD) through the React frontend',
      details: [
        'Multipart form upload with progress tracking',
        'File type validation and size limits',
        'Async processing queue for large files',
      ],
      color: 'violet',
    },
    {
      stage: '02',
      title: 'Text Extraction',
      description: 'Documents are parsed and text content is extracted',
      details: [
        'PyMuPDF for PDF text extraction',
        'Encoding detection for text files',
        'Markdown formatting preservation',
      ],
      color: 'indigo',
    },
    {
      stage: '03',
      title: 'Intelligent Chunking',
      description: 'Text is split into overlapping semantic chunks',
      details: [
        'RecursiveCharacterTextSplitter algorithm',
        'Configurable chunk size (default: 1000 tokens)',
        '200 token overlap for context continuity',
      ],
      color: 'blue',
    },
    {
      stage: '04',
      title: 'Embedding Generation',
      description: 'Each chunk is converted to a high-dimensional vector',
      details: [
        'Nomic Embed Text model (768 dimensions)',
        'Batched processing for efficiency',
        'GPU acceleration when available',
      ],
      color: 'cyan',
    },
    {
      stage: '05',
      title: 'Vector Storage',
      description: 'Embeddings are persisted in ChromaDB for retrieval',
      details: [
        'Cosine similarity indexing',
        'Metadata storage (filename, page, chunk ID)',
        'Persistent storage with backup support',
      ],
      color: 'teal',
    },
    {
      stage: '06',
      title: 'Query Processing',
      description: 'User questions trigger semantic search and context assembly',
      details: [
        'Query embedding generation',
        'Top-K similar chunks retrieval',
        'Context window optimization',
      ],
      color: 'emerald',
    },
  ];

  const getColorClasses = (color: string) => {
    const colorMap: Record<string, { bg: string; border: string; text: string }> = {
      violet: { bg: 'bg-violet-500/20', border: 'border-violet-500/30', text: 'text-violet-400' },
      indigo: { bg: 'bg-indigo-500/20', border: 'border-indigo-500/30', text: 'text-indigo-400' },
      blue: { bg: 'bg-blue-500/20', border: 'border-blue-500/30', text: 'text-blue-400' },
      cyan: { bg: 'bg-cyan-500/20', border: 'border-cyan-500/30', text: 'text-cyan-400' },
      teal: { bg: 'bg-teal-500/20', border: 'border-teal-500/30', text: 'text-teal-400' },
      emerald: { bg: 'bg-emerald-500/20', border: 'border-emerald-500/30', text: 'text-emerald-400' },
    };
    return colorMap[color] || colorMap.violet;
  };

  return (
    <section className="relative py-12 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4 flex items-center gap-3">
            <Workflow className="w-6 h-6 text-violet-400" />
            RAG Pipeline Deep Dive
          </h2>
          <p className="text-neutral-400 mb-8 max-w-2xl">
            A detailed look at how documents become intelligent context for AI responses.
          </p>
        </ScrollReveal>

        <div className="space-y-4">
          {stages.map((stage, index) => {
            const colors = getColorClasses(stage.color);
            return (
              <motion.div
                key={stage.stage}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`p-6 rounded-2xl bg-neutral-900/60 border ${colors.border}`}
              >
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className={`w-12 h-12 rounded-xl ${colors.bg} flex items-center justify-center shrink-0`}>
                    <span className={`text-lg font-bold ${colors.text}`}>{stage.stage}</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-white mb-2">{stage.title}</h3>
                    <p className="text-sm text-neutral-400 mb-3">{stage.description}</p>
                    <ul className="space-y-1">
                      {stage.details.map((detail, i) => (
                        <li key={i} className="flex items-center gap-2 text-xs text-neutral-500">
                          <ChevronRight className={`w-3 h-3 ${colors.text}`} />
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// Design Decisions Section
function DesignDecisionsSection() {
  const decisions = [
    {
      question: 'Why Ollama over other local LLM solutions?',
      answer: 'Ollama provides the best balance of ease-of-use, model variety, and performance. Its simple CLI and API make it accessible, while supporting state-of-the-art open models like DeepSeek, Gemma, and Qwen.',
      alternatives: ['llama.cpp', 'LocalAI', 'text-generation-webui'],
    },
    {
      question: 'Why ChromaDB for vector storage?',
      answer: 'ChromaDB offers excellent Python integration, persistent storage, and supports multiple embedding backends. Its lightweight design is perfect for local deployment without complex infrastructure.',
      alternatives: ['Pinecone', 'Weaviate', 'Milvus', 'FAISS'],
    },
    {
      question: 'Why FastAPI for the backend?',
      answer: 'FastAPI provides async support critical for streaming LLM responses, automatic OpenAPI documentation, and excellent performance. Its type hints improve code quality and developer experience.',
      alternatives: ['Flask', 'Django', 'Express.js'],
    },
    {
      question: 'Why React with Vite for the frontend?',
      answer: 'Vite offers instant HMR and fast builds, while React provides component reusability for the complex chat interface. TypeScript integration ensures type safety across the stack.',
      alternatives: ['Next.js', 'Vue', 'Svelte'],
    },
  ];

  return (
    <section className="relative py-12 px-4 sm:px-6 bg-gradient-to-b from-transparent via-indigo-950/10 to-transparent">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4 flex items-center gap-3">
            <Eye className="w-6 h-6 text-indigo-400" />
            Design Decisions
          </h2>
          <p className="text-neutral-400 mb-8 max-w-2xl">
            Understanding the &ldquo;why&rdquo; behind key architectural choices.
          </p>
        </ScrollReveal>

        <div className="space-y-6">
          {decisions.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="p-6 rounded-2xl bg-neutral-900/60 border border-neutral-800"
            >
              <h3 className="text-lg font-semibold text-violet-400 mb-3">{item.question}</h3>
              <p className="text-sm text-neutral-300 mb-4">{item.answer}</p>
              <div className="flex flex-wrap gap-2">
                <span className="text-xs text-neutral-500">Alternatives considered:</span>
                {item.alternatives.map((alt) => (
                  <span key={alt} className="px-2 py-0.5 text-xs rounded bg-neutral-800 text-neutral-400">
                    {alt}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Future Roadmap Section
function FutureRoadmapSection() {
  const roadmap = [
    {
      phase: 'Phase 1',
      title: 'Core Enhancements',
      items: ['Multi-user support', 'Conversation history export', 'Custom system prompts'],
      status: 'in-progress',
    },
    {
      phase: 'Phase 2',
      title: 'Advanced Features',
      items: ['Multi-modal support (images)', 'Code execution sandbox', 'Agent workflows'],
      status: 'planned',
    },
    {
      phase: 'Phase 3',
      title: 'Enterprise Features',
      items: ['SSO integration', 'Audit logging', 'Role-based access control'],
      status: 'planned',
    },
  ];

  return (
    <section className="relative py-12 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4 flex items-center gap-3">
            <TrendingUp className="w-6 h-6 text-cyan-400" />
            Future Roadmap
          </h2>
          <p className="text-neutral-400 mb-8 max-w-2xl">
            What&apos;s next for Allma Studio - planned features and improvements.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {roadmap.map((phase, index) => (
            <motion.div
              key={phase.phase}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="p-6 rounded-2xl bg-neutral-900/60 border border-neutral-800"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="text-xs font-medium px-2 py-1 rounded bg-violet-500/20 text-violet-400">
                  {phase.phase}
                </span>
                {phase.status === 'in-progress' && (
                  <span className="text-xs font-medium px-2 py-1 rounded bg-amber-500/20 text-amber-400">
                    In Progress
                  </span>
                )}
              </div>
              <h3 className="text-lg font-semibold text-white mb-3">{phase.title}</h3>
              <ul className="space-y-2">
                {phase.items.map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-neutral-400">
                    <Star className="w-3 h-3 text-cyan-400" />
                    {item}
                  </li>
                ))}
              </ul>
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
      <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <Link
          href="/projects/allma-studio/docs"
          className="group inline-flex items-center gap-2 text-neutral-400 hover:text-violet-400 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Documentation
        </Link>
        
        <Link
          href="/projects/allma-studio"
          className="group inline-flex items-center gap-2 text-neutral-400 hover:text-violet-400 transition-colors"
        >
          Back to Overview
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </section>
  );
}

export default function AllmaDeepDivePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#08080c] via-[#0a0a12] to-[#0c0c14] text-white overflow-x-hidden">
      <ScrollProgress />
      
      <div className="fixed inset-0 pointer-events-none">
        <AllmaBackground />
      </div>

      <AllmaPageNav currentPage="deep-dive" />

      <DeepDiveHero />
      <ProblemStatementSection />
      <SolutionApproachSection />
      <RAGPipelineSection />
      <DesignDecisionsSection />
      <FutureRoadmapSection />
      <NavigationFooter />
    </div>
  );
}
