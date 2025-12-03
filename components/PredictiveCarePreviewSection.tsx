'use client';

import { useState, useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { 
  Factory, 
  Gauge, 
  Zap, 
  Shield, 
  Cpu,
  Activity,
  BarChart3,
  Cog,
  ArrowRight
} from 'lucide-react';
import { PredictiveCarePreview, PredictiveCareScreenshot } from '@/components/PredictiveCarePreview';
import {
  RotatingGear,
  SensorPulse,
  DataStream,
  StatusIndicator,
  Waveform,
  industrialCardContainerVariants,
  industrialCardVariants,
} from '@/components/animations/IndustrialAnimations';

export default function PredictiveCarePreviewSection() {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.5, 1, 1, 0.5]);

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
      {/* Animated Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Industrial grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.02)_1px,transparent_1px)] bg-[size:60px_60px]" />
        
        {/* Gradient orbs */}
        <motion.div 
          className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-3xl"
          style={{ y }}
        />
        <motion.div 
          className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-violet-500/10 rounded-full blur-3xl"
          style={{ y: useTransform(scrollYProgress, [0, 1], [-30, 30]) }}
        />
        
        {/* Corner gear decorations */}
        <motion.div 
          className="absolute -top-10 -left-10 opacity-10"
          style={{ opacity }}
        >
          <RotatingGear size={150} speed={40} color="#06b6d4" teeth={20} />
        </motion.div>
        <motion.div 
          className="absolute -bottom-10 -right-10 opacity-10"
          style={{ opacity }}
        >
          <RotatingGear size={180} speed={50} direction="ccw" color="#8b5cf6" teeth={24} />
        </motion.div>
        
        {/* Data streams */}
        <div className="absolute top-1/4 left-0">
          <DataStream width={300} height={2} color="#06b6d4" particleCount={5} />
        </div>
        <div className="absolute bottom-1/3 right-0 transform rotate-180">
          <DataStream width={250} height={2} color="#8b5cf6" particleCount={4} />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.2, 0, 0, 1] }}
        >
          <motion.div 
            className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-gradient-to-r from-cyan-500/15 to-violet-500/15 border border-cyan-500/30 mb-6"
            initial={{ scale: 0, rotate: -10 }}
            animate={isInView ? { scale: 1, rotate: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.68, -0.55, 0.265, 1.55] }}
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
            >
              <Cog className="w-4 h-4 text-cyan-400" />
            </motion.div>
            <span className="text-sm font-medium text-cyan-400">Live Dashboard Preview</span>
            <StatusIndicator status="operational" size={8} />
          </motion.div>
          
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

        {/* Quick Stats Bar */}
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
              className={`relative p-4 rounded-xl bg-gradient-to-br from-${stat.color}-500/10 to-${stat.color}-500/5 border border-${stat.color}-500/20 backdrop-blur-sm group overflow-hidden`}
              whileHover={{ scale: 1.02, y: -4 }}
              transition={{ type: 'spring', stiffness: 400, damping: 17 }}
            >
              {/* Hover glow */}
              <motion.div
                className={`absolute inset-0 bg-${stat.color}-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
              />
              
              <div className="relative flex items-center gap-3">
                <motion.div
                  className={`w-10 h-10 rounded-lg bg-${stat.color}-500/20 flex items-center justify-center`}
                  whileHover={{ rotate: 10, scale: 1.1 }}
                >
                  <stat.icon className={`w-5 h-5 text-${stat.color}-400`} />
                </motion.div>
                <div>
                  <div className={`text-xl font-bold text-${stat.color}-400`}>{stat.value}</div>
                  <div className="text-xs text-neutral-500">{stat.label}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Main Preview Container */}
        <motion.div
          className="relative"
          initial={{ opacity: 0, y: 60, scale: 0.95 }}
          animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.2, 0, 0, 1] }}
        >
          {/* Decorative frame */}
          <div className="absolute -inset-px rounded-2xl bg-gradient-to-r from-cyan-500/50 via-blue-500/30 to-violet-500/50 blur-sm" />
          <div className="absolute -inset-px rounded-2xl bg-gradient-to-r from-cyan-500/30 via-transparent to-violet-500/30" />
          
          {/* Corner brackets */}
          <div className="absolute -top-2 -left-2 w-8 h-8 border-l-2 border-t-2 border-cyan-500/60 rounded-tl-lg" />
          <div className="absolute -top-2 -right-2 w-8 h-8 border-r-2 border-t-2 border-violet-500/60 rounded-tr-lg" />
          <div className="absolute -bottom-2 -left-2 w-8 h-8 border-l-2 border-b-2 border-cyan-500/60 rounded-bl-lg" />
          <div className="absolute -bottom-2 -right-2 w-8 h-8 border-r-2 border-b-2 border-violet-500/60 rounded-br-lg" />
          
          {/* Floating tech elements */}
          <motion.div
            className="absolute -top-6 left-1/4 z-20"
            animate={{ y: [-5, 5, -5] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          >
            <div className="px-3 py-1.5 rounded-full bg-gradient-to-r from-cyan-600 to-cyan-500 text-white text-xs font-medium flex items-center gap-2 shadow-lg shadow-cyan-500/30">
              <Activity className="w-3 h-3" />
              Real-time Updates
            </div>
          </motion.div>
          
          <motion.div
            className="absolute -top-6 right-1/4 z-20"
            animate={{ y: [5, -5, 5] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
          >
            <div className="px-3 py-1.5 rounded-full bg-gradient-to-r from-violet-600 to-violet-500 text-white text-xs font-medium flex items-center gap-2 shadow-lg shadow-violet-500/30">
              <BarChart3 className="w-3 h-3" />
              ML Predictions
            </div>
          </motion.div>

          {/* Interactive Screenshot Container */}
          <div className="relative h-[450px] sm:h-[550px] rounded-2xl overflow-hidden border border-cyan-900/40 bg-[#050810] shadow-2xl shadow-cyan-500/10">
            <PredictiveCareScreenshot onClick={() => setIsPreviewOpen(true)} />
          </div>
          
          {/* Bottom CTA */}
          <motion.div
            className="absolute -bottom-6 left-1/2 -translate-x-1/2 z-20"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <motion.button
              onClick={() => setIsPreviewOpen(true)}
              className="px-6 py-3 rounded-full bg-gradient-to-r from-cyan-600 via-blue-600 to-violet-600 text-white font-medium flex items-center gap-2 shadow-xl shadow-cyan-500/25 border border-white/10"
              whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(6, 182, 212, 0.3)' }}
              whileTap={{ scale: 0.98 }}
            >
              <Factory className="w-4 h-4" />
              Launch Interactive Preview
              <motion.div
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              >
                <ArrowRight className="w-4 h-4" />
              </motion.div>
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Waveform decoration at bottom */}
        <motion.div
          className="flex justify-center mt-16"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <div className="flex items-center gap-4">
            <SensorPulse size={24} color="#06b6d4" pulseCount={2} />
            <Waveform width={200} height={30} color="#06b6d4" bars={15} />
            <SensorPulse size={24} color="#8b5cf6" pulseCount={2} />
          </div>
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
