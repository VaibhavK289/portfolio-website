'use client';

import { ReactNode, useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadFull } from "tsparticles";
import type { ISourceOptions } from "tsparticles-engine";
import { Cloud, Download, ArrowLeft } from 'lucide-react';
import { HoverBorderGradient } from '@/components/ui/aceternity';
import { getProjectBySlug } from '@/data/projects';
import { easings } from '@/components/animations';

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
// BACKGROUND THEMES
// ==========================================
const THEMES: Record<string, { bgClass: string, options: ISourceOptions, id: string }> = {
  overview: {
    bgClass: "bg-gradient-to-b from-[#020617] via-[#082f49] to-[#0ea5e9]/20",
    options: sunnyParticles,
    id: "sunny"
  },
  technical: {
    bgClass: "bg-gradient-to-b from-[#0f172a] to-[#334155]",
    options: fogParticles,
    id: "fog"
  },
  architecture: {
    bgClass: "bg-gradient-to-b from-[#020617] via-[#1e3a8a]/40 to-[#1e3a8a]/20",
    options: rainParticles,
    id: "rain"
  },
  "deep-dive": {
    bgClass: "bg-[#000000]",
    options: snowParticles,
    id: "snow"
  }
};

// ==========================================
// SUB-NAVIGATION (Sticky Header)
// ==========================================
function ProjectSubNav({ project, currentSection }: { project: any, currentSection: string }) {
  const navItems = [
    { id: 'overview', label: 'Overview', path: '/projects/aeria-weather' },
    { id: 'technical', label: 'Technical', path: '/projects/aeria-weather/technical' },
    { id: 'architecture', label: 'Architecture', path: '/projects/aeria-weather/architecture' },
    { id: 'deep-dive', label: 'Deep-Dive', path: '/projects/aeria-weather/deep-dive' },
  ];

  return (
    <motion.div 
      className="sticky top-[72px] left-0 right-0 z-50 transition-all duration-500 bg-slate-950/40 backdrop-blur-2xl border-b border-white/5 shadow-2xl"
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: easings.smooth }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link href="/projects/aeria-weather" className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-sky-400 to-amber-300 flex items-center justify-center shadow-lg">
            <Cloud className="w-4 h-4 text-white" />
          </div>
          <div className="hidden sm:block">
            <h2 className="text-white font-bold text-sm leading-tight">Aeria Weather</h2>
          </div>
        </Link>

        <div className="hidden md:flex items-center gap-1 p-1 rounded-full bg-white/5 border border-white/10">
          {navItems.map((item) => (
            <Link
              key={item.id}
              href={item.path}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all duration-300 ${
                currentSection === item.id
                  ? 'bg-white text-slate-900 shadow-md scale-105'
                  : 'text-neutral-400 hover:text-white hover:bg-white/10'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <Link href="/projects" className="hidden lg:flex items-center gap-2 text-xs font-semibold text-neutral-400 hover:text-white transition-colors">
            <ArrowLeft className="w-3.5 h-3.5" /> Portfolio
          </Link>
          <HoverBorderGradient
            containerClassName="rounded-full"
            as="a"
            href={project?.downloadUrl || '#'}
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
// LAYOUT COMPONENT
// ==========================================
export default function AeriaWeatherLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const project = getProjectBySlug('aeria-weather');
  const [initParticles, setInitParticles] = useState(false);

  // Determine current section from pathname
  let currentSection = 'overview';
  if (pathname.includes('technical')) currentSection = 'technical';
  else if (pathname.includes('architecture')) currentSection = 'architecture';
  else if (pathname.includes('deep-dive')) currentSection = 'deep-dive';

  const theme = THEMES[currentSection] || THEMES['overview'];

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadFull(engine);
    }).then(() => {
      setInitParticles(true);
    });
  }, []);

  return (
    <main className="dark text-white bg-black selection:bg-sky-500/30 selection:text-white min-h-screen relative overflow-hidden">
      
      {/* Background Engine */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={theme.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
            className={`absolute inset-0 ${theme.bgClass}`}
          >
            {initParticles && <Particles id={`particles-${theme.id}`} options={theme.options} className="absolute inset-0" />}
            {currentSection === 'overview' && (
              <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-amber-500/10 rounded-full blur-[120px]" />
            )}
            {currentSection === 'technical' && (
              <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-[2px]" />
            )}
            {currentSection === 'deep-dive' && (
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black" />
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      <ProjectSubNav project={project} currentSection={currentSection} />
      
      {/* Page Content with Crossfade */}
      <div className="relative z-10 pt-16">
        <AnimatePresence mode="wait">
          <motion.div
            key={pathname}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6 }}
            className="min-h-[calc(100vh-136px)]" // Viewport minus header heights
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </div>
    </main>
  );
}
