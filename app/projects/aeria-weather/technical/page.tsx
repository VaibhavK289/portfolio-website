'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Server, Layout, Globe2, CloudRain } from 'lucide-react';
import Link from 'next/link';

export default function AeriaWeatherTechnical() {
  const features = [
    { 
      title: 'High-Performance Backend', 
      val: 'Axum + Tokio', 
      desc: 'The server leverages Rust’s Axum framework and the Tokio asynchronous runtime. This guarantees type-safe, non-blocking HTTP request handling capable of sustaining thousands of concurrent connections with sub-millisecond overhead.', 
      color: 'text-sky-400',
      icon: Server
    },
    { 
      title: 'Modern UI Infrastructure', 
      val: 'Next.js 16', 
      desc: 'The presentation layer is built on Next.js 16 (React 19) utilizing the App Router and Tailwind CSS v4. This provides a buttery-smooth, responsive user interface with dynamic weather-themed backgrounds based on real-time payload data.', 
      color: 'text-indigo-400',
      icon: Layout
    },
    { 
      title: 'Parallel API Sourcing', 
      val: 'Open-Meteo', 
      desc: 'To eliminate latency, the Rust backend executes parallel outbound requests to the Open-Meteo API (fetching Geocoding, Current Conditions, Hourly/Daily forecasts, and AQI simultaneously) before unifying the data.', 
      color: 'text-amber-400',
      icon: CloudRain
    },
    { 
      title: 'Native Desktop Shell', 
      val: 'Tauri v2', 
      desc: 'Instead of shipping a bloated Chromium instance via Electron, Aeria Weather is packaged into a native Windows executable (.exe) using Tauri v2, resulting in a microscopic ~8MB binary and 0ms cold start times.', 
      color: 'text-emerald-400',
      icon: Globe2
    }
  ];

  return (
    <div className="min-h-[calc(100vh-136px)] flex flex-col items-center justify-center py-20 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-7xl">
        <div className="text-center mb-24">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
            className="text-5xl sm:text-7xl lg:text-8xl font-black text-white mb-6 tracking-tighter"
          >
            Engineered For <br className="sm:hidden" /><span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-200 to-slate-500">Unmatched Performance</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.2 }}
            className="text-lg text-slate-400 max-w-2xl mx-auto font-medium"
          >
            A multi-crate Rust workspace decoupling heavy asynchronous network processing from the high-fidelity Next.js presentation layer.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-20">
          {features.map((f, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: i * 0.2 }}
              className="group relative rounded-3xl p-10 bg-slate-800/40 border border-slate-700/50 backdrop-blur-2xl hover:bg-slate-800/60 transition-colors overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-8 opacity-5 text-slate-100 transition-opacity group-hover:opacity-10 group-hover:scale-110 duration-500">
                <f.icon className="w-32 h-32" />
              </div>
              <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-4">{f.title}</h3>
              <div className={`text-4xl sm:text-5xl font-black mb-6 ${f.color}`}>{f.val}</div>
              <p className="text-lg text-slate-300 font-medium leading-relaxed relative z-10">{f.desc}</p>
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
