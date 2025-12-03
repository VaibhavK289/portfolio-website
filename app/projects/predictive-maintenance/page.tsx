'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { useRef } from 'react';
import { 
  ArrowLeft, 
  Github, 
  Brain, 
  FileText, 
  Cpu,
  Activity,
  Shield,
  ChevronRight,
  Code2,
  Layers,
  Sparkles,
  Gauge,
  Zap,
  BarChart3,
  Cog,
  Factory,
  Thermometer,
  Radio,
  CircuitBoard,
  TrendingUp,
  DollarSign,
  Eye,
  Bell,
  Database,
  Server,
  Workflow
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { getProjectBySlug } from '@/data/projects';
import {
  Spotlight,
  BackgroundBeams,
  SparklesCore,
  HoverBorderGradient,
} from '@/components/ui/aceternity';
import {
  ScrollReveal,
  ScrollProgress,
  cardContainerVariants,
  cardVariants,
} from '@/components/animations';
import {
  RotatingGear,
  GearSystem,
  Piston,
  SensorPulse,
  DataStream,
  StatusIndicator,
  IndustrialCard,
  AnimatedIcon,
  Waveform,
  industrialHeroVariants,
  industrialCardContainerVariants,
  industrialCardVariants,
  industrialBadgeVariants,
  industrialEasings,
} from '@/components/animations/IndustrialAnimations';
import PredictiveCarePreviewSection from '@/components/PredictiveCarePreviewSection';

// Industrial-themed Background Component - PERFORMANCE OPTIMIZED
function PredictiveCareBackground() {
  return (
    <>
      {/* Industrial Gradient Orbs - Reduced count and simplified animations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-20 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-violet-600/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-3xl" />
      </div>
      
      {/* Single rotating gear for visual interest - much slower */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-20 -left-20 opacity-[0.06]">
          <RotatingGear size={200} speed={120} color="#06b6d4" teeth={24} />
        </div>
        <div className="absolute -bottom-32 -right-32 opacity-[0.06]">
          <RotatingGear size={250} speed={150} direction="ccw" color="#06b6d4" teeth={28} />
        </div>
      </div>
      
      {/* Simplified sparkles - reduced density */}
      <div className="absolute inset-0 w-full h-full">
        <SparklesCore
          id="predictivecare-sparkles"
          background="transparent"
          minSize={0.4}
          maxSize={1}
          particleDensity={8}
          className="w-full h-full"
          particleColor="#06b6d4"
        />
      </div>

      {/* Grid Pattern Overlay - Static, no animation */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.03)_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none" />
    </>
  );
}

// Page Navigation Component
function PredictiveCarePageNav({ currentPage }: { currentPage: 'overview' | 'technical' | 'docs' | 'deep-dive' }) {
  return (
    <motion.div 
      className="sticky top-20 z-40 bg-[#0a0f1a]/90 backdrop-blur-xl border-b border-cyan-900/30"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-4">
          {/* Project Title */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
              <Factory className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="font-bold text-white text-sm">PredictiveCare</h2>
              <p className="text-xs text-neutral-500">Industrial Maintenance AI</p>
            </div>
          </div>
          
          {/* Page Tabs */}
          <div className="flex items-center gap-1 p-1 bg-[#1a2438] rounded-xl">
            <Link
              href="/projects/predictive-maintenance"
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                currentPage === 'overview'
                  ? 'bg-cyan-500/20 text-cyan-400 shadow-sm'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              Overview
            </Link>
            <Link
              href="/projects/predictive-maintenance/technical"
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                currentPage === 'technical'
                  ? 'bg-cyan-500/20 text-cyan-400 shadow-sm'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              Technical
            </Link>
            <Link
              href="/projects/predictive-maintenance/docs"
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                currentPage === 'docs'
                  ? 'bg-cyan-500/20 text-cyan-400 shadow-sm'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              Docs
            </Link>
            <Link
              href="/projects/predictive-maintenance/deep-dive"
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                currentPage === 'deep-dive'
                  ? 'bg-cyan-500/20 text-cyan-400 shadow-sm'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              Deep-Dive
            </Link>
          </div>
          
          {/* Actions */}
          <div className="hidden sm:flex items-center gap-3">
            <Button href="https://predictivecare-ai.vercel.app/dashboard" variant="outline" external className="text-sm border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10">
              <Gauge className="w-4 h-4" />
              Dashboard
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// Hero Section with Industrial Heavy Machinery Animations
function HeroSection() {
  const project = getProjectBySlug('predictive-maintenance');
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  
  if (!project) return null;

  return (
    <section ref={heroRef} className="relative min-h-[90vh] flex items-center overflow-hidden bg-gradient-to-br from-[#050810] via-[#0a0f1a] to-[#0d1425]">
      {/* Spotlight Effect */}
      <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="#06b6d4" />
      
      <PredictiveCareBackground />

      {/* Simplified Floating Industrial Elements - reduced count */}
      <div className="absolute inset-0 pointer-events-none hidden lg:block">
        {/* Single piston on each side */}
        <div className="absolute left-8 top-1/3 opacity-15">
          <Piston height={100} color="#06b6d4" speed={3} />
        </div>
        <div className="absolute right-12 top-1/2 opacity-15">
          <Piston height={80} color="#8b5cf6" speed={3.5} />
        </div>
      </div>

      <motion.div 
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20"
        style={{ y: heroY, opacity: heroOpacity }}
      >
        {/* Back Link with industrial styling */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: industrialEasings.mechanical }}
        >
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-neutral-400 hover:text-cyan-400 mb-12 group transition-colors px-4 py-2 rounded-xl hover:bg-cyan-500/10 border border-transparent hover:border-cyan-500/30"
          >
            <motion.div
              whileHover={{ x: -4 }}
              transition={{ type: 'spring', stiffness: 400 }}
            >
              <ArrowLeft className="w-4 h-4" />
            </motion.div>
            Back to Projects
          </Link>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Text Content */}
          <motion.div
            variants={industrialHeroVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Badge with industrial animation - simplified */}
            <motion.div
              variants={industrialBadgeVariants}
              initial="hidden"
              animate="visible"
              className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-gradient-to-r from-cyan-500/15 to-blue-500/10 border border-cyan-500/30 text-cyan-400 text-sm font-medium mb-6 backdrop-blur-sm"
            >
              <Cog className="w-4 h-4" />
              <StatusIndicator status="operational" size={8} />
              <span>Featured Project • {project.year}</span>
            </motion.div>

            {/* Title - simplified animations */}
            <motion.h1 
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: industrialEasings.hydraulic }}
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500 inline-block">
                Predictive
              </span>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-violet-400 to-purple-500 inline-block">
                Care
              </span>
              <br />
              <span className="text-white inline-flex items-center gap-4">
                Industrial AI
                <Cog className="w-8 h-8 text-cyan-500 hidden sm:block" />
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p
              className="text-xl text-neutral-400 mb-8 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4, ease: industrialEasings.servo }}
            >
              {project.description}
            </motion.p>

            {/* Action Buttons - simplified */}
            <motion.div 
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <HoverBorderGradient
                containerClassName="rounded-full"
                href={project.liveUrl}
                className="bg-[#0a0f1a] text-white flex items-center gap-2 px-6 py-2"
              >
                <Gauge className="w-4 h-4" />
                <span>View Dashboard</span>
              </HoverBorderGradient>
              
              <Button href={project.githubUrl} variant="outline" external className="border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10">
                <Github className="w-4 h-4" />
                View Source
              </Button>
            </motion.div>

            {/* Quick Navigation - simplified */}
            <motion.div
              className="mt-12 pt-8 border-t border-cyan-900/30"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <p className="text-sm text-neutral-500 mb-4">
                Explore this project
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/projects/predictive-maintenance/technical"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#1a2438] text-neutral-300 hover:bg-[#2d3f5f] transition-all text-sm font-medium group border border-transparent hover:border-cyan-500/30"
                >
                  <Code2 className="w-4 h-4 text-cyan-500" />
                  Technical Overview
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <a
                  href="https://predictivecare-ai.vercel.app/features"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#1a2438] text-neutral-300 hover:bg-[#2d3f5f] transition-all text-sm font-medium group border border-transparent hover:border-violet-500/30"
                >
                  <Zap className="w-4 h-4 text-violet-500" />
                  Features
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </motion.div>
          </motion.div>

          {/* Visual Element - Simplified decorations */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4, ease: industrialEasings.hydraulic }}
            className="relative hidden lg:block"
          >
            {/* Static decorations - no infinite animations */}
            <div className="absolute -top-8 -right-8 w-20 h-20 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-2xl shadow-cyan-500/30 z-20">
              <Cpu className="w-10 h-10 text-white" />
            </div>
            
            <div className="absolute -bottom-6 -left-6 w-16 h-16 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center shadow-xl shadow-violet-500/30 z-20">
              <Brain className="w-8 h-8 text-white" />
            </div>

            <div className="absolute top-1/2 -right-4 w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/30 z-20 rotate-12">
              <Cog className="w-7 h-7 text-white" />
            </div>

            {/* Main Card with Image */}
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500/30 via-blue-500/20 to-violet-500/25 rounded-3xl blur-2xl" />
              <div className="relative rounded-2xl overflow-hidden border border-cyan-500/20 bg-[#0c1628]/90 backdrop-blur-sm shadow-2xl">
                {project.image ? (
                  <div className="relative aspect-[4/3]">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover object-top"
                      priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f1a]/80 via-transparent to-transparent" />
                    
                    {/* Overlay stats */}
                    <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                      <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-black/50 backdrop-blur-sm border border-cyan-500/30">
                        <StatusIndicator status="operational" size={8} />
                        <span className="text-xs text-green-400 font-medium">Systems Online</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="px-3 py-1.5 rounded-lg bg-black/50 backdrop-blur-sm border border-cyan-500/30">
                          <span className="text-xs text-cyan-400 font-medium">99.9% Uptime</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="aspect-[4/3] bg-gradient-to-br from-cyan-500/20 to-violet-500/20 flex items-center justify-center relative overflow-hidden">
                    {/* Fallback Industrial Dashboard Mockup */}
                    <div className="absolute inset-4 rounded-xl bg-[#0a0f1a]/90 border border-cyan-500/20 p-4">
                      <div className="flex items-center gap-2 mb-4">
                        <div className="w-3 h-3 rounded-full bg-red-500"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                        <span className="ml-2 text-xs text-neutral-500">PredictiveCare Dashboard</span>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="bg-cyan-500/10 rounded-lg p-3 border border-cyan-500/20">
                          <Gauge className="w-6 h-6 text-cyan-400 mb-2" />
                          <div className="text-xs text-neutral-400">Machine Health</div>
                          <div className="text-lg font-bold text-cyan-400">98.5%</div>
                        </div>
                        <div className="bg-violet-500/10 rounded-lg p-3 border border-violet-500/20">
                          <TrendingUp className="w-6 h-6 text-violet-400 mb-2" />
                          <div className="text-xs text-neutral-400">Predictions</div>
                          <div className="text-lg font-bold text-violet-400">Active</div>
                        </div>
                        <div className="bg-blue-500/10 rounded-lg p-3 border border-blue-500/20">
                          <Thermometer className="w-6 h-6 text-blue-400 mb-2" />
                          <div className="text-xs text-neutral-400">Temperature</div>
                          <div className="text-lg font-bold text-blue-400">42°C</div>
                        </div>
                        <div className="bg-green-500/10 rounded-lg p-3 border border-green-500/20">
                          <Activity className="w-6 h-6 text-green-400 mb-2" />
                          <div className="text-xs text-neutral-400">Status</div>
                          <div className="text-lg font-bold text-green-400">Online</div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Background Beams */}
      <BackgroundBeams className="opacity-30" />
    </section>
  );
}

