'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function AeriaWeatherTechnical() {
  const features = [
    { title: 'Live Engine', val: '< 50ms', desc: 'Asynchronous Tokio-based backend fetching real-time Open-Meteo data globally.', color: 'text-sky-400' },
    { title: 'Local Cache', val: 'Secure', desc: 'Lightning-fast local caching of favorite cities using native Rust filesystem APIs.', color: 'text-emerald-400' },
    { title: 'Footprint', val: '~8 MB', desc: "Compiled directly to machine code via Tauri. Uses a fraction of Electron's memory.", color: 'text-amber-400' }
  ];

  return (
    <div className="min-h-[calc(100vh-136px)] flex flex-col items-center justify-center py-20 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-7xl">
        <div className="text-center mb-24">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
            className="text-5xl sm:text-7xl lg:text-8xl font-black text-white mb-6 tracking-tighter"
          >
            Forecast: <br className="sm:hidden" /><span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-200 to-slate-500">Unmatched Performance</span>
          </motion.h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-20">
          {features.map((f, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: i * 0.2 }}
              className="group relative rounded-3xl p-8 bg-slate-800/40 border border-slate-700/50 backdrop-blur-2xl hover:bg-slate-800/60 transition-colors"
            >
              <div className="absolute top-0 right-0 p-8 opacity-10 font-black text-8xl transition-opacity group-hover:opacity-20">0{i+1}</div>
              <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-8">{f.title}</h3>
              <div className={`text-6xl font-black mb-6 ${f.color}`}>{f.val}</div>
              <p className="text-lg text-slate-300 font-medium leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center"
        >
          <Link href="/projects/aeria-weather/architecture" className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white text-slate-900 font-bold hover:bg-neutral-200 transition-colors shadow-lg shadow-white/10">
            View Architecture <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
