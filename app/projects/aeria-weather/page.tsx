'use client';

import { useRef, ReactNode } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { 
  ArrowLeft, Github, Cloud, Wind, Thermometer, Download,
  ChevronRight, Code2, Layers, Sparkles, Cpu, Database,
  Globe, Server, Droplets, Sun, Play, Eye
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { getProjectBySlug } from '@/data/projects';
import { AeriaWeatherPreviewSection } from '@/components/AeriaWeatherPreviewSection';
import {
  Spotlight, BackgroundBeams, SparklesCore, HoverBorderGradient,
} from '@/components/ui/aceternity';
import {
  ScrollReveal, ScrollProgress, cardContainerVariants, cardVariants,
  CloudFloat, RustBadge, weatherCardContainerVariants, weatherCardVariants,
  weatherBadgeVariants, easings, badgeVariants, TiltCard
} from '@/components/animations';
import { Project } from '@/types';

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
              <span className="mt-2 w-1.5 h-1.5 rounded-full bg-gradient-to-r from-sky-500 to-amber-500 flex-shrink-0" />
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
            <code className="text-sm text-sky-400 block mt-6">{codeContent.trim()}</code>
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
          <span className="w-8 h-8 rounded-xl bg-gradient-to-br from-sky-500/20 to-amber-500/20 flex items-center justify-center">
            <ChevronRight className="w-4 h-4 text-sky-500" />
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
      .replace(/`([^`]+)`/g, '<code class="bg-gray-100 dark:bg-neutral-800 px-2 py-0.5 rounded-lg text-sky-600 dark:text-sky-400 text-sm font-mono">$1</code>');
    
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
function AeriaWeatherHero({ project }: { project: Project }) {
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
      className="relative min-h-[90vh] flex items-center overflow-hidden bg-gradient-to-br from-sky-50 via-white to-amber-50/20 dark:from-[#080c14] dark:via-[#0a1018] dark:to-[#0c1420]"
    >
      {/* Spotlight Effect */}
      <div className="hidden dark:block">
        <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="#38bdf8" />
      </div>
      
      {/* Sparkles */}
      <div className="absolute inset-0 w-full h-full">
        <SparklesCore
          id="aeria-hero-sparkles"
          background="transparent"
          minSize={0.4}
          maxSize={1.2}
          particleDensity={20}
          className="w-full h-full"
          particleColor="var(--color-sparkle)"
        />
      </div>
      
      {/* Gradient Orbs - Sky/Amber blend */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          className="absolute top-20 right-20 w-96 h-96 bg-sky-500/20 dark:bg-sky-600/15 rounded-full blur-3xl"
          animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div 
          className="absolute bottom-20 left-20 w-80 h-80 bg-cyan-500/15 dark:bg-cyan-500/10 rounded-full blur-3xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        />
        <motion.div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-500/10 rounded-full blur-3xl"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />
        <div className="hidden lg:block">
          <CloudFloat size={120} opacity={0.15} delay={0} className="top-32 left-20 text-sky-200 dark:text-white" />
          <CloudFloat size={80} opacity={0.1} delay={1.5} className="top-48 right-40 text-amber-100 dark:text-white" />
        </div>
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
            className="inline-flex items-center gap-2 text-gray-500 dark:text-neutral-400 hover:text-sky-500 dark:hover:text-sky-400 mb-12 group transition-colors"
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
            {/* Badge - Rust badge incorporated directly */}
            <motion.div
              variants={badgeVariants}
              initial="hidden"
              animate="visible"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#CE422B]/10 to-amber-500/10 border border-[#CE422B]/30 text-[#CE422B] dark:text-[#CE422B] text-sm font-medium mb-6 backdrop-blur-sm"
            >
              <RustBadge size={16} />
              Full-Stack Rust Application
            </motion.div>

            {/* Title */}
            <motion.h1 
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <span className="block">Aeria Weather</span>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-sky-500 via-cyan-500 to-amber-500 dark:from-sky-400 dark:via-cyan-400 dark:to-amber-400">
                Studio
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p
              className="text-xl text-gray-600 dark:text-neutral-400 mb-8 leading-relaxed"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              A real-time climate dashboard powered by Rust. Fast, resilient, and beautifully designed.
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
                  className="bg-white dark:bg-black text-black dark:text-white flex items-center gap-2 px-6 py-2"
                >
                  <Play className="w-4 h-4" />
                  <span>Try Live Demo</span>
                </HoverBorderGradient>
              )}
              {project.downloadUrl && (
                <Button href={project.downloadUrl} variant="primary" external className="rounded-full bg-amber-500 hover:bg-amber-600 text-white">
                  <Download className="w-4 h-4 mr-2" />
                  Download .exe
                </Button>
              )}
              {project.githubUrl && (
                <Button href={project.githubUrl} variant="outline" external className="rounded-full">
                  <Github className="w-4 h-4 mr-2" />
                  Source
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
            {/* Floating Decorations */}
            <motion.div
              animate={{ y: [-10, 10, -10], rotate: [0, 5, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -top-8 -right-8 w-20 h-20 rounded-2xl bg-gradient-to-br from-sky-500 to-cyan-600 flex items-center justify-center shadow-2xl shadow-sky-500/30 z-20"
            >
              <Cloud className="w-10 h-10 text-white" />
            </motion.div>
            
            <motion.div
              animate={{ y: [10, -10, 10], rotate: [0, -5, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
              className="absolute -bottom-6 -left-6 w-16 h-16 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shadow-xl shadow-amber-500/30 z-20"
            >
              <Sun className="w-8 h-8 text-white" />
            </motion.div>

            <motion.div
              animate={{ y: [-5, 15, -5], x: [0, 5, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
              className="absolute top-1/2 -right-4 w-14 h-14 rounded-xl bg-gradient-to-br from-[#CE422B] to-red-600 flex items-center justify-center shadow-lg shadow-red-500/30 z-20 rotate-12"
            >
              <RustBadge size={32} />
            </motion.div>

            {/* Main Card */}
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-sky-500/35 via-cyan-500/25 to-amber-500/30 rounded-3xl blur-2xl opacity-70 dark:opacity-50" />
              <div className="relative rounded-2xl overflow-hidden border border-sky-500/20 dark:border-sky-900/50 bg-white/80 dark:bg-[#0c1628]/90 backdrop-blur-sm shadow-2xl">
                {project.image ? (
                  <div className="relative aspect-[4/3]">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover object-top"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                  </div>
                ) : (
                  <div className="aspect-[4/3] bg-gradient-to-br from-sky-500/20 to-amber-500/20 flex items-center justify-center">
                    <span className="text-8xl font-bold text-sky-500/30">AW</span>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Background Beams */}
      <div className="hidden dark:block">
        <BackgroundBeams className="opacity-20" />
      </div>
    </section>
  );
}

// Features Section
function AeriaWeatherFeatures() {
  const features = [
    {
      icon: Cloud,
      title: 'Live Weather',
      description: 'Real-time conditions for any city worldwide via Open-Meteo API with millisecond latency.',
      gradient: 'from-sky-500 to-cyan-500',
      bgGradient: 'from-sky-500/10 to-sky-500/5',
      borderColor: 'border-sky-500/20',
      iconBg: 'bg-gradient-to-br from-sky-400 to-sky-600',
    },
    {
      icon: Droplets,
      title: 'Air Quality',
      description: 'Comprehensive US AQI, PM2.5, PM10 readings with actionable health guidance alerts.',
      gradient: 'from-emerald-500 to-teal-500',
      bgGradient: 'from-emerald-500/10 to-emerald-500/5',
      borderColor: 'border-emerald-500/20',
      iconBg: 'bg-gradient-to-br from-emerald-400 to-emerald-600',
    },
    {
      icon: Sun,
      title: 'Dynamic Scenes',
      description: 'UI gradients and animations that adapt dynamically to sunny, rainy, stormy, or snowy conditions.',
      gradient: 'from-amber-500 to-orange-500',
      bgGradient: 'from-amber-500/10 to-amber-500/5',
      borderColor: 'border-amber-500/20',
      iconBg: 'bg-gradient-to-br from-amber-400 to-amber-600',
    },
  ];

  return (
    <section className="py-24 bg-gray-50 dark:bg-[#080c14] relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-white/50 dark:from-[#0a1018]/50 via-transparent to-transparent pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-gradient-radial from-sky-500/8 via-cyan-500/5 to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <ScrollReveal>
          <div className="text-center mb-16">
            <motion.span 
              className="inline-block px-4 py-2 rounded-full bg-sky-500/15 text-sky-600 dark:text-sky-400 text-sm font-medium mb-4 border border-sky-500/20"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
            >
              Core Features
            </motion.span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Complete Climate{' '}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-sky-400 via-cyan-500 to-amber-500">
                Dashboard
              </span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-neutral-400 max-w-2xl mx-auto">
              Everything you need to stay ahead of the weather, packaged in a sleek interface.
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
                <div className={`relative h-full p-8 rounded-3xl bg-gradient-to-br ${feature.bgGradient} border ${feature.borderColor} bg-white dark:bg-transparent backdrop-blur-sm hover:border-opacity-50 transition-all duration-300`}>
                  <div className={`absolute -inset-0.5 rounded-3xl bg-gradient-to-r ${feature.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-xl`} />
                  
                  <div className="relative mb-6">
                    <div className={`w-16 h-16 rounded-2xl ${feature.iconBg} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <feature.icon className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  
                  <h3 className="relative text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-sky-500 group-hover:to-cyan-500 transition-all duration-300">
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

// Rust Comparison Section
function AeriaWeatherWhyRust() {
  const comparison = [
    { aspect: 'Backend Language', js: 'Node.js / Python', rust: 'Rust (Axum + Tokio)' },
    { aspect: 'Type Safety', js: 'Runtime errors', rust: 'Compile-time guarantees' },
    { aspect: 'Async I/O', js: 'Event loop', rust: 'Tokio green threads' },
    { aspect: 'Desktop App', js: 'Electron (~150MB)', rust: 'Tauri (~8MB)' },
    { aspect: 'Shared Types', js: 'Manual sync', rust: 'Rust workspace crates' },
  ];

  return (
    <section className="py-24 bg-white dark:bg-[#0c1420]/70 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50 dark:from-[#080c14] via-transparent to-gray-50 dark:to-[#080c14] pointer-events-none" />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <ScrollReveal>
          <div className="text-center mb-12">
            <motion.span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#CE422B]/10 text-[#CE422B] text-sm font-medium mb-4 border border-[#CE422B]/20">
              <RustBadge size={16} />
              Performance Showdown
            </motion.span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              JavaScript vs{' '}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#CE422B] to-amber-500">
                Rust
              </span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-neutral-400 max-w-2xl mx-auto">
              See why Rust is the ideal choice for high-performance weather backends and desktop applications.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <div className="rounded-2xl overflow-hidden border border-gray-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/50 backdrop-blur-sm shadow-xl">
            <div className="grid grid-cols-3 bg-gray-50 dark:bg-neutral-800/50">
              <div className="p-4 text-center text-sm font-semibold text-gray-500 dark:text-neutral-400">Aspect</div>
              <div className="p-4 text-center text-sm font-bold text-amber-500 dark:text-amber-400 flex items-center justify-center gap-2">
                <Code2 className="w-4 h-4" /> JS / Python
              </div>
              <div className="p-4 text-center text-sm font-bold text-[#CE422B] flex items-center justify-center gap-2">
                <RustBadge size={16} /> Rust
              </div>
            </div>
            {comparison.map((row, i) => (
              <motion.div key={row.aspect} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="grid grid-cols-3 border-t border-gray-100 dark:border-neutral-800 hover:bg-gray-50 dark:hover:bg-neutral-800/30 transition-colors">
                <div className="p-4 text-sm font-medium text-gray-700 dark:text-neutral-300">{row.aspect}</div>
                <div className="p-4 text-center text-sm text-gray-500 dark:text-neutral-500">{row.js}</div>
                <div className="p-4 text-center text-sm font-medium text-sky-600 dark:text-sky-400">{row.rust}</div>
              </motion.div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

// Architecture Section
function AeriaWeatherArchitecture() {
  const steps = [
    { icon: Globe, label: 'City Search' },
    { icon: Server, label: 'Geocode' },
    { icon: Layers, label: 'Parallel Fetch' },
    { icon: Database, label: 'JSON Response' },
    { icon: Eye, label: 'Dynamic UI' },
  ];

  return (
    <section className="py-24 bg-gray-50 dark:bg-[#080c14] relative overflow-hidden">
      <div className="absolute inset-0">
        <SparklesCore
          id="aeria-architecture-sparkles"
          background="transparent"
          minSize={0.3}
          maxSize={0.8}
          particleDensity={15}
          className="w-full h-full"
          particleColor="#38bdf8"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <ScrollReveal>
          <div className="text-center mb-16">
            <motion.span className="inline-block px-4 py-2 rounded-full bg-sky-500/15 text-sky-600 dark:text-sky-400 text-sm font-medium mb-4 border border-sky-500/20">
              System Architecture
            </motion.span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              How It{' '}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-sky-400 to-amber-500">
                Works
              </span>
            </h2>
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <div className="p-8 sm:p-12 rounded-3xl bg-white dark:bg-neutral-900/60 border border-gray-200 dark:border-neutral-800 backdrop-blur-sm shadow-xl max-w-5xl mx-auto">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-10 text-center">Request Flow</h3>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-2">
              {steps.map((step, i) => (
                <div key={step.label} className="flex items-center gap-2">
                  <motion.div initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="flex flex-col items-center">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-sky-500/10 to-amber-500/10 dark:from-sky-500/20 dark:to-amber-500/20 border border-sky-200 dark:border-sky-500/30 flex items-center justify-center mb-3 shadow-sm">
                      <step.icon className="w-7 h-7 text-sky-600 dark:text-sky-400" />
                    </div>
                    <span className="text-sm font-medium text-gray-700 dark:text-neutral-400">{step.label}</span>
                  </motion.div>
                  {i < 4 && (
                    <div className="hidden sm:block w-12 h-1 bg-gradient-to-r from-sky-300 to-sky-100 dark:from-sky-500/40 dark:to-sky-500/10 mx-2 rounded-full" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

// Content Section
function AeriaWeatherContent({ project }: { project: Project }) {
  return (
    <section className="py-24 bg-white dark:bg-[#0c1420]/70 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <ScrollReveal>
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-sky-500 to-amber-500 flex items-center justify-center shadow-lg">
              <Cloud className="w-6 h-6 text-white" />
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
function AeriaWeatherTechStack() {
  const techStack = [
    { category: 'Backend', items: ['Rust', 'Axum', 'Tokio', 'Reqwest', 'Serde'] },
    { category: 'Frontend', items: ['Next.js 16', 'React 19', 'TypeScript', 'Tailwind 4'] },
    { category: 'Desktop', items: ['Tauri 2', 'NSIS', 'Rust Shell'] },
    { category: 'Infrastructure', items: ['Vercel', 'Render', 'Open-Meteo'] },
  ];

  return (
    <section className="py-24 bg-gray-50 dark:bg-[#080c14] relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-white dark:from-[#0c1420]/70 via-transparent to-gray-50 dark:to-[#080c14] pointer-events-none" />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <ScrollReveal>
          <div className="text-center mb-12">
            <motion.span className="inline-block px-4 py-2 rounded-full bg-sky-500/15 text-sky-600 dark:text-sky-400 text-sm font-medium mb-4 border border-sky-500/20">
              Technologies
            </motion.span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Built With{' '}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-sky-400 via-cyan-500 to-amber-500">
                Best-in-Class
              </span>
            </h2>
          </div>
        </ScrollReveal>

        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {techStack.map((stack) => (
            <motion.div key={stack.category} variants={itemVariants} whileHover={{ scale: 1.05, y: -4 }} className="group">
              <div className="flex flex-col p-6 rounded-2xl bg-white dark:bg-[#1a2438]/80 border border-gray-200 dark:border-[#2d3f5f] hover:border-sky-500/50 transition-all duration-300 shadow-sm h-full">
                <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-4">{stack.category}</h4>
                <div className="flex flex-wrap gap-2">
                  {stack.items.map((item) => (
                    <span key={item} className="px-3 py-1.5 text-xs font-medium rounded-lg bg-gray-100 dark:bg-neutral-800 text-gray-700 dark:text-neutral-300 group-hover:bg-sky-50 dark:group-hover:bg-sky-900/30 group-hover:text-sky-700 dark:group-hover:text-sky-300 transition-colors">
                      {item}
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

// Main Page Component
export default function AeriaWeatherPage() {
  const project = getProjectBySlug('aeria-weather');

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-neutral-950">
        <p className="text-gray-600 dark:text-neutral-400">Project not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#080c14] overflow-x-hidden">
      <ScrollProgress />
      
      <AeriaWeatherHero project={project} />
      <AeriaWeatherPreviewSection />
      <AeriaWeatherFeatures />
      <AeriaWeatherWhyRust />
      <AeriaWeatherArchitecture />
      <AeriaWeatherContent project={project} />
      <AeriaWeatherTechStack />
      
      {/* Footer Nav */}
      <section className="relative py-12 px-4 sm:px-6 border-t border-gray-200 dark:border-neutral-800 bg-white dark:bg-[#0c1420]/70">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <Link href="/projects" className="group inline-flex items-center gap-2 text-gray-500 dark:text-neutral-400 hover:text-sky-600 dark:hover:text-sky-400 transition-colors font-medium">
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" /> Back to Projects
          </Link>
          <div className="flex items-center gap-6">
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-gray-600 dark:text-neutral-400 hover:text-sky-600 dark:hover:text-sky-400 transition-colors">Live Demo</a>
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-gray-600 dark:text-neutral-400 hover:text-sky-600 dark:hover:text-sky-400 transition-colors">GitHub</a>
            <a href={project.downloadUrl} target="_blank" rel="noopener noreferrer" className="text-sm font-bold text-amber-600 dark:text-amber-400 hover:text-amber-700 dark:hover:text-amber-300 transition-colors flex items-center gap-1.5">
              <Download className="w-4 h-4" /> Download Installer
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
