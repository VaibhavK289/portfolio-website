'use client';

import { useRef, ReactNode, useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
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
  CloudFloat, RustBadge, easings, badgeVariants, TiltCard
} from '@/components/animations';
import { Project } from '@/types';

// ==========================================
// UTILS & ANIMATIONS
// ==========================================

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: easings.smooth } },
};

// ==========================================
// SUB-NAVIGATION (Sticky Header)
// ==========================================
function ProjectSubNav({ project }: { project: Project }) {
  const [activeSection, setActiveSection] = useState('overview');
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);

      // Simple scroll spy
      const sections = ['overview', 'technical', 'docs', 'deep-dive'];
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 150 && rect.bottom >= 150) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'overview', label: 'Overview' },
    { id: 'technical', label: 'Technical' },
    { id: 'docs', label: 'Docs' },
    { id: 'deep-dive', label: 'Deep-Dive' },
  ];

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const yOffset = -100; // Account for sticky nav
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <motion.div 
      className={`sticky top-[72px] left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled 
          ? 'bg-[#050a14]/90 backdrop-blur-md border-b border-white/5 shadow-2xl' 
          : 'bg-[#050a14]'
      }`}
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: easings.smooth }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Left: Brand */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => scrollTo('overview')}>
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-sky-500 to-amber-500 flex items-center justify-center shadow-lg shadow-sky-500/20">
            <Cloud className="w-5 h-5 text-white" />
          </div>
          <div className="hidden sm:block">
            <h2 className="text-white font-bold text-lg leading-tight">Aeria Weather</h2>
            <p className="text-neutral-400 text-xs font-medium">Climate Intelligence Platform</p>
          </div>
        </div>

        {/* Middle: Navigation Pills */}
        <div className="hidden md:flex items-center gap-1 p-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className={`px-5 py-1.5 rounded-full text-sm font-medium transition-all duration-300 ${
                activeSection === item.id
                  ? 'bg-sky-500/20 text-sky-400'
                  : 'text-neutral-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Right: CTA */}
        <div className="flex items-center gap-4">
          <Link
            href="/projects"
            className="hidden lg:flex items-center gap-2 text-sm text-neutral-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Portfolio
          </Link>
          <HoverBorderGradient
            containerClassName="rounded-full"
            as="a"
            href={project.downloadUrl || '#'}
            target="_blank"
            className="bg-black/20 text-white flex items-center gap-2 px-5 py-2 hover:bg-sky-500/10 transition-colors"
          >
            <Download className="w-4 h-4 text-sky-400" />
            <span className="text-sm font-semibold">Download .exe</span>
          </HoverBorderGradient>
        </div>
      </div>
    </motion.div>
  );
}

