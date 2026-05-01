'use client';

import { useRef, ReactNode, useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadFull } from "tsparticles";
import type { Container, Engine, ISourceOptions } from "tsparticles-engine";

import { 
  ArrowLeft, Cloud, Download,
  Code2, Layers, Cpu, Database,
  Globe, Server, Droplets, ArrowDown
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { getProjectBySlug } from '@/data/projects';
import { AeriaWeatherPreviewSection } from '@/components/AeriaWeatherPreviewSection';
import { HoverBorderGradient } from '@/components/ui/aceternity';
import { RustBadge, easings } from '@/components/animations';
import { Project } from '@/types';

// ==========================================
// PARTICLE CONFIGURATIONS
// ==========================================
const sunnyParticles: ISourceOptions = {
  fullScreen: { enable: false },
  fpsLimit: 60,
  particles: {
    number: { value: 40, density: { enable: true, value_area: 800 } },
    color: { value: "#fbbf24" }, // amber-400
    shape: { type: "circle" },
    opacity: { value: 0.5, random: true, anim: { enable: true, speed: 1, opacity_min: 0.1, sync: false } },
    size: { value: 3, random: true, anim: { enable: true, speed: 2, size_min: 0.1, sync: false } },
    move: { enable: true, speed: 0.5, direction: "top", random: true, straight: false, outModes: "out" },
  },
  interactivity: { events: { onHover: { enable: true, mode: "bubble" } }, modes: { bubble: { distance: 200, size: 6, duration: 2 } } },
};

const fogParticles: ISourceOptions = {
  fullScreen: { enable: false },
  fpsLimit: 60,
  particles: {
    number: { value: 30, density: { enable: true, value_area: 800 } },
    color: { value: "#cbd5e1" },
    shape: { type: "circle" },
    opacity: { value: 0.1, random: true },
    size: { value: 100, random: true, anim: { enable: true, speed: 2, size_min: 50, sync: false } },
    move: { enable: true, speed: 1, direction: "right", random: false, straight: true, outModes: "out" },
    filter: { blur: { value: 20 } }
  },
};

const rainParticles: ISourceOptions = {
  fullScreen: { enable: false },
  fpsLimit: 60,
  particles: {
    number: { value: 150, density: { enable: true, value_area: 800 } },
    color: { value: "#bae6fd" }, // sky-200
    shape: { type: "line" },
    opacity: { value: 0.5, random: true },
    size: { value: { min: 10, max: 20 }, random: false },
    move: { enable: true, speed: 25, direction: "bottom", random: false, straight: true, outModes: "out" },
    rotate: { value: 15, direction: "random", animation: { enable: false } }
  },
};

const snowParticles: ISourceOptions = {
  fullScreen: { enable: false },
  fpsLimit: 60,
  particles: {
    number: { value: 120, density: { enable: true, value_area: 800 } },
    color: { value: "#ffffff" },
    shape: { type: "circle" },
    opacity: { value: 0.7, random: true, anim: { enable: true, speed: 0.5, opacity_min: 0.1, sync: false } },
    size: { value: 3, random: true },
    move: { enable: true, speed: 2, direction: "bottom", random: true, straight: false, outModes: "out" },
  },
};

// ==========================================
// SUB-NAVIGATION (Sticky Header)
// ==========================================
function ProjectSubNav({ project }: { project: Project }) {
  const [activeSection, setActiveSection] = useState('overview');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['overview', 'technical', 'docs', 'deep-dive'];
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 200) {
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
    { id: 'docs', label: 'Architecture' },
    { id: 'deep-dive', label: 'Deep-Dive' },
  ];

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const yOffset = -70;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <motion.div 
      className="sticky top-[72px] left-0 right-0 z-50 transition-all duration-500 bg-slate-950/40 backdrop-blur-2xl border-b border-white/5 shadow-2xl"
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: easings.smooth }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => scrollTo('overview')}>
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-sky-400 to-amber-300 flex items-center justify-center shadow-lg">
            <Cloud className="w-4 h-4 text-white" />
          </div>
          <div className="hidden sm:block">
            <h2 className="text-white font-bold text-sm leading-tight">Aeria Weather</h2>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-1 p-1 rounded-full bg-white/5 border border-white/10">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all duration-300 ${
                activeSection === item.id
                  ? 'bg-white text-slate-900 shadow-md scale-105'
                  : 'text-neutral-400 hover:text-white hover:bg-white/10'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <Link href="/projects" className="hidden lg:flex items-center gap-2 text-xs font-semibold text-neutral-400 hover:text-white transition-colors">
            <ArrowLeft className="w-3.5 h-3.5" /> Portfolio
          </Link>
          <HoverBorderGradient
            containerClassName="rounded-full"
            as="a"
            href={project.downloadUrl || '#'}
            target="_blank"
            className="bg-sky-500/10 text-sky-400 flex items-center gap-2 px-4 py-1.5 hover:bg-sky-500/20 transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="text-xs font-bold uppercase tracking-wider">Installer</span>
          </HoverBorderGradient>
        </div>
      </div>
    </motion.div>
  );
}

