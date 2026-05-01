'use client';

import { motion } from 'framer-motion';
import { Globe, Layers, Cpu, Database, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function AeriaWeatherArchitecture() {
  const nodes = [
    { label: 'Next.js UI', sub: 'React/Tailwind', icon: Globe },
    { label: 'Tauri IPC', sub: 'Bridge', icon: Layers },
    { label: 'Rust Core', sub: 'Tokio/Axum', icon: Cpu },
    { label: 'Open-Meteo', sub: 'Weather API', icon: Database },
  ];

  return (
    <div className="min-h-[calc(100vh-136px)] flex flex-col items-center justify-center py-20 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-6xl">
        <div className="text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
            className="text-5xl sm:text-7xl lg:text-8xl font-black text-white mb-6 tracking-tighter"
          >
            System <br className="sm:hidden" /><span className="text-transparent bg-clip-text bg-gradient-to-b from-blue-300 to-blue-600">Architecture</span>
          </motion.h2>
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1 }}
          className="relative p-12 rounded-[3rem] bg-blue-950/20 border border-blue-900/50 backdrop-blur-xl mb-20"
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-12 relative z-10">
            {nodes.map((node, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: i * 0.2 }}
                className="flex flex-col items-center text-center relative w-full md:w-1/4"
              >
                <div className="w-24 h-24 rounded-full bg-blue-900/40 border border-blue-500/30 flex items-center justify-center mb-6 shadow-[0_0_50px_rgba(59,130,246,0.2)] relative z-10">
                  <node.icon className="w-10 h-10 text-blue-300" />
                </div>
                <h4 className="text-xl font-bold text-white mb-2">{node.label}</h4>
                <span className="text-sm font-semibold text-blue-400 uppercase tracking-widest">{node.sub}</span>
              </motion.div>
            ))}
          </div>
          
          <div className="hidden md:block absolute top-1/2 left-24 right-24 h-[2px] bg-blue-900/50 -translate-y-1/2 -translate-y-[28px] z-0">
            <motion.div 
              className="h-full bg-blue-400 shadow-[0_0_10px_#60a5fa]" 
              initial={{ width: "0%" }} animate={{ width: "100%" }} transition={{ duration: 1.5, delay: 0.5, ease: "easeInOut" }} 
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 1 }}
          className="text-center"
        >
          <Link href="/projects/aeria-weather/deep-dive" className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white text-slate-900 font-bold hover:bg-neutral-200 transition-colors shadow-lg shadow-white/10">
            Read Deep-Dive <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
