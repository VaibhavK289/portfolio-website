'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  ArrowLeft,
  BookOpen,
  Factory,
  Brain,
  Cpu,
  Database,
  Server,
  Layers,
  Workflow,
  Network,
  GitBranch,
  FileText,
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
  Activity,
  RefreshCcw,
  Sparkles,
  CircuitBoard,
  Thermometer,
  Radio,
  Gauge,
  BarChart3,
  Bell,
  Eye,
  Lock,
  Clock,
  Users,
  Zap,
  TrendingUp,
  Search,
  Settings
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

// Industrial-themed Background Component
function DeepDiveBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <motion.div 
        className="absolute top-20 right-20 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl"
        animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div 
        className="absolute bottom-40 left-10 w-80 h-80 bg-blue-500/15 rounded-full blur-3xl"
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
          particleColor="#06b6d4"
        />
      </div>
      {/* Industrial Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.03)_1px,transparent_1px)] bg-[size:50px_50px]" />
    </div>
  );
}

// Page Navigation Component
function DeepDivePageNav() {
  return (
    <motion.div 
      className="sticky top-20 z-40 bg-[#0a0f1a]/90 backdrop-blur-xl border-b border-cyan-900/30"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-4">
          {/* Project Title */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
              <Factory className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="font-bold text-white text-sm">PredictiveCare</h2>
              <p className="text-xs text-neutral-500">Technical Deep-Dive</p>
            </div>
          </div>
          
          {/* Page Tabs */}
          <div className="flex items-center gap-1 p-1 bg-[#1a2438] rounded-xl">
            <Link
              href="/projects/predictive-maintenance"
              className="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 text-neutral-400 hover:text-white"
            >
              Overview
            </Link>
            <Link
              href="/projects/predictive-maintenance/technical"
              className="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 text-neutral-400 hover:text-white"
            >
              Technical
            </Link>
            <Link
              href="/projects/predictive-maintenance/docs"
              className="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 text-neutral-400 hover:text-white"
            >
              Docs
            </Link>
            <Link
              href="/projects/predictive-maintenance/deep-dive"
              className="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 bg-cyan-500/20 text-cyan-400 shadow-sm"
            >
              Deep-Dive
            </Link>
          </div>
          
          {/* Actions */}
          <div className="hidden sm:flex items-center gap-3">
            <Button href="https://github.com/VaibhavK289/predictive_maintenance_for_industrial_devices" variant="outline" external className="text-sm border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10">
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
    { id: 'ensemble', title: 'Ensemble ML Models', icon: Brain },
    { id: 'feature-engineering', title: 'Feature Engineering', icon: Cog },
    { id: 'rag', title: 'RAG Pipeline', icon: Search },
    { id: 'iot', title: 'IoT Integration', icon: CircuitBoard },
    { id: 'streaming', title: 'Real-Time Streaming', icon: Activity },
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
        <div className="p-4 rounded-2xl bg-[#1a2438]/80 border border-cyan-900/30 backdrop-blur-sm">
          <p className="text-xs font-semibold text-neutral-500 mb-3 uppercase tracking-wider">Contents</p>
          <nav className="space-y-1">
            {sections.map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-neutral-400 hover:text-cyan-400 hover:bg-cyan-500/10 transition-colors group"
              >
                <section.icon className="w-4 h-4 group-hover:text-cyan-400 transition-colors" />
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
    <section className="relative py-24 overflow-hidden bg-gradient-to-br from-[#050810] via-[#0a0f1a] to-[#0d1425]">
      <DeepDiveBackground />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
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
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500">
              PredictiveCare
            </span>
          </h1>
          
          <p className="text-xl text-neutral-400 mb-8 leading-relaxed max-w-3xl mx-auto">
            A comprehensive exploration of the architectural decisions, ensemble ML models, IoT integration, and engineering challenges behind building an enterprise-grade predictive maintenance system.
          </p>
          
          <div className="flex flex-wrap justify-center gap-6 text-sm text-neutral-500">
            <span className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              12 min read
            </span>
            <span className="flex items-center gap-2">
              <Code2 className="w-4 h-4" />
              Technical Content
            </span>
            <span className="flex items-center gap-2">
              <Brain className="w-4 h-4" />
              ML/IoT Focus
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
        <div className="prose prose-lg prose-invert max-w-none prose-headings:text-white prose-p:text-neutral-400 prose-strong:text-white prose-a:text-cyan-400">
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
  color = 'cyan' 
}: { 
  icon: React.ElementType; 
  title: string; 
  children: React.ReactNode;
  color?: 'cyan' | 'blue' | 'violet' | 'amber';
}) {
  const colors = {
    cyan: 'bg-cyan-500/10 border-cyan-500/20 text-cyan-400',
    blue: 'bg-blue-500/10 border-blue-500/20 text-blue-400',
    violet: 'bg-violet-500/10 border-violet-500/20 text-violet-400',
    amber: 'bg-amber-500/10 border-amber-500/20 text-amber-400',
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
        title="Problem Statement: The Maintenance Paradox"
      >
        <p>
          Industrial manufacturing faces a critical dilemma: unplanned equipment failures cost billions annually in lost production, emergency repairs, and safety incidents. Traditional maintenance strategies—reactive (fix when broken) and preventive (scheduled maintenance)—both carry significant drawbacks.
        </p>

        <p>
          Reactive maintenance leads to catastrophic failures, production downtime, and safety hazards. A single unplanned motor failure in an automotive assembly line can halt production for hours, costing hundreds of thousands of dollars. Preventive maintenance, while reducing failures, often replaces perfectly functional components, wasting resources and creating unnecessary downtime.
        </p>

        <ul className="list-disc pl-6 space-y-2 my-6">
          <li><strong>$50 billion annually</strong> lost to unplanned downtime in US manufacturing alone</li>
          <li><strong>30-40%</strong> of preventive maintenance activities are performed unnecessarily</li>
          <li><strong>82%</strong> of asset failures occur randomly, not following predictable wear patterns</li>
          <li><strong>5-10x</strong> cost difference between planned and unplanned maintenance</li>
        </ul>

        <HighlightBox icon={Target} title="The Core Problem" color="amber">
          How do we predict equipment failures before they occur with sufficient accuracy and lead time to enable planned maintenance interventions—without generating excessive false alarms that undermine trust in the system?
        </HighlightBox>

        <p>
          PredictiveCare was designed to solve this problem by combining IoT sensor data collection, advanced machine learning models, and intelligent recommendation systems to predict equipment failures with high accuracy while minimizing false positives.
        </p>
      </ContentSection>

      {/* Solution Architecture */}
      <ContentSection 
        id="solution" 
        badge="Architecture" 
        badgeIcon={Lightbulb}
        badgeColor="bg-cyan-500/15 text-cyan-400 border-cyan-500/20"
        title="Solution Architecture: A Layered Approach"
      >
        <p>
          PredictiveCare implements a multi-tier architecture designed for scalability, real-time processing, and industrial-grade reliability. The system separates concerns across four distinct layers, each optimized for its specific responsibilities.
        </p>

        <h3 className="text-2xl font-bold bg-gradient-to-r from-white to-neutral-500 bg-clip-text text-transparent mt-10 mb-4">The IoT Sensor Layer</h3>
        <p>
          At the foundation lies the sensor network—Arduino-based data collectors equipped with temperature sensors (DHT22), vibration sensors (SW-420), current sensors, and acoustic sensors. These edge devices perform initial data filtering and aggregation before transmitting to the backend via MQTT protocol.
        </p>

        <p>
          The choice of MQTT over HTTP reflects industrial IoT requirements: lightweight protocol overhead, reliable message delivery with QoS levels, and support for intermittent connectivity. Sensors publish to topic hierarchies like <code>factory/line1/motor3/temperature</code>, enabling flexible subscription patterns for different monitoring needs.
        </p>

        <h3 className="text-2xl font-bold bg-gradient-to-r from-white to-neutral-500 bg-clip-text text-transparent mt-10 mb-4">The Data Processing Layer</h3>
        <p>
          Raw sensor data flows into FastAPI-based ingestion endpoints that perform validation, transformation, and storage. Time-series data is stored with efficient compression, while feature vectors are computed for ML model input.
        </p>

        <p>
          The processing pipeline implements sliding window aggregations—computing rolling statistics (mean, std, min, max, skewness, kurtosis) over configurable time windows. These statistical features capture both instantaneous conditions and trend patterns that raw measurements miss.
        </p>

        <HighlightBox icon={Layers} title="Why FastAPI?" color="cyan">
          FastAPI's async-first architecture handles the high-throughput, low-latency requirements of industrial IoT. With automatic OpenAPI documentation, Pydantic validation, and native async support, it provides the performance of Node.js with the type safety of TypeScript—ideal for mission-critical industrial applications.
        </HighlightBox>

        <h3 className="text-2xl font-bold bg-gradient-to-r from-white to-neutral-500 bg-clip-text text-transparent mt-10 mb-4">The Intelligence Layer</h3>
        <p>
          The ML layer implements an ensemble of three gradient boosting models—XGBoost, LightGBM, and CatBoost—each bringing unique strengths to the prediction task. A meta-learner combines their outputs, weighing each model's contribution based on validation performance.
        </p>

        <p>
          Beyond prediction, the intelligence layer incorporates a RAG (Retrieval-Augmented Generation) system using ChromaDB for vector storage. When the ensemble predicts elevated failure risk, the RAG system retrieves relevant maintenance procedures, historical failure analyses, and recommended actions from a curated knowledge base.
        </p>

        <h3 className="text-2xl font-bold bg-gradient-to-r from-white to-neutral-500 bg-clip-text text-transparent mt-10 mb-4">The Presentation Layer</h3>
        <p>
          Next.js 16 with React 19 powers the monitoring dashboard, providing real-time visualization of equipment health, prediction timelines, and maintenance recommendations. Framer Motion creates smooth, professional animations that convey system state without cognitive overload.
        </p>

        <p>
          The dashboard implements responsive design optimized for industrial environments—high-contrast color schemes visible in bright factory lighting, touch-friendly controls for tablet-based floor monitoring, and progressive loading that functions on limited bandwidth connections.
        </p>
      </ContentSection>

      {/* Ensemble ML Models */}
      <ContentSection 
        id="ensemble" 
        badge="Machine Learning" 
        badgeIcon={Brain}
        badgeColor="bg-violet-500/15 text-violet-400 border-violet-500/20"
        title="Ensemble ML Models: Strength in Diversity"
      >
        <p>
          The predictive engine employs an ensemble of three state-of-the-art gradient boosting implementations. This diversity isn't redundancy—each algorithm approaches the prediction task with different optimization strategies, learning dynamics, and bias-variance tradeoffs.
        </p>

        <h3 className="text-2xl font-bold bg-gradient-to-r from-white to-neutral-500 bg-clip-text text-transparent mt-10 mb-4">XGBoost: The Regularized Champion</h3>
        <p>
          XGBoost (Extreme Gradient Boosting) serves as the ensemble's foundation. Its L1 and L2 regularization terms prevent overfitting on noisy sensor data—crucial when temperature readings fluctuate due to ambient conditions rather than equipment issues.
        </p>

        <p>
          The model excels at handling sparse features common in industrial datasets. When a sensor temporarily goes offline, XGBoost's sparsity-aware split finding algorithm gracefully handles missing values without imputation, maintaining prediction quality.
        </p>

        <h3 className="text-2xl font-bold bg-gradient-to-r from-white to-neutral-500 bg-clip-text text-transparent mt-10 mb-4">LightGBM: Speed Meets Accuracy</h3>
        <p>
          LightGBM contributes fast inference times critical for real-time monitoring. Its leaf-wise tree growth strategy often achieves lower loss with fewer iterations compared to XGBoost's level-wise approach.
        </p>

        <p>
          For the predictive maintenance domain, LightGBM's histogram-based algorithm efficiently handles the high-cardinality categorical features common in equipment datasets—machine IDs, part numbers, and failure codes that would slow other algorithms.
        </p>

        <h3 className="text-2xl font-bold bg-gradient-to-r from-white to-neutral-500 bg-clip-text text-transparent mt-10 mb-4">CatBoost: Categorical Feature Master</h3>
        <p>
          CatBoost brings sophisticated categorical feature handling without requiring explicit encoding. Equipment type, manufacturer, operating mode—these categorical variables contain predictive signal that CatBoost captures through its ordered target statistics approach.
        </p>

        <p>
          The algorithm's symmetric tree structure also provides consistent inference times regardless of input, important for real-time systems where latency variance matters as much as average latency.
        </p>

        <HighlightBox icon={Brain} title="Meta-Learner Architecture" color="violet">
          The ensemble's outputs feed into a meta-learner that weights predictions based on each model's historical accuracy for similar input patterns. Tool Wear, identified as the most predictive feature, receives a 35% weight in the final prediction. This dynamic weighting adapts to different failure modes where certain models prove more accurate.
        </HighlightBox>

        <h3 className="text-2xl font-bold bg-gradient-to-r from-white to-neutral-500 bg-clip-text text-transparent mt-10 mb-4">Why Not Deep Learning?</h3>
        <p>
          Gradient boosting ensembles outperform deep learning for tabular industrial data. Neural networks require orders of magnitude more training samples, struggle with the irregular time series from industrial sensors, and provide less interpretable predictions—a serious limitation when explaining maintenance recommendations to floor managers.
        </p>

        <p>
          The ensemble approach also enables graceful degradation: if one model produces anomalous predictions (perhaps due to distribution drift in new equipment), the other two models dominate the final output until retraining occurs.
        </p>
      </ContentSection>

      {/* Feature Engineering */}
      <ContentSection 
        id="feature-engineering" 
        badge="Data Engineering" 
        badgeIcon={Cog}
        badgeColor="bg-blue-500/15 text-blue-400 border-blue-500/20"
        title="Feature Engineering: The Predictive Foundation"
      >
        <p>
          Raw sensor readings—temperature, vibration amplitude, current draw—contain limited predictive information in isolation. The feature engineering pipeline transforms these signals into rich, predictive features that capture equipment health patterns invisible to simple threshold monitoring.
        </p>

        <h3 className="text-2xl font-bold bg-gradient-to-r from-white to-neutral-500 bg-clip-text text-transparent mt-10 mb-4">Temporal Features</h3>
        <p>
          Equipment behavior varies by time—startup thermal transients, shift-change load variations, seasonal temperature influences. The pipeline extracts temporal features: hour of day, day of week, time since last maintenance, operating hours since installation.
        </p>

        <h3 className="text-2xl font-bold bg-gradient-to-r from-white to-neutral-500 bg-clip-text text-transparent mt-10 mb-4">Statistical Aggregations</h3>
        <p>
          Sliding window statistics capture dynamics that point-in-time readings miss. For each sensor channel, the pipeline computes: rolling mean, standard deviation, minimum, maximum, range, skewness, and kurtosis over 1-hour, 6-hour, and 24-hour windows.
        </p>

        <p>
          These statistics reveal degradation patterns—increasing vibration variance often precedes bearing failures, while temperature mean creep indicates cooling system degradation. The multi-scale windows capture both rapid changes and gradual trends.
        </p>

        <HighlightBox icon={BarChart3} title="Feature Importance Analysis" color="blue">
          Analysis reveals Tool Wear as the single most predictive feature, contributing 35% to model decisions. Temperature and rotational speed follow at 15-20% each. This insight guided the meta-learner's weighting strategy and informed sensor placement priorities for new installations.
        </HighlightBox>

        <h3 className="text-2xl font-bold bg-gradient-to-r from-white to-neutral-500 bg-clip-text text-transparent mt-10 mb-4">Cross-Sensor Features</h3>
        <p>
          Equipment components interact—motor temperature affects bearing lubrication, vibration induces electrical noise in sensors. The pipeline computes cross-sensor features: temperature-vibration ratios, current-speed correlations, and multi-variate statistical measures.
        </p>

        <p>
          These interaction features often capture failure modes that single-sensor analysis misses. A motor drawing normal current but showing elevated vibration relative to its speed indicates mechanical issues invisible to either metric alone.
        </p>
      </ContentSection>

      {/* RAG Pipeline */}
      <ContentSection 
        id="rag" 
        badge="Knowledge Retrieval" 
        badgeIcon={Search}
        badgeColor="bg-cyan-500/15 text-cyan-400 border-cyan-500/20"
        title="RAG Pipeline: From Prediction to Action"
      >
        <p>
          Predicting failure is only half the solution. Maintenance technicians need actionable guidance: what to check, which parts to prepare, what procedures to follow. The RAG (Retrieval-Augmented Generation) pipeline bridges predictions and actions.
        </p>

        <h3 className="text-2xl font-bold bg-gradient-to-r from-white to-neutral-500 bg-clip-text text-transparent mt-10 mb-4">Knowledge Base Architecture</h3>
        <p>
          The knowledge base aggregates maintenance manuals, historical failure reports, parts catalogs, and procedural documentation. Documents are chunked, embedded using sentence transformers, and stored in ChromaDB for efficient semantic retrieval.
        </p>

        <p>
          When the ensemble model predicts elevated failure probability, the RAG system constructs a query incorporating the predicted failure mode, equipment type, and current sensor readings. ChromaDB returns the most semantically relevant documentation chunks.
        </p>

        <h3 className="text-2xl font-bold bg-gradient-to-r from-white to-neutral-500 bg-clip-text text-transparent mt-10 mb-4">Recommendation Generation</h3>
        <p>
          Retrieved context flows to an LLM (via Gemini API) that synthesizes actionable recommendations. The model is prompt-engineered to produce structured output: urgency level, recommended actions, required parts, estimated repair time, and safety considerations.
        </p>

        <HighlightBox icon={Database} title="Continuous Learning" color="cyan">
          Maintenance outcomes are logged and fed back into the knowledge base. When a predicted failure is investigated, the actual cause and resolution are documented. Over time, the RAG system learns from real-world feedback, improving recommendation relevance.
        </HighlightBox>
      </ContentSection>

      {/* IoT Integration */}
      <ContentSection 
        id="iot" 
        badge="Hardware Layer" 
        badgeIcon={CircuitBoard}
        badgeColor="bg-green-500/15 text-green-400 border-green-500/20"
        title="IoT Integration: The Sensor Network"
      >
        <p>
          The most sophisticated ML models are useless without quality input data. The IoT layer implements industrial-grade sensor data collection using Arduino-based edge devices—chosen for their reliability, low cost, and extensive component ecosystem.
        </p>

        <h3 className="text-2xl font-bold bg-gradient-to-r from-white to-neutral-500 bg-clip-text text-transparent mt-10 mb-4">Sensor Selection</h3>
        <p>
          Each monitoring node incorporates sensors selected for specific failure mode detection:
        </p>

        <ul className="list-disc pl-6 space-y-2 my-6">
          <li><strong>DHT22 temperature/humidity sensors</strong>: Detect thermal anomalies indicating overload, lubrication failure, or cooling issues</li>
          <li><strong>SW-420 vibration sensors</strong>: Capture mechanical issues—imbalance, misalignment, bearing degradation</li>
          <li><strong>ACS712 current sensors</strong>: Monitor electrical load, detecting motor degradation and overload conditions</li>
          <li><strong>Sound sensors</strong>: Acoustic analysis for early detection of gear mesh issues and component looseness</li>
        </ul>

        <h3 className="text-2xl font-bold bg-gradient-to-r from-white to-neutral-500 bg-clip-text text-transparent mt-10 mb-4">Edge Processing</h3>
        <p>
          Arduino nodes perform local preprocessing: noise filtering, outlier rejection, and basic aggregation. This edge processing reduces bandwidth requirements and improves data quality before transmission.
        </p>

        <p>
          Each node implements local anomaly detection using simple statistical thresholds. When readings exceed bounds, the node increases sampling frequency and transmits higher-fidelity data—adaptive bandwidth utilization that maximizes information during critical periods.
        </p>

        <HighlightBox icon={Radio} title="MQTT Protocol" color="cyan">
          MQTT provides reliable, lightweight messaging ideal for industrial IoT. Quality of Service levels ensure critical alerts reach the backend despite network interruptions. Topic hierarchies enable flexible routing—all motor data to one consumer, all temperature data to another, or equipment-specific subscriptions for targeted monitoring.
        </HighlightBox>
      </ContentSection>

      {/* Real-Time Streaming */}
      <ContentSection 
        id="streaming" 
        badge="Live Updates" 
        badgeIcon={Activity}
        badgeColor="bg-blue-500/15 text-blue-400 border-blue-500/20"
        title="Real-Time Streaming: Continuous Monitoring"
      >
        <p>
          Industrial monitoring demands real-time visibility. Delays in surfacing anomalies can mean the difference between planned maintenance and catastrophic failure. PredictiveCare implements WebSocket-based streaming for live dashboard updates.
        </p>

        <h3 className="text-2xl font-bold bg-gradient-to-r from-white to-neutral-500 bg-clip-text text-transparent mt-10 mb-4">The Streaming Architecture</h3>
        <p>
          Sensor data flows through a publish-subscribe architecture. The FastAPI backend maintains WebSocket connections with dashboard clients, pushing updates as predictions refresh. This eliminates polling overhead and provides sub-second latency for critical alerts.
        </p>

        <p>
          The frontend React application uses optimistic updates and client-side caching to maintain smooth visualization even during momentary connectivity issues. Stale data is clearly indicated, maintaining operator trust in the displayed information.
        </p>

        <h3 className="text-2xl font-bold bg-gradient-to-r from-white to-neutral-500 bg-clip-text text-transparent mt-10 mb-4">Alert Prioritization</h3>
        <p>
          Not all alerts are equal. The system implements multi-level severity classification: informational (logged only), warning (dashboard notification), critical (immediate notification), and emergency (all-channel alert including SMS/email).
        </p>

        <p>
          Alert fatigue is addressed through intelligent suppression—repeated warnings for the same issue are consolidated, and acknowledged alerts don't resurface until conditions change. This keeps operators focused on truly novel situations.
        </p>
      </ContentSection>

      {/* Challenges & Solutions */}
      <ContentSection 
        id="challenges" 
        badge="Engineering" 
        badgeIcon={AlertTriangle}
        badgeColor="bg-amber-500/15 text-amber-400 border-amber-500/20"
        title="Challenges & Solutions: Lessons Learned"
      >
        <p>
          Building production-grade predictive maintenance systems surfaces challenges that academic papers rarely address. These engineering lessons shaped PredictiveCare's architecture.
        </p>

        <h3 className="text-2xl font-bold bg-gradient-to-r from-white to-neutral-500 bg-clip-text text-transparent mt-10 mb-4">Challenge: Class Imbalance</h3>
        <p>
          Failures are rare events—typically less than 1% of operating hours. Training on imbalanced data produces models that predict "no failure" constantly, achieving high accuracy but zero utility.
        </p>

        <p>
          <strong>Solution:</strong> PredictiveCare implements SMOTE (Synthetic Minority Over-sampling) combined with class weights in the boosting objective functions. The ensemble is optimized for recall (catching failures) while maintaining acceptable precision (avoiding false alarms).
        </p>

        <h3 className="text-2xl font-bold bg-gradient-to-r from-white to-neutral-500 bg-clip-text text-transparent mt-10 mb-4">Challenge: Sensor Drift</h3>
        <p>
          Sensors degrade over time—temperature sensors lose calibration, vibration sensors develop mechanical wear. Uncorrected drift causes model accuracy degradation.
        </p>

        <p>
          <strong>Solution:</strong> The system implements continuous calibration monitoring. Statistical properties of each sensor's output are tracked; significant drift triggers calibration alerts. Models are periodically retrained on recent data to adapt to gradual sensor changes.
        </p>

        <h3 className="text-2xl font-bold bg-gradient-to-r from-white to-neutral-500 bg-clip-text text-transparent mt-10 mb-4">Challenge: Cold Start</h3>
        <p>
          New equipment has no historical data. Models trained on existing equipment may not generalize to new machines with different operating characteristics.
        </p>

        <p>
          <strong>Solution:</strong> Transfer learning adapts models to new equipment using limited data. Initial predictions rely on equipment-type baselines, gradually shifting to equipment-specific models as operational data accumulates.
        </p>

        <HighlightBox icon={CheckCircle2} title="Continuous Improvement" color="cyan">
          Every prediction is a learning opportunity. The system logs predictions alongside actual outcomes, enabling continuous model evaluation. Periodic retraining incorporates new failure patterns, ensuring the system improves with operational experience rather than degrading.
        </HighlightBox>
      </ContentSection>

      {/* Conclusion */}
      <section className="py-16 scroll-mt-32">
        <ScrollReveal>
          <div className="p-8 rounded-3xl bg-gradient-to-br from-cyan-500/10 via-blue-500/5 to-violet-500/10 border border-cyan-500/20">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-white to-neutral-500 bg-clip-text text-transparent mb-4">
              Conclusion: The Future of Industrial Maintenance
            </h2>
            <p className="text-neutral-400 mb-6">
              PredictiveCare demonstrates that effective predictive maintenance isn't about any single technology—it's about the thoughtful integration of IoT sensing, ensemble machine learning, and intelligent recommendation systems into a cohesive platform.
            </p>
            <p className="text-neutral-400 mb-8">
              As industrial IoT sensors become cheaper and ML inference moves to edge devices, predictive maintenance will become standard practice. The architectural patterns and engineering lessons embedded in PredictiveCare provide a template for this industrial AI future.
            </p>
            <div className="flex flex-wrap gap-4">
              <HoverBorderGradient
                containerClassName="rounded-full"
                href="https://github.com/VaibhavK289/predictive_maintenance_for_industrial_devices"
                className="bg-[#0a0f1a] text-white flex items-center gap-2 px-6 py-2"
              >
                <Github className="w-5 h-5" />
                <span>Explore the Code</span>
              </HoverBorderGradient>
              <Button href="https://predictivecare-ai.vercel.app/" variant="outline" external className="border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10">
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
export default function PredictiveCareDeepDivePage() {
  return (
    <div className="relative bg-[#050810]">
      <ScrollProgress />
      <DeepDiveHero />
      <DeepDivePageNav />
      <MainContent />
    </div>
  );
}
