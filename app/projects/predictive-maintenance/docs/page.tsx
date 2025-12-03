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
  GitBranch,
  FolderTree,
  Download,
  Terminal,
  Settings,
  Key,
  Play,
  Monitor,
  Code2,
  Sparkles,
  Github,
  ExternalLink,
  Check,
  Copy,
  ChevronRight,
  Zap,
  CircuitBoard,
  Thermometer,
  Radio,
  Gauge,
  BarChart3,
  Bell,
  Activity
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

// Industrial-themed Background Component
function DocsBackground() {
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
          id="docs-sparkles"
          background="transparent"
          minSize={0.3}
          maxSize={1}
          particleDensity={15}
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
function DocsPageNav() {
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
              <p className="text-xs text-neutral-500">Documentation</p>
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
              className="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 bg-cyan-500/20 text-cyan-400 shadow-sm"
            >
              Docs
            </Link>
            <Link
              href="/projects/predictive-maintenance/deep-dive"
              className="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 text-neutral-400 hover:text-white"
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
      <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-violet-500/20 rounded-2xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity" />
      <div className="relative bg-[#0c1628] rounded-xl border border-cyan-900/30 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 bg-[#0a0f1a] border-b border-cyan-900/30">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
            </div>
            {title && <span className="text-xs text-neutral-500 font-mono">{title}</span>}
          </div>
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 text-xs transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            {copied ? 'Copied!' : 'Copy'}
          </button>
        </div>
        {/* Code */}
        <pre className="p-4 overflow-x-auto">
          <code className="text-sm text-neutral-300 font-mono">{code}</code>
        </pre>
      </div>
    </div>
  );
}

// Hero Section
function DocsHero() {
  return (
    <section className="relative py-24 overflow-hidden bg-gradient-to-br from-[#050810] via-[#0a0f1a] to-[#0d1425]">
      <DocsBackground />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
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
        
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: easings.smooth }}
          >
            <motion.span 
              className="inline-block px-4 py-2 rounded-full bg-cyan-500/15 text-cyan-400 text-sm font-medium mb-6 border border-cyan-500/20"
            >
              <BookOpen className="w-4 h-4 inline mr-2" />
              Full Documentation
            </motion.span>
            
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6 leading-tight">
              Getting{' '}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500">
                Started
              </span>
            </h1>
            
            <p className="text-xl text-neutral-400 mb-8 leading-relaxed">
              Complete setup guide, installation instructions, and configuration documentation for PredictiveCare - your AI-powered predictive maintenance system for industrial devices.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Button href="https://github.com/VaibhavK289/predictive_maintenance_for_industrial_devices" variant="primary" external className="bg-gradient-to-r from-cyan-500 to-blue-500">
                <Github className="w-4 h-4" />
                Clone Repository
              </Button>
              <Button href="https://predictivecare-ai.vercel.app/" variant="outline" external className="border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10">
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
              { icon: Download, label: 'Installation', href: '#installation', color: 'text-cyan-400' },
              { icon: Settings, label: 'Configuration', href: '#configuration', color: 'text-violet-400' },
              { icon: FolderTree, label: 'Project Structure', href: '#structure', color: 'text-blue-400' },
              { icon: Play, label: 'Running', href: '#running', color: 'text-green-400' },
            ].map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="p-4 rounded-2xl bg-[#1a2438]/80 border border-cyan-900/30 backdrop-blur-sm hover:border-cyan-500/30 transition-all duration-300 group"
              >
                <item.icon className={`w-6 h-6 ${item.color} mb-2 group-hover:scale-110 transition-transform`} />
                <p className="font-semibold text-white">{item.label}</p>
              </a>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// Core Features Section
