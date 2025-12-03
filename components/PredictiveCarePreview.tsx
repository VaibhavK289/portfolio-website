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
  Shield
} from 'lucide-react';
import {
  RotatingGear,
  StatusIndicator,
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
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/90 backdrop-blur-md z-[9998]"
          >
            <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.03)_1px,transparent_1px)] bg-[size:40px_40px]" />
          </motion.div>
          
          {/* Window */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3 }}
            className={`fixed z-[9999] bg-gradient-to-br from-[#0a0f1a] to-[#0d1425] rounded-2xl overflow-hidden shadow-2xl border border-cyan-500/30 ${
              isFullscreen 
                ? 'inset-4' 
                : 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-5xl h-[80vh]'
            }`}
            style={{
              boxShadow: '0 0 60px rgba(6, 182, 212, 0.15), 0 0 120px rgba(139, 92, 246, 0.1)',
            }}
          >
            {/* Corner accents */}
            <div className="absolute top-0 left-0 w-20 h-20 pointer-events-none">
              <div className="absolute top-2 left-2 w-8 h-0.5 bg-gradient-to-r from-cyan-500 to-transparent" />
              <div className="absolute top-2 left-2 w-0.5 h-8 bg-gradient-to-b from-cyan-500 to-transparent" />
            </div>
            <div className="absolute top-0 right-0 w-20 h-20 pointer-events-none">
              <div className="absolute top-2 right-2 w-8 h-0.5 bg-gradient-to-l from-violet-500 to-transparent" />
              <div className="absolute top-2 right-2 w-0.5 h-8 bg-gradient-to-b from-violet-500 to-transparent" />
            </div>

            {/* Window Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-[#0c1628] via-[#101d35] to-[#0c1628] border-b border-cyan-900/40">
              <div className="flex items-center gap-3">
                {/* Traffic lights */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={onClose}
                    className="w-3.5 h-3.5 rounded-full bg-red-500 hover:bg-red-400 transition-colors group flex items-center justify-center"
                    aria-label="Close"
                  >
                    <X className="w-2 h-2 text-red-900 opacity-0 group-hover:opacity-100" />
                  </button>
                  <button 
                    className="w-3.5 h-3.5 rounded-full bg-yellow-500 hover:bg-yellow-400 transition-colors"
                    aria-label="Minimize"
                  />
                  <button
                    onClick={() => setIsFullscreen(!isFullscreen)}
                    className="w-3.5 h-3.5 rounded-full bg-green-500 hover:bg-green-400 transition-colors group flex items-center justify-center"
                    aria-label="Fullscreen"
                  >
                    {isFullscreen ? (
                      <Minimize2 className="w-2 h-2 text-green-900 opacity-0 group-hover:opacity-100" />
                    ) : (
                      <Maximize2 className="w-2 h-2 text-green-900 opacity-0 group-hover:opacity-100" />
                    )}
                  </button>
                </div>
                
                {/* Gear indicator */}
                <div className="hidden sm:block">
                  <RotatingGear size={24} speed={8} color="#06b6d4" teeth={8} />
                </div>
              </div>
              
              {/* URL Bar */}
              <div className="flex-1 mx-4">
                <div className="flex items-center gap-2 px-4 py-2 bg-[#0a0f1a]/80 rounded-xl border border-cyan-900/40 max-w-lg mx-auto">
                  <StatusIndicator status={hasError ? 'critical' : 'operational'} size={10} />
                  <span className="text-xs text-neutral-300 truncate font-mono">
                    predictivecare-ai.vercel.app
                  </span>
                  <Shield className="w-3 h-3 text-green-500 ml-auto" />
                </div>
              </div>
              
              {/* Actions */}
              <div className="flex items-center gap-2">
                <button
                  onClick={handleRefresh}
                  className="p-2 text-neutral-400 hover:text-cyan-400 transition-colors rounded-lg hover:bg-cyan-500/10"
                  aria-label="Refresh"
                >
                  <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
                </button>
                <a
                  href="https://predictivecare-ai.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-neutral-400 hover:text-cyan-400 transition-colors rounded-lg hover:bg-cyan-500/10"
                  aria-label="Open in new tab"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
            
            {/* Content */}
            <div className="relative w-full h-[calc(100%-52px)] bg-[#050810]">
              {/* Loading State */}
              {isLoading && !hasError && (
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#050810] via-[#0a0f1a] to-[#050810] z-10">
                  <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.02)_1px,transparent_1px)] bg-[size:30px_30px]" />
                  
                  <div className="flex flex-col items-center gap-6 relative z-10">
                    <div className="w-12 h-12 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin" />
                    <p className="text-cyan-400 text-sm font-medium">
                      Initializing Dashboard...
                    </p>
                  </div>
                </div>
              )}
              
              {/* Error State */}
              {hasError && (
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#050810] via-[#0a0f1a] to-[#050810] z-10">
                  <div className="flex flex-col items-center gap-6 text-center px-8">
                    <AlertCircle className="w-16 h-16 text-amber-500" />
                    <div>
                      <p className="text-white font-medium mb-2 text-lg">Connection Error</p>
                      <p className="text-neutral-400 text-sm mb-4 max-w-md">
                        Unable to connect to the monitoring system.
                      </p>
                    </div>
                    <div className="flex gap-3">
                      <button
                        onClick={handleRefresh}
                        className="px-5 py-2.5 bg-[#1a2438] text-white rounded-xl hover:bg-[#2d3f5f] transition-colors text-sm font-medium flex items-center gap-2 border border-cyan-900/30"
                      >
                        <RefreshCw className="w-4 h-4" />
                        Reconnect
                      </button>
                      <a
                        href="https://predictivecare-ai.vercel.app/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-5 py-2.5 bg-gradient-to-r from-cyan-600 to-cyan-500 text-white rounded-xl hover:from-cyan-500 hover:to-cyan-400 transition-all text-sm font-medium flex items-center gap-2"
                      >
                        Open Dashboard <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </div>
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

// Screenshot Component
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
      {/* Background Image */}
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
        
        {/* Loading fallback */}
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gradient-to-br from-[#050810] via-[#0a1628] to-[#0d1425]">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-8 h-8 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin" />
            </div>
          </div>
        )}
      </div>

      {/* Corner gear decoration */}
      <div className="absolute -top-4 -left-4 opacity-30 pointer-events-none">
        <RotatingGear size={80} speed={60} color="#06b6d4" teeth={12} />
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#050810]/90 via-[#050810]/20 to-transparent pointer-events-none" />

      {/* Bottom Info Bar */}
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-[#050810] via-[#050810]/95 to-transparent">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-green-500/10 border border-green-500/30">
              <StatusIndicator status="operational" size={8} />
              <span className="text-xs text-green-400 font-medium">All Systems Operational</span>
            </div>
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-cyan-500/10 border border-cyan-500/30">
              <Cog className="w-3 h-3 text-cyan-400" />
              <span className="text-xs text-cyan-400 font-medium">ML Model Active</span>
            </div>
          </div>

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
      </div>
      
      {/* Hover overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/0 via-[#050810]/0 to-violet-900/0 group-hover:from-cyan-900/40 group-hover:via-[#050810]/60 group-hover:to-violet-900/40 transition-all duration-500 flex items-center justify-center">
        <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col items-center gap-4">
          {/* Play button */}
          <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-cyan-500/30 to-violet-500/30 backdrop-blur-md flex items-center justify-center border border-cyan-500/50 hover:scale-110 transition-transform">
            <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z"/>
            </svg>
          </div>
          
          <div className="text-center">
            <span className="text-white font-semibold text-lg block">Explore Dashboard</span>
            <span className="text-cyan-400 text-sm">Interactive Industrial Monitoring</span>
          </div>

          <div className="flex items-center gap-2 mt-2">
            <span className="px-3 py-1 text-xs bg-cyan-500/20 text-cyan-400 rounded-full border border-cyan-500/30">
              Real-time
            </span>
            <span className="px-3 py-1 text-xs bg-violet-500/20 text-violet-400 rounded-full border border-violet-500/30">
              ML Powered
            </span>
            <span className="px-3 py-1 text-xs bg-green-500/20 text-green-400 rounded-full border border-green-500/30">
              IoT Sensors
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
