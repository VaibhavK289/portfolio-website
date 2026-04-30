'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import { useRef } from 'react';
import { 
  ArrowLeft, Github, Cloud, Wind, Thermometer, Download,
  ChevronRight, Code2, Layers, Sparkles, Cpu, Database,
  Globe, Server, Droplets, Sun, Snowflake, Zap, Play,
  Shield, Eye,
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
  weatherBadgeVariants,
} from '@/components/animations';
import { useLowPerformance } from '@/lib/utils';

function AeriaBackground() {
  const isLowPerf = useLowPerformance();
  if (isLowPerf) {
    return (
      <>
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 right-20 w-96 h-96 bg-sky-600/15 rounded-full blur-3xl" />
          <div className="absolute bottom-20 left-20 w-80 h-80 bg-amber-600/15 rounded-full blur-3xl" />
        </div>
        <div className="absolute inset-0 bg-[linear-gradient(rgba(56,189,248,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(56,189,248,0.02)_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none" />
      </>
    );
  }
  return (
    <>
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div className="absolute top-20 right-20 w-96 h-96 bg-sky-600/20 rounded-full blur-3xl"
          animate={{ scale: [1, 1.1, 1], opacity: [0.15, 0.3, 0.15] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }} />
        <motion.div className="absolute bottom-20 left-20 w-80 h-80 bg-amber-600/20 rounded-full blur-3xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.25, 0.1] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 2 }} />
      </div>
      <div className="absolute inset-0 bg-[linear-gradient(rgba(56,189,248,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(56,189,248,0.03)_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none" />
      <div className="hidden lg:block">
        <CloudFloat size={100} opacity={0.06} delay={0} className="absolute top-32 left-20" />
        <CloudFloat size={70} opacity={0.04} delay={1.5} className="absolute top-48 right-40" />
      </div>
      <BackgroundBeams className="opacity-20" />
    </>
  );
}

