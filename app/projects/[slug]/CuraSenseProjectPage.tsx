'use client';

import { useRef, ReactNode } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { 
  ArrowLeft, 
  Github, 
  Brain, 
  FileText, 
  Pill, 
  Image as ImageIcon,
  Activity,
  Shield,
  Clock,
  Cpu,
  Layers,
  Server,
  Database,
  Sparkles,
  ChevronRight,
  Play
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Project } from '@/types';
import { CuraSensePreviewSection } from '@/components/CuraSensePreviewSection';
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
  badgeVariants,
} from '@/components/animations';

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: easings.smooth,
    },
  },
};

// Markdown renderer
function renderDescription(text: string) {
  const lines = text.split('\n');
  const elements: ReactNode[] = [];
  let currentList: string[] = [];
  let inCodeBlock = false;
  let codeContent = '';
  let inTable = false;
  let tableRows: string[][] = [];
  
  const flushList = () => {
    if (currentList.length > 0) {
      elements.push(
        <motion.ul 
          key={`list-${elements.length}`} 
          className="space-y-3 mb-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {currentList.map((item, i) => (
            <motion.li 
              key={i} 
              variants={itemVariants}
              className="flex items-start gap-3 text-gray-600 dark:text-neutral-400"
            >
              <span className="mt-2 w-1.5 h-1.5 rounded-full bg-gradient-to-r from-primary-500 to-accent-500 flex-shrink-0" />
              <span>{item}</span>
            </motion.li>
          ))}
        </motion.ul>
      );
      currentList = [];
    }
  };
  
  const flushTable = () => {
    if (tableRows.length > 0) {
      const headerRow = tableRows[0];
      const bodyRows = tableRows.slice(2);
      elements.push(
        <motion.div 
          key={`table-${elements.length}`} 
          className="overflow-x-auto mb-8 rounded-2xl border border-gray-200 dark:border-neutral-800"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50 dark:bg-neutral-900/50">
              <tr>
                {headerRow.map((cell, i) => (
                  <th key={i} className="px-6 py-4 font-semibold text-gray-900 dark:text-white">{cell.trim()}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {bodyRows.map((row, i) => (
                <tr key={i} className="border-t border-gray-200 dark:border-neutral-800 hover:bg-gray-50 dark:hover:bg-neutral-900/30 transition-colors">
                  {row.map((cell, j) => (
                    <td key={j} className="px-6 py-4 text-gray-600 dark:text-neutral-400">{cell.trim()}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      );
      tableRows = [];
      inTable = false;
    }
  };
  
  lines.forEach((line) => {
    if (line.startsWith('```')) {
      if (inCodeBlock) {
        elements.push(
          <motion.pre 
            key={`code-${elements.length}`} 
            className="relative bg-gray-900 dark:bg-neutral-900/80 border border-gray-800 dark:border-neutral-700 rounded-2xl p-6 overflow-x-auto mb-8 backdrop-blur-sm"
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <div className="absolute top-4 left-4 flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
            </div>
            <code className="text-sm text-cyan-400 block mt-6">{codeContent.trim()}</code>
          </motion.pre>
        );
        codeContent = '';
        inCodeBlock = false;
      } else {
        flushList();
        flushTable();
        inCodeBlock = true;
      }
      return;
    }
    
    if (inCodeBlock) {
      codeContent += line + '\n';
      return;
    }
    
    if (line.includes('|') && line.trim().startsWith('|')) {
      flushList();
      inTable = true;
      const cells = line.split('|').filter(cell => cell.trim() !== '');
      if (!line.includes('---')) {
        tableRows.push(cells);
      } else {
        tableRows.push(cells);
      }
      return;
    } else if (inTable) {
      flushTable();
    }
    
    if (line.startsWith('## ')) {
      flushList();
      const text = line.replace('## ', '').replace(/[🎯💡🏗️🚀🔧📊🛠️]/g, '').trim();
      const emoji = line.match(/[🎯💡🏗️🚀🔧📊🛠️]/)?.[0] || '';
      elements.push(
        <motion.h2 
          key={`h2-${elements.length}`} 
          className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mt-16 mb-6 flex items-center gap-3"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: easings.smooth }}
        >
          {emoji && <span className="text-3xl">{emoji}</span>}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-neutral-400">
            {text}
          </span>
        </motion.h2>
      );
      return;
    }
    
    if (line.startsWith('### ')) {
      flushList();
      const text = line.replace('### ', '').replace(/^\d+\.\s*/, '').trim();
      elements.push(
        <motion.h3 
          key={`h3-${elements.length}`} 
          className="text-xl font-semibold text-gray-900 dark:text-white mt-8 mb-4 flex items-center gap-3"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          <span className="w-8 h-8 rounded-xl bg-gradient-to-br from-primary-500/20 to-accent-500/20 flex items-center justify-center">
            <ChevronRight className="w-4 h-4 text-primary-500" />
          </span>
          {text}
        </motion.h3>
      );
      return;
    }
    
    if (line.startsWith('- ') || line.startsWith('* ')) {
      const item = line.replace(/^[-*]\s+/, '').replace(/\*\*([^*]+)\*\*/g, '$1');
      currentList.push(item);
      return;
    }
    
    if (line.trim() === '') {
      flushList();
      return;
    }
    
    flushList();
    const processedLine = line
      .replace(/\*\*([^*]+)\*\*/g, '<strong class="text-gray-900 dark:text-white font-semibold">$1</strong>')
      .replace(/`([^`]+)`/g, '<code class="bg-gray-100 dark:bg-neutral-800 px-2 py-0.5 rounded-lg text-primary-600 dark:text-cyan-400 text-sm font-mono">$1</code>');
    
    elements.push(
      <motion.p 
        key={`p-${elements.length}`} 
        className="text-gray-600 dark:text-neutral-400 mb-6 leading-relaxed text-lg"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        dangerouslySetInnerHTML={{ __html: processedLine }}
      />
    );
  });
  
  flushList();
  flushTable();
  
  return elements;
}

// Hero Section
function CuraSenseHero({ project }: { project: Project }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });
  
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section 
      ref={containerRef}
      className="relative min-h-[90vh] flex items-center overflow-hidden bg-gradient-to-br from-gray-50 via-white to-emerald-50/20 dark:from-[#0a0e17] dark:via-[#0c1628] dark:to-[#0a1220]"
    >
      {/* Spotlight Effect - CuraSense emerald + portfolio cyan blend */}
      <div className="hidden dark:block">
        <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="#10b981" />
      </div>
      
      {/* Sparkles */}
      <div className="absolute inset-0 w-full h-full">
        <SparklesCore
          id="curasense-hero-sparkles"
          background="transparent"
          minSize={0.4}
          maxSize={1.2}
          particleDensity={30}
          className="w-full h-full"
          particleColor="var(--color-sparkle)"
        />
      </div>
      
      {/* Gradient Orbs - CuraSense teal + portfolio cyan/violet blend */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          className="absolute top-20 right-20 w-96 h-96 bg-emerald-500/25 rounded-full blur-3xl"
          animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div 
          className="absolute bottom-20 left-20 w-80 h-80 bg-cyan-500/20 rounded-full blur-3xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        />
        <motion.div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-violet-500/10 rounded-full blur-3xl"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />
        {/* Additional CuraSense accent */}
        <motion.div 
          className="absolute top-40 left-1/3 w-72 h-72 bg-teal-500/15 rounded-full blur-3xl"
          animate={{ scale: [1, 1.15, 1], opacity: [0.2, 0.35, 0.2] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
        />
      </div>

      <motion.div style={{ y, opacity }} className="absolute inset-0 z-0" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Back Link */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-gray-500 dark:text-neutral-400 hover:text-primary-500 dark:hover:text-cyan-400 mb-12 group transition-colors"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Projects
          </Link>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 0.8, ease: easings.dramatic }}
          >
            {/* Badge - CuraSense green accent */}
            <motion.div
              variants={badgeVariants}
              initial="hidden"
              animate="visible"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-emerald-500/15 to-cyan-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-sm font-medium mb-6 backdrop-blur-sm"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              Featured Project • {project.year}
            </motion.div>

            {/* Title - CuraSense branding with portfolio accent */}
            <motion.h1 
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 via-cyan-500 to-violet-500">
                CuraSense
              </span>
              <br />
              <span className="text-gray-900 dark:text-white">AI Healthcare</span>
            </motion.h1>

            {/* Description */}
            <motion.p
              className="text-xl text-gray-600 dark:text-neutral-400 mb-8 leading-relaxed"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              {project.description}
            </motion.p>

            {/* Action Buttons */}
            <motion.div 
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              {project.liveUrl && (
                <HoverBorderGradient
                  containerClassName="rounded-full"
                  href={project.liveUrl}
                  className="dark:bg-black bg-white text-black dark:text-white flex items-center gap-2 px-6 py-2"
                >
                  <Play className="w-4 h-4" />
                  <span>Try Live Demo</span>
                </HoverBorderGradient>
              )}
              {project.githubUrl && (
                <Button href={project.githubUrl} variant="outline" external>
                  <Github className="w-4 h-4" />
                  View Source
                </Button>
              )}
            </motion.div>
          </motion.div>

          {/* Visual Element */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotateY: -10 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: easings.dramatic }}
            className="relative hidden lg:block"
          >
            {/* Floating Decorations - CuraSense themed */}
            <motion.div
              animate={{ y: [-10, 10, -10], rotate: [0, 5, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -top-8 -right-8 w-20 h-20 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-2xl shadow-emerald-500/30 z-20"
            >
              <Brain className="w-10 h-10 text-white" />
            </motion.div>
            
            <motion.div
              animate={{ y: [10, -10, 10], rotate: [0, -5, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
              className="absolute -bottom-6 -left-6 w-16 h-16 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-xl shadow-cyan-500/30 z-20"
            >
              <Activity className="w-8 h-8 text-white" />
            </motion.div>

            <motion.div
              animate={{ y: [-5, 15, -5], x: [0, 5, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
              className="absolute top-1/2 -right-4 w-14 h-14 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center shadow-lg shadow-violet-500/30 z-20 rotate-12"
            >
              <Shield className="w-7 h-7 text-white" />
            </motion.div>

            {/* Main Card - CuraSense themed glow */}
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-emerald-500/35 via-cyan-500/25 to-violet-500/30 rounded-3xl blur-2xl opacity-70" />
              <div className="relative rounded-2xl overflow-hidden border border-emerald-500/20 dark:border-emerald-900/50 bg-white/80 dark:bg-[#0c1628]/90 backdrop-blur-sm shadow-2xl">
                {project.image ? (
                  <div className="relative aspect-[4/3]">
                    {/* Use img tag for SVG compatibility */}
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover object-top"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                  </div>
                ) : (
                  <div className="aspect-[4/3] bg-gradient-to-br from-cyan-500/20 to-violet-500/20 flex items-center justify-center">
                    <span className="text-8xl font-bold text-primary-500/30">CS</span>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Background Beams */}
      <div className="hidden dark:block">
        <BackgroundBeams className="opacity-30" />
      </div>
    </section>
  );
}

// Features Section
function CuraSenseFeatures() {
  const features = [
    {
      icon: FileText,
      title: 'Prescription Analysis',
      description: 'AI-powered PDF parsing and medical insight extraction from prescriptions and blood reports',
      gradient: 'from-cyan-500 to-blue-500',
      bgGradient: 'from-cyan-500/10 to-cyan-500/5',
      borderColor: 'border-cyan-500/20',
      iconBg: 'bg-gradient-to-br from-cyan-400 to-cyan-600',
    },
    {
      icon: ImageIcon,
      title: 'Medical Imaging',
      description: 'X-ray, CT, and MRI analysis with Gemini Vision for accurate diagnostics',
      gradient: 'from-emerald-500 to-teal-500',
      bgGradient: 'from-emerald-500/10 to-emerald-500/5',
      borderColor: 'border-emerald-500/20',
      iconBg: 'bg-gradient-to-br from-emerald-400 to-emerald-600',
    },
    {
      icon: Pill,
      title: 'Drug Comparison',
      description: 'Medication interactions, alternatives lookup, and comprehensive drug information',
      gradient: 'from-violet-500 to-purple-500',
      bgGradient: 'from-violet-500/10 to-violet-500/5',
      borderColor: 'border-violet-500/20',
      iconBg: 'bg-gradient-to-br from-violet-400 to-violet-600',
    },
  ];

  return (
    <section className="py-24 bg-gray-50 dark:bg-[#0a0e17] relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-white/50 dark:from-[#0c1628]/50 via-transparent to-transparent pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-gradient-radial from-emerald-500/8 via-cyan-500/5 to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <ScrollReveal>
          <div className="text-center mb-16">
            <motion.span 
              className="inline-block px-4 py-2 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 text-sm font-medium mb-4 border border-emerald-500/20"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
            >
              Core Features
            </motion.span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Powered by{' '}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 via-cyan-500 to-violet-500">
                Advanced AI
              </span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-neutral-400 max-w-2xl mx-auto">
              Three specialized AI models working together for comprehensive healthcare support
            </p>
          </div>
        </ScrollReveal>

        <motion.div 
          className="grid md:grid-cols-3 gap-6"
          variants={cardContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              variants={cardVariants}
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
              className="group"
            >
              <TiltCard className="h-full">
                <div className={`relative h-full p-8 rounded-3xl bg-gradient-to-br ${feature.bgGradient} border ${feature.borderColor} backdrop-blur-sm hover:border-opacity-50 transition-all duration-300`}>
                  <div className={`absolute -inset-0.5 rounded-3xl bg-gradient-to-r ${feature.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-xl`} />
                  
                  <div className="relative mb-6">
                    <div className={`w-16 h-16 rounded-2xl ${feature.iconBg} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <feature.icon className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  
                  <h3 className="relative text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-primary-500 group-hover:to-accent-500 transition-all duration-300">
                    {feature.title}
                  </h3>
                  <p className="relative text-gray-600 dark:text-neutral-400 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// Stats Section
function CuraSenseStats() {
  const stats = [
    { value: '10+', label: 'Reports Analyzed', icon: FileText, color: 'text-cyan-500' },
    { value: '98.5%', label: 'Accuracy Rate', icon: Activity, color: 'text-emerald-500' },
    { value: '<30s', label: 'Response Time', icon: Clock, color: 'text-violet-500' },
    { value: '3', label: 'AI Models', icon: Cpu, color: 'text-amber-500' },
  ];

  return (
    <section className="py-16 bg-white dark:bg-[#0c1628]/60 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50 dark:from-neutral-950 via-transparent to-gray-50 dark:to-neutral-950 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          className="grid grid-cols-2 lg:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {stats.map((stat) => (
            <motion.div key={stat.label} variants={itemVariants}>
              <TiltCard className="h-full">
                <div className="relative p-6 rounded-2xl bg-gray-50 dark:bg-neutral-900/80 border border-gray-200 dark:border-neutral-800 text-center backdrop-blur-sm hover:border-primary-500/50 transition-all duration-300 h-full">
                  <div className="flex justify-center mb-4">
                    <div className="w-12 h-12 rounded-xl bg-gray-100 dark:bg-neutral-800 flex items-center justify-center">
                      <stat.icon className={`w-6 h-6 ${stat.color}`} />
                    </div>
                  </div>
                  <div className={`text-3xl sm:text-4xl font-bold ${stat.color} mb-2`}>
                    {stat.value}
                  </div>
                  <div className="text-sm font-medium text-gray-500 dark:text-neutral-500">
                    {stat.label}
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// Architecture Section
function CuraSenseArchitecture() {
  const layers = [
    { title: 'Frontend', icon: Layers, items: ['Next.js 14', 'TypeScript', 'Tailwind CSS', 'Framer Motion'], color: 'from-cyan-500 to-blue-500' },
    { title: 'Backend', icon: Server, items: ['FastAPI', 'Python', 'CrewAI', 'LangGraph'], color: 'from-violet-500 to-purple-500' },
    { title: 'AI/ML', icon: Brain, items: ['Gemini Pro', 'Gemini Vision', 'RAG Pipeline', 'Multi-Agent'], color: 'from-emerald-500 to-teal-500' },
    { title: 'Data', icon: Database, items: ['ChromaDB', 'Vector Search', 'PDF Parsing', 'SSE'], color: 'from-amber-500 to-orange-500' },
  ];

  return (
    <section className="py-24 bg-gray-50 dark:bg-[#0a0e17] relative overflow-hidden">
      <div className="absolute inset-0">
        <SparklesCore
          id="architecture-sparkles"
          background="transparent"
          minSize={0.3}
          maxSize={0.8}
          particleDensity={15}
          className="w-full h-full"
          particleColor="#10b981"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <ScrollReveal>
          <div className="text-center mb-16">
            <motion.span className="inline-block px-4 py-2 rounded-full bg-cyan-500/15 text-cyan-600 dark:text-cyan-400 text-sm font-medium mb-4 border border-cyan-500/20">
              System Architecture
            </motion.span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Built with{' '}
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
          {layers.map((layer) => (
            <motion.div key={layer.title} variants={cardVariants} whileHover={{ y: -8 }} className="group">
              <div className="relative h-full p-6 rounded-2xl bg-white dark:bg-[#1a2438]/80 border border-gray-200 dark:border-[#2d3f5f] backdrop-blur-sm hover:border-emerald-500/30 transition-all duration-300">
                <div className="flex items-center gap-3 mb-6">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${layer.color} flex items-center justify-center shadow-lg`}>
                    <layer.icon className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="font-bold text-gray-900 dark:text-white">{layer.title}</h3>
                </div>
                <div className="space-y-3">
                  {layer.items.map((item) => (
                    <div key={item} className="flex items-center gap-2 text-sm text-gray-600 dark:text-neutral-400">
                      <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${layer.color}`} />
                      {item}
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

// Preview Section
function CuraSensePreviewWrapper() {
  return (
    <section className="py-24 bg-white dark:bg-[#0c1628]/70 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50 dark:from-[#0a0e17] via-transparent to-gray-50 dark:to-[#0a0e17] pointer-events-none" />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <ScrollReveal>
          <div className="text-center mb-12">
            <motion.span className="inline-block px-4 py-2 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-sm font-medium mb-4">
              Interactive Demo
            </motion.span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Try it{' '}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-500 to-cyan-500">
                Yourself
              </span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-neutral-400 max-w-2xl mx-auto">
              Click on the preview below to explore CuraSense in an interactive window
            </p>
          </div>
        </ScrollReveal>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <CuraSensePreviewSection />
        </motion.div>
      </div>
    </section>
  );
}

// Content Section
function CuraSenseContent({ project }: { project: Project }) {
  return (
    <section className="py-24 bg-gray-50 dark:bg-[#0a0e17] relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <ScrollReveal>
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Deep Dive</h2>
          </div>
        </ScrollReveal>

        <div className="prose prose-lg prose-gray dark:prose-invert max-w-none">
          {renderDescription(project.longDescription)}
        </div>
      </div>
    </section>
  );
}

// Tech Stack Section
function CuraSenseTechStack({ project }: { project: Project }) {
  return (
    <section className="py-24 bg-white dark:bg-[#0c1628]/70 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50 dark:from-[#0a0e17] via-transparent to-gray-50 dark:to-[#0a0e17] pointer-events-none" />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <ScrollReveal>
          <div className="text-center mb-12">
            <motion.span className="inline-block px-4 py-2 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 text-sm font-medium mb-4 border border-emerald-500/20">
              Technologies
            </motion.span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Built With{' '}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 via-cyan-500 to-violet-500">
                Best-in-Class
              </span>
            </h2>
          </div>
        </ScrollReveal>

        <motion.div 
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {project.tags.map((tag) => (
            <motion.div key={tag} variants={itemVariants} whileHover={{ scale: 1.05, y: -4 }} className="group">
              <div className="flex items-center gap-3 p-4 rounded-xl bg-gray-50 dark:bg-[#1a2438]/80 border border-gray-200 dark:border-[#2d3f5f] hover:border-emerald-500/50 transition-all duration-300">
                <div className="w-2 h-2 rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500 group-hover:scale-150 transition-transform" />
                <span className="text-sm font-medium text-gray-700 dark:text-neutral-300">{tag}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// Navigation Section
function CuraSenseNavigation() {
  return (
    <section className="py-16 bg-gradient-to-b from-gray-50 to-white dark:from-[#0a0e17] dark:to-[#0c1628] relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="flex flex-col sm:flex-row justify-between items-center gap-6 p-8 rounded-3xl bg-white dark:bg-[#1a2438]/80 border border-gray-200 dark:border-[#2d3f5f] shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Button href="/projects" variant="ghost">
            <ArrowLeft className="w-4 h-4" />
            All Projects
          </Button>
          <HoverBorderGradient
            containerClassName="rounded-full"
            href="/contact"
            className="dark:bg-black bg-white text-black dark:text-white flex items-center gap-2 px-6 py-2"
          >
            <Sparkles className="w-4 h-4" />
            <span>Start a Project</span>
          </HoverBorderGradient>
        </motion.div>
      </div>
    </section>
  );
}

// Main CuraSense Project Page Component
export function CuraSenseProjectPage({ project }: { project: Project }) {
  return (
    <div className="relative">
      <ScrollProgress />
      <CuraSenseHero project={project} />
      <CuraSenseFeatures />
      <CuraSenseStats />
      <CuraSensePreviewWrapper />
      <CuraSenseArchitecture />
      <CuraSenseContent project={project} />
      <CuraSenseTechStack project={project} />
      <CuraSenseNavigation />
    </div>
  );
}
