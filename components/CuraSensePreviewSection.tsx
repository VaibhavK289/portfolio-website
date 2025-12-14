'use client';

import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { 
  FileText, 
  Brain, 
  Shield, 
  Activity,
  Stethoscope,
} from 'lucide-react';
import { CuraSensePreview, CuraSenseScreenshot } from '@/components/CuraSensePreview';
import {
  HeartbeatPulse,
  healthcareCardContainerVariants,
  healthcareCardVariants,
} from '@/components/animations';

export function CuraSensePreviewSection() {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const quickStats = [
    { icon: FileText, value: '10+', label: 'Reports', color: 'emerald' },
    { icon: Brain, value: '98.5%', label: 'Accuracy', color: 'cyan' },
    { icon: Shield, value: '100%', label: 'Secure', color: 'teal' },
    { icon: Activity, value: '<30s', label: 'Response', color: 'violet' },
  ];

  return (
    <section 
      ref={sectionRef}
      className="py-12 sm:py-16 md:py-24 bg-gradient-to-b from-[#0a0f1a] via-[#0c1628] to-[#0a0f1a] relative overflow-hidden"
    >
      {/* Background Elements - Healthcare themed - hidden on mobile for performance */}
      <div className="absolute inset-0 pointer-events-none hidden sm:block">
        {/* Medical grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.02)_1px,transparent_1px)] bg-[size:60px_60px]" />
        
        {/* Static gradient orbs - reduced on mobile */}
        <div className="absolute top-0 left-1/4 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-emerald-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-[250px] md:w-[400px] h-[250px] md:h-[400px] bg-cyan-500/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 relative z-10">
        {/* Section Header - Mobile optimized */}
        <motion.div
          className="text-center mb-6 sm:mb-8 md:mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 sm:gap-3 px-3 sm:px-5 py-2 sm:py-2.5 rounded-full bg-gradient-to-r from-emerald-500/15 to-cyan-500/15 border border-emerald-500/30 mb-4 sm:mb-6">
            <Stethoscope className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-400" />
            <span className="text-xs sm:text-sm font-medium text-emerald-400">Live Platform Preview</span>
            <HeartbeatPulse size={8} color="#10b981" />
          </div>
          
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-4 px-2">
            AI-Powered{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 via-teal-500 to-cyan-500">
              Healthcare Platform
            </span>
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-neutral-400 max-w-2xl mx-auto px-4 sm:px-0">
            Experience intelligent medical analysis with our AI-driven healthcare assistant
          </p>
        </motion.div>

        {/* Quick Stats Bar - Redesigned for mobile */}
        <motion.div 
          className="grid grid-cols-4 gap-2 sm:gap-3 md:gap-4 mb-6 sm:mb-8"
          variants={healthcareCardContainerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {quickStats.map((stat) => (
            <motion.div
              key={stat.label}
              variants={healthcareCardVariants}
              className="relative p-2 sm:p-3 md:p-4 rounded-lg sm:rounded-xl bg-gradient-to-br from-emerald-500/10 to-emerald-500/5 border border-emerald-500/20 backdrop-blur-sm"
            >
              <div className="relative flex flex-col sm:flex-row items-center sm:items-center gap-1 sm:gap-3">
                <div className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 rounded-md sm:rounded-lg bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
                  <stat.icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 text-emerald-400" />
                </div>
                <div className="text-center sm:text-left">
                  <div className="text-sm sm:text-base md:text-xl font-bold text-emerald-400">{stat.value}</div>
                  <div className="text-[10px] sm:text-xs text-neutral-500 hidden sm:block">{stat.label}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Main Preview Container - Mobile optimized */}
        <motion.div
          className="relative"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {/* Decorative frame - simplified on mobile */}
          <div className="absolute -inset-px rounded-xl sm:rounded-2xl bg-gradient-to-r from-emerald-500/30 via-transparent to-cyan-500/30" />
          
          {/* Corner brackets - hidden on mobile for cleaner look */}
          <div className="hidden sm:block">
            <div className="absolute -top-2 -left-2 w-8 h-8 border-l-2 border-t-2 border-emerald-500/60 rounded-tl-lg" />
            <div className="absolute -top-2 -right-2 w-8 h-8 border-r-2 border-t-2 border-cyan-500/60 rounded-tr-lg" />
            <div className="absolute -bottom-2 -left-2 w-8 h-8 border-l-2 border-b-2 border-emerald-500/60 rounded-bl-lg" />
            <div className="absolute -bottom-2 -right-2 w-8 h-8 border-r-2 border-b-2 border-cyan-500/60 rounded-br-lg" />
          </div>

          {/* Interactive Screenshot Container - Responsive height */}
          <div className="relative h-[280px] xs:h-[320px] sm:h-[400px] md:h-[500px] lg:h-[550px] rounded-xl sm:rounded-2xl overflow-hidden border border-emerald-900/40 bg-[#050810] shadow-xl sm:shadow-2xl shadow-emerald-500/10">
            <CuraSenseScreenshot onClick={() => setIsPreviewOpen(true)} />
          </div>
          
          {/* Bottom CTA - Repositioned for mobile */}
          <motion.div
            className="mt-4 sm:mt-0 sm:absolute sm:-bottom-6 sm:left-1/2 sm:-translate-x-1/2 z-20 flex justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <button
              onClick={() => setIsPreviewOpen(true)}
              className="w-full sm:w-auto px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl sm:rounded-full bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 text-white text-sm sm:text-base font-medium flex items-center justify-center gap-2 shadow-lg sm:shadow-xl shadow-emerald-500/25 border border-white/10 active:scale-95 sm:hover:scale-105 transition-transform"
            >
              <Stethoscope className="w-4 h-4" />
              <span className="sm:hidden">Try CuraSense</span>
              <span className="hidden sm:inline">Launch Interactive Preview</span>
            </button>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Preview Modal */}
      <CuraSensePreview 
        isOpen={isPreviewOpen} 
        onClose={() => setIsPreviewOpen(false)} 
      />
    </section>
  );
}
