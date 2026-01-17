'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { 
  ArrowLeft,
  BookOpen,
  Shield,
  Brain,
  Cpu,
  Database,
  Server,
  Layers,
  Workflow,
  Network,
  GitBranch,
  FileText,
  Eye,
  MessageSquare,
  Zap,
  Lock,
  Clock,
  Users,
  Target,
  Lightbulb,
  AlertTriangle,
  CheckCircle2,
  ArrowRight,
  Code2,
  Boxes,
  Cog,
  Share2,
  ChevronRight,
  Github,
  ExternalLink,
  Search,
  Activity,
  RefreshCcw,
  Sparkles,
  CloudOff,
  Globe,
  HardDrive,
  XCircle,
  LayoutDashboard,
  Table2,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import {
  SparklesCore,
  HoverBorderGradient,
} from '@/components/ui/aceternity';
import {
  ScrollReveal,
  ScrollProgress,
  NeuralNode,
  cardContainerVariants,
  cardVariants,
  easings,
} from '@/components/animations';
import { AllmaPageNav, AllmaBackground } from '../page';
import { useLowPerformance } from '@/lib/utils';
import { useState } from 'react';

// Shared background component - AI Themed
function DeepDiveBackground() {
  const isLowPerf = useLowPerformance();
  if (isLowPerf) {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-20 w-96 h-96 bg-violet-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-40 left-10 w-80 h-80 bg-indigo-500/15 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-cyan-500/10 rounded-full blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(139,92,246,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(139,92,246,0.02)_1px,transparent_1px)] bg-[size:50px_50px]" />
      </div>
    );
  }
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <motion.div 
        className="absolute top-20 right-20 w-96 h-96 bg-violet-500/20 rounded-full blur-3xl"
        animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div 
        className="absolute bottom-40 left-10 w-80 h-80 bg-indigo-500/15 rounded-full blur-3xl"
        animate={{ scale: [1, 1.15, 1], opacity: [0.15, 0.3, 0.15] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
      />
      <motion.div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-3xl"
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      />
      <div className="absolute inset-0 w-full h-full hidden md:block">
        <SparklesCore
          id="deepdive-sparkles"
          background="transparent"
          minSize={0.3}
          maxSize={1}
          particleDensity={8}
          className="w-full h-full"
          particleColor="#8b5cf6"
        />
      </div>
      {/* Neural Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(139,92,246,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(139,92,246,0.02)_1px,transparent_1px)] bg-[size:50px_50px]" />
    </div>
  );
}

// Table of Contents Component
function TableOfContents() {
  const sections = [
    { id: 'problem', title: 'Problem Statement', icon: Target },
    { id: 'architecture', title: 'System Architecture', icon: LayoutDashboard },
    { id: 'rag', title: 'RAG Pipeline', icon: Search },
    { id: 'ingestion', title: 'Document Ingestion', icon: FileText },
    { id: 'orchestration', title: 'Orchestration Layer', icon: Workflow },
    { id: 'vector', title: 'Vector Store', icon: Database },
    { id: 'database', title: 'Database Design', icon: Table2 },
    { id: 'streaming', title: 'Real-Time Streaming', icon: Activity },
    { id: 'privacy', title: 'Privacy & Security', icon: Lock },
    { id: 'challenges', title: 'Challenges & Solutions', icon: AlertTriangle },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="hidden lg:block absolute left-8 top-[6.5rem] z-30"
    >
      <div className="sticky top-32">
        <div className="p-4 rounded-2xl bg-[#0a0a12]/80 border border-violet-900/30 backdrop-blur-sm">
          <p className="text-xs font-semibold text-neutral-500 mb-3 uppercase tracking-wider">Contents</p>
          <nav className="space-y-1">
            {sections.map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-neutral-400 hover:text-violet-400 hover:bg-violet-500/10 transition-colors group"
              >
                <section.icon className="w-4 h-4 group-hover:text-violet-400 transition-colors" />
                <span>{section.title}</span>
              </a>
            ))}
          </nav>
        </div>
      </div>
    </motion.div>
  );
}

// Hero Section
function DeepDiveHero() {
  return (
    <section className="relative py-24 overflow-hidden bg-gradient-to-br from-[#050508] via-[#08080c] to-[#0a0a12]">
      <DeepDiveBackground />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link
            href="/projects/allma-studio"
            className="inline-flex items-center gap-2 text-neutral-400 hover:text-violet-400 mb-8 group transition-colors"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Overview
          </Link>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: easings.smooth }}
          className="text-center"
        >
          <motion.span 
            className="inline-block px-4 py-2 rounded-full bg-violet-500/15 text-violet-400 text-sm font-medium mb-6 border border-violet-500/20"
          >
            <BookOpen className="w-4 h-4 inline mr-2" />
            Technical Deep-Dive
          </motion.span>
          
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Understanding{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-violet-400 via-indigo-500 to-cyan-500">
              Allma Studio
            </span>
          </h1>
          
          <p className="text-xl text-neutral-400 mb-8 leading-relaxed max-w-3xl mx-auto">
            A comprehensive exploration of the architectural decisions, RAG implementation, and engineering challenges behind building a privacy-first local AI chat platform.
          </p>
          
          <div className="flex flex-wrap justify-center gap-6 text-sm text-neutral-500">
            <span className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              20 min read
            </span>
            <span className="flex items-center gap-2">
              <Code2 className="w-4 h-4" />
              Technical Content
            </span>
            <span className="flex items-center gap-2">
              <Brain className="w-4 h-4" />
              AI/RAG Focus
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// Content Section Component
function ContentSection({ 
  id, 
  badge, 
  badgeIcon: BadgeIcon,
  badgeColor,
  title, 
  children 
}: { 
  id: string; 
  badge: string; 
  badgeIcon: React.ElementType;
  badgeColor: string;
  title: string; 
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="py-16 scroll-mt-32">
      <ScrollReveal>
        <motion.span 
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${badgeColor} text-sm font-medium mb-6 border`}
        >
          <BadgeIcon className="w-4 h-4" />
          {badge}
        </motion.span>
        <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-white to-neutral-500 bg-clip-text text-transparent mb-8">
          {title}
        </h2>
        <div className="prose prose-lg prose-invert max-w-none prose-headings:text-white prose-p:text-neutral-400 prose-strong:text-white prose-a:text-violet-400">
          {children}
        </div>
      </ScrollReveal>
    </section>
  );
}

// Highlight Box Component
function HighlightBox({ 
  icon: Icon, 
  title, 
  children, 
  color = 'violet' 
}: { 
  icon: React.ElementType; 
  title: string; 
  children: React.ReactNode;
  color?: 'violet' | 'cyan' | 'indigo' | 'amber' | 'emerald';
}) {
  const colors = {
    violet: 'bg-violet-500/10 border-violet-500/20 text-violet-400',
    cyan: 'bg-cyan-500/10 border-cyan-500/20 text-cyan-400',
    indigo: 'bg-indigo-500/10 border-indigo-500/20 text-indigo-400',
    amber: 'bg-amber-500/10 border-amber-500/20 text-amber-400',
    emerald: 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400',
  };

  return (
    <div className={`p-6 rounded-2xl border ${colors[color]} my-8`}>
      <div className="flex items-start gap-4">
        <div className={`w-10 h-10 rounded-xl ${colors[color]} flex items-center justify-center flex-shrink-0`}>
          <Icon className="w-5 h-5" />
        </div>
        <div>
          <h4 className="font-bold bg-gradient-to-r from-white to-neutral-500 bg-clip-text text-transparent mb-2">{title}</h4>
          <div className="text-neutral-400">{children}</div>
        </div>
      </div>
    </div>
  );
}

// Diagram Component with Lightbox
function DiagramImage({ 
  src, 
  alt, 
  caption 
}: { 
  src: string; 
  alt: string; 
  caption: string;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <motion.div 
        className="my-10 cursor-pointer group"
        onClick={() => setIsOpen(true)}
        whileHover={{ scale: 1.01 }}
        transition={{ duration: 0.2 }}
      >
        <div className="relative rounded-2xl overflow-hidden border border-violet-500/20 bg-white/5 backdrop-blur-sm">
          <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 to-cyan-500/5" />
          <div className="relative p-4 sm:p-6">
            <Image
              src={src}
              alt={alt}
              width={1200}
              height={800}
              className="w-full h-auto rounded-xl"
              style={{ objectFit: 'contain' }}
            />
          </div>
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
            <div className="px-4 py-2 bg-violet-500/90 rounded-lg text-white text-sm font-medium flex items-center gap-2">
              <Eye className="w-4 h-4" />
              Click to enlarge
            </div>
          </div>
        </div>
        <p className="text-center text-sm text-neutral-500 mt-4 italic">{caption}</p>
      </motion.div>

      {/* Lightbox Modal */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 sm:p-8"
          onClick={() => setIsOpen(false)}
        >
          <button
            className="absolute top-4 right-4 text-white/60 hover:text-white transition-colors"
            onClick={() => setIsOpen(false)}
          >
            <XCircle className="w-8 h-8" />
          </button>
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className="max-w-7xl max-h-[90vh] overflow-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={src}
              alt={alt}
              width={2000}
              height={1500}
              className="w-full h-auto rounded-xl"
              style={{ objectFit: 'contain' }}
            />
            <p className="text-center text-sm text-neutral-400 mt-4">{caption}</p>
          </motion.div>
        </motion.div>
      )}
    </>
  );
}

