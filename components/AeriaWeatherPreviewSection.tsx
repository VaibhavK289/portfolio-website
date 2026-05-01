'use client';

import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { 
  Cloud, 
  Thermometer, 
  Wind, 
  Download,
  Droplets,
} from 'lucide-react';
import { AeriaWeatherPreview, AeriaWeatherScreenshot } from '@/components/AeriaWeatherPreview';
import {
  CloudFloat,
  TemperaturePulse,
  RustBadge,
  weatherCardContainerVariants,
  weatherCardVariants,
} from '@/components/animations';

export function AeriaWeatherPreviewSection() {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const quickStats = [
    { icon: Cloud, value: 'Global', label: 'Coverage', color: 'sky' },
    { icon: Thermometer, value: '7-Day', label: 'Forecast', color: 'amber' },
    { icon: Droplets, value: 'AQI', label: 'Monitoring', color: 'cyan' },
    { icon: Download, value: '.exe', label: 'Desktop App', color: 'orange' },
  ];

  return (
    <section 
      ref={sectionRef}
      className="py-12 sm:py-16 md:py-24 bg-gradient-to-b from-sky-50 dark:from-[#0a1520] via-white dark:via-[#0d1a2a] to-sky-50 dark:to-[#0a1520] relative overflow-hidden transition-colors duration-500"
    >
      {/* Background Elements - Weather/Atmospheric themed */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Atmospheric grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(56,189,248,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(56,189,248,0.05)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(56,189,248,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(56,189,248,0.02)_1px,transparent_1px)] bg-[size:60px_60px]" />
        
        {/* Gradient orbs */}
        <div className="hidden sm:block">
          <motion.div 
            className="absolute top-0 left-1/4 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-sky-500/15 dark:bg-sky-500/10 rounded-full blur-3xl"
            animate={{ scale: [1, 1.1, 1], opacity: [0.15, 0.25, 0.15] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div 
            className="absolute bottom-0 right-1/4 w-[250px] md:w-[400px] h-[250px] md:h-[400px] bg-amber-500/15 dark:bg-amber-500/10 rounded-full blur-3xl"
            animate={{ scale: [1, 1.15, 1], opacity: [0.15, 0.2, 0.15] }}
            transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          />
        </div>

        {/* Floating clouds - desktop only */}
        <div className="hidden lg:block">
          <CloudFloat size={100} opacity={0.1} delay={0} className="top-20 left-20 text-sky-900 dark:text-white" />
          <CloudFloat size={70} opacity={0.08} delay={1} className="top-40 right-32 text-sky-900 dark:text-white" />
          <CloudFloat size={80} opacity={0.07} delay={2} className="bottom-32 left-40 text-sky-900 dark:text-white" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-6 sm:mb-8 md:mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 sm:gap-3 px-3 sm:px-5 py-2 sm:py-2.5 rounded-full bg-gradient-to-r from-sky-500/10 to-amber-500/10 dark:from-sky-500/15 dark:to-amber-500/15 border border-sky-500/20 dark:border-sky-500/30 mb-4 sm:mb-6">
            <div className="w-4 h-4 flex items-center justify-center">
              <RustBadge size={16} />
            </div>
            <span className="text-xs sm:text-sm font-medium text-sky-600 dark:text-sky-400">Full-Stack Rust Application</span>
            <TemperaturePulse size={8} color="#38bdf8" />
          </div>
          
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4 px-2">
            Real-Time Climate{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-sky-500 via-cyan-500 to-amber-500 dark:from-sky-400 dark:via-cyan-500 dark:to-amber-400">
              Intelligence
            </span>
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-gray-600 dark:text-neutral-400 max-w-2xl mx-auto px-4 sm:px-0">
            Rust-powered weather dashboard with live data, air quality monitoring, and a native desktop app
          </p>
        </motion.div>

        {/* Quick Stats Bar */}
        <motion.div 
          className="grid grid-cols-4 gap-2 sm:gap-3 md:gap-4 mb-6 sm:mb-8"
          variants={weatherCardContainerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {quickStats.map((stat) => (
            <motion.div
              key={stat.label}
              variants={weatherCardVariants}
              className="relative p-2 sm:p-3 md:p-4 rounded-lg sm:rounded-xl bg-white/60 dark:bg-sky-500/5 border border-sky-200 dark:border-sky-500/20 backdrop-blur-md shadow-sm"
            >
              <div className="relative flex flex-col sm:flex-row items-center sm:items-center gap-1 sm:gap-3">
                <div className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 rounded-md sm:rounded-lg bg-sky-100 dark:bg-sky-500/20 flex items-center justify-center flex-shrink-0">
                  <stat.icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 text-sky-600 dark:text-sky-400" />
                </div>
                <div className="text-center sm:text-left">
                  <div className="text-sm sm:text-base md:text-xl font-bold text-sky-600 dark:text-sky-400">{stat.value}</div>
                  <div className="text-[10px] sm:text-xs text-gray-500 dark:text-neutral-500 hidden sm:block">{stat.label}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Main Preview Container */}
        <motion.div
          className="relative"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {/* Decorative frame */}
          <div className="absolute -inset-px rounded-xl sm:rounded-2xl bg-gradient-to-r from-sky-400/50 via-transparent to-amber-400/50 dark:from-sky-500/30 dark:to-amber-500/30" />
          
          {/* Corner brackets - hidden on mobile */}
          <div className="hidden sm:block">
            <div className="absolute -top-2 -left-2 w-8 h-8 border-l-2 border-t-2 border-sky-400 dark:border-sky-500/60 rounded-tl-lg" />
            <div className="absolute -top-2 -right-2 w-8 h-8 border-r-2 border-t-2 border-amber-400 dark:border-amber-500/60 rounded-tr-lg" />
            <div className="absolute -bottom-2 -left-2 w-8 h-8 border-l-2 border-b-2 border-sky-400 dark:border-sky-500/60 rounded-bl-lg" />
            <div className="absolute -bottom-2 -right-2 w-8 h-8 border-r-2 border-b-2 border-amber-400 dark:border-amber-500/60 rounded-br-lg" />
          </div>

          {/* Screenshot Container */}
          <div className="relative h-[280px] xs:h-[320px] sm:h-[400px] md:h-[500px] lg:h-[550px] rounded-xl sm:rounded-2xl overflow-hidden border border-sky-200 dark:border-sky-900/40 bg-white dark:bg-[#050a14] shadow-xl sm:shadow-2xl shadow-sky-500/10">
            <AeriaWeatherScreenshot onClick={() => setIsPreviewOpen(true)} />
          </div>
          
          {/* Bottom CTA */}
          <motion.div
            className="mt-4 sm:mt-0 sm:absolute sm:-bottom-6 sm:left-1/2 sm:-translate-x-1/2 z-20 flex justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <button
              onClick={() => setIsPreviewOpen(true)}
              className="w-full sm:w-auto px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl sm:rounded-full bg-gradient-to-r from-sky-500 via-cyan-500 to-amber-500 dark:from-sky-600 dark:via-cyan-600 dark:to-amber-600 text-white text-sm sm:text-base font-medium flex items-center justify-center gap-2 shadow-lg sm:shadow-xl shadow-sky-500/25 border border-white/20 dark:border-white/10 active:scale-95 sm:hover:scale-105 transition-transform"
            >
              <Cloud className="w-4 h-4" />
              <span className="sm:hidden">Explore Dashboard</span>
              <span className="hidden sm:inline">Launch Interactive Preview</span>
            </button>
          </motion.div>
        </motion.div>

        {/* Feature Highlights */}
        <motion.div
          className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mt-10 sm:mt-14"
          variants={weatherCardContainerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {[
            { icon: Cloud, title: 'Live Weather Data', desc: 'Any city worldwide via Open-Meteo' },
            { icon: Thermometer, title: 'Dynamic Scenes', desc: 'UI adapts to weather conditions' },
            { icon: Wind, title: 'Rust Backend', desc: 'Axum + Tokio async performance' },
            { icon: Download, title: 'Desktop App', desc: 'Native Windows installer via Tauri' },
          ].map((feature) => (
            <motion.div
              key={feature.title}
              variants={weatherCardVariants}
              className="p-3 sm:p-4 rounded-xl bg-white/60 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/30 hover:border-sky-400 dark:hover:border-sky-500/30 transition-colors shadow-sm"
            >
              <feature.icon className="w-5 h-5 text-sky-500 dark:text-sky-400 mb-2" />
              <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-1">{feature.title}</h4>
              <p className="text-xs text-gray-500 dark:text-slate-400">{feature.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
      
      {/* Preview Modal */}
      <AeriaWeatherPreview 
        isOpen={isPreviewOpen} 
        onClose={() => setIsPreviewOpen(false)} 
      />
    </section>
  );
}
