'use client';

import { motion } from 'framer-motion';
import { Code2, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import { getProjectBySlug } from '@/data/projects';

export default function AeriaWeatherDeepDive() {
  const project = getProjectBySlug('aeria-weather');

  return (
    <div className="min-h-[calc(100vh-136px)] flex flex-col items-center justify-start py-20 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-4xl">
        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
          className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mb-16"
        >
          <div className="w-20 h-20 rounded-3xl bg-white text-black flex items-center justify-center shadow-[0_0_50px_rgba(255,255,255,0.2)] shrink-0">
            <Code2 className="w-10 h-10" />
          </div>
          <h2 className="text-5xl sm:text-6xl font-black text-white tracking-tighter">Deep Dive</h2>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.3 }}
          className="prose prose-xl prose-invert max-w-none prose-headings:font-black prose-p:text-neutral-300 prose-p:leading-relaxed prose-li:text-neutral-300"
        >
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
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-20 flex gap-4"
        >
          <Link href="/projects" className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-neutral-800 text-white font-bold hover:bg-neutral-700 transition-colors">
            Back to Portfolio
          </Link>
          <a href={project?.githubUrl || '#'} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-sky-500/10 text-sky-400 font-bold hover:bg-sky-500/20 transition-colors border border-sky-500/30">
            View Source <ArrowUpRight className="w-5 h-5" />
          </a>
        </motion.div>
      </div>
    </div>
  );
}
