'use client';

import { useState, useEffect, useCallback, useSyncExternalStore } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { 
  X, 
  Maximize2, 
  Minimize2, 
  ExternalLink, 
  RefreshCw, 
  AlertCircle, 
  Gauge,
  Thermometer,
  Activity,
  Cog,
  Radio,
  Shield
} from 'lucide-react';
import {
  RotatingGear,
  GearSystem,
  SensorPulse,
  DataStream,
  IndustrialSpinner,
  StatusIndicator,
  Waveform,
} from '@/components/animations/IndustrialAnimations';

// Custom hook to safely check for client-side rendering
function useIsMounted() {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );
}

interface PredictiveCarePreviewProps {
  isOpen: boolean;
  onClose: () => void;
}

export function PredictiveCarePreview({ isOpen, onClose }: PredictiveCarePreviewProps) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [iframeKey, setIframeKey] = useState(0);
  const isMounted = useIsMounted();

  // Track isOpen changes using derived state pattern
  const [prevIsOpen, setPrevIsOpen] = useState(isOpen);
  if (isOpen !== prevIsOpen) {
    setPrevIsOpen(isOpen);
    if (isOpen) {
      setIsLoading(true);
      setHasError(false);
    }
  }

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleIframeLoad = useCallback(() => {
    setIsLoading(false);
  }, []);

  const handleRefresh = useCallback(() => {
    setIsLoading(true);
    setHasError(false);
    setIframeKey(prev => prev + 1);
  }, []);

  if (!isMounted) return null;

  const modalContent = (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop with industrial pattern */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/90 backdrop-blur-md z-[9998]"
          >
            {/* Animated industrial grid pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.03)_1px,transparent_1px)] bg-[size:40px_40px]" />
            
            {/* Floating gears in background */}
            <motion.div
              className="absolute top-20 left-20 opacity-20"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            >
              <RotatingGear size={100} speed={20} color="#06b6d4" />
            </motion.div>
            <motion.div
              className="absolute bottom-20 right-20 opacity-20"
              animate={{ rotate: -360 }}
              transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
            >
              <RotatingGear size={80} speed={15} direction="ccw" color="#8b5cf6" />
            </motion.div>
          </motion.div>
          
          {/* Window with industrial styling */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 40, rotateX: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0, rotateX: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', stiffness: 200, damping: 25, mass: 1 }}
            className={`fixed z-[9999] bg-gradient-to-br from-[#0a0f1a] to-[#0d1425] rounded-2xl overflow-hidden shadow-2xl border border-cyan-500/30 ${
              isFullscreen 
                ? 'inset-4' 
                : 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-5xl h-[80vh]'
            }`}
            style={{
              boxShadow: '0 0 60px rgba(6, 182, 212, 0.15), 0 0 120px rgba(139, 92, 246, 0.1)',
            }}
          >
            {/* Animated corner accents */}
            <div className="absolute top-0 left-0 w-20 h-20 pointer-events-none">
              <motion.div
                className="absolute top-2 left-2 w-8 h-0.5 bg-gradient-to-r from-cyan-500 to-transparent"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <motion.div
                className="absolute top-2 left-2 w-0.5 h-8 bg-gradient-to-b from-cyan-500 to-transparent"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
              />
            </div>
            <div className="absolute top-0 right-0 w-20 h-20 pointer-events-none">
              <motion.div
                className="absolute top-2 right-2 w-8 h-0.5 bg-gradient-to-l from-violet-500 to-transparent"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.25 }}
              />
              <motion.div
                className="absolute top-2 right-2 w-0.5 h-8 bg-gradient-to-b from-violet-500 to-transparent"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.75 }}
              />
            </div>

            {/* Window Header - Industrial Control Panel Style */}
            <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-[#0c1628] via-[#101d35] to-[#0c1628] border-b border-cyan-900/40">
              <div className="flex items-center gap-3">
                {/* Traffic lights with industrial glow */}
                <div className="flex items-center gap-2">
                  <motion.button
                    onClick={onClose}
                    className="w-3.5 h-3.5 rounded-full bg-red-500 hover:bg-red-400 transition-colors group flex items-center justify-center relative"
                    aria-label="Close"
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <motion.div
                      className="absolute inset-0 rounded-full bg-red-500"
                      animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                    <X className="w-2 h-2 text-red-900 opacity-0 group-hover:opacity-100 relative z-10" />
                  </motion.button>
                  <motion.button 
                    className="w-3.5 h-3.5 rounded-full bg-yellow-500 hover:bg-yellow-400 transition-colors"
                    aria-label="Minimize"
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                  />
                  <motion.button
                    onClick={() => setIsFullscreen(!isFullscreen)}
                    className="w-3.5 h-3.5 rounded-full bg-green-500 hover:bg-green-400 transition-colors group flex items-center justify-center"
                    aria-label="Fullscreen"
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    {isFullscreen ? (
                      <Minimize2 className="w-2 h-2 text-green-900 opacity-0 group-hover:opacity-100" />
                    ) : (
                      <Maximize2 className="w-2 h-2 text-green-900 opacity-0 group-hover:opacity-100" />
                    )}
                  </motion.button>
                </div>
                
                {/* Rotating gear indicator */}
                <div className="hidden sm:block">
                  <RotatingGear size={24} speed={4} color="#06b6d4" teeth={8} />
                </div>
              </div>
              
              {/* URL Bar - Industrial HUD style */}
              <div className="flex-1 mx-4">
                <motion.div 
                  className="flex items-center gap-2 px-4 py-2 bg-[#0a0f1a]/80 rounded-xl border border-cyan-900/40 max-w-lg mx-auto relative overflow-hidden"
                  whileHover={{ borderColor: 'rgba(6, 182, 212, 0.5)' }}
                >
                  {/* Data stream animation in URL bar */}
                  <div className="absolute inset-0 opacity-30">
                    <DataStream width={400} height={2} color="#06b6d4" particleCount={3} />
                  </div>
                  
                  <StatusIndicator status={hasError ? 'critical' : 'operational'} size={10} />
                  <span className="text-xs text-neutral-300 truncate font-mono relative z-10">
                    predictivecare-ai.vercel.app
                  </span>
                  <Shield className="w-3 h-3 text-green-500 ml-auto" />
                </motion.div>
              </div>
              
              {/* Actions with industrial styling */}
              <div className="flex items-center gap-2">
                <motion.button
                  onClick={handleRefresh}
                  className="p-2 text-neutral-400 hover:text-cyan-400 transition-colors rounded-lg hover:bg-cyan-500/10"
                  aria-label="Refresh"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
                </motion.button>
                <motion.a
                  href="https://predictivecare-ai.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-neutral-400 hover:text-cyan-400 transition-colors rounded-lg hover:bg-cyan-500/10"
                  aria-label="Open in new tab"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ExternalLink className="w-4 h-4" />
                </motion.a>
              </div>
            </div>
            
            {/* Content */}
            <div className="relative w-full h-[calc(100%-52px)] bg-[#050810]">
              {/* Loading State - Industrial themed */}
              {isLoading && !hasError && (
                <motion.div 
                  className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#050810] via-[#0a0f1a] to-[#050810] z-10"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  {/* Industrial grid background */}
                  <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.02)_1px,transparent_1px)] bg-[size:30px_30px]" />
                  
                  {/* Animated gear system */}
                  <div className="absolute top-1/4 left-1/4 opacity-30">
                    <GearSystem />
                  </div>
                  <div className="absolute bottom-1/4 right-1/4 opacity-30 transform scale-x-[-1]">
                    <GearSystem />
                  </div>
                  
                  <div className="flex flex-col items-center gap-6 relative z-10">
                    {/* Main loading spinner */}
                    <IndustrialSpinner size={80} color="#06b6d4" />
                    
                    {/* Loading text with waveform */}
                    <div className="flex flex-col items-center gap-3">
                      <motion.p 
                        className="text-cyan-400 text-sm font-medium"
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        Initializing Industrial Dashboard...
                      </motion.p>
                      <Waveform width={120} height={20} color="#06b6d4" bars={8} />
                    </div>
                    
                    {/* Status indicators */}
                    <div className="flex items-center gap-4 mt-4">
                      <div className="flex items-center gap-2">
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                        >
                          <Cog className="w-4 h-4 text-cyan-500" />
                        </motion.div>
                        <span className="text-xs text-neutral-500">Systems</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <motion.div
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 1, repeat: Infinity }}
                        >
                          <Radio className="w-4 h-4 text-violet-500" />
                        </motion.div>
                        <span className="text-xs text-neutral-500">Sensors</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <motion.div
                          animate={{ opacity: [0.5, 1, 0.5] }}
                          transition={{ duration: 0.8, repeat: Infinity }}
                        >
                          <Activity className="w-4 h-4 text-green-500" />
                        </motion.div>
                        <span className="text-xs text-neutral-500">ML Model</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
              
              {/* Error State - Industrial themed */}
              {hasError && (
                <motion.div 
                  className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#050810] via-[#0a0f1a] to-[#050810] z-10"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <div className="flex flex-col items-center gap-6 text-center px-8">
                    <motion.div
                      animate={{ 
                        rotate: [0, -5, 5, -5, 0],
                        scale: [1, 1.05, 1]
                      }}
                      transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 2 }}
                    >
                      <AlertCircle className="w-16 h-16 text-amber-500" />
                    </motion.div>
                    <div>
                      <p className="text-white font-medium mb-2 text-lg">System Connection Error</p>
                      <p className="text-neutral-400 text-sm mb-4 max-w-md">
                        Unable to establish connection to the industrial monitoring system. 
                        The preview may have restrictions on embedding.
                      </p>
                    </div>
                    <div className="flex gap-3">
                      <motion.button
                        onClick={handleRefresh}
                        className="px-5 py-2.5 bg-[#1a2438] text-white rounded-xl hover:bg-[#2d3f5f] transition-colors text-sm font-medium flex items-center gap-2 border border-cyan-900/30"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <RefreshCw className="w-4 h-4" />
                        Reconnect
                      </motion.button>
                      <motion.a
                        href="https://predictivecare-ai.vercel.app/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-5 py-2.5 bg-gradient-to-r from-cyan-600 to-cyan-500 text-white rounded-xl hover:from-cyan-500 hover:to-cyan-400 transition-all text-sm font-medium flex items-center gap-2"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        Open Dashboard <ExternalLink className="w-4 h-4" />
                      </motion.a>
                    </div>
                  </div>
                </motion.div>
              )}
              
              {/* Iframe */}
              <iframe
                key={iframeKey}
                src="https://predictivecare-ai.vercel.app/"
                className="w-full h-full border-0"
                onLoad={handleIframeLoad}
                allow="clipboard-read; clipboard-write"
                sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox"
                title="PredictiveCare Preview"
              />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
  
  return createPortal(modalContent, document.body);
}

