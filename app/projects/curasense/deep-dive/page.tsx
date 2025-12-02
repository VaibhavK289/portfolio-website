'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
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
  Pill,
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
  Sparkles
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

// Shared background component
function DeepDiveBackground() {
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
          id="deepdive-sparkles"
          background="transparent"
          minSize={0.3}
          maxSize={1}
          particleDensity={12}
          className="w-full h-full"
          particleColor="#10b981"
        />
      </div>
    </div>
  );
}

// Page Navigation Component
function DeepDivePageNav() {
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
              <p className="text-xs text-gray-500 dark:text-neutral-500">Technical Deep-Dive</p>
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
              className="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 text-gray-600 dark:text-neutral-400 hover:text-gray-900 dark:hover:text-white"
            >
              Technical
            </Link>
            <Link
              href="/projects/curasense/documentation"
              className="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 text-gray-600 dark:text-neutral-400 hover:text-gray-900 dark:hover:text-white"
            >
              Docs
            </Link>
            <Link
              href="/projects/curasense/deep-dive"
              className="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 bg-white dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 shadow-sm"
            >
              Deep-Dive
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

// Table of Contents Component
function TableOfContents() {
  const sections = [
    { id: 'problem', title: 'Problem Statement', icon: Target },
    { id: 'solution', title: 'Solution Architecture', icon: Lightbulb },
    { id: 'multi-agent', title: 'Multi-Agent AI System', icon: Users },
    { id: 'rag', title: 'RAG Pipeline', icon: Search },
    { id: 'vision', title: 'Vision Analysis', icon: Eye },
    { id: 'streaming', title: 'Real-Time Streaming', icon: Activity },
    { id: 'security', title: 'Security & Privacy', icon: Lock },
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
        <div className="p-4 rounded-2xl bg-white/80 dark:bg-[#1a2438]/80 border border-gray-200 dark:border-[#2d3f5f] backdrop-blur-sm">
          <p className="text-xs font-semibold text-gray-500 dark:text-neutral-500 mb-3 uppercase tracking-wider">Contents</p>
          <nav className="space-y-1">
            {sections.map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-gray-600 dark:text-neutral-400 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-500/10 transition-colors group"
              >
                <section.icon className="w-4 h-4 group-hover:text-emerald-500 transition-colors" />
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
    <section className="relative py-24 overflow-hidden bg-gradient-to-br from-gray-50 via-white to-emerald-50/20 dark:from-[#0a0e17] dark:via-[#0c1628] dark:to-[#0a1220]">
      <DeepDiveBackground />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
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
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: easings.smooth }}
          className="text-center"
        >
          <motion.span 
            className="inline-block px-4 py-2 rounded-full bg-violet-500/15 text-violet-600 dark:text-violet-400 text-sm font-medium mb-6 border border-violet-500/20"
          >
            <BookOpen className="w-4 h-4 inline mr-2" />
            Technical Deep-Dive
          </motion.span>
          
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
            Understanding{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 via-cyan-500 to-violet-500">
              CuraSense
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 dark:text-neutral-400 mb-8 leading-relaxed max-w-3xl mx-auto">
            A comprehensive exploration of the architectural decisions, AI orchestration patterns, and engineering challenges behind building an enterprise-grade medical diagnosis system.
          </p>
          
          <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-500 dark:text-neutral-500">
            <span className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              15 min read
            </span>
            <span className="flex items-center gap-2">
              <Code2 className="w-4 h-4" />
              Technical Content
            </span>
            <span className="flex items-center gap-2">
              <Brain className="w-4 h-4" />
              AI/ML Focus
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
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:bg-gradient-to-r dark:from-white dark:to-neutral-500 dark:bg-clip-text dark:text-transparent mb-8">
          {title}
        </h2>
        <div className="prose prose-lg dark:prose-invert max-w-none prose-headings:text-gray-900 dark:prose-headings:text-white prose-p:text-gray-600 dark:prose-p:text-neutral-400 prose-strong:text-gray-900 dark:prose-strong:text-white prose-a:text-emerald-600 dark:prose-a:text-emerald-400">
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
  color = 'emerald' 
}: { 
  icon: React.ElementType; 
  title: string; 
  children: React.ReactNode;
  color?: 'emerald' | 'cyan' | 'violet' | 'amber';
}) {
  const colors = {
    emerald: 'bg-emerald-500/10 border-emerald-500/20 text-emerald-600 dark:text-emerald-400',
    cyan: 'bg-cyan-500/10 border-cyan-500/20 text-cyan-600 dark:text-cyan-400',
    violet: 'bg-violet-500/10 border-violet-500/20 text-violet-600 dark:text-violet-400',
    amber: 'bg-amber-500/10 border-amber-500/20 text-amber-600 dark:text-amber-400',
  };

  return (
    <div className={`p-6 rounded-2xl border ${colors[color]} my-8`}>
      <div className="flex items-start gap-4">
        <div className={`w-10 h-10 rounded-xl ${colors[color]} flex items-center justify-center flex-shrink-0`}>
          <Icon className="w-5 h-5" />
        </div>
        <div>
          <h4 className="font-bold text-gray-900 dark:bg-gradient-to-r dark:from-white dark:to-neutral-500 dark:bg-clip-text dark:text-transparent mb-2">{title}</h4>
          <div className="text-gray-600 dark:text-neutral-400">{children}</div>
        </div>
      </div>
    </div>
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
        badgeColor="bg-red-500/15 text-red-600 dark:text-red-400 border-red-500/20"
        title="Problem Statement: The Healthcare AI Gap"
      >
        <p>
          Modern healthcare faces a critical bottleneck: the gap between the exponential growth of medical knowledge and the limited capacity of healthcare professionals to process, analyze, and apply this information in real-time clinical settings. Every day, physicians must interpret complex diagnostic reports, cross-reference medication interactions, and make split-second decisions that directly impact patient outcomes.
        </p>

        <p>
          Traditional healthcare software solutions operate in isolation—prescription analyzers don't communicate with imaging systems, drug databases remain disconnected from patient history analysis, and medical insights are scattered across multiple platforms. This fragmentation leads to:
        </p>

        <ul className="list-disc pl-6 space-y-2 my-6">
          <li><strong>Delayed diagnoses</strong> as practitioners manually correlate data from multiple sources</li>
          <li><strong>Medication errors</strong> due to overlooked drug interactions in complex prescriptions</li>
          <li><strong>Missed insights</strong> from medical imaging that require specialized radiological expertise</li>
          <li><strong>Information overload</strong> preventing effective synthesis of patient data</li>
        </ul>

        <HighlightBox icon={Target} title="The Core Problem" color="amber">
          How do we create an intelligent system that can simultaneously analyze prescriptions, interpret medical images, check drug interactions, and synthesize all findings into actionable clinical insights—all while maintaining the speed and accuracy required in healthcare settings?
        </HighlightBox>

        <p>
          CuraSense was conceived as a direct response to this challenge. Rather than building another isolated medical tool, the goal was to architect a comprehensive AI platform that mirrors how an experienced medical team would collaborate: multiple specialists working in concert, each contributing their expertise to arrive at a holistic patient assessment.
        </p>
      </ContentSection>

      {/* Solution Architecture */}
      <ContentSection 
        id="solution" 
        badge="Architecture" 
        badgeIcon={Lightbulb}
        badgeColor="bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/20"
        title="Solution Architecture: A Layered Approach"
      >
        <p>
          CuraSense employs a meticulously designed four-layer architecture that separates concerns while enabling seamless data flow between components. This architectural decision wasn't arbitrary—it emerged from the fundamental requirements of medical AI systems: reliability, interpretability, and the ability to evolve individual components without disrupting the entire system.
        </p>

        <h3 className="text-2xl font-bold text-gray-900 dark:bg-gradient-to-r dark:from-white dark:to-neutral-500 dark:bg-clip-text dark:text-transparent mt-10 mb-4">The Presentation Layer</h3>
        <p>
          Built with Next.js 14 and React 19, the frontend represents more than just a user interface—it's a carefully crafted experience designed for clinical workflows. The decision to use the App Router architecture enables server-side rendering for initial page loads, critical for environments where network latency varies. React Server Components handle data fetching on the server, reducing the JavaScript payload sent to clients and improving performance on hospital workstations that may not have cutting-edge hardware.
        </p>

        <p>
          Framer Motion powers the animation system, but beyond aesthetics, animations serve a functional purpose: they provide visual feedback during AI processing, reducing perceived wait times and indicating system state. When a physician uploads a chest X-ray, subtle loading animations communicate that the system is actively working, maintaining trust in the AI's responsiveness.
        </p>

        <h3 className="text-2xl font-bold text-gray-900 dark:bg-gradient-to-r dark:from-white dark:to-neutral-500 dark:bg-clip-text dark:text-transparent mt-10 mb-4">The API Layer</h3>
        <p>
          FastAPI serves as the backbone of the API layer, chosen specifically for its async-first design and automatic OpenAPI documentation generation. In healthcare contexts, API documentation isn't a luxury—it's a compliance requirement. The ability to auto-generate accurate API specs reduces documentation drift and simplifies integration audits.
        </p>

        <p>
          The API layer implements Server-Sent Events (SSE) for real-time streaming, a critical architectural choice for AI diagnosis systems. Unlike WebSocket connections that maintain bidirectional communication channels, SSE provides a unidirectional stream perfectly suited for the use case: clients send requests and then receive a continuous stream of updates as the AI agents process information. This reduces connection overhead and simplifies the client-side implementation while providing the real-time feedback clinicians need.
        </p>

        <HighlightBox icon={Layers} title="Why Not WebSockets?" color="cyan">
          WebSockets would have been overkill for CuraSense's communication patterns. Since clients primarily receive updates rather than send continuous data, SSE's simpler protocol reduces complexity, works better with HTTP/2, and requires no special proxy configuration—crucial for deployment in hospital networks with strict firewall policies.
        </HighlightBox>

        <h3 className="text-2xl font-bold text-gray-900 dark:bg-gradient-to-r dark:from-white dark:to-neutral-500 dark:bg-clip-text dark:text-transparent mt-10 mb-4">The Intelligence Layer</h3>
        <p>
          This is where CuraSense truly differentiates itself. Rather than relying on a single monolithic AI model, the intelligence layer implements a multi-agent architecture using CrewAI for agent orchestration and LangGraph for workflow management. Each agent specializes in a specific domain: document analysis, medical interpretation, drug interaction checking, and report synthesis.
        </p>

        <p>
          The Gemini Pro model handles textual analysis, while Gemini Vision processes medical imaging. This dual-model approach acknowledges that different AI tasks require different capabilities—language models excel at reasoning over text, while vision models understand spatial relationships in images. By separating these concerns, each model operates in its optimal domain.
        </p>

        <h3 className="text-2xl font-bold text-gray-900 dark:bg-gradient-to-r dark:from-white dark:to-neutral-500 dark:bg-clip-text dark:text-transparent mt-10 mb-4">The Data Layer</h3>
        <p>
          ChromaDB serves as the vector database, enabling semantic search over medical knowledge bases. The choice of a vector database over traditional relational storage reflects the nature of medical queries: clinicians don't search for exact string matches—they search for conceptually similar information. A query about "chest pain radiating to left arm" should retrieve information about cardiac symptoms even if those exact words aren't present in the knowledge base.
        </p>

        <p>
          Session-based data isolation with a 15-minute TTL ensures HIPAA compliance without sacrificing functionality. Patient data exists only long enough for analysis, then automatically purges—reducing liability while maintaining the real-time processing clinicians need.
        </p>
      </ContentSection>

      {/* Multi-Agent System */}
      <ContentSection 
        id="multi-agent" 
        badge="AI Orchestration" 
        badgeIcon={Users}
        badgeColor="bg-violet-500/15 text-violet-600 dark:text-violet-400 border-violet-500/20"
        title="Multi-Agent AI System: Collaborative Intelligence"
      >
        <p>
          The multi-agent architecture represents CuraSense's most innovative technical contribution. Traditional AI applications employ single models that handle all tasks—a pattern that struggles with the multifaceted nature of medical diagnosis. CuraSense instead implements a team of specialized AI agents, each with distinct capabilities and responsibilities.
        </p>

        <h3 className="text-2xl font-bold text-gray-900 dark:bg-gradient-to-r dark:from-white dark:to-neutral-500 dark:bg-clip-text dark:text-transparent mt-10 mb-4">Agent Specialization</h3>
        
        <p>
          <strong>The Document Analyzer Agent</strong> serves as the entry point for all uploaded medical documents. Using advanced PDF parsing libraries combined with Named Entity Recognition (NER) models from Hugging Face, this agent extracts structured data from unstructured medical documents. It identifies medication names, dosages, frequency schedules, and diagnostic codes—transforming a PDF prescription into a machine-readable format that subsequent agents can process.
        </p>

        <p>
          What makes this agent particularly sophisticated is its ability to handle the variability inherent in medical documents. Prescriptions from different healthcare systems use different formats, abbreviations, and conventions. The Document Analyzer adapts to these variations, normalizing output regardless of input format.
        </p>

        <p>
          <strong>The Medical Expert Agent</strong> provides clinical interpretation of extracted data. This agent has been prompt-engineered with extensive medical knowledge, enabling it to understand the clinical significance of lab values, recognize concerning patterns in diagnostic reports, and contextualize findings within broader medical frameworks.
        </p>

        <p>
          When analyzing a blood panel, for instance, the Medical Expert doesn't just report that hemoglobin is 9.2 g/dL—it contextualizes this value, notes that it indicates mild anemia, suggests potential causes, and recommends follow-up investigations. This mirrors how an experienced physician would interpret the same data.
        </p>

        <p>
          <strong>The Drug Interaction Agent</strong> performs critical safety checks. Using the RAG (Retrieval-Augmented Generation) pipeline, this agent queries an extensive drug interaction database to identify potential conflicts between medications. It considers not just direct interactions but also cumulative effects, contraindications based on patient conditions, and timing considerations for medication administration.
        </p>

        <p>
          <strong>The Report Generator Agent</strong> synthesizes outputs from all previous agents into coherent, clinician-friendly reports. This agent employs sophisticated natural language generation to produce reports that balance completeness with readability—including all clinically relevant details while organizing information in a logical, actionable format.
        </p>

        <HighlightBox icon={Workflow} title="Agent Communication Protocol" color="violet">
          Agents communicate through a structured message-passing protocol implemented via LangGraph. Each agent publishes its findings to a shared state graph, enabling downstream agents to access all relevant context. This architecture ensures that the Report Generator, for instance, has access to the original document analysis, medical interpretations, and drug interaction findings when synthesizing the final report.
        </HighlightBox>

        <h3 className="text-2xl font-bold text-gray-900 dark:bg-gradient-to-r dark:from-white dark:to-neutral-500 dark:bg-clip-text dark:text-transparent mt-10 mb-4">Orchestration with CrewAI</h3>
        <p>
          CrewAI manages the coordination between agents, determining execution order, handling dependencies, and managing failures. The framework implements a supervisor pattern where a coordinator agent oversees the diagnosis process, dynamically routing tasks based on document type and complexity.
        </p>

        <p>
          For a simple prescription analysis, the coordinator might engage only the Document Analyzer and Drug Interaction agents. For a comprehensive health assessment including imaging, all agents participate in a carefully choreographed sequence. This adaptive orchestration optimizes processing time while ensuring all necessary analyses are performed.
        </p>
      </ContentSection>

      {/* RAG Pipeline */}
      <ContentSection 
        id="rag" 
        badge="Knowledge Retrieval" 
        badgeIcon={Search}
        badgeColor="bg-cyan-500/15 text-cyan-600 dark:text-cyan-400 border-cyan-500/20"
        title="RAG Pipeline: Augmented Intelligence"
      >
        <p>
          Retrieval-Augmented Generation (RAG) addresses a fundamental limitation of large language models: their knowledge is frozen at training time. Medical knowledge evolves rapidly—new drug interactions are discovered, treatment protocols are updated, and clinical guidelines are revised. A purely pre-trained model quickly becomes outdated.
        </p>

        <p>
          CuraSense's RAG pipeline bridges this gap by combining the reasoning capabilities of LLMs with real-time retrieval from up-to-date medical knowledge bases. When the Drug Interaction Agent needs to check for medication conflicts, it doesn't rely solely on the LLM's training data—it actively queries a vector database containing current pharmaceutical data.
        </p>

        <h3 className="text-2xl font-bold text-gray-900 dark:bg-gradient-to-r dark:from-white dark:to-neutral-500 dark:bg-clip-text dark:text-transparent mt-10 mb-4">Vector Embeddings and Semantic Search</h3>
        <p>
          At the core of the RAG system lies ChromaDB, a vector database optimized for semantic search. Medical documents are processed through embedding models that convert text into high-dimensional vectors capturing semantic meaning. When a query arrives—such as "medications contraindicated with warfarin"—the system converts this query to a vector and finds the most semantically similar documents in the database.
        </p>

        <p>
          This semantic approach vastly outperforms keyword matching. A search for "blood thinners" would correctly retrieve documents about anticoagulants even if that exact phrase never appears. The embedding model understands conceptual relationships that keyword systems miss.
        </p>

        <h3 className="text-2xl font-bold text-gray-900 dark:bg-gradient-to-r dark:from-white dark:to-neutral-500 dark:bg-clip-text dark:text-transparent mt-10 mb-4">Context Window Optimization</h3>
        <p>
          One engineering challenge with RAG is managing context window limits. LLMs can only process a finite amount of text—typically 8,000 to 128,000 tokens depending on the model. When retrieval returns numerous relevant documents, naive approaches simply truncate, potentially losing critical information.
        </p>

        <p>
          CuraSense implements intelligent context compression. Retrieved documents are ranked by relevance, summarized where appropriate, and strategically combined to maximize information density within context limits. The system preserves key facts while eliminating redundancy, ensuring the LLM receives the most informative possible context.
        </p>

        <HighlightBox icon={Database} title="Knowledge Base Updates" color="cyan">
          The medical knowledge base is designed for easy updates. New drug information can be added by simply ingesting updated pharmaceutical databases. The embedding pipeline automatically processes new documents, generates vectors, and integrates them into ChromaDB—no model retraining required. This enables CuraSense to stay current with medical advances without significant maintenance overhead.
        </HighlightBox>
      </ContentSection>

      {/* Vision Analysis */}
      <ContentSection 
        id="vision" 
        badge="Medical Imaging" 
        badgeIcon={Eye}
        badgeColor="bg-pink-500/15 text-pink-600 dark:text-pink-400 border-pink-500/20"
        title="Vision Analysis: AI-Powered Medical Imaging"
      >
        <p>
          Medical imaging interpretation represents one of healthcare's most time-intensive and expertise-dependent tasks. Radiologists spend years developing the pattern recognition skills needed to identify abnormalities in X-rays, CT scans, and MRIs. CuraSense's vision analysis module provides AI-assisted interpretation that augments—rather than replaces—radiological expertise.
        </p>

        <h3 className="text-2xl font-bold text-gray-900 dark:bg-gradient-to-r dark:from-white dark:to-neutral-500 dark:bg-clip-text dark:text-transparent mt-10 mb-4">Gemini Vision Integration</h3>
        <p>
          The vision pipeline leverages Google's Gemini Vision model, a multimodal AI capable of understanding both images and text. When a physician uploads a chest X-ray, the system processes the image through several stages:
        </p>

        <ul className="list-disc pl-6 space-y-2 my-6">
          <li><strong>Image preprocessing</strong>: Normalization, enhancement, and format standardization ensure consistent analysis regardless of source equipment</li>
          <li><strong>Region identification</strong>: The model identifies anatomical structures—lungs, heart, ribs, diaphragm—establishing a spatial framework for analysis</li>
          <li><strong>Abnormality detection</strong>: Pattern recognition identifies potential issues: masses, infiltrates, cardiomegaly, pneumothorax, and other findings</li>
          <li><strong>Clinical correlation</strong>: Detected findings are correlated with any provided clinical history to assess significance</li>
        </ul>

        <h3 className="text-2xl font-bold text-gray-900 dark:bg-gradient-to-r dark:from-white dark:to-neutral-500 dark:bg-clip-text dark:text-transparent mt-10 mb-4">Confidence Scoring and Uncertainty</h3>
        <p>
          Unlike deterministic software, AI vision systems must communicate uncertainty. CuraSense implements confidence scoring for all imaging findings. When the system identifies a potential nodule, it provides both the finding and a confidence level. A high-confidence finding might recommend immediate follow-up, while a low-confidence detection suggests additional imaging or specialist review.
        </p>

        <p>
          This probabilistic approach reflects medical reality. Even expert radiologists disagree on subtle findings—acknowledging uncertainty is more valuable than false precision. The system is calibrated to err on the side of caution: it's better to flag a benign finding for review than to miss a potential malignancy.
        </p>

        <HighlightBox icon={Eye} title="Multimodal Analysis" color="violet">
          When both imaging and textual data (like prior radiology reports) are available, CuraSense performs multimodal analysis. The vision findings are automatically correlated with textual clinical history, enabling the system to note changes from prior imaging, correlate lab findings with radiological appearance, and provide more contextually relevant interpretations.
        </HighlightBox>
      </ContentSection>

      {/* Real-Time Streaming */}
      <ContentSection 
        id="streaming" 
        badge="Live Updates" 
        badgeIcon={Activity}
        badgeColor="bg-blue-500/15 text-blue-600 dark:text-blue-400 border-blue-500/20"
        title="Real-Time Streaming: Server-Sent Events Architecture"
      >
        <p>
          In clinical settings, perceived responsiveness matters as much as actual processing time. A system that provides no feedback during a 30-second analysis feels slower than one that continuously updates users on progress—even if total processing time is identical. CuraSense implements sophisticated real-time streaming to maintain user engagement throughout the analysis pipeline.
        </p>

        <h3 className="text-2xl font-bold text-gray-900 dark:bg-gradient-to-r dark:from-white dark:to-neutral-500 dark:bg-clip-text dark:text-transparent mt-10 mb-4">The SSE Implementation</h3>
        <p>
          Server-Sent Events (SSE) provide a unidirectional channel from server to client over a standard HTTP connection. When a user submits a document for analysis, the server immediately establishes an SSE connection and begins streaming updates:
        </p>

        <ul className="list-disc pl-6 space-y-2 my-6">
          <li><strong>Stage notifications</strong>: "Analyzing document structure...", "Extracting medications...", "Checking interactions..."</li>
          <li><strong>Partial results</strong>: As each agent completes, its findings stream to the client immediately</li>
          <li><strong>Progress indicators</strong>: Percentage-based progress updates for long-running analyses</li>
          <li><strong>Final synthesis</strong>: The complete report streams incrementally, enabling users to begin reading before generation completes</li>
        </ul>

        <h3 className="text-2xl font-bold text-gray-900 dark:bg-gradient-to-r dark:from-white dark:to-neutral-500 dark:bg-clip-text dark:text-transparent mt-10 mb-4">Frontend Integration</h3>
        <p>
          The React frontend uses the EventSource API to receive SSE streams, parsing each event and updating component state. Framer Motion animates new content into view, creating a fluid experience as analysis results progressively appear. This streaming approach transforms a potentially tedious wait into an engaging, informative experience.
        </p>

        <p>
          Error handling is particularly important in streaming scenarios. The system implements automatic reconnection with exponential backoff, ensuring that temporary network issues don't lose analysis progress. Partial results are cached client-side, so a reconnection resumes from the last received event rather than restarting the entire analysis.
        </p>
      </ContentSection>

      {/* Security & Privacy */}
      <ContentSection 
        id="security" 
        badge="Compliance" 
        badgeIcon={Lock}
        badgeColor="bg-green-500/15 text-green-600 dark:text-green-400 border-green-500/20"
        title="Security & Privacy: HIPAA-Conscious Design"
      >
        <p>
          Healthcare applications operate under stringent regulatory requirements. While CuraSense is a demonstration project, its architecture embodies security principles that would satisfy HIPAA requirements in production deployment. Understanding these design decisions illustrates how security consciousness shapes architectural choices.
        </p>

        <h3 className="text-2xl font-bold text-gray-900 dark:bg-gradient-to-r dark:from-white dark:to-neutral-500 dark:bg-clip-text dark:text-transparent mt-10 mb-4">Session-Based Data Isolation</h3>
        <p>
          Patient data never persists beyond the analysis session. Each upload receives a unique session identifier, and all extracted data, intermediate results, and final reports are associated with this session. A background task continuously monitors session age, automatically purging any session older than 15 minutes.
        </p>

        <p>
          This ephemeral approach dramatically reduces security surface area. There's no database of patient records to breach, no historical data to protect with encryption at rest, no backup tapes to secure. Data exists only in memory during active processing, then vanishes.
        </p>

        <h3 className="text-2xl font-bold text-gray-900 dark:bg-gradient-to-r dark:from-white dark:to-neutral-500 dark:bg-clip-text dark:text-transparent mt-10 mb-4">Authentication with Clerk</h3>
        <p>
          User authentication leverages Clerk, a modern authentication platform that handles the complexities of secure identity management. Clerk provides multi-factor authentication, secure session management, and social login integration—all implemented following security best practices that would take months to build from scratch.
        </p>

        <p>
          By delegating authentication to a specialized provider, CuraSense avoids common security pitfalls: password storage vulnerabilities, session hijacking, and authentication bypass bugs. Clerk's team focuses exclusively on authentication security, ensuring the implementation stays current with emerging threats.
        </p>

        <HighlightBox icon={Shield} title="Defense in Depth" color="emerald">
          Security isn't a single feature but a philosophy permeating the architecture. API endpoints validate all inputs with Pydantic schemas. CORS policies restrict which domains can access the API. Rate limiting prevents abuse. Every layer adds protection, so a failure in one doesn't compromise the system entirely.
        </HighlightBox>
      </ContentSection>

      {/* Challenges & Solutions */}
      <ContentSection 
        id="challenges" 
        badge="Engineering" 
        badgeIcon={AlertTriangle}
        badgeColor="bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/20"
        title="Challenges & Solutions: Lessons Learned"
      >
        <p>
          Building CuraSense surfaced numerous technical challenges, each requiring creative solutions. These engineering lessons illustrate the gap between conceptual architecture and working systems.
        </p>

        <h3 className="text-2xl font-bold text-gray-900 dark:bg-gradient-to-r dark:from-white dark:to-neutral-500 dark:bg-clip-text dark:text-transparent mt-10 mb-4">Challenge: LLM Hallucination in Medical Context</h3>
        <p>
          Large language models occasionally generate plausible-sounding but incorrect information—a phenomenon known as hallucination. In medical contexts, hallucinations are dangerous. A fabricated drug interaction could lead to inappropriate treatment decisions.
        </p>

        <p>
          <strong>Solution:</strong> CuraSense implements multiple hallucination mitigation strategies. The RAG pipeline grounds responses in retrieved documents, reducing the model's need to "invent" information. Agent outputs are cross-validated—if the Drug Interaction Agent flags an interaction, the Medical Expert Agent independently verifies its clinical significance. Confidence thresholds prevent low-confidence assertions from appearing in final reports without appropriate caveats.
        </p>

        <h3 className="text-2xl font-bold text-gray-900 dark:bg-gradient-to-r dark:from-white dark:to-neutral-500 dark:bg-clip-text dark:text-transparent mt-10 mb-4">Challenge: Latency in Multi-Agent Systems</h3>
        <p>
          Sequential agent execution creates additive latency. If each of four agents takes 5 seconds, users wait 20 seconds for results—unacceptable in clinical workflows.
        </p>

        <p>
          <strong>Solution:</strong> LangGraph enables parallel execution of independent agents. The Document Analyzer must complete before downstream agents begin, but the Medical Expert and Drug Interaction agents can operate concurrently since neither depends on the other's output. This parallel execution pattern reduced average analysis time by approximately 40% compared to strictly sequential processing.
        </p>

        <h3 className="text-2xl font-bold text-gray-900 dark:bg-gradient-to-r dark:from-white dark:to-neutral-500 dark:bg-clip-text dark:text-transparent mt-10 mb-4">Challenge: Variable Document Quality</h3>
        <p>
          Medical documents arrive in wildly varying quality—blurry scans, handwritten notes, faded thermal paper. Image-based PDFs require OCR, which introduces errors. Poor-quality inputs degrade analysis accuracy.
        </p>

        <p>
          <strong>Solution:</strong> The Document Analyzer implements a multi-stage extraction pipeline. Initial OCR output is post-processed by the LLM, which corrects obvious errors using context. "Metfomrin 500mg" becomes "Metformin 500mg" because the model knows medication names. When confidence in extraction is low, the system flags affected sections, requesting user verification rather than silently propagating errors.
        </p>

        <HighlightBox icon={CheckCircle2} title="Continuous Improvement" color="emerald">
          Each challenge informed architectural evolution. The system includes comprehensive logging that captures analysis paths, agent outputs, and final results. This data enables ongoing refinement—identifying common failure modes, tuning confidence thresholds, and improving prompt engineering. CuraSense isn't a static system but an evolving platform that learns from real-world usage.
        </HighlightBox>
      </ContentSection>

      {/* Conclusion */}
      <section className="py-16 scroll-mt-32">
        <ScrollReveal>
          <div className="p-8 rounded-3xl bg-gradient-to-br from-emerald-500/10 via-cyan-500/5 to-violet-500/10 border border-emerald-500/20">
            <h2 className="text-2xl font-bold text-gray-900 dark:bg-gradient-to-r dark:from-white dark:to-neutral-500 dark:bg-clip-text dark:text-transparent mb-4">
              Conclusion: The Future of AI in Healthcare
            </h2>
            <p className="text-gray-600 dark:text-neutral-400 mb-6">
              CuraSense demonstrates that sophisticated AI systems aren't monolithic black boxes—they're carefully orchestrated ensembles of specialized components. The multi-agent architecture, RAG-augmented knowledge retrieval, and real-time streaming combine to create a system greater than the sum of its parts.
            </p>
            <p className="text-gray-600 dark:text-neutral-400 mb-8">
              As AI capabilities continue advancing, the principles embodied in CuraSense—specialization, collaboration, grounding in retrieved knowledge, and transparent uncertainty—will only become more relevant. The future of healthcare AI lies not in replacing human expertise but in augmenting it with systems that handle information processing at scales impossible for human cognition alone.
            </p>
            <div className="flex flex-wrap gap-4">
              <HoverBorderGradient
                containerClassName="rounded-full"
                href="https://github.com/VaibhavK289/curasense-diagnosis"
                className="dark:bg-black bg-white text-black dark:text-white flex items-center gap-2 px-6 py-2"
              >
                <Github className="w-5 h-5" />
                <span>Explore the Code</span>
              </HoverBorderGradient>
              <Button href="https://curasense-frontend.vercel.app/" variant="outline" external>
                <ExternalLink className="w-4 h-4" />
                Try the Demo
              </Button>
            </div>
          </div>
        </ScrollReveal>
      </section>
      </div>
    </div>
  );
}

// Main Page Component
export default function CuraSenseDeepDivePage() {
  return (
    <div className="relative bg-white dark:bg-[#0a0e17]">
      <ScrollProgress />
      <DeepDiveHero />
      <DeepDivePageNav />
      <MainContent />
    </div>
  );
}