// ==========================================
// HERO SECTION (Overview)
// ==========================================
function AeriaWeatherHero({ project }: { project: Project }) {
  return (
    <section id="overview" className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-[#050a14] pt-20">
      <div className="absolute inset-0 w-full h-full">
        <SparklesCore
          id="aeria-hero-sparkles"
          background="transparent"
          minSize={0.4}
          maxSize={1.2}
          particleDensity={20}
          className="w-full h-full opacity-50"
          particleColor="#38bdf8"
        />
      </div>

      <div className="absolute inset-0 bg-gradient-radial from-sky-900/20 via-transparent to-transparent pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        <motion.div
          variants={badgeVariants}
          initial="hidden"
          animate="visible"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-400 text-sm font-medium mb-8 backdrop-blur-sm shadow-xl shadow-sky-500/10"
        >
          <RustBadge size={16} />
          High-Performance Rust Desktop App
        </motion.div>

        <motion.h1 
          className="text-5xl sm:text-7xl font-bold text-white mb-6 tracking-tight max-w-4xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Real-Time Climate{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-cyan-400 to-amber-400">
            Intelligence
          </span>
        </motion.h1>

        <motion.p
          className="text-xl text-neutral-400 mb-12 max-w-2xl leading-relaxed"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          A hyper-fast, beautifully designed weather dashboard engineered from the ground up using Rust, Tauri, and modern Web Technologies.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="w-full max-w-5xl relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-sky-900/50"
        >
          <div className="absolute inset-0 bg-gradient-to-t from-[#050a14] via-transparent to-transparent z-10 pointer-events-none" />
          <AeriaWeatherPreviewSection />
        </motion.div>
      </div>
    </section>
  );
}

// ==========================================
// FEATURES SECTION (Technical)
// ==========================================
function AeriaWeatherFeatures() {
  const features = [
    {
      icon: Cloud,
      title: 'Live Weather Engine',
      description: 'Asynchronous Tokio-based backend fetching real-time Open-Meteo data globally with millisecond latency.',
      gradient: 'from-sky-500 to-cyan-500',
      bgGradient: 'from-sky-500/10 to-sky-500/5',
      borderColor: 'border-sky-500/20',
      iconBg: 'bg-gradient-to-br from-sky-400 to-sky-600',
    },
    {
      icon: Database,
      title: 'Local Persistence',
      description: 'Lightning-fast local caching of favorite cities and user preferences using secure Rust filesystem APIs.',
      gradient: 'from-emerald-500 to-teal-500',
      bgGradient: 'from-emerald-500/10 to-emerald-500/5',
      borderColor: 'border-emerald-500/20',
      iconBg: 'bg-gradient-to-br from-emerald-400 to-emerald-600',
    },
    {
      icon: Cpu,
      title: 'Tiny Desktop Footprint',
      description: 'Compiled directly to machine code via Tauri, resulting in an incredibly small ~8MB memory footprint.',
      gradient: 'from-amber-500 to-orange-500',
      bgGradient: 'from-amber-500/10 to-amber-500/5',
      borderColor: 'border-amber-500/20',
      iconBg: 'bg-gradient-to-br from-amber-400 to-amber-600',
    },
  ];

  return (
    <section id="technical" className="py-32 bg-[#050a14] relative overflow-hidden border-t border-white/5">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-gradient-radial from-sky-500/5 via-transparent to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <ScrollReveal>
          <div className="text-center mb-20">
            <motion.div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              Core Technologies
            </motion.div>
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
              Powered by{' '}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-sky-400 via-cyan-400 to-emerald-400">
                Advanced Systems
              </span>
            </h2>
            <p className="text-xl text-neutral-400 max-w-2xl mx-auto">
              Engineered with Rust and Tauri for maximum performance, minimal resource usage, and unparalleled safety.
            </p>
          </div>
        </ScrollReveal>

        <motion.div 
          className="grid md:grid-cols-3 gap-8"
          variants={cardContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {features.map((feature) => (
            <motion.div key={feature.title} variants={cardVariants} whileHover={{ y: -8, scale: 1.02 }} className="group">
              <TiltCard className="h-full">
                <div className={`relative h-full p-8 rounded-3xl bg-gradient-to-br ${feature.bgGradient} border ${feature.borderColor} bg-[#0a101a] backdrop-blur-sm transition-all duration-300`}>
                  <div className={`absolute -inset-0.5 rounded-3xl bg-gradient-to-r ${feature.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-xl`} />
                  
                  <div className="relative mb-8">
                    <div className={`w-16 h-16 rounded-2xl ${feature.iconBg} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <feature.icon className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  
                  <h3 className="relative text-2xl font-bold text-white mb-4 transition-all duration-300">
                    {feature.title}
                  </h3>
                  <p className="relative text-neutral-400 leading-relaxed text-lg">
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

// ==========================================
// ARCHITECTURE SECTION (Docs)
// ==========================================
function AeriaWeatherArchitecture() {
  const steps = [
    { icon: Globe, label: 'Client (Next.js)' },
    { icon: Layers, label: 'Tauri IPC Bridge' },
    { icon: Server, label: 'Rust Core Engine' },
    { icon: Database, label: 'Open-Meteo API' },
  ];

  return (
    <section id="docs" className="py-32 bg-[#0a101a] relative overflow-hidden border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <ScrollReveal>
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">System Architecture</h2>
            <p className="text-neutral-400 max-w-2xl mx-auto text-lg">
              Seamlessly bridging modern web interfaces with native operating system capabilities via Inter-Process Communication (IPC).
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <div className="p-8 sm:p-12 rounded-3xl bg-[#050a14] border border-white/10 shadow-2xl max-w-5xl mx-auto">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-4">
              {steps.map((step, i) => (
                <div key={step.label} className="flex flex-col sm:flex-row items-center gap-4 sm:gap-2">
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.8 }} 
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }} 
                    transition={{ delay: i * 0.2 }} 
                    className="flex flex-col items-center"
                  >
                    <div className="w-20 h-20 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-4 shadow-xl hover:bg-sky-500/20 hover:border-sky-500/50 transition-colors">
                      <step.icon className="w-8 h-8 text-sky-400" />
                    </div>
                    <span className="text-sm font-medium text-neutral-300">{step.label}</span>
                  </motion.div>
                  {i < steps.length - 1 && (
                    <div className="hidden sm:flex flex-col items-center mx-4">
                      <motion.div 
                        animate={{ x: [0, 10, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <ArrowLeft className="w-6 h-6 text-neutral-600 rotate-180" />
                      </motion.div>
                    </div>
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

// ==========================================
// CONTENT SECTION (Deep-Dive)
// ==========================================
function AeriaWeatherContent({ project }: { project: Project }) {
  // We reuse the existing markdown renderer from previous code but apply dark mode styling exclusively since the page is fully dark.
  const renderDarkDescription = (text: string) => {
    const lines = text.split('\n');
    const elements: ReactNode[] = [];
    let currentList: string[] = [];
    
    const flushList = () => {
      if (currentList.length > 0) {
        elements.push(
          <ul key={`list-${elements.length}`} className="space-y-4 mb-8">
            {currentList.map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-neutral-300 text-lg">
                <span className="mt-2 w-2 h-2 rounded-full bg-sky-500 flex-shrink-0" />
                <span dangerouslySetInnerHTML={{ __html: item.replace(/\*\*([^*]+)\*\*/g, '<strong class="text-white font-bold">$1</strong>') }} />
              </li>
            ))}
          </ul>
        );
        currentList = [];
      }
    };

    lines.forEach((line) => {
      if (line.startsWith('## ')) {
        flushList();
        elements.push(
          <h2 key={`h2-${elements.length}`} className="text-3xl font-bold text-white mt-16 mb-8 border-b border-white/10 pb-4">
            {line.replace('## ', '')}
          </h2>
        );
      } else if (line.startsWith('- ') || line.startsWith('* ')) {
        currentList.push(line.replace(/^[-*]\s+/, ''));
      } else if (line.trim() !== '') {
        flushList();
        elements.push(
          <p key={`p-${elements.length}`} className="text-neutral-300 mb-6 leading-relaxed text-lg"
             dangerouslySetInnerHTML={{ __html: line.replace(/\*\*([^*]+)\*\*/g, '<strong class="text-white font-bold">$1</strong>') }} />
        );
      } else {
        flushList();
      }
    });
    flushList();
    return elements;
  };

  return (
    <section id="deep-dive" className="py-32 bg-[#050a14] relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <ScrollReveal>
          <div className="flex items-center gap-4 mb-12">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-sky-500 to-amber-500 flex items-center justify-center shadow-lg">
              <Code2 className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-4xl font-bold text-white">Project Deep Dive</h2>
          </div>
        </ScrollReveal>

        <div className="prose prose-lg prose-invert max-w-none">
          {renderDarkDescription(project.longDescription)}
        </div>
      </div>
    </section>
  );
}

// ==========================================
// MAIN EXPORT
// ==========================================
export default function AeriaWeatherPage() {
  const project = getProjectBySlug('aeria-weather');

  if (!project) {
    return <div className="min-h-screen flex items-center justify-center bg-black"><p className="text-white">Project not found</p></div>;
  }

  return (
    <div className="min-h-screen bg-[#050a14] selection:bg-sky-500/30 selection:text-white">
      <ProjectSubNav project={project} />
      <AeriaWeatherHero project={project} />
      <AeriaWeatherFeatures />
      <AeriaWeatherArchitecture />
      <AeriaWeatherContent project={project} />
      
      {/* Footer */}
      <footer className="py-12 border-t border-white/5 bg-[#0a101a] text-center">
        <p className="text-neutral-500 text-sm">© {new Date().getFullYear()} Vaibhav. Built with Rust and Tauri.</p>
      </footer>
    </div>
  );
}