function CoreFeaturesSection() {
  const features = [
    {
      icon: Gauge,
      title: 'Real-time Monitoring',
      description: 'Track machine health, temperature, and performance metrics in real-time',
      color: 'from-cyan-500 to-blue-500',
    },
    {
      icon: Brain,
      title: 'ML Predictions',
      description: 'Ensemble models predict failures before they occur',
      color: 'from-violet-500 to-purple-500',
    },
    {
      icon: Bell,
      title: 'Smart Alerts',
      description: 'RAG-powered recommendations for maintenance actions',
      color: 'from-blue-500 to-indigo-500',
    },
    {
      icon: CircuitBoard,
      title: 'IoT Integration',
      description: 'Arduino sensors with MQTT protocol for data collection',
      color: 'from-green-500 to-teal-500',
    },
  ];

  return (
    <section className="py-24 bg-[#0a0f1a] relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#050810] via-transparent to-[#050810] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <ScrollReveal>
          <div className="text-center mb-16">
            <motion.span className="inline-block px-4 py-2 rounded-full bg-cyan-500/15 text-cyan-400 text-sm font-medium mb-4 border border-cyan-500/20">
              Core Features
            </motion.span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Powerful{' '}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500">
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
                <div className="h-full p-6 rounded-2xl bg-[#1a2438]/80 border border-cyan-900/30 backdrop-blur-sm">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg`}>
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-bold text-white mb-2">{feature.title}</h3>
                  <p className="text-sm text-neutral-400">{feature.description}</p>
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
    { name: 'Arduino IDE', description: 'For IoT programming', icon: CircuitBoard },
  ];

  const hardware = [
    { name: 'Arduino Board', description: 'Uno, Mega, or compatible' },
    { name: 'DHT22 Sensor', description: 'Temperature & humidity' },
    { name: 'Vibration Sensor', description: 'SW-420 or similar' },
  ];

  return (
    <section id="prerequisites" className="py-24 bg-[#0c1628]/60 relative overflow-hidden">
      <DocsBackground />
      
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <ScrollReveal>
          <div className="text-center mb-16">
            <motion.span className="inline-block px-4 py-2 rounded-full bg-blue-500/15 text-blue-400 text-sm font-medium mb-4 border border-blue-500/20">
              Prerequisites
            </motion.span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Before You{' '}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
                Begin
              </span>
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Software Requirements */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="p-6 rounded-2xl bg-[#1a2438]/80 border border-cyan-900/30"
          >
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <Cpu className="w-5 h-5 text-cyan-400" />
              Software Requirements
            </h3>
            <div className="space-y-4">
              {prerequisites.map((prereq) => (
                <div key={prereq.name} className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/10 flex items-center justify-center flex-shrink-0">
                    <prereq.icon className="w-5 h-5 text-cyan-400" />
                  </div>
                  <div>
                    <p className="font-semibold text-white">{prereq.name}</p>
                    <p className="text-sm text-neutral-400">{prereq.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Hardware Requirements */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="p-6 rounded-2xl bg-[#1a2438]/80 border border-cyan-900/30"
          >
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <CircuitBoard className="w-5 h-5 text-violet-400" />
              Hardware Requirements (Optional)
            </h3>
            <div className="space-y-4">
              {hardware.map((item) => (
                <div key={item.name} className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-violet-500/10 flex items-center justify-center flex-shrink-0">
                    <Radio className="w-5 h-5 text-violet-400" />
                  </div>
                  <div>
                    <p className="font-semibold text-white">{item.name}</p>
                    <p className="text-sm text-neutral-400">{item.description}</p>
                  </div>
                </div>
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
    <section id="installation" className="py-24 bg-[#0a0f1a] relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0c1628] via-transparent to-[#0c1628] pointer-events-none" />
      
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <ScrollReveal>
          <div className="text-center mb-16">
            <motion.span className="inline-block px-4 py-2 rounded-full bg-cyan-500/15 text-cyan-400 text-sm font-medium mb-4 border border-cyan-500/20">
              <Download className="w-4 h-4 inline mr-2" />
              Installation
            </motion.span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Setup{' '}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
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
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center text-white font-bold">
                1
              </div>
              <h3 className="text-xl font-bold text-white">Clone Repository</h3>
            </div>
            <CodeBlock 
              code={`git clone https://github.com/VaibhavK289/predictive_maintenance_for_industrial_devices.git
cd predictive_maintenance_for_industrial_devices`}
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
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-violet-500 flex items-center justify-center text-white font-bold">
                2
              </div>
              <h3 className="text-xl font-bold text-white">Setup Next.js Frontend</h3>
            </div>
            <CodeBlock 
              code={`cd predictive-maintenance-frontend
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
              <h3 className="text-xl font-bold text-white">Setup Python Backend</h3>
            </div>
            <CodeBlock 
              code={`cd ml-backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\\Scripts\\activate
pip install -r requirements.txt`}
              title="terminal"
            />
          </motion.div>

          {/* Step 4 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold">
                4
              </div>
              <h3 className="text-xl font-bold text-white">Train ML Models (Optional)</h3>
            </div>
            <CodeBlock 
              code={`cd ml-backend
python train_models.py`}
              title="terminal"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// Configuration Section
function ConfigurationSection() {
  return (
    <section id="configuration" className="py-24 bg-[#0c1628]/60 relative overflow-hidden">
      <DocsBackground />
      
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <ScrollReveal>
          <div className="text-center mb-16">
            <motion.span className="inline-block px-4 py-2 rounded-full bg-violet-500/15 text-violet-400 text-sm font-medium mb-4 border border-violet-500/20">
              <Key className="w-4 h-4 inline mr-2" />
              Configuration
            </motion.span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Environment{' '}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-violet-400 to-purple-500">
                Setup
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
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <Layers className="w-5 h-5 text-cyan-400" />
              predictive-maintenance-frontend/.env.local
            </h3>
            <CodeBlock 
              code={`NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_WS_URL=ws://localhost:8000/ws`}
              language="env"
              title=".env.local"
            />
          </motion.div>

          {/* Backend .env */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <Brain className="w-5 h-5 text-violet-400" />
              ml-backend/.env
            </h3>
            <CodeBlock 
              code={`GOOGLE_API_KEY="your_gemini_api_key"
GROQ_API_KEY="your_groq_api_key"
MODEL_PATH="./models"
DATABASE_URL="sqlite:///./predictions.db"`}
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
  const structure = `predictive_maintenance_for_industrial_devices/
├── predictive-maintenance-frontend/    # Next.js 16 Frontend
│   ├── src/
│   │   ├── app/                        # App Router pages
│   │   │   ├── dashboard/              # Real-time monitoring
│   │   │   ├── predictions/            # ML predictions view
│   │   │   ├── settings/               # Configuration
│   │   │   └── history/                # Maintenance history
│   │   ├── components/                 # React components
│   │   │   ├── ui/                     # Shadcn/UI components
│   │   │   ├── charts/                 # Data visualizations
│   │   │   └── widgets/                # Dashboard widgets
│   │   └── lib/                        # Utilities & API client
│   ├── package.json
│   └── tailwind.config.ts
│
├── ml-backend/                          # FastAPI ML Backend
│   ├── models/                          # Trained ML models
│   │   ├── xgboost_model.pkl
│   │   ├── lightgbm_model.pkl
│   │   └── catboost_model.pkl
│   ├── config/
│   │   ├── ensemble.py                 # Ensemble prediction
│   │   ├── rag.py                      # RAG recommendations
│   │   └── vectordb.py                 # ChromaDB setup
│   ├── main.py                         # FastAPI server
│   ├── train_models.py                 # Model training
│   └── requirements.txt
│
├── arduino/                             # IoT Sensor Code
│   ├── sensor_hub.ino                  # Main Arduino code
│   └── libraries/                       # Required libraries
│
├── data/                                # Dataset & samples
│   └── predictive_maintenance.csv
│
├── .gitignore
└── README.md`;

  return (
    <section id="structure" className="py-24 bg-[#0a0f1a] relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0c1628] via-transparent to-[#0c1628] pointer-events-none" />
      
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <ScrollReveal>
          <div className="text-center mb-16">
            <motion.span className="inline-block px-4 py-2 rounded-full bg-blue-500/15 text-blue-400 text-sm font-medium mb-4 border border-blue-500/20">
              <FolderTree className="w-4 h-4 inline mr-2" />
              Project Structure
            </motion.span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Directory{' '}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
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
    { name: 'Next.js Dashboard', url: 'http://localhost:3000', icon: Monitor, color: 'text-cyan-400' },
    { name: 'API Documentation', url: 'http://localhost:8000/docs', icon: BookOpen, color: 'text-violet-400' },
    { name: 'Health Check', url: 'http://localhost:8000/health', icon: Activity, color: 'text-green-400' },
  ];

  return (
    <section id="running" className="py-24 bg-[#0c1628]/60 relative overflow-hidden">
      <DocsBackground />
      
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <ScrollReveal>
          <div className="text-center mb-16">
            <motion.span className="inline-block px-4 py-2 rounded-full bg-green-500/15 text-green-400 text-sm font-medium mb-4 border border-green-500/20">
              <Play className="w-4 h-4 inline mr-2" />
              Running
            </motion.span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Start the{' '}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
                Application
              </span>
            </h2>
          </div>
        </ScrollReveal>

        <div className="space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="space-y-6">
              <div>
                <p className="text-sm text-neutral-400 mb-2 font-medium flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-cyan-400" />
                  Terminal 1 - Next.js Frontend:
                </p>
                <CodeBlock 
                  code={`cd predictive-maintenance-frontend
npm run dev`}
                  title="terminal 1"
                />
              </div>

              <div>
                <p className="text-sm text-neutral-400 mb-2 font-medium flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-violet-400" />
                  Terminal 2 - FastAPI Backend:
                </p>
                <CodeBlock 
                  code={`cd ml-backend
source venv/bin/activate  # On Windows: venv\\Scripts\\activate
uvicorn main:app --host 0.0.0.0 --port 8000 --reload`}
                  title="terminal 2"
                />
              </div>
            </div>
          </motion.div>

          {/* Access Points */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="p-6 rounded-2xl bg-[#1a2438]/80 border border-cyan-900/30"
          >
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <Zap className="w-5 h-5 text-green-400" />
              Access Points
            </h3>
            <div className="grid sm:grid-cols-3 gap-4">
              {accessPoints.map((point) => (
                <div key={point.name} className="p-4 rounded-xl bg-[#0a0f1a] border border-cyan-900/30">
                  <point.icon className={`w-6 h-6 ${point.color} mb-2`} />
                  <p className="font-semibold text-white text-sm">{point.name}</p>
                  <code className="text-xs text-neutral-500">{point.url}</code>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// CTA Section
function CTASection() {
  return (
    <section className="py-24 bg-[#0a0f1a] relative overflow-hidden">
      <DocsBackground />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          className="text-center p-12 rounded-3xl bg-gradient-to-br from-cyan-500/10 via-blue-500/5 to-violet-500/10 border border-cyan-500/20 backdrop-blur-sm"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center mx-auto mb-6"
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          >
            <Github className="w-8 h-8 text-white" />
          </motion.div>
          
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-neutral-400 mb-8 max-w-xl mx-auto">
            Clone the repository, set up your environment, and start monitoring your industrial equipment with AI-powered predictions.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4">
            <HoverBorderGradient
              containerClassName="rounded-full"
              href="https://github.com/VaibhavK289/predictive_maintenance_for_industrial_devices"
              className="bg-[#0a0f1a] text-white flex items-center gap-2 px-6 py-2"
            >
              <Github className="w-5 h-5" />
              <span>View on GitHub</span>
            </HoverBorderGradient>
            <Button href="https://predictivecare-ai.vercel.app/" variant="outline" external className="border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10">
              <ExternalLink className="w-4 h-4" />
              Try Live Demo
            </Button>
          </div>
          
          <div className="mt-8 pt-8 border-t border-cyan-900/30">
            <p className="text-sm text-neutral-500">
              Made with ❤️ by Vaibhav • MIT License
            </p>
            <div className="flex justify-center gap-4 mt-4">
              <a href="https://github.com/VaibhavK289/predictive_maintenance_for_industrial_devices" target="_blank" rel="noopener noreferrer" className="text-sm text-neutral-500 hover:text-cyan-400 transition-colors">
                ⭐ Star this repo
              </a>
              <a href="https://github.com/VaibhavK289/predictive_maintenance_for_industrial_devices/issues" target="_blank" rel="noopener noreferrer" className="text-sm text-neutral-500 hover:text-cyan-400 transition-colors">
                🐛 Report Bug
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// Main Page Component
export default function PredictiveCareDocsPage() {
  return (
    <div className="relative bg-[#050810]">
      <ScrollProgress />
      <DocsHero />
      <DocsPageNav />
      <CoreFeaturesSection />
      <PrerequisitesSection />
      <InstallationSection />
      <ConfigurationSection />
      <ProjectStructureSection />
      <RunningSection />
      <CTASection />
    </div>
  );
}