// Features Section with Industrial Icon Animations
function FeaturesSection() {
  const features = [
    {
      icon: Gauge,
      title: 'Real-time Monitoring',
      description: 'Track machine performance and health metrics in real-time with precision IoT sensors and live dashboard visualization',
      gradient: 'from-cyan-500 to-blue-500',
      bgGradient: 'from-cyan-500/10 to-cyan-500/5',
      borderColor: 'border-cyan-500/20',
      iconBg: 'bg-gradient-to-br from-cyan-400 to-cyan-600',
      iconAnimation: 'pulse' as const,
    },
    {
      icon: Brain,
      title: 'Predictive Analytics',
      description: 'ML-powered ensemble models analyze sensor data to predict failures before they occur, enabling proactive maintenance',
      gradient: 'from-violet-500 to-purple-500',
      bgGradient: 'from-violet-500/10 to-violet-500/5',
      borderColor: 'border-violet-500/20',
      iconBg: 'bg-gradient-to-br from-violet-400 to-violet-600',
      iconAnimation: 'float' as const,
    },
    {
      icon: Bell,
      title: '24/7 Intelligent Alerts',
      description: 'Automated notifications for critical maintenance needs with RAG-powered recommendations for optimal actions',
      gradient: 'from-blue-500 to-indigo-500',
      bgGradient: 'from-blue-500/10 to-blue-500/5',
      borderColor: 'border-blue-500/20',
      iconBg: 'bg-gradient-to-br from-blue-400 to-blue-600',
      iconAnimation: 'shake' as const,
    },
  ];

  return (
    <section className="py-24 bg-[#0a0f1a] relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#050810]/50 via-transparent to-transparent pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-gradient-radial from-cyan-500/8 via-blue-500/5 to-transparent rounded-full blur-3xl pointer-events-none" />
      
      {/* Industrial decorative elements */}
      <div className="absolute left-0 top-1/4 opacity-10">
        <RotatingGear size={120} speed={50} color="#06b6d4" teeth={16} />
      </div>
      <div className="absolute right-0 bottom-1/4 opacity-10">
        <RotatingGear size={100} speed={40} direction="ccw" color="#8b5cf6" teeth={14} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <ScrollReveal>
          <div className="text-center mb-16">
            <motion.div 
              className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-cyan-500/15 text-cyan-400 text-sm font-medium mb-4 border border-cyan-500/20"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
              >
                <Cog className="w-4 h-4" />
              </motion.div>
              <span>Core Features</span>
              <Waveform width={40} height={12} color="#06b6d4" bars={5} />
            </motion.div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Powered by{' '}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500">
                Machine Learning
              </span>
            </h2>
            <p className="text-lg text-neutral-400 max-w-2xl mx-auto">
              Enterprise-grade IoT solution combining real-time monitoring with advanced predictive analytics
            </p>
          </div>
        </ScrollReveal>

        <motion.div 
          className="grid md:grid-cols-3 gap-6"
          variants={industrialCardContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              variants={industrialCardVariants}
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
              className="group"
            >
              <IndustrialCard className="h-full" glowColor={feature.gradient.includes('cyan') ? '#06b6d4' : feature.gradient.includes('violet') ? '#8b5cf6' : '#3b82f6'}>
                <div className={`relative h-full p-8 rounded-3xl bg-gradient-to-br ${feature.bgGradient} border ${feature.borderColor} backdrop-blur-sm hover:border-opacity-50 transition-all duration-300`}>
                  <div className={`absolute -inset-0.5 rounded-3xl bg-gradient-to-r ${feature.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-xl`} />
                  
                  {/* Icon with animation */}
                  <div className="relative mb-6">
                    <motion.div 
                      className={`w-16 h-16 rounded-2xl ${feature.iconBg} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}
                      whileHover={{ rotate: 5 }}
                    >
                      <AnimatedIcon type={feature.iconAnimation} color="white">
                        <feature.icon className="w-8 h-8 text-white" />
                      </AnimatedIcon>
                    </motion.div>
                    
                    {/* Small rotating gear accent */}
                    <motion.div 
                      className="absolute -top-2 -right-2"
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                    >
                      <RotatingGear size={20} speed={5} color={feature.gradient.includes('cyan') ? '#06b6d4' : feature.gradient.includes('violet') ? '#8b5cf6' : '#3b82f6'} teeth={6} />
                    </motion.div>
                  </div>
                  
                  <h3 className="relative text-xl font-bold text-white mb-3">
                    {feature.title}
                  </h3>
                  <p className="relative text-neutral-400 leading-relaxed">
                    {feature.description}
                  </p>
                  
                  {/* Bottom data stream decoration */}
                  <div className="mt-6 pt-4 border-t border-white/5">
                    <DataStream width={150} height={2} color={feature.gradient.includes('cyan') ? '#06b6d4' : feature.gradient.includes('violet') ? '#8b5cf6' : '#3b82f6'} particleCount={3} />
                  </div>
                </div>
              </IndustrialCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// Stats Section with Industrial Gauges and Animations
function StatsSection() {
  const stats = [
    { value: '99.9%', label: 'Uptime Guarantee', icon: Shield, color: 'cyan', animation: 'pulse' as const },
    { value: '50%', label: 'Cost Reduction', icon: DollarSign, color: 'green', animation: 'bounce' as const },
    { value: '3x', label: 'Faster Detection', icon: Zap, color: 'violet', animation: 'shake' as const },
    { value: '24/7', label: 'Monitoring', icon: Eye, color: 'blue', animation: 'float' as const },
  ];

  return (
    <section className="py-16 bg-[#0c1628]/60 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0f1a] via-transparent to-[#0a0f1a] pointer-events-none" />
      
      {/* Industrial grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.02)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
      
      {/* Animated data streams */}
      <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 flex justify-between opacity-30">
        <DataStream width={200} height={2} color="#06b6d4" particleCount={4} />
        <DataStream width={200} height={2} color="#8b5cf6" particleCount={4} />
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          className="grid grid-cols-2 lg:grid-cols-4 gap-6"
          variants={industrialCardContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {stats.map((stat, index) => (
            <motion.div 
              key={stat.label} 
              variants={industrialCardVariants}
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ type: 'spring', stiffness: 400, damping: 17 }}
            >
              <IndustrialCard className="h-full" glowColor={stat.color === 'cyan' ? '#06b6d4' : stat.color === 'green' ? '#22c55e' : stat.color === 'violet' ? '#8b5cf6' : '#3b82f6'}>
                <div className={`relative p-6 rounded-2xl bg-[#1a2438]/80 border border-${stat.color}-900/30 text-center backdrop-blur-sm hover:border-${stat.color}-500/50 transition-all duration-300 h-full`}>
                  {/* Background pulse effect */}
                  <motion.div
                    className={`absolute inset-0 rounded-2xl bg-${stat.color}-500/5`}
                    animate={{ opacity: [0.3, 0.6, 0.3] }}
                    transition={{ duration: 3, repeat: Infinity, delay: index * 0.5 }}
                  />
                  
                  <div className="relative flex justify-center mb-4">
                    <motion.div 
                      className={`w-14 h-14 rounded-xl bg-[#0a0f1a] flex items-center justify-center border border-${stat.color}-900/30`}
                      whileHover={{ rotate: 10 }}
                    >
                      <AnimatedIcon type={stat.animation} color={stat.color === 'cyan' ? '#06b6d4' : stat.color === 'green' ? '#22c55e' : stat.color === 'violet' ? '#8b5cf6' : '#3b82f6'}>
                        <stat.icon className={`w-6 h-6 text-${stat.color}-500`} />
                      </AnimatedIcon>
                    </motion.div>
                    
                    {/* Small sensor pulse */}
                    <div className="absolute -top-1 -right-1">
                      <SensorPulse size={16} color={stat.color === 'cyan' ? '#06b6d4' : stat.color === 'green' ? '#22c55e' : stat.color === 'violet' ? '#8b5cf6' : '#3b82f6'} pulseCount={2} />
                    </div>
                  </div>
                  
                  <motion.div 
                    className={`text-3xl sm:text-4xl font-bold text-${stat.color}-500 mb-2`}
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    {stat.value}
                  </motion.div>
                  <div className="text-sm font-medium text-neutral-500 relative">
                    {stat.label}
                  </div>
                  
                  {/* Bottom waveform */}
                  <div className="mt-3 flex justify-center">
                    <Waveform width={60} height={15} color={stat.color === 'cyan' ? '#06b6d4' : stat.color === 'green' ? '#22c55e' : stat.color === 'violet' ? '#8b5cf6' : '#3b82f6'} bars={6} />
                  </div>
                </div>
              </IndustrialCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// Tech Stack Section
function TechStackSection() {
  const techStack = {
    frontend: [
      { name: 'Next.js 16', icon: Layers, description: 'React framework with App Router' },
      { name: 'React 19', icon: Code2, description: 'UI library' },
      { name: 'TypeScript 5', icon: FileText, description: 'Type safety' },
      { name: 'Tailwind CSS 4', icon: Sparkles, description: 'Styling' },
      { name: 'Framer Motion', icon: Zap, description: 'Animations' },
    ],
    backend: [
      { name: 'FastAPI', icon: Server, description: 'High-performance API' },
      { name: 'Python 3.10+', icon: Code2, description: 'Backend language' },
      { name: 'ChromaDB', icon: Database, description: 'Vector database' },
    ],
    ml: [
      { name: 'XGBoost', icon: Brain, description: 'Gradient boosting' },
      { name: 'LightGBM', icon: Zap, description: 'Fast boosting' },
      { name: 'CatBoost', icon: BarChart3, description: 'Categorical features' },
    ],
    iot: [
      { name: 'Arduino', icon: CircuitBoard, description: 'IoT hardware' },
      { name: 'DHT Sensors', icon: Thermometer, description: 'Temperature sensors' },
      { name: 'MQTT', icon: Radio, description: 'IoT protocol' },
    ],
  };

  return (
    <section className="py-24 bg-[#0a0f1a] relative overflow-hidden">
      <PredictiveCareBackground />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <ScrollReveal>
          <div className="text-center mb-16">
            <motion.span className="inline-block px-4 py-2 rounded-full bg-violet-500/15 text-violet-400 text-sm font-medium mb-4 border border-violet-500/20">
              Frontend Tech Stack
            </motion.span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Built With{' '}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-violet-400 to-purple-500">
                Modern Tools
              </span>
            </h2>
          </div>
        </ScrollReveal>

        {/* Frontend Stack */}
        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-5 gap-4 mb-12"
          variants={cardContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {techStack.frontend.map((tech) => (
            <motion.div key={tech.name} variants={cardVariants}>
              <div className="p-4 rounded-2xl bg-[#1a2438]/60 border border-cyan-900/30 hover:border-cyan-500/40 transition-all duration-300 h-full">
                <tech.icon className="w-8 h-8 text-violet-400 mb-3" />
                <h4 className="font-bold text-white mb-1">{tech.name}</h4>
                <p className="text-sm text-neutral-500">{tech.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* ML Stack */}
        <ScrollReveal>
          <div className="text-center mb-8">
            <motion.span className="inline-block px-4 py-2 rounded-full bg-cyan-500/15 text-cyan-400 text-sm font-medium border border-cyan-500/20">
              ML & AI Stack
            </motion.span>
          </div>
        </ScrollReveal>

        <motion.div 
          className="grid md:grid-cols-3 gap-4 mb-12"
          variants={cardContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {techStack.ml.map((tech) => (
            <motion.div key={tech.name} variants={cardVariants}>
              <div className="p-4 rounded-2xl bg-[#1a2438]/60 border border-cyan-900/30 hover:border-cyan-500/40 transition-all duration-300 h-full">
                <tech.icon className="w-8 h-8 text-cyan-400 mb-3" />
                <h4 className="font-bold text-white mb-1">{tech.name}</h4>
                <p className="text-sm text-neutral-500">{tech.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* IoT Stack */}
        <ScrollReveal>
          <div className="text-center mb-8">
            <motion.span className="inline-block px-4 py-2 rounded-full bg-blue-500/15 text-blue-400 text-sm font-medium border border-blue-500/20">
              IoT & Hardware
            </motion.span>
          </div>
        </ScrollReveal>

        <motion.div 
          className="grid md:grid-cols-3 gap-4"
          variants={cardContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {techStack.iot.map((tech) => (
            <motion.div key={tech.name} variants={cardVariants}>
              <div className="p-4 rounded-2xl bg-[#1a2438]/60 border border-cyan-900/30 hover:border-blue-500/40 transition-all duration-300 h-full">
                <tech.icon className="w-8 h-8 text-blue-400 mb-3" />
                <h4 className="font-bold text-white mb-1">{tech.name}</h4>
                <p className="text-sm text-neutral-500">{tech.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// Architecture Section with Industrial Pipeline Animation
function ArchitectureSection() {
  const pipeline = [
    { icon: Thermometer, label: 'Sensor Data', color: '#06b6d4' },
    { icon: Workflow, label: 'Feature Engineering', color: '#3b82f6' },
    { icon: Brain, label: 'Ensemble Model', color: '#8b5cf6' },
    { icon: BarChart3, label: 'Failure Probability', color: '#a855f7' },
    { icon: Bell, label: 'Maintenance Alert', color: '#ec4899' },
  ];

  return (
    <section className="py-24 bg-[#0c1628]/60 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0f1a] via-transparent to-[#0a0f1a] pointer-events-none" />
      
      {/* Industrial decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-10 opacity-10">
          <GearSystem />
        </div>
        <div className="absolute bottom-10 right-10 opacity-10 transform scale-x-[-1]">
          <GearSystem />
        </div>
        
        {/* Data streams */}
        <div className="absolute top-1/3 left-0">
          <DataStream width={250} height={2} color="#06b6d4" particleCount={4} />
        </div>
        <div className="absolute bottom-1/3 right-0 transform rotate-180">
          <DataStream width={200} height={2} color="#8b5cf6" particleCount={4} />
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <ScrollReveal>
          <div className="text-center mb-16">
            <motion.div 
              className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-blue-500/15 text-blue-400 text-sm font-medium mb-4 border border-blue-500/20"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
            >
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
              >
                <Cog className="w-4 h-4" />
              </motion.div>
              System Architecture
              <StatusIndicator status="operational" size={8} />
            </motion.div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Prediction{' '}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
                Pipeline
              </span>
            </h2>
            <p className="text-lg text-neutral-400 max-w-2xl mx-auto">
              End-to-end machine learning pipeline from sensor data to maintenance alerts
            </p>
          </div>
        </ScrollReveal>

        {/* Pipeline Visualization with flowing animation */}
        <motion.div 
          className="flex flex-wrap justify-center items-center gap-4 mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {pipeline.map((step, index) => (
            <div key={step.label} className="flex items-center">
              <motion.div 
                className="flex flex-col items-center p-5 rounded-2xl bg-[#1a2438]/80 border border-white/5 backdrop-blur-sm relative overflow-hidden group"
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15, duration: 0.5, ease: industrialEasings.hydraulic }}
                whileHover={{ scale: 1.05, y: -5 }}
                style={{ borderColor: `${step.color}30` }}
              >
                {/* Background glow */}
                <motion.div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: `radial-gradient(circle, ${step.color}20, transparent 70%)` }}
                />
                
                {/* Sensor pulse on each node */}
                <div className="absolute -top-2 -right-2">
                  <SensorPulse size={20} color={step.color} pulseCount={2} />
                </div>
                
                <motion.div 
                  className="w-14 h-14 rounded-xl flex items-center justify-center mb-3 relative z-10"
                  style={{ background: `linear-gradient(135deg, ${step.color}40, ${step.color}20)` }}
                  whileHover={{ rotate: 10 }}
                >
                  <AnimatedIcon type={index === 2 ? 'float' : index === 4 ? 'shake' : 'pulse'} color={step.color}>
                    <step.icon className="w-7 h-7" style={{ color: step.color }} />
                  </AnimatedIcon>
                </motion.div>
                <span className="text-xs text-neutral-400 text-center relative z-10 font-medium">{step.label}</span>
                
                {/* Bottom waveform */}
                <div className="mt-2">
                  <Waveform width={50} height={10} color={step.color} bars={5} />
                </div>
              </motion.div>
              
              {/* Animated connector with data flow */}
              {index < pipeline.length - 1 && (
                <motion.div 
                  className="mx-2 relative"
                  initial={{ opacity: 0, scaleX: 0 }}
                  whileInView={{ opacity: 1, scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15 + 0.3, duration: 0.3 }}
                >
                  <div className="w-8 h-8 flex items-center justify-center">
                    <DataStream width={32} height={3} color={step.color} particleCount={2} />
                  </div>
                </motion.div>
              )}
            </div>
          ))}
        </motion.div>

        {/* Ensemble Model Card with industrial styling */}
        <motion.div
          className="max-w-3xl mx-auto p-8 rounded-3xl bg-gradient-to-br from-cyan-500/10 via-blue-500/5 to-violet-500/10 border border-cyan-500/20 backdrop-blur-sm relative overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          {/* Corner gears */}
          <div className="absolute -top-6 -left-6 opacity-20">
            <RotatingGear size={60} speed={20} color="#06b6d4" teeth={10} />
          </div>
          <div className="absolute -bottom-6 -right-6 opacity-20">
            <RotatingGear size={50} speed={15} direction="ccw" color="#8b5cf6" teeth={8} />
          </div>
          
          <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3 relative z-10">
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Brain className="w-8 h-8 text-cyan-400" />
            </motion.div>
            Ensemble Model Architecture
            <StatusIndicator status="operational" size={10} />
          </h3>
          
          <div className="grid md:grid-cols-3 gap-4 mb-6 relative z-10">
            {[
              { name: 'XGBoost', color: '#06b6d4', desc: 'Gradient boosting for structured data patterns' },
              { name: 'LightGBM', color: '#8b5cf6', desc: 'Fast gradient boosting with leaf-wise growth' },
              { name: 'CatBoost', color: '#3b82f6', desc: 'Handles categorical features efficiently' },
            ].map((model, index) => (
              <motion.div 
                key={model.name}
                className="p-4 rounded-xl bg-[#0a0f1a]/60 border border-white/5 relative overflow-hidden group"
                style={{ borderColor: `${model.color}30` }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 + 0.5 }}
                whileHover={{ scale: 1.02, y: -3 }}
              >
                <motion.div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ background: `radial-gradient(circle, ${model.color}15, transparent 70%)` }}
                />
                <div className="flex items-center gap-2 mb-2 relative z-10">
                  <RotatingGear size={16} speed={10} color={model.color} teeth={6} />
                  <h4 className="font-bold" style={{ color: model.color }}>{model.name}</h4>
                </div>
                <p className="text-sm text-neutral-400 relative z-10">{model.desc}</p>
              </motion.div>
            ))}
          </div>
          
          <motion.div 
            className="p-4 rounded-xl bg-[#1a2438] border border-purple-500/20 relative overflow-hidden"
            whileHover={{ scale: 1.01 }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 via-transparent to-purple-500/5" />
            <h4 className="font-bold text-purple-400 mb-2 flex items-center gap-2 relative z-10">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
              >
                <Layers className="w-5 h-5" />
              </motion.div>
              Meta-Learner
              <DataStream width={60} height={2} color="#a855f7" particleCount={2} />
            </h4>
            <p className="text-sm text-neutral-400 relative z-10">Weighted combination of all models for final prediction with 35% weight on Tool Wear feature</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// CTA Section with Industrial Machinery Theme
function CTASection() {
  return (
    <section className="py-24 bg-[#0a0f1a] relative overflow-hidden">
      <PredictiveCareBackground />
      
      {/* Industrial corner decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div 
          className="absolute top-10 left-10 opacity-15"
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 0.15, scale: 1 }}
          viewport={{ once: true }}
        >
          <GearSystem />
        </motion.div>
        <motion.div 
          className="absolute bottom-10 right-10 opacity-15 transform scale-x-[-1]"
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 0.15, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <GearSystem />
        </motion.div>
        
        {/* Pistons on sides */}
        <motion.div 
          className="absolute left-8 top-1/2 -translate-y-1/2 opacity-20 hidden lg:block"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 0.2, x: 0 }}
          viewport={{ once: true }}
        >
          <Piston height={120} color="#06b6d4" speed={2.5} />
        </motion.div>
        <motion.div 
          className="absolute right-8 top-1/2 -translate-y-1/2 opacity-20 hidden lg:block"
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 0.2, x: 0 }}
          viewport={{ once: true }}
        >
          <Piston height={100} color="#8b5cf6" speed={2} />
        </motion.div>
      </div>
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          className="text-center p-12 rounded-3xl bg-gradient-to-br from-cyan-500/10 via-blue-500/5 to-violet-500/10 border border-cyan-500/20 backdrop-blur-sm relative overflow-hidden"
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: industrialEasings.hydraulic }}
        >
          {/* Animated corner brackets */}
          <motion.div
            className="absolute top-4 left-4 w-12 h-12 border-l-2 border-t-2 border-cyan-500/50 rounded-tl-lg"
            animate={{ opacity: [0.3, 0.8, 0.3] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <motion.div
            className="absolute top-4 right-4 w-12 h-12 border-r-2 border-t-2 border-violet-500/50 rounded-tr-lg"
            animate={{ opacity: [0.3, 0.8, 0.3] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
          />
          <motion.div
            className="absolute bottom-4 left-4 w-12 h-12 border-l-2 border-b-2 border-cyan-500/50 rounded-bl-lg"
            animate={{ opacity: [0.3, 0.8, 0.3] }}
            transition={{ duration: 2, repeat: Infinity, delay: 1 }}
          />
          <motion.div
            className="absolute bottom-4 right-4 w-12 h-12 border-r-2 border-b-2 border-violet-500/50 rounded-br-lg"
            animate={{ opacity: [0.3, 0.8, 0.3] }}
            transition={{ duration: 2, repeat: Infinity, delay: 1.5 }}
          />
          
          {/* Sensor pulses in corners */}
          <div className="absolute top-8 left-8">
            <SensorPulse size={30} color="#06b6d4" pulseCount={2} />
          </div>
          <div className="absolute bottom-8 right-8">
            <SensorPulse size={30} color="#8b5cf6" pulseCount={2} />
          </div>
          
          <motion.div
            className="w-20 h-20 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center mx-auto mb-6 relative"
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          >
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
            >
              <Factory className="w-10 h-10 text-white" />
            </motion.div>
            
            {/* Orbiting gear */}
            <motion.div
              className="absolute -top-2 -right-2"
              animate={{ rotate: 360 }}
              transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
            >
              <RotatingGear size={24} speed={6} color="#06b6d4" teeth={6} />
            </motion.div>
          </motion.div>
          
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4 relative z-10">
            Transform Your Maintenance Operations
          </h2>
          <p className="text-neutral-400 mb-8 max-w-xl mx-auto relative z-10">
            Experience the power of predictive maintenance with real-time monitoring and AI-powered failure predictions.
          </p>
          
          {/* Data stream decoration */}
          <div className="flex justify-center mb-8">
            <DataStream width={200} height={3} color="#06b6d4" particleCount={4} />
          </div>
          
          <div className="flex flex-wrap justify-center gap-4 relative z-10">
            <motion.a
              href="https://predictivecare-ai.vercel.app/dashboard"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-medium hover:opacity-90 transition-opacity relative overflow-hidden group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-400 opacity-0 group-hover:opacity-100 transition-opacity"
              />
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="relative z-10"
              >
                <Gauge className="w-5 h-5" />
              </motion.div>
              <span className="relative z-10">View Live Dashboard</span>
              <motion.div
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="relative z-10"
              >
                <ChevronRight className="w-5 h-5" />
              </motion.div>
            </motion.a>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <HoverBorderGradient
                containerClassName="rounded-full"
                href="/contact"
                className="bg-[#0a0f1a] text-white flex items-center gap-2 px-6 py-2"
              >
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                >
                  <Sparkles className="w-4 h-4" />
                </motion.div>
                <span>Start a Project</span>
              </HoverBorderGradient>
            </motion.div>
          </div>
          
          {/* Bottom waveform */}
          <div className="mt-8 flex justify-center">
            <Waveform width={150} height={25} color="#06b6d4" bars={12} />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// Main Page Component
export default function PredictiveCareOverviewPage() {
  return (
    <div className="relative bg-[#050810]">
      <ScrollProgress />
      <HeroSection />
      <PredictiveCarePageNav currentPage="overview" />
      <FeaturesSection />
      <StatsSection />
      <PredictiveCarePreviewSection />
      <TechStackSection />
      <ArchitectureSection />
      <CTASection />
    </div>
  );
}
