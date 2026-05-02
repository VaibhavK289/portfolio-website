'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { AeriaWeatherPreviewSection } from '@/components/AeriaWeatherPreviewSection';
import { RustBadge } from '@/components/animations';

export default function AeriaWeatherOverview() {
  return (
    <div className="min-h-[calc(100vh-136px)] flex flex-col items-center justify-center py-20 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-7xl flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-300 text-sm font-semibold mb-8 backdrop-blur-md"
        >
          <RustBadge size={16} /> Native Tauri Desktop Application
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl sm:text-7xl lg:text-8xl font-black text-white mb-6 tracking-tighter"
        >
          Real-Time Climate <br className="sm:hidden" />
          <span className="text-transparent bg-clip-text bg-gradient-to-br from-sky-300 via-cyan-300 to-amber-200">
            Intelligence.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.4 }}
          className="text-lg sm:text-xl text-neutral-300 max-w-3xl font-medium mb-12 leading-relaxed"
        >
          A beautifully crafted, ultra-performant weather dashboard that bridges the raw computing power of a <strong>Rust backend</strong> with the fluid interactivity of a <strong>Next.js 16 frontend</strong>. Engineered from the ground up as a native Windows executable via Tauri 2, it delivers instantaneous climate data, 7-day outlooks, and critical air quality metrics without the heavy footprint of an Electron app.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, delay: 0.6 }}
          className="w-full max-w-5xl rounded-3xl overflow-hidden border border-white/10 shadow-[0_0_100px_rgba(14,165,233,0.15)] bg-slate-900/50 backdrop-blur-xl mb-16"
        >
          <AeriaWeatherPreviewSection />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.8 }}
        >
          <Link href="/projects/aeria-weather/technical" className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white text-slate-900 font-bold hover:bg-neutral-200 transition-colors shadow-lg shadow-white/10">
            Explore Technical Specs <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