// ==========================================
// CINEMATIC SECTIONS
// ==========================================

export default function AeriaWeatherPage() {
  const project = getProjectBySlug('aeria-weather');
  const containerRef = useRef<HTMLDivElement>(null);
  const [initParticles, setInitParticles] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadFull(engine);
    }).then(() => {
      setInitParticles(true);
    });
  }, []);

  // Continuous Scroll Physics
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });

  // Act Opacities based on scroll timeline
  const act1Opacity = useTransform(scrollYProgress, [0, 0.15, 0.25], [1, 1, 0]);
  const act2Opacity = useTransform(scrollYProgress, [0.15, 0.25, 0.45, 0.55], [0, 1, 1, 0]);
  const act3Opacity = useTransform(scrollYProgress, [0.45, 0.55, 0.75, 0.85], [0, 1, 1, 0]);
  const act4Opacity = useTransform(scrollYProgress, [0.75, 0.85, 1], [0, 1, 1]);

  // Section specific transforms for cinematic camera moves
  const heroScale = useTransform(scrollYProgress, [0, 0.25], [1, 0.8]);
  const heroY = useTransform(scrollYProgress, [0, 0.25], [0, -100]);
  const heroBlur = useTransform(scrollYProgress, [0.1, 0.25], ["blur(0px)", "blur(20px)"]);

  const techY = useTransform(scrollYProgress, [0.15, 0.25], [100, 0]);
  const techScale = useTransform(scrollYProgress, [0.45, 0.55], [1, 0.8]);

  const archY = useTransform(scrollYProgress, [0.45, 0.55], [100, 0]);
  const archScale = useTransform(scrollYProgress, [0.75, 0.85], [1, 0.8]);

  const deepDiveY = useTransform(scrollYProgress, [0.75, 0.85], [100, 0]);

  if (!project) return null;

  return (
    <main className="dark text-white bg-black selection:bg-sky-500/30 selection:text-white" ref={containerRef}>
      <ProjectSubNav project={project} />

      {/* ================= BACKGROUND RENDERING ENGINE ================= */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {/* Act 1: Sunny / Dawn */}
        <motion.div style={{ opacity: act1Opacity }} className="absolute inset-0 bg-gradient-to-b from-[#020617] via-[#082f49] to-[#0ea5e9]/20">
          {initParticles && <Particles id="particles-sunny" options={sunnyParticles} className="absolute inset-0" />}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-amber-500/10 rounded-full blur-[120px]" />
        </motion.div>

        {/* Act 2: Overcast / Fog */}
        <motion.div style={{ opacity: act2Opacity }} className="absolute inset-0 bg-gradient-to-b from-[#0f172a] to-[#334155]">
          {initParticles && <Particles id="particles-fog" options={fogParticles} className="absolute inset-0" />}
          <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-[2px]" />
        </motion.div>

        {/* Act 3: Rain / Storm */}
        <motion.div style={{ opacity: act3Opacity }} className="absolute inset-0 bg-gradient-to-b from-[#020617] via-[#1e3a8a]/40 to-[#1e3a8a]/20">
          {initParticles && <Particles id="particles-rain" options={rainParticles} className="absolute inset-0" />}
        </motion.div>

        {/* Act 4: Snow / Night */}
        <motion.div style={{ opacity: act4Opacity }} className="absolute inset-0 bg-[#000000]">
          {initParticles && <Particles id="particles-snow" options={snowParticles} className="absolute inset-0" />}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black" />
        </motion.div>
      </div>

      {/* ================= CONTENT SCROLL CONTAINER ================= */}
      <div className="relative z-10">

        {/* --- ACT I: HERO --- */}
        <section id="overview" className="min-h-[120vh] flex flex-col items-center justify-start pt-32 px-4 sm:px-6 lg:px-8">
          <motion.div 
            style={{ scale: heroScale, y: heroY, filter: heroBlur }} 
            className="w-full max-w-7xl flex flex-col items-center text-center"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-300 text-sm font-semibold mb-8 backdrop-blur-md"
            >
              <RustBadge size={16} /> Native Tauri Application
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}
              className="text-6xl sm:text-8xl font-black text-white mb-6 tracking-tighter"
            >
              Climate <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-br from-sky-300 via-cyan-300 to-amber-200">
                Intelligence.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.4 }}
              className="text-xl text-neutral-300 max-w-2xl font-medium"
            >
              A beautifully crafted, ultra-performant weather dashboard engineered in Rust. Seamless, accurate, and completely native.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.6 }}
              className="mt-16 w-full max-w-5xl rounded-3xl overflow-hidden border border-white/10 shadow-[0_0_100px_rgba(14,165,233,0.15)] bg-slate-900/50 backdrop-blur-xl"
            >
              <AeriaWeatherPreviewSection />
            </motion.div>
            
            <motion.div 
              animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              className="mt-20 text-neutral-500 flex flex-col items-center gap-2"
            >
              <span className="text-xs font-bold uppercase tracking-widest">Scroll to Explore</span>
              <ArrowDown className="w-4 h-4" />
            </motion.div>
          </motion.div>
        </section>

        {/* --- ACT II: TECHNICAL FEATURES --- */}
        <section id="technical" className="min-h-[120vh] flex items-center justify-center px-4 sm:px-6 lg:px-8">
          <motion.div 
            style={{ opacity: act2Opacity, scale: techScale, y: techY }}
            className="w-full max-w-7xl"
          >
            <div className="text-center mb-24">
              <h2 className="text-5xl sm:text-7xl font-black text-white mb-6 tracking-tighter">
                Forecast: <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-200 to-slate-500">Unmatched Performance</span>
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                { title: 'Live Engine', val: '< 50ms', desc: 'Asynchronous Tokio-based backend fetching real-time Open-Meteo data globally.', color: 'text-sky-400' },
                { title: 'Local Cache', val: 'Secure', desc: 'Lightning-fast local caching of favorite cities using native Rust filesystem APIs.', color: 'text-emerald-400' },
                { title: 'Footprint', val: '~8 MB', desc: 'Compiled directly to machine code via Tauri. Uses a fraction of Electron\'s memory.', color: 'text-amber-400' }
              ].map((f, i) => (
                <div key={i} className="group relative rounded-3xl p-8 bg-slate-800/40 border border-slate-700/50 backdrop-blur-2xl hover:bg-slate-800/60 transition-colors">
                  <div className="absolute top-0 right-0 p-8 opacity-10 font-black text-8xl transition-opacity group-hover:opacity-20">0{i+1}</div>
                  <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-8">{f.title}</h3>
                  <div className={`text-6xl font-black mb-6 ${f.color}`}>{f.val}</div>
                  <p className="text-lg text-slate-300 font-medium leading-relaxed">{f.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* --- ACT III: ARCHITECTURE --- */}
        <section id="docs" className="min-h-[120vh] flex items-center justify-center px-4 sm:px-6 lg:px-8">
          <motion.div 
            style={{ opacity: act3Opacity, scale: archScale, y: archY }}
            className="w-full max-w-6xl"
          >
            <div className="text-center mb-20">
              <h2 className="text-5xl sm:text-7xl font-black text-white mb-6 tracking-tighter">
                System <span className="text-transparent bg-clip-text bg-gradient-to-b from-blue-300 to-blue-600">Architecture</span>
              </h2>
            </div>

            <div className="relative p-12 rounded-[3rem] bg-blue-950/20 border border-blue-900/50 backdrop-blur-xl">
              <div className="flex flex-col md:flex-row justify-between items-center gap-12 relative z-10">
                {[
                  { label: 'Next.js UI', sub: 'React/Tailwind', icon: Globe },
                  { label: 'Tauri IPC', sub: 'Bridge', icon: Layers },
                  { label: 'Rust Core', sub: 'Tokio/Axum', icon: Cpu },
                  { label: 'Open-Meteo', sub: 'Weather API', icon: Database },
                ].map((node, i) => (
                  <div key={i} className="flex flex-col items-center text-center relative w-full md:w-1/4">
                    <div className="w-24 h-24 rounded-full bg-blue-900/40 border border-blue-500/30 flex items-center justify-center mb-6 shadow-[0_0_50px_rgba(59,130,246,0.2)] relative z-10">
                      <node.icon className="w-10 h-10 text-blue-300" />
                    </div>
                    <h4 className="text-xl font-bold text-white mb-2">{node.label}</h4>
                    <span className="text-sm font-semibold text-blue-400 uppercase tracking-widest">{node.sub}</span>
                  </div>
                ))}
              </div>
              
              {/* Animated Connecting Lines (Desktop only) */}
              <div className="hidden md:block absolute top-1/2 left-24 right-24 h-[2px] bg-blue-900/50 -translate-y-1/2 -translate-y-[28px] z-0">
                <motion.div 
                  className="h-full bg-blue-400 shadow-[0_0_10px_#60a5fa]" 
                  initial={{ width: "0%" }} 
                  whileInView={{ width: "100%" }} 
                  transition={{ duration: 1.5, ease: "easeInOut" }} 
                  viewport={{ once: false, margin: "-200px" }}
                />
              </div>
            </div>
          </motion.div>
        </section>

        {/* --- ACT IV: DEEP DIVE --- */}
        <section id="deep-dive" className="min-h-screen pt-32 pb-40 flex items-start justify-center px-4 sm:px-6 lg:px-8">
          <motion.div 
            style={{ opacity: act4Opacity, y: deepDiveY }}
            className="w-full max-w-4xl"
          >
            <div className="flex items-center gap-6 mb-16">
              <div className="w-20 h-20 rounded-3xl bg-white text-black flex items-center justify-center shadow-[0_0_50px_rgba(255,255,255,0.2)]">
                <Code2 className="w-10 h-10" />
              </div>
              <h2 className="text-5xl sm:text-6xl font-black text-white tracking-tighter">Deep Dive</h2>
            </div>

            <div className="prose prose-xl prose-invert max-w-none prose-headings:font-black prose-p:text-neutral-300 prose-p:leading-relaxed prose-li:text-neutral-300">
              {/* Hardcoded Markdown content styled perfectly */}
              <h2 className="border-b border-white/10 pb-4 mb-8">The Engineering Challenge</h2>
              <p>
                Aeria Weather Studio was conceived to bridge the gap between heavy electron-based web wrappers and minimal native applications. By utilizing <strong>Tauri</strong>, we embed a high-performance Rust binary that directly hooks into the operating system's native webview.
              </p>
              
              <div className="my-12 p-8 rounded-3xl bg-white/5 border border-white/10">
                <h3 className="text-white mt-0 mb-4">Core Achievements</h3>
                <ul className="space-y-4 m-0">
                  <li className="flex items-start gap-4">
                    <span className="w-2 h-2 rounded-full bg-white mt-2.5 flex-shrink-0" />
                    <span><strong>0ms Cold Start:</strong> Rust's memory management allows the application to boot instantaneously without V8 engine spin-up times.</span>
                  </li>
                  <li className="flex items-start gap-4">
                    <span className="w-2 h-2 rounded-full bg-white mt-2.5 flex-shrink-0" />
                    <span><strong>Dynamic Atmosphere Rendering:</strong> Instead of static backgrounds, the frontend uses complex CSS radial gradients and particle math that reacts perfectly to the active Open-Meteo condition payload.</span>
                  </li>
                </ul>
              </div>

              <p>
                The architecture is heavily decoupled. The <strong>Next.js</strong> frontend handles purely presentation and user-state visualization, while all network requests, caching logic, and file-system access are strictly managed by the Rust core, passing data securely via IPC events.
              </p>
            </div>
          </motion.div>
        </section>
        
      </div>
    </main>
  );
}