// PredictiveCare Screenshot Component - Enhanced Industrial Dashboard with Image
export function PredictiveCareScreenshot({ onClick }: { onClick: () => void }) {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <motion.div 
      className="relative w-full h-full cursor-pointer group overflow-hidden"
      onClick={onClick}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Background Image - Using the provided homepage image */}
      <div className="absolute inset-0">
        <Image
          src="/images/projects/precitivecare_homepage.png"
          alt="PredictiveCare Industrial Dashboard"
          fill
          className={`object-cover object-top transition-all duration-700 ${
            imageLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
          }`}
          onLoad={() => setImageLoaded(true)}
          priority
        />
        
        {/* Fallback gradient while loading */}
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gradient-to-br from-[#050810] via-[#0a1628] to-[#0d1425]">
            <div className="absolute inset-0 flex items-center justify-center">
              <IndustrialSpinner size={60} color="#06b6d4" />
            </div>
          </div>
        )}
      </div>

      {/* Animated Industrial Overlay Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Corner gear decorations */}
        <motion.div
          className="absolute -top-4 -left-4 opacity-40"
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
        >
          <RotatingGear size={80} speed={30} color="#06b6d4" teeth={12} />
        </motion.div>
        
        <motion.div
          className="absolute -bottom-6 -right-6 opacity-30"
          animate={{ rotate: -360 }}
          transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
        >
          <RotatingGear size={100} speed={25} direction="ccw" color="#8b5cf6" teeth={16} />
        </motion.div>

        {/* Floating sensor pulses */}
        <div className="absolute top-8 right-8">
          <SensorPulse size={40} color="#22c55e" pulseCount={2} />
        </div>
        
        <div className="absolute bottom-12 left-8">
          <SensorPulse size={30} color="#06b6d4" pulseCount={2} />
        </div>

        {/* Data streams */}
        <div className="absolute top-1/3 left-0">
          <DataStream width={150} height={3} color="#06b6d4" particleCount={3} />
        </div>
        <div className="absolute bottom-1/3 right-0 transform rotate-180">
          <DataStream width={120} height={3} color="#8b5cf6" particleCount={3} />
        </div>
      </div>

      {/* Gradient overlays for depth */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#050810]/90 via-[#050810]/20 to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#050810]/50 via-transparent to-[#050810]/50 pointer-events-none" />

      {/* Industrial grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none opacity-50" />

      {/* Bottom Info Bar - Industrial HUD Style */}
      <motion.div 
        className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-[#050810] via-[#050810]/95 to-transparent"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <div className="flex items-center justify-between">
          {/* Left - Status indicators */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-green-500/10 border border-green-500/30">
              <StatusIndicator status="operational" size={8} />
              <span className="text-xs text-green-400 font-medium">All Systems Operational</span>
            </div>
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-cyan-500/10 border border-cyan-500/30">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
              >
                <Cog className="w-3 h-3 text-cyan-400" />
              </motion.div>
              <span className="text-xs text-cyan-400 font-medium">ML Model Active</span>
            </div>
          </div>

          {/* Right - Stats */}
          <div className="hidden md:flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Gauge className="w-4 h-4 text-cyan-400" />
              <span className="text-sm text-white font-bold">99.8%</span>
              <span className="text-xs text-neutral-500">Uptime</span>
            </div>
            <div className="flex items-center gap-2">
              <Thermometer className="w-4 h-4 text-blue-400" />
              <span className="text-sm text-white font-bold">42°C</span>
              <span className="text-xs text-neutral-500">Avg Temp</span>
            </div>
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-green-400" />
              <span className="text-sm text-white font-bold">24</span>
              <span className="text-xs text-neutral-500">Active Sensors</span>
            </div>
          </div>
        </div>
      </motion.div>
      
      {/* Hover overlay with industrial styling */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-br from-cyan-900/0 via-[#050810]/0 to-violet-900/0 group-hover:from-cyan-900/40 group-hover:via-[#050810]/60 group-hover:to-violet-900/40 transition-all duration-500 flex items-center justify-center"
      >
        <motion.div 
          className="opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col items-center gap-4"
          initial={{ scale: 0.9 }}
          whileHover={{ scale: 1 }}
        >
          {/* Play button with industrial styling */}
          <motion.div 
            className="relative"
            whileHover={{ scale: 1.1 }}
            transition={{ type: 'spring', stiffness: 400, damping: 17 }}
          >
            {/* Outer glow ring */}
            <motion.div
              className="absolute inset-0 rounded-full bg-cyan-500/30"
              animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            
            {/* Main button */}
            <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-cyan-500/30 to-violet-500/30 backdrop-blur-md flex items-center justify-center border border-cyan-500/50">
              {/* Inner rotating ring */}
              <motion.div
                className="absolute inset-2 rounded-full border-2 border-cyan-400/50 border-t-cyan-400"
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
              />
              
              {/* Play icon */}
              <svg className="w-8 h-8 text-white ml-1 relative z-10" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z"/>
              </svg>
            </div>
          </motion.div>
          
          <div className="text-center">
            <motion.span 
              className="text-white font-semibold text-lg block"
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              Explore Dashboard
            </motion.span>
            <motion.span 
              className="text-cyan-400 text-sm"
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Interactive Industrial Monitoring
            </motion.span>
          </div>

          {/* Feature tags */}
          <motion.div 
            className="flex items-center gap-2 mt-2"
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <span className="px-3 py-1 text-xs bg-cyan-500/20 text-cyan-400 rounded-full border border-cyan-500/30">
              Real-time
            </span>
            <span className="px-3 py-1 text-xs bg-violet-500/20 text-violet-400 rounded-full border border-violet-500/30">
              ML Powered
            </span>
            <span className="px-3 py-1 text-xs bg-green-500/20 text-green-400 rounded-full border border-green-500/30">
              IoT Sensors
            </span>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Animated scan line effect */}
      <motion.div
        className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent pointer-events-none"
        animate={{ top: ['0%', '100%'] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
      />
    </motion.div>
  );
}