// Main Content
function MainContent() {
  return (
    <div className="relative">
      <TableOfContents />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      
      {/* Problem Statement */}
      <ContentSection 
        id="problem" 
        badge="The Challenge" 
        badgeIcon={Target}
        badgeColor="bg-red-500/15 text-red-400 border-red-500/20"
        title="Problem Statement: The AI Privacy Paradox"
      >
        <p>
          The modern AI landscape presents users with a fundamental trade-off: access to powerful large language models in exchange for their data. Every prompt sent to cloud-based AI services like ChatGPT, Claude, or Gemini is processed on remote servers, creating privacy concerns for individuals and compliance nightmares for organizations.
        </p>

        <p>
          Consider the implications: legal professionals cannot consult AI about sensitive cases, healthcare workers cannot analyze patient data, businesses cannot discuss proprietary strategies, and researchers cannot explore confidential findings. The most transformative technology of our time becomes off-limits for the most sensitive use cases.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-8">
          {[
            { icon: CloudOff, title: 'Data Sovereignty', desc: 'Your conversations processed on servers you don\'t control' },
            { icon: Zap, title: 'Subscription Fatigue', desc: 'Pay-per-token or monthly fees add up quickly' },
            { icon: Globe, title: 'Internet Dependency', desc: 'No connectivity means no AI assistance' },
            { icon: Lock, title: 'Model Limitations', desc: 'Locked into provider\'s model choices' },
          ].map((item, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-neutral-900/50 border border-neutral-800">
              <item.icon className="w-6 h-6 text-amber-400 mb-2" />
              <h4 className="font-semibold text-white mb-1">{item.title}</h4>
              <p className="text-sm text-neutral-500">{item.desc}</p>
            </div>
          ))}
        </div>

        <HighlightBox icon={Target} title="The Core Problem" color="amber">
          How do we deliver the power of modern LLMs—including contextual understanding of personal documents—while ensuring that sensitive data never leaves the user&apos;s machine? And can we do this without requiring a PhD in machine learning?
        </HighlightBox>

        <p>
          Allma Studio was conceived to solve this problem: a full-stack AI application that runs entirely locally, combining the conversational capabilities of modern LLMs with document-grounded RAG responses, all while maintaining complete user privacy and zero cloud dependency.
        </p>
      </ContentSection>

      {/* System Architecture */}
      <ContentSection 
        id="architecture" 
        badge="Architecture" 
        badgeIcon={LayoutDashboard}
        badgeColor="bg-violet-500/15 text-violet-400 border-violet-500/20"
        title="System Architecture: A Layered Approach"
      >
        <p>
          Allma Studio follows a <strong>microservices-inspired monolith</strong> architecture, where the application is structured as independent services but deployed as a single unit. This provides the benefits of clean separation while avoiding the complexity of distributed systems.
        </p>

        <DiagramImage 
          src="/images/projects/allma-studio/architecture-diagram.jpg"
          alt="System Architecture Diagram"
          caption="High-level system architecture showing the four-layer design: Orchestration, Presentation, Intelligence, and Infrastructure layers"
        />

        <h3 className="text-2xl font-bold bg-gradient-to-r from-white to-neutral-500 bg-clip-text text-transparent mt-10 mb-4">Key Components</h3>

        <div className="overflow-x-auto my-6">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-neutral-800">
                <th className="py-3 px-4 text-left text-violet-400 font-semibold">Layer</th>
                <th className="py-3 px-4 text-left text-violet-400 font-semibold">Technology</th>
                <th className="py-3 px-4 text-left text-violet-400 font-semibold">Responsibility</th>
              </tr>
            </thead>
            <tbody className="text-neutral-400">
              <tr className="border-b border-neutral-800/50">
                <td className="py-3 px-4 text-white font-medium">Orchestration</td>
                <td className="py-3 px-4">Tauri Core Process</td>
                <td className="py-3 px-4">System tray, process spawning, Python sidecar management</td>
              </tr>
              <tr className="border-b border-neutral-800/50">
                <td className="py-3 px-4 text-white font-medium">Presentation</td>
                <td className="py-3 px-4">React + Vite</td>
                <td className="py-3 px-4">User interface, API communication, markdown rendering</td>
              </tr>
              <tr className="border-b border-neutral-800/50">
                <td className="py-3 px-4 text-white font-medium">Intelligence</td>
                <td className="py-3 px-4">FastAPI + Python</td>
                <td className="py-3 px-4">API endpoints, streaming, RAG engine, Ollama integration</td>
              </tr>
              <tr className="border-b border-neutral-800/50">
                <td className="py-3 px-4 text-white font-medium">Infrastructure</td>
                <td className="py-3 px-4">RTX GPU + LanceDB</td>
                <td className="py-3 px-4">GPU inference, local database, vector storage</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 className="text-2xl font-bold bg-gradient-to-r from-white to-neutral-500 bg-clip-text text-transparent mt-10 mb-4">The Presentation Layer</h3>
        <p>
          Built with React and Vite, the frontend prioritizes developer experience and user responsiveness. Vite&apos;s instant Hot Module Replacement accelerates development cycles, while React&apos;s component model enables the rich, interactive chat interface users expect from modern AI applications.
        </p>

        <p>
          TailwindCSS powers the styling system, providing utility-first classes that enable rapid UI iteration. The dark/light mode toggle uses CSS custom properties and local storage for persistence, respecting system preferences while allowing manual override.
        </p>

        <h3 className="text-2xl font-bold bg-gradient-to-r from-white to-neutral-500 bg-clip-text text-transparent mt-10 mb-4">The Intelligence Layer</h3>
        <p>
          FastAPI serves as the backend framework, chosen specifically for its async-first architecture and automatic OpenAPI documentation. The async support is critical: when users send messages, the backend must simultaneously query the vector store, construct prompts, and stream responses—all without blocking other requests.
        </p>

        <HighlightBox icon={Layers} title="Why SSE Over WebSockets?" color="cyan">
          WebSocket connections are bidirectional, adding complexity for a use case that&apos;s fundamentally unidirectional. Server-Sent Events (SSE) work over standard HTTP, require no special proxy configuration, and maintain connection through standard HTTP infrastructure—crucial for deployment flexibility.
        </HighlightBox>
      </ContentSection>

      {/* RAG Pipeline */}
      <ContentSection 
        id="rag" 
        badge="AI Pipeline" 
        badgeIcon={Search}
        badgeColor="bg-cyan-500/15 text-cyan-400 border-cyan-500/20"
        title="RAG Implementation Architecture"
      >
        <p>
          Retrieval-Augmented Generation transforms Allma from a simple chat interface into a knowledge-aware assistant. Users upload their documents, and the system automatically extracts, chunks, embeds, and indexes the content—creating a searchable knowledge base that grounds every response in user-provided context.
        </p>

        <DiagramImage 
          src="/images/projects/allma-studio/RAG_Implementation_Architecture_Diagram.jpg"
          alt="RAG Implementation Architecture"
          caption="Complete RAG pipeline showing query processing through response generation with vector search and context assembly"
        />

        <h3 className="text-2xl font-bold bg-gradient-to-r from-white to-neutral-500 bg-clip-text text-transparent mt-10 mb-4">Query-Time Retrieval Flow</h3>
        <p>
          When RAG is enabled, each user query triggers a sophisticated retrieval pipeline that enriches the LLM prompt with relevant context:
        </p>

        <ol className="list-decimal pl-6 space-y-3 my-6">
          <li><strong>Query Embedding</strong> — The user&apos;s question is embedded using the same model as document chunks (Nomic Embed Text)</li>
          <li><strong>Similarity Search</strong> — LanceDB performs cosine similarity search to find the top-K most relevant chunks</li>
          <li><strong>Context Assembly</strong> — Retrieved chunks are formatted with source attribution and prepended to the system prompt</li>
          <li><strong>Prompt Construction</strong> — The orchestrator builds a complete prompt with context, instructions, and the user query</li>
          <li><strong>Streaming Generation</strong> — Ollama generates the response token-by-token via Server-Sent Events</li>
          <li><strong>Source Attribution</strong> — Chunk metadata is returned alongside the response for full transparency</li>
        </ol>

        <HighlightBox icon={Search} title="Why Vector Search?" color="cyan">
          Unlike keyword search, vector similarity captures semantic meaning. The query &quot;What are the contract termination conditions?&quot; will match document sections discussing &quot;early cancellation clauses&quot; or &quot;agreement dissolution terms&quot; even without exact word matches.
        </HighlightBox>
      </ContentSection>

      {/* Document Ingestion */}
      <ContentSection 
        id="ingestion" 
        badge="Data Pipeline" 
        badgeIcon={FileText}
        badgeColor="bg-emerald-500/15 text-emerald-400 border-emerald-500/20"
        title="Document Ingestion Pipeline"
      >
        <p>
          The ingestion pipeline transforms raw documents into searchable vector embeddings. This state machine ensures robust handling of various file formats while maintaining UI responsiveness through clear state transitions.
        </p>

        <DiagramImage 
          src="/images/projects/allma-studio/RAG_ingestion_Diagram.png"
          alt="RAG Ingestion State Diagram"
          caption="State machine showing the document ingestion flow from user upload through indexing with success/failure paths"
        />

        <h3 className="text-2xl font-bold bg-gradient-to-r from-white to-neutral-500 bg-clip-text text-transparent mt-10 mb-4">Ingestion Stages</h3>

        <div className="overflow-x-auto my-6">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-neutral-800">
                <th className="py-3 px-4 text-left text-emerald-400 font-semibold">Stage</th>
                <th className="py-3 px-4 text-left text-emerald-400 font-semibold">Component</th>
                <th className="py-3 px-4 text-left text-emerald-400 font-semibold">Description</th>
              </tr>
            </thead>
            <tbody className="text-neutral-400">
              <tr className="border-b border-neutral-800/50">
                <td className="py-3 px-4 text-white font-medium">Scanning</td>
                <td className="py-3 px-4">DocumentService</td>
                <td className="py-3 px-4">Detect file type, validate format (PDF, DOCX, MD, TXT, HTML)</td>
              </tr>
              <tr className="border-b border-neutral-800/50">
                <td className="py-3 px-4 text-white font-medium">Text Extraction</td>
                <td className="py-3 px-4">PyPDF2 / PyMuPDF</td>
                <td className="py-3 px-4">Parse documents with layout awareness, preserve structure</td>
              </tr>
              <tr className="border-b border-neutral-800/50">
                <td className="py-3 px-4 text-white font-medium">Chunking</td>
                <td className="py-3 px-4">RecursiveSplitter</td>
                <td className="py-3 px-4">Split into overlapping chunks (1000 chars, 200 overlap)</td>
              </tr>
              <tr className="border-b border-neutral-800/50">
                <td className="py-3 px-4 text-white font-medium">Embedding</td>
                <td className="py-3 px-4">Nomic-Embed-Text</td>
                <td className="py-3 px-4">Generate 768-dimensional vectors via Ollama</td>
              </tr>
              <tr className="border-b border-neutral-800/50">
                <td className="py-3 px-4 text-white font-medium">Indexing</td>
                <td className="py-3 px-4">LanceDB</td>
                <td className="py-3 px-4">Store embeddings with metadata for fast retrieval</td>
              </tr>
            </tbody>
          </table>
        </div>

        <HighlightBox icon={FileText} title="Why Overlapping Chunks?" color="violet">
          Semantic meaning often spans chunk boundaries. A 200-token overlap ensures that concepts split across chunks remain findable. If a user asks about &quot;the contract termination clause,&quot; both the clause text and its surrounding context will be retrievable.
        </HighlightBox>

        <h3 className="text-2xl font-bold bg-gradient-to-r from-white to-neutral-500 bg-clip-text text-transparent mt-10 mb-4">Supported File Types</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 my-6">
          {[
            { ext: '.pdf', name: 'PDF Documents' },
            { ext: '.docx', name: 'Microsoft Word' },
            { ext: '.md', name: 'Markdown' },
            { ext: '.txt', name: 'Plain Text' },
            { ext: '.html', name: 'HTML Files' },
            { ext: '.csv', name: 'CSV Data' },
          ].map((type, idx) => (
            <div key={idx} className="px-4 py-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-center">
              <span className="font-mono text-emerald-400 font-bold">{type.ext}</span>
              <p className="text-xs text-neutral-500 mt-1">{type.name}</p>
            </div>
          ))}
        </div>
      </ContentSection>

      {/* Orchestration Layer */}
      <ContentSection 
        id="orchestration" 
        badge="Core System" 
        badgeIcon={Workflow}
        badgeColor="bg-indigo-500/15 text-indigo-400 border-indigo-500/20"
        title="Orchestration Layer: The Central Brain"
      >
        <p>
          The orchestrator is the nervous system of Allma Studio—a central coordinator that manages the flow of data between services, maintains conversation state, and ensures each component receives the context it needs.
        </p>

        <h3 className="text-2xl font-bold bg-gradient-to-r from-white to-neutral-500 bg-clip-text text-transparent mt-10 mb-4">Backend Layer Overview</h3>
        <p>
          The backend follows a <strong>layered architecture</strong> with clear separation of concerns:
        </p>

        <pre className="bg-neutral-900 p-4 rounded-xl overflow-x-auto my-6 text-sm">
          <code className="text-violet-400">{`┌──────────────────────────────────────────────────┐
│              Presentation Layer                  │
│         (Routes / API Endpoints)                 │
├──────────────────────────────────────────────────┤
│              Orchestration Layer                 │
│         (Business Logic Coordinator)             │
├──────────────────────────────────────────────────┤
│               Service Layer                      │
│     (Domain-Specific Business Logic)             │
├──────────────────────────────────────────────────┤
│               Data Access Layer                  │
│    (Database, Vector Store, External APIs)       │
└──────────────────────────────────────────────────┘`}</code>
        </pre>

        <h3 className="text-2xl font-bold bg-gradient-to-r from-white to-neutral-500 bg-clip-text text-transparent mt-10 mb-4">Service Coordination</h3>
        <p>
          The orchestrator coordinates four primary services:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6">
          {[
            { icon: Search, name: 'RAGService', desc: 'Embedding generation, vector search, context assembly' },
            { icon: FileText, name: 'DocumentService', desc: 'File parsing, text chunking, metadata extraction' },
            { icon: Database, name: 'VectorStoreService', desc: 'LanceDB operations, similarity search' },
            { icon: MessageSquare, name: 'ConversationService', desc: 'Chat history, memory management' },
          ].map((service, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-indigo-500/10 border border-indigo-500/20">
              <service.icon className="w-6 h-6 text-indigo-400 mb-2" />
              <h4 className="font-semibold text-white font-mono text-sm mb-1">{service.name}</h4>
              <p className="text-xs text-neutral-500">{service.desc}</p>
            </div>
          ))}
        </div>

        <h3 className="text-2xl font-bold bg-gradient-to-r from-white to-neutral-500 bg-clip-text text-transparent mt-10 mb-4">Route Handlers</h3>

        <div className="overflow-x-auto my-6">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-neutral-800">
                <th className="py-3 px-4 text-left text-indigo-400 font-semibold">File</th>
                <th className="py-3 px-4 text-left text-indigo-400 font-semibold">Responsibility</th>
              </tr>
            </thead>
            <tbody className="text-neutral-400">
              <tr className="border-b border-neutral-800/50">
                <td className="py-3 px-4 text-white font-mono text-xs">chat.py</td>
                <td className="py-3 px-4">Chat message handling, streaming responses</td>
              </tr>
              <tr className="border-b border-neutral-800/50">
                <td className="py-3 px-4 text-white font-mono text-xs">rag.py</td>
                <td className="py-3 px-4">Document ingestion, RAG queries, search</td>
              </tr>
              <tr className="border-b border-neutral-800/50">
                <td className="py-3 px-4 text-white font-mono text-xs">models.py</td>
                <td className="py-3 px-4">Ollama model management, switching</td>
              </tr>
              <tr className="border-b border-neutral-800/50">
                <td className="py-3 px-4 text-white font-mono text-xs">health.py</td>
                <td className="py-3 px-4">System health checks, component status</td>
              </tr>
            </tbody>
          </table>
        </div>

        <HighlightBox icon={Workflow} title="Why Centralized Orchestration?" color="indigo">
          A single coordinator prevents circular dependencies, simplifies debugging, and provides a clear mental model for the system. When something goes wrong, the orchestrator logs reveal exactly where in the pipeline the issue occurred.
        </HighlightBox>
      </ContentSection>

      {/* Vector Store */}
      <ContentSection 
        id="vector" 
        badge="Data Layer" 
        badgeIcon={Database}
        badgeColor="bg-emerald-500/15 text-emerald-400 border-emerald-500/20"
        title="Vector Store: LanceDB for Semantic Search"
      >
        <p>
          LanceDB serves as the persistent vector database, storing document embeddings and enabling fast similarity search. Unlike cloud-based alternatives like Pinecone or Weaviate, LanceDB runs entirely locally with no external dependencies.
        </p>

        <h3 className="text-2xl font-bold bg-gradient-to-r from-white to-neutral-500 bg-clip-text text-transparent mt-10 mb-4">Why LanceDB?</h3>
        
        <ul className="list-disc pl-6 space-y-3 my-6">
          <li><strong>Zero Configuration</strong> — Works out of the box with sensible defaults</li>
          <li><strong>Python Native</strong> — First-class Python integration with type hints</li>
          <li><strong>Persistent Storage</strong> — Survives restarts with configurable data directory</li>
          <li><strong>Metadata Support</strong> — Store and filter by arbitrary metadata alongside vectors</li>
          <li><strong>Local-First</strong> — No cloud account, API key, or network required</li>
          <li><strong>Fast SIMD</strong> — Optimized vector operations using CPU SIMD instructions</li>
        </ul>

        <h3 className="text-2xl font-bold bg-gradient-to-r from-white to-neutral-500 bg-clip-text text-transparent mt-10 mb-4">Embedding Model Selection</h3>
        <p>
          Nomic Embed Text was selected as the embedding model for several reasons:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6">
          {[
            { label: 'Open Weights', value: 'Fully open source with commercial use' },
            { label: 'Performance', value: 'Competitive with proprietary models' },
            { label: 'Model Size', value: '274MB runs efficiently on consumer hardware' },
            { label: 'Dimensions', value: '768-dimensional embeddings' },
          ].map((item, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-neutral-900/50 border border-neutral-800">
              <span className="text-emerald-400 font-semibold text-sm">{item.label}</span>
              <p className="text-neutral-400 text-sm mt-1">{item.value}</p>
            </div>
          ))}
        </div>

        <HighlightBox icon={Database} title="Collection Strategy" color="emerald">
          Each conversation can optionally have its own collection, enabling isolated knowledge bases per project. A user working on multiple cases can maintain separate contexts that don&apos;t interfere with each other.
        </HighlightBox>
      </ContentSection>

      {/* Database Design */}
      <ContentSection 
        id="database" 
        badge="Data Model" 
        badgeIcon={Table2}
        badgeColor="bg-pink-500/15 text-pink-400 border-pink-500/20"
        title="Database Design: Entity Relationships"
      >
        <p>
          Allma Studio uses a combination of SQLite for conversation storage and LanceDB for vector embeddings. This hybrid approach optimizes each storage system for its specific use case.
        </p>

        <DiagramImage 
          src="/images/projects/allma-studio/Entity_Relationship_Diagram.png"
          alt="Entity Relationship Diagram"
          caption="Data model showing relationships between Session, Message, Document, and Chunk entities"
        />

        <h3 className="text-2xl font-bold bg-gradient-to-r from-white to-neutral-500 bg-clip-text text-transparent mt-10 mb-4">Key Entities</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
          {/* Session Entity */}
          <div className="p-5 rounded-xl bg-pink-500/10 border border-pink-500/20">
            <h4 className="font-bold text-pink-400 mb-3 flex items-center gap-2">
              <MessageSquare className="w-4 h-4" />
              SESSION
            </h4>
            <ul className="space-y-2 text-sm">
              <li className="flex justify-between"><span className="text-neutral-500">id</span><span className="text-neutral-400 font-mono">UUID (PK)</span></li>
              <li className="flex justify-between"><span className="text-neutral-500">name</span><span className="text-neutral-400 font-mono">string</span></li>
              <li className="flex justify-between"><span className="text-neutral-500">created_at</span><span className="text-neutral-400 font-mono">datetime</span></li>
              <li className="flex justify-between"><span className="text-neutral-500">model_used</span><span className="text-neutral-400 font-mono">string</span></li>
            </ul>
          </div>

          {/* Message Entity */}
          <div className="p-5 rounded-xl bg-cyan-500/10 border border-cyan-500/20">
            <h4 className="font-bold text-cyan-400 mb-3 flex items-center gap-2">
              <FileText className="w-4 h-4" />
              MESSAGE
            </h4>
            <ul className="space-y-2 text-sm">
              <li className="flex justify-between"><span className="text-neutral-500">id</span><span className="text-neutral-400 font-mono">int (PK)</span></li>
              <li className="flex justify-between"><span className="text-neutral-500">role</span><span className="text-neutral-400 font-mono">user/assistant</span></li>
              <li className="flex justify-between"><span className="text-neutral-500">content</span><span className="text-neutral-400 font-mono">text</span></li>
              <li className="flex justify-between"><span className="text-neutral-500">tokens</span><span className="text-neutral-400 font-mono">int</span></li>
              <li className="flex justify-between"><span className="text-neutral-500">is_rag_search</span><span className="text-neutral-400 font-mono">boolean</span></li>
            </ul>
          </div>

          {/* Document Entity */}
          <div className="p-5 rounded-xl bg-amber-500/10 border border-amber-500/20">
            <h4 className="font-bold text-amber-400 mb-3 flex items-center gap-2">
              <FileText className="w-4 h-4" />
              DOCUMENT
            </h4>
            <ul className="space-y-2 text-sm">
              <li className="flex justify-between"><span className="text-neutral-500">path</span><span className="text-neutral-400 font-mono">string</span></li>
              <li className="flex justify-between"><span className="text-neutral-500">checksum</span><span className="text-neutral-400 font-mono">string (hash)</span></li>
            </ul>
          </div>

          {/* Chunk Entity */}
          <div className="p-5 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
            <h4 className="font-bold text-emerald-400 mb-3 flex items-center gap-2">
              <Boxes className="w-4 h-4" />
              CHUNK
            </h4>
            <ul className="space-y-2 text-sm">
              <li className="flex justify-between"><span className="text-neutral-500">id</span><span className="text-neutral-400 font-mono">string (PK)</span></li>
              <li className="flex justify-between"><span className="text-neutral-500">embedding</span><span className="text-neutral-400 font-mono">Vector[768]</span></li>
              <li className="flex justify-between"><span className="text-neutral-500">raw_text</span><span className="text-neutral-400 font-mono">text</span></li>
            </ul>
          </div>
        </div>

        <h3 className="text-2xl font-bold bg-gradient-to-r from-white to-neutral-500 bg-clip-text text-transparent mt-10 mb-4">Key Relationships</h3>
        <ul className="list-disc pl-6 space-y-3 my-6">
          <li><strong>Session → Messages</strong> — One session contains many messages (1:N)</li>
          <li><strong>Document → Chunks</strong> — One document splits into many chunks (1:N)</li>
          <li><strong>Chunk → Embedding</strong> — Each chunk has exactly one vector (1:1)</li>
          <li><strong>Message → Sources</strong> — RAG messages reference multiple source chunks (N:N)</li>
        </ul>
      </ContentSection>

      {/* Streaming */}
      <ContentSection 
        id="streaming" 
        badge="Real-Time" 
        badgeIcon={Activity}
        badgeColor="bg-cyan-500/15 text-cyan-400 border-cyan-500/20"
        title="Real-Time Streaming: Token by Token"
      >
        <p>
          AI responses can take several seconds to complete. Without streaming, users would stare at a blank screen—an eternity in modern UX terms. Allma implements true token streaming, displaying each token as it&apos;s generated.
        </p>

        <h3 className="text-2xl font-bold bg-gradient-to-r from-white to-neutral-500 bg-clip-text text-transparent mt-10 mb-4">Server-Sent Events Implementation</h3>
        <p>
          The streaming pipeline uses Server-Sent Events (SSE) to push tokens to the frontend:
        </p>

        <pre className="bg-neutral-900 p-4 rounded-xl overflow-x-auto my-6 text-sm">
          <code className="text-cyan-400">{`# Backend (FastAPI)
async def stream_response():
    async for token in ollama.chat_stream(prompt):
        yield f"data: {json.dumps({'content': token})}\\n\\n"
    yield f"data: {json.dumps({'done': True, 'sources': sources})}\\n\\n"

# Frontend (React)
const eventSource = new EventSource('/api/chat');
eventSource.onmessage = (event) => {
    const data = JSON.parse(event.data);
    if (data.done) {
        setSources(data.sources);
    } else {
        appendMessage(data.content);
    }
};`}</code>
        </pre>

        <h3 className="text-2xl font-bold bg-gradient-to-r from-white to-neutral-500 bg-clip-text text-transparent mt-10 mb-4">Message Types</h3>
        <div className="overflow-x-auto my-6">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-neutral-800">
                <th className="py-3 px-4 text-left text-cyan-400 font-semibold">Type</th>
                <th className="py-3 px-4 text-left text-cyan-400 font-semibold">Direction</th>
                <th className="py-3 px-4 text-left text-cyan-400 font-semibold">Description</th>
              </tr>
            </thead>
            <tbody className="text-neutral-400">
              <tr className="border-b border-neutral-800/50">
                <td className="py-3 px-4 text-white font-mono text-xs">message</td>
                <td className="py-3 px-4">Client → Server</td>
                <td className="py-3 px-4">Send user message</td>
              </tr>
              <tr className="border-b border-neutral-800/50">
                <td className="py-3 px-4 text-white font-mono text-xs">token</td>
                <td className="py-3 px-4">Server → Client</td>
                <td className="py-3 px-4">Streaming token chunk</td>
              </tr>
              <tr className="border-b border-neutral-800/50">
                <td className="py-3 px-4 text-white font-mono text-xs">done</td>
                <td className="py-3 px-4">Server → Client</td>
                <td className="py-3 px-4">Response complete with sources</td>
              </tr>
              <tr className="border-b border-neutral-800/50">
                <td className="py-3 px-4 text-white font-mono text-xs">error</td>
                <td className="py-3 px-4">Server → Client</td>
                <td className="py-3 px-4">Error occurred</td>
              </tr>
            </tbody>
          </table>
        </div>

        <HighlightBox icon={Activity} title="Why Token Streaming?" color="cyan">
          Streaming creates the illusion of a thoughtful, real-time conversation. Users see the AI &quot;thinking&quot; as tokens appear, which is psychologically more engaging than waiting for a complete response. This pattern mirrors how humans communicate.
        </HighlightBox>
      </ContentSection>

      {/* Privacy & Security */}
      <ContentSection 
        id="privacy" 
        badge="Security" 
        badgeIcon={Lock}
        badgeColor="bg-emerald-500/15 text-emerald-400 border-emerald-500/20"
        title="Privacy & Security: Zero Data Transmission"
      >
        <p>
          Privacy isn&apos;t a feature of Allma Studio—it&apos;s the foundation. Every architectural decision was made to ensure that sensitive data never leaves the user&apos;s machine.
        </p>

        <h3 className="text-2xl font-bold bg-gradient-to-r from-white to-neutral-500 bg-clip-text text-transparent mt-10 mb-4">Security Layers</h3>

        <div className="space-y-4 my-6">
          {[
            { title: 'CORS Policy', desc: 'Configurable allowed origins, preflight request handling' },
            { title: 'Rate Limiting', desc: 'Per-IP request limits with configurable thresholds' },
            { title: 'Input Validation', desc: 'Pydantic model validation, file type restrictions, size limits' },
            { title: 'Error Handling', desc: 'Sanitized error messages, no stack traces in production' },
          ].map((layer, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-neutral-900/50 border border-neutral-800 flex items-start gap-4">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              </div>
              <div>
                <h4 className="font-semibold text-white">{layer.title}</h4>
                <p className="text-sm text-neutral-500">{layer.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <h3 className="text-2xl font-bold bg-gradient-to-r from-white to-neutral-500 bg-clip-text text-transparent mt-10 mb-4">Data Privacy Guarantees</h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6">
          {[
            { icon: CloudOff, title: 'Zero Telemetry', desc: 'No data collection or phone-home' },
            { icon: Cpu, title: 'Local Processing', desc: 'All LLM inference happens locally' },
            { icon: Users, title: 'User Control', desc: 'Data stored locally, easily deletable' },
            { icon: Globe, title: 'No Dependencies', desc: 'Works fully offline' },
          ].map((item, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
              <item.icon className="w-6 h-6 text-emerald-400 mb-2" />
              <h4 className="font-semibold text-white mb-1">{item.title}</h4>
              <p className="text-xs text-neutral-500">{item.desc}</p>
            </div>
          ))}
        </div>

        <HighlightBox icon={Shield} title="True Local-First" color="emerald">
          Unlike &quot;local&quot; solutions that still require cloud accounts or phone home for analytics, Allma Studio has zero external dependencies. Disconnect from the internet, and it works identically. This is verified privacy, not just promised privacy.
        </HighlightBox>
      </ContentSection>

      {/* Challenges & Solutions */}
      <ContentSection 
        id="challenges" 
        badge="Engineering" 
        badgeIcon={AlertTriangle}
        badgeColor="bg-amber-500/15 text-amber-400 border-amber-500/20"
        title="Challenges & Solutions"
      >
        <p>
          Building a production-quality local AI application surfaced several engineering challenges. Here&apos;s how we solved them:
        </p>

        <div className="space-y-8 my-8">
          {/* Challenge 1 */}
          <div className="p-6 rounded-2xl bg-neutral-900/50 border border-neutral-800">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center flex-shrink-0">
                <AlertTriangle className="w-5 h-5 text-amber-400" />
              </div>
              <div>
                <h4 className="font-bold text-white mb-1">Memory Management with Large Documents</h4>
                <p className="text-sm text-neutral-500">Processing 100+ page PDFs could exhaust system memory</p>
              </div>
            </div>
            <div className="flex items-start gap-4 pl-14">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
              <p className="text-neutral-400 text-sm">
                <strong className="text-white">Solution:</strong> Implemented streaming document processing with chunk-level commits. Documents are processed in batches, with embeddings committed to LanceDB after each chunk group, preventing memory accumulation.
              </p>
            </div>
          </div>

          {/* Challenge 2 */}
          <div className="p-6 rounded-2xl bg-neutral-900/50 border border-neutral-800">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center flex-shrink-0">
                <AlertTriangle className="w-5 h-5 text-amber-400" />
              </div>
              <div>
                <h4 className="font-bold text-white mb-1">Model Loading Latency</h4>
                <p className="text-sm text-neutral-500">First response after model switch took 10+ seconds</p>
              </div>
            </div>
            <div className="flex items-start gap-4 pl-14">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
              <p className="text-neutral-400 text-sm">
                <strong className="text-white">Solution:</strong> Pre-warm the default model on application startup. Added model switching UI feedback with loading states. Ollama&apos;s keep-alive maintains the model in GPU memory between requests.
              </p>
            </div>
          </div>

          {/* Challenge 3 */}
          <div className="p-6 rounded-2xl bg-neutral-900/50 border border-neutral-800">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center flex-shrink-0">
                <AlertTriangle className="w-5 h-5 text-amber-400" />
              </div>
              <div>
                <h4 className="font-bold text-white mb-1">Demo Mode Without Backend</h4>
                <p className="text-sm text-neutral-500">Users needed to experience the UI without installing Ollama</p>
              </div>
            </div>
            <div className="flex items-start gap-4 pl-14">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
              <p className="text-neutral-400 text-sm">
                <strong className="text-white">Solution:</strong> Built a demo API layer that simulates streaming responses with realistic typing delays. The frontend automatically falls back to demo mode when the backend is unavailable.
              </p>
            </div>
          </div>

          {/* Challenge 4 */}
          <div className="p-6 rounded-2xl bg-neutral-900/50 border border-neutral-800">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center flex-shrink-0">
                <AlertTriangle className="w-5 h-5 text-amber-400" />
              </div>
              <div>
                <h4 className="font-bold text-white mb-1">Cross-Platform Compatibility</h4>
                <p className="text-sm text-neutral-500">Supporting Windows, macOS, and Linux with GPU acceleration</p>
              </div>
            </div>
            <div className="flex items-start gap-4 pl-14">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
              <p className="text-neutral-400 text-sm">
                <strong className="text-white">Solution:</strong> Leveraged Ollama&apos;s cross-platform support for GPU inference. Provided Docker Compose configurations for containerized deployment. Tauri enables native desktop apps across all platforms.
              </p>
            </div>
          </div>
        </div>

        <HighlightBox icon={Lightbulb} title="Key Takeaway" color="violet">
          The biggest lesson: local-first AI applications require careful resource management. Unlike cloud services with unlimited compute, every byte of memory and every GPU cycle matters. This constraint drove better engineering decisions.
        </HighlightBox>
      </ContentSection>

      {/* CTA Section */}
      <section className="py-20">
        <ScrollReveal>
          <div className="text-center p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-violet-500/10 via-indigo-500/10 to-cyan-500/10 border border-violet-500/20">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Ready to Explore?
            </h2>
            <p className="text-neutral-400 mb-8 max-w-xl mx-auto">
              Dive into the codebase, try the live demo, or check out the full API documentation.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="https://github.com/vikas-kashyap97/Allma-studio" target="_blank" rel="noopener noreferrer">
                <Button className="bg-white text-black hover:bg-neutral-200">
                  <Github className="w-4 h-4 mr-2" />
                  View Source
                </Button>
              </Link>
              <Link href="https://allma-studio.vercel.app/" target="_blank" rel="noopener noreferrer">
                <Button variant="outline" className="border-violet-500/50 text-violet-400 hover:bg-violet-500/10">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Try Live Demo
                </Button>
              </Link>
              <Link href="/projects/allma-studio/docs">
                <Button variant="outline" className="border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/10">
                  <BookOpen className="w-4 h-4 mr-2" />
                  API Docs
                </Button>
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </section>

      </div>
    </div>
  );
}

export default function AllmaDeepDivePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#08080c] via-[#0a0a12] to-[#0c0c14] text-white overflow-x-hidden">
      {/* Scroll Progress */}
      <ScrollProgress />
      
      {/* Fixed Background */}
      <div className="fixed inset-0 pointer-events-none">
        <AllmaBackground />
      </div>

      {/* Page Navigation */}
      <AllmaPageNav currentPage="deep-dive" />
      
      {/* Hero */}
      <DeepDiveHero />
      
      {/* Main Content */}
      <MainContent />
    </div>
  );
}