export default function AeriaWeatherPage() {
  const project = getProjectBySlug('aeria-weather');
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-neutral-950">
        <p className="text-gray-600 dark:text-neutral-400">Project not found</p>
      </div>
    );
  }

  const features = [
    { icon: Cloud, title: 'Live Weather', description: 'Real-time conditions for any city worldwide via Open-Meteo API.', gradient: 'from-sky-500 to-cyan-500' },
    { icon: Droplets, title: 'Air Quality', description: 'US AQI, PM2.5, PM10 readings with health guidance alerts.', gradient: 'from-emerald-500 to-teal-500' },
    { icon: Sun, title: 'Dynamic Scenes', description: 'UI gradients and animations adapt to sunny, rainy, stormy, snowy conditions.', gradient: 'from-amber-500 to-orange-500' },
    { icon: Thermometer, title: 'Unit Toggle', description: 'Switch between Celsius and Fahrenheit with instant re-render.', gradient: 'from-rose-500 to-pink-500' },
    { icon: Globe, title: 'Favorites', description: 'Save cities and quickly revisit recent searches with localStorage.', gradient: 'from-violet-500 to-purple-500' },
    { icon: Download, title: 'Desktop App', description: 'Native Windows installer via Tauri — lightweight 8MB .exe bundle.', gradient: 'from-cyan-500 to-blue-500' },
  ];

  const techStack = [
    { category: 'Backend', items: ['Rust', 'Axum', 'Tokio', 'Reqwest', 'Serde'] },
    { category: 'Frontend', items: ['Next.js 16', 'React 19', 'TypeScript', 'Tailwind CSS 4'] },
    { category: 'Desktop', items: ['Tauri 2', 'NSIS Installer', 'Rust Shell'] },
    { category: 'Infrastructure', items: ['Vercel', 'Render', 'GitHub Releases', 'Open-Meteo'] },
  ];

  const comparison = [
    { aspect: 'Backend Language', js: 'Node.js / Python', rust: 'Rust (Axum + Tokio)' },
    { aspect: 'Type Safety', js: 'Runtime errors', rust: 'Compile-time guarantees' },
    { aspect: 'Async I/O', js: 'Event loop', rust: 'Tokio green threads' },
    { aspect: 'Desktop App', js: 'Electron (~150MB)', rust: 'Tauri (~8MB)' },
    { aspect: 'Shared Types', js: 'Manual sync', rust: 'Rust workspace crates' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#080c14] via-[#0a1018] to-[#0c1420] text-white overflow-x-hidden">
      <ScrollProgress />
      <div className="fixed inset-0 pointer-events-none"><AeriaBackground /></div>

      {/* Sticky Nav */}
      <motion.div className="sticky top-16 sm:top-20 z-40 bg-[#080c14]/80 backdrop-blur-xl border-b border-sky-900/30"
        initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          <div className="flex items-center justify-between py-3 sm:py-4">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-gradient-to-br from-sky-600 to-cyan-600 flex items-center justify-center relative">
                <Cloud className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </div>
              <div>
                <h2 className="font-bold text-white text-xs sm:text-sm">Aeria Weather</h2>
                <p className="text-[10px] sm:text-xs text-neutral-500">Climate Dashboard</p>
              </div>
              {/* Rust badge */}
              <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#CE422B]/10 border border-[#CE422B]/30">
                <RustBadge size={14} />
                <span className="text-[10px] text-[#CE422B] font-semibold">Rust</span>
              </div>
            </div>
            <div className="flex items-center gap-2 sm:gap-3">
              <a href="https://aeria-weather.vercel.app" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-sky-600 to-cyan-600 text-white text-xs font-medium shadow-lg shadow-sky-500/25">
                <Play className="w-3 h-3" /> <span className="hidden sm:inline">Live Demo</span><span className="sm:hidden">Demo</span>
              </a>
              <a href={project.downloadUrl} target="_blank" rel="noopener noreferrer"
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-amber-500/50 text-amber-400 hover:bg-amber-500/10 transition-colors text-xs font-medium">
                <Download className="w-3 h-3" /> Installer
              </a>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Hero Section */}
      <motion.section ref={heroRef} className="relative min-h-[85vh] flex items-center justify-center px-4 sm:px-6 py-20 sm:py-24"
        style={{ opacity: heroOpacity, scale: heroScale }}>
        <Spotlight className="absolute -top-40 left-0 md:left-60" fill="#38bdf8" />
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}
            className="absolute -top-8 sm:top-0 left-0">
            <Link href="/projects" className="group inline-flex items-center gap-2 text-neutral-400 hover:text-sky-400 transition-colors text-sm">
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Projects
            </Link>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="flex justify-center mb-6 sm:mb-8">
            <HoverBorderGradient containerClassName="rounded-full" className="flex items-center gap-2 px-4 py-2 bg-[#0a1018]">
              <RustBadge size={16} />
              <span className="text-sm font-medium text-neutral-300">Full-Stack Rust Application</span>
              <div className="w-2 h-2 rounded-full bg-sky-500 animate-pulse" />
            </HoverBorderGradient>
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6">
            <span className="block mb-2">Aeria Weather</span>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-sky-400 via-cyan-500 to-amber-400">Studio</span>
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg sm:text-xl md:text-2xl text-neutral-300 max-w-3xl mx-auto mb-8">
            A real-time climate dashboard powered by Rust.
            <span className="block text-base sm:text-lg text-neutral-500 mt-2">Axum backend · Next.js frontend · Tauri desktop app</span>
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="https://aeria-weather.vercel.app" target="_blank" rel="noopener noreferrer"
              className="group w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-sky-600 via-cyan-600 to-amber-600 text-white font-medium flex items-center justify-center gap-2 shadow-lg shadow-sky-500/25 hover:shadow-sky-500/40 hover:scale-105 transition-all">
              <Cloud className="w-5 h-5" /> Try Live Demo <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <a href={project.downloadUrl} target="_blank" rel="noopener noreferrer"
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 font-medium flex items-center justify-center gap-2 border border-amber-500/30 hover:border-amber-500/50 transition-all">
              <Download className="w-5 h-5" /> Download Installer (.exe)
            </a>
            <a href="https://github.com/VaibhavK289/aeria-weather" target="_blank" rel="noopener noreferrer"
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-neutral-800/80 hover:bg-neutral-700/80 text-white font-medium flex items-center justify-center gap-2 border border-neutral-700 transition-all">
              <Github className="w-5 h-5" /> View Source
            </a>
          </motion.div>

          {/* Hero Stats */}
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }} className="mt-12 sm:mt-16">
            <div className="flex flex-wrap justify-center gap-4 sm:gap-8">
              {[
                { icon: Cpu, label: 'Rust Backend', value: 'Axum' },
                { icon: Globe, label: 'Live Deploy', value: 'Vercel' },
                { icon: Download, label: 'Desktop App', value: 'Tauri' },
                { icon: Github, label: 'Open Source', value: 'MIT' },
              ].map((stat, i) => (
                <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 + i * 0.1 }}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl bg-neutral-900/60 border border-neutral-800 backdrop-blur-sm">
                  <stat.icon className="w-5 h-5 text-sky-400" />
                  <div className="text-left">
                    <div className="text-lg font-bold text-white">{stat.value}</div>
                    <div className="text-xs text-neutral-500">{stat.label}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Preview Section */}
      <AeriaWeatherPreviewSection />

      {/* Why Rust Section */}
      <section className="relative py-16 sm:py-24 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-12">
              <motion.div variants={weatherBadgeVariants}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#CE422B]/10 border border-[#CE422B]/20 mb-6">
                <RustBadge size={16} />
                <span className="text-sm font-medium text-[#CE422B]">Why Rust?</span>
              </motion.div>
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                JavaScript vs{' '}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#CE422B] to-amber-400">Rust</span>
              </h2>
              <p className="text-neutral-400 max-w-2xl mx-auto">See why Rust is the ideal choice for high-performance weather backends</p>
            </div>
          </ScrollReveal>
          <ScrollReveal>
            <div className="rounded-2xl overflow-hidden border border-neutral-800 bg-neutral-900/50 backdrop-blur-sm">
              <div className="grid grid-cols-3 bg-neutral-800/50">
                <div className="p-4 text-center text-sm font-medium text-neutral-400">Aspect</div>
                <div className="p-4 text-center text-sm font-medium text-amber-400 flex items-center justify-center gap-2">
                  <Code2 className="w-4 h-4" /> JS / Python
                </div>
                <div className="p-4 text-center text-sm font-medium text-[#CE422B] flex items-center justify-center gap-2">
                  <RustBadge size={14} /> Rust
                </div>
              </div>
              {comparison.map((row, i) => (
                <motion.div key={row.aspect} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="grid grid-cols-3 border-t border-neutral-800">
                  <div className="p-4 text-sm text-neutral-300">{row.aspect}</div>
                  <div className="p-4 text-center text-sm text-neutral-500">{row.js}</div>
                  <div className="p-4 text-center text-sm text-sky-400 font-medium">{row.rust}</div>
                </motion.div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Features Grid */}
      <section className="relative py-16 sm:py-24 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-12">
              <motion.div variants={weatherBadgeVariants}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sky-500/10 border border-sky-500/20 mb-6">
                <Sparkles className="w-4 h-4 text-sky-400" />
                <span className="text-sm font-medium text-sky-300">Key Features</span>
              </motion.div>
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                Complete Climate{' '}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-sky-400 to-amber-400">Dashboard</span>
              </h2>
            </div>
          </ScrollReveal>
          <motion.div variants={weatherCardContainerVariants} initial="hidden" whileInView="visible"
            viewport={{ once: true, margin: "-100px" }} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {features.map((feature) => (
              <motion.div key={feature.title} variants={weatherCardVariants}
                className="group relative p-6 rounded-2xl bg-neutral-900/60 border border-neutral-800 hover:border-sky-500/30 transition-all duration-300 backdrop-blur-sm">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.gradient} p-0.5 mb-4`}>
                  <div className="w-full h-full rounded-xl bg-neutral-900 flex items-center justify-center">
                    <feature.icon className="w-5 h-5 text-white" />
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-sm text-neutral-400">{feature.description}</p>
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-sky-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Architecture */}
      <section className="relative py-16 sm:py-24 px-4 sm:px-6 bg-gradient-to-b from-transparent via-sky-950/10 to-transparent">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                How It <span className="bg-clip-text text-transparent bg-gradient-to-r from-sky-400 to-amber-400">Works</span>
              </h2>
            </div>
          </ScrollReveal>
          <ScrollReveal>
            <div className="p-6 sm:p-8 rounded-2xl bg-neutral-900/60 border border-neutral-800 backdrop-blur-sm mb-8">
              <h3 className="text-lg font-semibold text-white mb-6 text-center">Request Flow</h3>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-2">
                {[
                  { icon: Globe, label: 'City Search' },
                  { icon: Server, label: 'Geocode' },
                  { icon: Layers, label: 'Parallel Fetch' },
                  { icon: Database, label: 'JSON Response' },
                  { icon: Eye, label: 'Dynamic UI' },
                ].map((step, i) => (
                  <div key={step.label} className="flex items-center gap-2">
                    <motion.div initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="flex flex-col items-center">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-sky-500/20 to-amber-500/20 border border-sky-500/30 flex items-center justify-center mb-2">
                        <step.icon className="w-5 h-5 text-sky-400" />
                      </div>
                      <span className="text-xs text-neutral-400">{step.label}</span>
                    </motion.div>
                    {i < 4 && (
                      <div className="hidden sm:block w-8 h-0.5 bg-gradient-to-r from-sky-500/40 to-sky-500/10 mx-1" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
          <motion.div variants={weatherCardContainerVariants} initial="hidden" whileInView="visible"
            viewport={{ once: true }} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {techStack.map((stack) => (
              <motion.div key={stack.category} variants={weatherCardVariants} className="p-4 rounded-xl bg-neutral-900/60 border border-neutral-800">
                <h4 className="text-sm font-medium text-sky-400 mb-3">{stack.category}</h4>
                <div className="flex flex-wrap gap-2">
                  {stack.items.map((item) => (
                    <span key={item} className="px-2 py-1 text-xs rounded-md bg-neutral-800 text-neutral-300">{item}</span>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Download CTA */}
      <section className="relative py-16 sm:py-24 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <ScrollReveal>
            <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-sky-900/30 via-cyan-900/30 to-amber-900/30 border border-sky-500/20 backdrop-blur-sm relative overflow-hidden">
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
                  Experience the{' '}
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-sky-400 to-amber-400">Atmosphere</span>
                </h2>
                <p className="text-neutral-400 mb-8 max-w-2xl mx-auto">
                  Try the live web dashboard or download the native Windows desktop app.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <a href="https://aeria-weather.vercel.app" target="_blank" rel="noopener noreferrer"
                    className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-sky-600 via-cyan-600 to-amber-600 text-white font-medium flex items-center justify-center gap-2 shadow-lg shadow-sky-500/25 hover:scale-105 transition-all">
                    <Cloud className="w-5 h-5" /> Launch Dashboard <ChevronRight className="w-4 h-4" />
                  </a>
                  <a href={project.downloadUrl} target="_blank" rel="noopener noreferrer"
                    className="w-full sm:w-auto px-8 py-4 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 font-medium flex items-center justify-center gap-2 border border-amber-500/30 transition-all">
                    <Download className="w-5 h-5" /> Download .exe
                  </a>
                  <a href="https://github.com/VaibhavK289/aeria-weather" target="_blank" rel="noopener noreferrer"
                    className="w-full sm:w-auto px-8 py-4 rounded-xl bg-neutral-800/80 hover:bg-neutral-700/80 text-white font-medium flex items-center justify-center gap-2 border border-neutral-700 transition-all">
                    <Github className="w-5 h-5" /> Star on GitHub
                  </a>
                </div>
              </motion.div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Footer Nav */}
      <section className="relative py-8 px-4 sm:px-6 border-t border-neutral-800">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link href="/projects" className="group inline-flex items-center gap-2 text-neutral-400 hover:text-sky-400 transition-colors">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Projects
          </Link>
          <div className="flex items-center gap-4">
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="text-sm text-neutral-400 hover:text-sky-400 transition-colors">Live Demo</a>
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="text-sm text-neutral-400 hover:text-sky-400 transition-colors">GitHub</a>
            <a href={project.downloadUrl} target="_blank" rel="noopener noreferrer" className="text-sm text-amber-400 hover:text-amber-300 transition-colors flex items-center gap-1">
              <Download className="w-3 h-3" /> Installer
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
