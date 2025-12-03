'use client';

import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { 
  Gauge, 
  Zap, 
  Shield, 
  Cpu,
  Cog,
} from 'lucide-react';
import { PredictiveCarePreview, PredictiveCareScreenshot } from '@/components/PredictiveCarePreview';
import {
  StatusIndicator,
  industrialCardContainerVariants,
  industrialCardVariants,
} from '@/components/animations/IndustrialAnimations';

export default function PredictiveCarePreviewSection() {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const quickStats = [
    { icon: Gauge, value: '99.9%', label: 'Uptime', color: 'cyan' },
    { icon: Zap, value: '3x', label: 'Faster', color: 'violet' },
    { icon: Shield, value: '50%', label: 'Cost Save', color: 'green' },
    { icon: Cpu, value: '24/7', label: 'Monitoring', color: 'blue' },
  ];

  return (
    <section 
      ref={sectionRef}
      className="py-24 bg-gradient-to-b from-[#0a0f1a] via-[#0c1628] to-[#0a0f1a] relative overflow-hidden"
    >
      {/* Simplified Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Industrial grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.02)_1px,transparent_1px)] bg-[size:60px_60px]" />
        
        {/* Static gradient orbs */}
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-violet-500/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header - simplified */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-gradient-to-r from-cyan-500/15 to-violet-500/15 border border-cyan-500/30 mb-6">
            <Cog className="w-4 h-4 text-cyan-400" />
            <span className="text-sm font-medium text-cyan-400">Live Dashboard Preview</span>
            <StatusIndicator status="operational" size={8} />
          </div>
          
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Industrial{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500">
              Monitoring System
            </span>
          </h2>
          <p className="text-lg text-neutral-400 max-w-2xl mx-auto">
            Experience the power of AI-driven predictive maintenance with our real-time industrial monitoring dashboard
          </p>
        </motion.div>

        {/* Quick Stats Bar - simplified */}
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
          variants={industrialCardContainerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {quickStats.map((stat) => (
            <motion.div
              key={stat.label}
              variants={industrialCardVariants}
              className={`relative p-4 rounded-xl bg-gradient-to-br from-${stat.color}-500/10 to-${stat.color}-500/5 border border-${stat.color}-500/20 backdrop-blur-sm`}
            >
              <div className="relative flex items-center gap-3">
                <div className={`w-10 h-10 rounded-lg bg-${stat.color}-500/20 flex items-center justify-center`}>
                  <stat.icon className={`w-5 h-5 text-${stat.color}-400`} />
                </div>
                <div>
                  <div className={`text-xl font-bold text-${stat.color}-400`}>{stat.value}</div>
                  <div className="text-xs text-neutral-500">{stat.label}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Main Preview Container - simplified */}
        <motion.div
          className="relative"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {/* Decorative frame */}
          <div className="absolute -inset-px rounded-2xl bg-gradient-to-r from-cyan-500/30 via-transparent to-violet-500/30" />
          
          {/* Corner brackets - static */}
          <div className="absolute -top-2 -left-2 w-8 h-8 border-l-2 border-t-2 border-cyan-500/60 rounded-tl-lg" />
          <div className="absolute -top-2 -right-2 w-8 h-8 border-r-2 border-t-2 border-violet-500/60 rounded-tr-lg" />
          <div className="absolute -bottom-2 -left-2 w-8 h-8 border-l-2 border-b-2 border-cyan-500/60 rounded-bl-lg" />
          <div className="absolute -bottom-2 -right-2 w-8 h-8 border-r-2 border-b-2 border-violet-500/60 rounded-br-lg" />

          {/* Interactive Screenshot Container */}
          <div className="relative h-[450px] sm:h-[550px] rounded-2xl overflow-hidden border border-cyan-900/40 bg-[#050810] shadow-2xl shadow-cyan-500/10">
            <PredictiveCareScreenshot onClick={() => setIsPreviewOpen(true)} />
          </div>
          
          {/* Bottom CTA - simplified */}
          <motion.div
            className="absolute -bottom-6 left-1/2 -translate-x-1/2 z-20"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <button
              onClick={() => setIsPreviewOpen(true)}
              className="px-6 py-3 rounded-full bg-gradient-to-r from-cyan-600 via-blue-600 to-violet-600 text-white font-medium flex items-center gap-2 shadow-xl shadow-cyan-500/25 border border-white/10 hover:scale-105 transition-transform"
            >
              <Cpu className="w-4 h-4" />
              Launch Interactive Preview
            </button>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Preview Modal */}
      <PredictiveCarePreview 
        isOpen={isPreviewOpen} 
        onClose={() => setIsPreviewOpen(false)} 
      />
    </section>
  );
}
