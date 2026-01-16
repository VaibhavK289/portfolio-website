'use client';

import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import { 
  Lock, 
  Brain, 
  FileText, 
  Zap,
  MessageSquare,
  Globe,
} from 'lucide-react';
import {
  NeuralNode,
  PrivacyShield,
  ChatTyping,
  LocalLLMPulse,
  aiCardContainerVariants,
  aiCardVariants,
} from '@/components/animations';

export function AllmaPreviewSection() {
  const [isHovered, setIsHovered] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const quickStats = [
    { icon: Lock, value: '100%', label: 'Local', color: 'emerald' },
    { icon: Brain, value: '5+', label: 'Models', color: 'violet' },
    { icon: FileText, value: 'RAG', label: 'Powered', color: 'cyan' },
    { icon: Zap, value: 'Free', label: 'Forever', color: 'amber' },
  ];

  return (
    <section 
      ref={sectionRef}
      className="py-12 sm:py-16 md:py-24 bg-gradient-to-b from-[#0a0a12] via-[#0d0d1a] to-[#0a0a12] relative overflow-hidden"
    >
      {/* Background Elements - AI/Privacy themed */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Neural grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(129,140,248,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(129,140,248,0.02)_1px,transparent_1px)] bg-[size:60px_60px]" />
        
        {/* Gradient orbs */}
        <div className="hidden sm:block">
          <motion.div 
            className="absolute top-0 left-1/4 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-violet-500/10 rounded-full blur-3xl"
            animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.2, 0.1] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div 
            className="absolute bottom-0 right-1/4 w-[250px] md:w-[400px] h-[250px] md:h-[400px] bg-indigo-500/10 rounded-full blur-3xl"
            animate={{ scale: [1, 1.15, 1], opacity: [0.1, 0.15, 0.1] }}
            transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          />
        </div>

        {/* Floating neural nodes - desktop only */}
        <div className="hidden lg:block">
          <div className="absolute top-20 left-20 opacity-30">
            <NeuralNode size={16} color="#818cf8" delay={0} />
          </div>
          <div className="absolute top-40 right-32 opacity-25">
            <NeuralNode size={12} color="#6366f1" delay={0.5} />
          </div>
          <div className="absolute bottom-32 left-40 opacity-20">
            <NeuralNode size={14} color="#a78bfa" delay={1} />
          </div>
          <div className="absolute bottom-20 right-20 opacity-30">
            <NeuralNode size={10} color="#818cf8" delay={1.5} />
          </div>
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
          <div className="inline-flex items-center gap-2 sm:gap-3 px-3 sm:px-5 py-2 sm:py-2.5 rounded-full bg-gradient-to-r from-violet-500/15 to-indigo-500/15 border border-violet-500/30 mb-4 sm:mb-6">
            <Lock className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-violet-400" />
            <span className="text-xs sm:text-sm font-medium text-violet-400">Privacy-First AI</span>
            <ChatTyping color="#818cf8" />
          </div>
          
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-4 px-2">
            Your Data,{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-violet-400 via-indigo-500 to-cyan-500">
              Your Control
            </span>
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-neutral-400 max-w-2xl mx-auto px-4 sm:px-0">
            Experience AI that runs entirely on your machine. No cloud. No subscriptions. Complete privacy.
          </p>
        </motion.div>

        {/* Quick Stats Bar */}
        <motion.div 
          className="grid grid-cols-4 gap-2 sm:gap-3 md:gap-4 mb-6 sm:mb-8"
          variants={aiCardContainerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {quickStats.map((stat) => (
            <motion.div
              key={stat.label}
              variants={aiCardVariants}
              className="relative p-2 sm:p-3 md:p-4 rounded-lg sm:rounded-xl bg-gradient-to-br from-violet-500/10 to-indigo-500/5 border border-violet-500/20 backdrop-blur-sm"
            >
              <div className="relative flex flex-col sm:flex-row items-center sm:items-center gap-1 sm:gap-3">
                <div className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 rounded-md sm:rounded-lg bg-violet-500/20 flex items-center justify-center flex-shrink-0">
                  <stat.icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 text-violet-400" />
                </div>
                <div className="text-center sm:text-left">
                  <div className="text-sm sm:text-base md:text-xl font-bold text-violet-400">{stat.value}</div>
                  <div className="text-[10px] sm:text-xs text-neutral-500 hidden sm:block">{stat.label}</div>
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
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Decorative frame */}
          <div className="absolute -inset-px rounded-xl sm:rounded-2xl bg-gradient-to-r from-violet-500/30 via-transparent to-indigo-500/30" />
          
          {/* Corner brackets - hidden on mobile */}
          <div className="hidden sm:block">
            <div className="absolute -top-2 -left-2 w-8 h-8 border-l-2 border-t-2 border-violet-500/60 rounded-tl-lg" />
            <div className="absolute -top-2 -right-2 w-8 h-8 border-r-2 border-t-2 border-indigo-500/60 rounded-tr-lg" />
            <div className="absolute -bottom-2 -left-2 w-8 h-8 border-l-2 border-b-2 border-violet-500/60 rounded-bl-lg" />
            <div className="absolute -bottom-2 -right-2 w-8 h-8 border-r-2 border-b-2 border-indigo-500/60 rounded-br-lg" />
          </div>

          {/* Screenshot Container */}
          <div className="relative h-[280px] xs:h-[320px] sm:h-[400px] md:h-[500px] lg:h-[550px] rounded-xl sm:rounded-2xl overflow-hidden border border-violet-900/40 bg-[#050508] shadow-xl sm:shadow-2xl shadow-violet-500/10">
            {/* Screenshot or Placeholder */}
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
              {/* AI Chat Interface Mockup */}
              <div className="w-full h-full flex">
                {/* Sidebar */}
                <div className="w-16 sm:w-48 lg:w-56 bg-slate-900/80 border-r border-slate-700/50 p-3 sm:p-4 hidden xs:flex flex-col">
                  <div className="flex items-center gap-2 mb-6">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center">
                      <Brain className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-sm font-semibold text-white hidden sm:block">Allma</span>
                  </div>
                  
                  {/* New Chat Button */}
                  <motion.div 
                    className="p-2 sm:p-3 rounded-lg bg-violet-500/20 border border-violet-500/30 mb-4 cursor-pointer"
                    whileHover={{ scale: 1.02, borderColor: 'rgba(139, 92, 246, 0.5)' }}
                  >
                    <div className="flex items-center gap-2">
                      <MessageSquare className="w-4 h-4 text-violet-400" />
                      <span className="text-xs text-violet-300 hidden sm:block">New Chat</span>
                    </div>
                  </motion.div>

                  {/* Recent chats skeleton */}
                  <div className="space-y-2 flex-1">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="p-2 rounded-lg bg-slate-800/50 opacity-50">
                        <div className="h-2 bg-slate-700 rounded w-3/4 hidden sm:block" />
                      </div>
                    ))}
                  </div>

                  {/* Privacy indicator */}
                  <div className="mt-auto pt-4 border-t border-slate-700/50 hidden sm:block">
                    <div className="flex items-center gap-2 text-xs text-emerald-400">
                      <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      <span>100% Local</span>
                    </div>
                  </div>
                </div>

                {/* Main Chat Area */}
                <div className="flex-1 flex flex-col">
                  {/* Header */}
                  <div className="p-3 sm:p-4 border-b border-slate-700/50 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <LocalLLMPulse size={32} color="#8b5cf6" />
                      <div className="hidden sm:block">
                        <div className="text-sm font-medium text-white">DeepSeek R1</div>
                        <div className="text-xs text-slate-400">Local Model</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="hidden sm:flex items-center gap-1 px-2 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/30">
                        <Globe className="w-3 h-3 text-emerald-400" />
                        <span className="text-xs text-emerald-400">Offline Ready</span>
                      </div>
                    </div>
                  </div>

                  {/* Chat Messages */}
                  <div className="flex-1 p-4 sm:p-6 space-y-4 overflow-hidden">
                    {/* Welcome Message */}
                    <motion.div 
                      className="flex items-start gap-3"
                      initial={{ opacity: 0, y: 20 }}
                      animate={isInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ delay: 0.5 }}
                    >
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center flex-shrink-0">
                        <Brain className="w-4 h-4 text-white" />
                      </div>
                      <div className="flex-1 p-3 sm:p-4 rounded-2xl bg-slate-800/60 border border-slate-700/50">
                        <p className="text-xs sm:text-sm text-slate-300">
                          Welcome to Allma! I&apos;m your private AI assistant running locally on your machine. How can I help you today?
                        </p>
                      </div>
                    </motion.div>

                    {/* User Message */}
                    <motion.div 
                      className="flex items-start gap-3 justify-end"
                      initial={{ opacity: 0, y: 20 }}
                      animate={isInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ delay: 0.8 }}
                    >
                      <div className="p-3 sm:p-4 rounded-2xl bg-violet-600/30 border border-violet-500/30 max-w-[80%]">
                        <p className="text-xs sm:text-sm text-violet-100">
                          Can you analyze my uploaded documents?
                        </p>
                      </div>
                    </motion.div>

                    {/* AI Response with RAG */}
                    <motion.div 
                      className="flex items-start gap-3"
                      initial={{ opacity: 0, y: 20 }}
                      animate={isInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ delay: 1.1 }}
                    >
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center flex-shrink-0">
                        <Brain className="w-4 h-4 text-white" />
                      </div>
                      <div className="flex-1 p-3 sm:p-4 rounded-2xl bg-slate-800/60 border border-slate-700/50">
                        <div className="flex items-center gap-2 mb-2 pb-2 border-b border-slate-700/50">
                          <FileText className="w-3 h-3 text-cyan-400" />
                          <span className="text-xs text-cyan-400">RAG-Enhanced Response</span>
                        </div>
                        <p className="text-xs sm:text-sm text-slate-300">
                          I&apos;ve found relevant context from your documents. Based on the information in your knowledge base...
                        </p>
                        {isHovered && (
                          <motion.div 
                            className="mt-2 flex items-center gap-1"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                          >
                            <ChatTyping color="#818cf8" />
                          </motion.div>
                        )}
                      </div>
                    </motion.div>
                  </div>

                  {/* Input Area */}
                  <div className="p-3 sm:p-4 border-t border-slate-700/50">
                    <div className="flex items-center gap-2 p-2 sm:p-3 rounded-xl bg-slate-800/50 border border-slate-700/50">
                      <input 
                        type="text" 
                        placeholder="Type a message..." 
                        className="flex-1 bg-transparent text-xs sm:text-sm text-slate-300 placeholder-slate-500 outline-none"
                        readOnly
                      />
                      <motion.button
                        className="w-8 h-8 rounded-lg bg-violet-600 flex items-center justify-center"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <svg viewBox="0 0 24 24" className="w-4 h-4 text-white" fill="currentColor">
                          <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                        </svg>
                      </motion.button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Hover overlay with CTA */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-transparent to-transparent flex items-end justify-center pb-6 sm:pb-8 pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: isHovered ? 1 : 0.5 }}
            >
              <motion.a
                href="https://allma-studio.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="pointer-events-auto px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl sm:rounded-full bg-gradient-to-r from-violet-600 via-indigo-600 to-cyan-600 text-white text-sm sm:text-base font-medium flex items-center gap-2 shadow-lg shadow-violet-500/25 border border-white/10 hover:scale-105 transition-transform"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Brain className="w-4 h-4" />
                <span>Try Live Demo</span>
              </motion.a>
            </motion.div>
          </div>
        </motion.div>

        {/* Feature Highlights */}
        <motion.div
          className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mt-6 sm:mt-8"
          variants={aiCardContainerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {[
            { icon: Lock, title: 'Zero Data Collection', desc: 'Your conversations stay private' },
            { icon: Brain, title: 'Multiple Models', desc: 'DeepSeek, Gemma, Qwen & more' },
            { icon: FileText, title: 'RAG Pipeline', desc: 'Query your documents' },
            { icon: Globe, title: 'Works Offline', desc: 'No internet required' },
          ].map((feature, i) => (
            <motion.div
              key={feature.title}
              variants={aiCardVariants}
              className="p-3 sm:p-4 rounded-xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/30 hover:border-violet-500/30 transition-colors"
            >
              <feature.icon className="w-5 h-5 text-violet-400 mb-2" />
              <h4 className="text-sm font-medium text-white mb-1">{feature.title}</h4>
              <p className="text-xs text-slate-400">{feature.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
