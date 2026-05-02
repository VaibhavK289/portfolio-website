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
          <h2 className="text-5xl sm:text-6xl font-black text-white tracking-tighter">Engineering Deep Dive</h2>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.3 }}
          className="prose prose-xl prose-invert max-w-none prose-headings:font-black prose-p:text-neutral-300 prose-p:leading-relaxed prose-li:text-neutral-300"
        >
          <h2 className="border-b border-white/10 pb-4 mb-8">The Desktop Dilemma</h2>
          <p>
            Modern desktop application development has largely been dominated by Electron. While powerful, Electron ships an entire Chromium browser and Node.js runtime with every application. This results in basic utility apps consuming hundreds of megabytes of RAM and significantly draining laptop battery life.
          </p>
          <p>
            Aeria Weather Studio was conceived to solve this. By utilizing <strong>Tauri v2</strong>, we embed a high-performance Rust binary that directly hooks into the operating system's native webview (Edge WebView2 on Windows). This bypasses the Chromium overhead entirely.
          </p>
          
          <div className="my-12 p-8 rounded-3xl bg-white/5 border border-white/10 shadow-lg">
            <h3 className="text-white mt-0 mb-6">The Rust Workspace Architecture</h3>
            <p className="text-lg">
              To maintain pristine code quality and strict typing across both the API and the desktop application, the project is structured as a <strong>Rust Workspace</strong> containing three primary crates:
            </p>
            <ul className="space-y-4 m-0 mt-6">
              <li className="flex items-start gap-4">
                <span className="w-2 h-2 rounded-full bg-sky-400 mt-2.5 flex-shrink-0 shadow-[0_0_10px_#38bdf8]" />
                <span><strong>`backend`:</strong> The Axum HTTP server that handles geocoding and fetches weather payloads. Hosted independently on Render.</span>
              </li>
              <li className="flex items-start gap-4">
                <span className="w-2 h-2 rounded-full bg-emerald-400 mt-2.5 flex-shrink-0 shadow-[0_0_10px_#34d399]" />
                <span><strong>`shared`:</strong> Contains all the common data structs (<code>WeatherReport</code>, <code>CurrentWeather</code>) ensuring the API server and the Tauri IPC bridge agree perfectly on memory layouts.</span>
              </li>
              <li className="flex items-start gap-4">
                <span className="w-2 h-2 rounded-full bg-amber-400 mt-2.5 flex-shrink-0 shadow-[0_0_10px_#fbbf24]" />
                <span><strong>`frontend/src-tauri`:</strong> The desktop shell wrapping the Next.js UI into a native executable window.</span>
              </li>
            </ul>
          </div>

          <h2 className="border-b border-white/10 pb-4 mb-8 mt-16">Zero-Latency Rendering</h2>
          <p>
            The architecture is heavily decoupled. The <strong>Next.js</strong> frontend handles purely presentation and user-state visualization. By offloading all network processing (like parallel fetches to Open-Meteo for AQI and forecasts) to the Rust backend, the React application remains incredibly lightweight.
          </p>
          <p>
            When deployed as a desktop app, Rust's superior memory management allows the application to achieve a <strong>0ms cold start</strong>. It boots instantaneously without the typical V8 engine spin-up times seen in traditional JS frameworks. The final compiled Windows NSIS installer is roughly ~8MB.
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
