'use client';

import { useState, useEffect, useCallback, useSyncExternalStore } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Maximize2, Minimize2, ExternalLink, RefreshCw, AlertCircle, Cloud, Thermometer, Download } from 'lucide-react';
import { CloudFloat } from '@/components/animations';

// Custom hook to safely check for client-side rendering
function useIsMounted() {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );
}

interface AeriaWeatherPreviewProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AeriaWeatherPreview({ isOpen, onClose }: AeriaWeatherPreviewProps) {
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
          {/* Backdrop with atmospheric pattern */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-white/80 dark:bg-black/90 backdrop-blur-md z-[9998]"
          >
            {/* Cloud pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(56,189,248,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(56,189,248,0.1)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(56,189,248,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(56,189,248,0.03)_1px,transparent_1px)] bg-[size:40px_40px]" />
            
            {/* Floating clouds */}
            <div className="absolute top-20 left-20 opacity-20">
              <CloudFloat size={120} opacity={0.3} delay={0} className="text-sky-800 dark:text-white" />
            </div>
            <div className="absolute bottom-32 right-32 opacity-15">
              <CloudFloat size={90} opacity={0.2} delay={1} className="text-sky-800 dark:text-white" />
            </div>
          </motion.div>
          
          {/* Preview Window */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3 }}
            className={`fixed z-[9999] bg-gradient-to-br from-white to-sky-50 dark:from-[#0a1520] dark:to-[#0c1a28] rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl border border-sky-200 dark:border-sky-500/30 ${
              isFullscreen 
                ? 'inset-2 sm:inset-4' 
                : 'inset-2 sm:top-1/2 sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 sm:w-[90vw] sm:max-w-5xl sm:h-[80vh]'
            }`}
            style={{
              boxShadow: '0 0 60px rgba(56, 189, 248, 0.15), 0 0 120px rgba(14, 165, 233, 0.1)',
            }}
          >
            {/* Corner accents - Sky blue theme */}
            <div className="hidden sm:block absolute top-0 left-0 w-20 h-20 pointer-events-none z-10">
              <div className="absolute top-2 left-2 w-8 h-0.5 bg-gradient-to-r from-sky-400 dark:from-sky-500 to-transparent" />
              <div className="absolute top-2 left-2 w-0.5 h-8 bg-gradient-to-b from-sky-400 dark:from-sky-500 to-transparent" />
            </div>
            <div className="hidden sm:block absolute top-0 right-0 w-20 h-20 pointer-events-none z-10">
              <div className="absolute top-2 right-2 w-8 h-0.5 bg-gradient-to-l from-amber-400 dark:from-amber-500 to-transparent" />
              <div className="absolute top-2 right-2 w-0.5 h-8 bg-gradient-to-b from-amber-400 dark:from-amber-500 to-transparent" />
            </div>

            {/* Window Header - Weather themed */}
            <div className="flex items-center justify-between px-3 sm:px-4 py-2 sm:py-3 bg-gradient-to-r from-gray-100 via-white to-gray-100 dark:from-[#0c1a28] dark:via-[#111e2e] dark:to-[#0c1a28] border-b border-gray-200 dark:border-sky-900/40 relative z-20">
              <div className="flex items-center gap-2 sm:gap-3">
                {/* Traffic lights */}
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <button
                    onClick={onClose}
                    className="w-5 h-5 sm:w-3.5 sm:h-3.5 rounded-full bg-red-400 dark:bg-red-500 hover:bg-red-500 dark:hover:bg-red-400 transition-colors group flex items-center justify-center"
                    aria-label="Close"
                  >
                    <X className="w-3 h-3 sm:w-2 sm:h-2 text-red-900 opacity-100 sm:opacity-0 sm:group-hover:opacity-100" />
                  </button>
                  <button 
                    className="w-5 h-5 sm:w-3.5 sm:h-3.5 rounded-full bg-yellow-400 dark:bg-yellow-500 hover:bg-yellow-500 dark:hover:bg-yellow-400 transition-colors hidden sm:block"
                    aria-label="Minimize"
                  />
                  <button
                    onClick={() => setIsFullscreen(!isFullscreen)}
                    className="w-5 h-5 sm:w-3.5 sm:h-3.5 rounded-full bg-green-400 dark:bg-green-500 hover:bg-green-500 dark:hover:bg-green-400 transition-colors group flex items-center justify-center"
                    aria-label="Fullscreen"
                  >
                    {isFullscreen ? (
                      <Minimize2 className="w-3 h-3 sm:w-2 sm:h-2 text-green-900 opacity-100 sm:opacity-0 sm:group-hover:opacity-100" />
                    ) : (
                      <Maximize2 className="w-3 h-3 sm:w-2 sm:h-2 text-green-900 opacity-100 sm:opacity-0 sm:group-hover:opacity-100" />
                    )}
                  </button>
                </div>
                
                {/* Weather Indicator - hidden on mobile */}
                <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-lg bg-sky-100 dark:bg-sky-500/10 border border-sky-200 dark:border-sky-500/20">
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Cloud className="w-4 h-4 text-sky-500 dark:text-sky-400" />
                  </motion.div>
                  <span className="text-xs text-sky-600 dark:text-sky-400 font-medium">Live Weather</span>
                </div>
              </div>
              
              {/* URL Bar */}
              <div className="flex-1 mx-2 sm:mx-4">
                <div className="flex items-center gap-1.5 sm:gap-2 px-2 sm:px-4 py-1.5 sm:py-2 bg-gray-50 dark:bg-[#08101c]/80 rounded-lg sm:rounded-xl border border-gray-200 dark:border-sky-900/40 max-w-lg mx-auto">
                  <div className={`w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full flex-shrink-0 ${hasError ? 'bg-red-500' : 'bg-sky-500 animate-pulse'}`} />
                  <span className="text-[10px] sm:text-xs text-gray-700 dark:text-neutral-300 truncate font-mono">
                    aeria-weather.vercel.app
                  </span>
                  <Thermometer className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-amber-500 ml-auto hidden xs:block" />
                </div>
              </div>
              
              {/* Actions */}
              <div className="flex items-center gap-1 sm:gap-2">
                <button
                  onClick={handleRefresh}
                  className="p-1.5 sm:p-2 text-gray-500 dark:text-neutral-400 hover:text-sky-500 dark:hover:text-sky-400 transition-colors rounded-lg hover:bg-sky-50 dark:hover:bg-sky-500/10"
                  aria-label="Refresh"
                >
                  <RefreshCw className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${isLoading ? 'animate-spin' : ''}`} />
                </button>
                <a
                  href="https://aeria-weather.vercel.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 sm:p-2 text-gray-500 dark:text-neutral-400 hover:text-sky-500 dark:hover:text-sky-400 transition-colors rounded-lg hover:bg-sky-50 dark:hover:bg-sky-500/10"
                  aria-label="Open in new tab"
                >
                  <ExternalLink className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </a>
              </div>
            </div>
            
            {/* Content Area */}
            <div className="relative w-full h-[calc(100%-44px)] sm:h-[calc(100%-52px)] bg-white dark:bg-[#050a14]">
              {/* Loading State */}
              {isLoading && !hasError && (
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-white via-sky-50 to-white dark:from-[#050a14] dark:via-[#081018] dark:to-[#050a14] z-10">
                  <div className="absolute inset-0 bg-[linear-gradient(rgba(56,189,248,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(56,189,248,0.05)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(56,189,248,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(56,189,248,0.02)_1px,transparent_1px)] bg-[size:30px_30px]" />
                  
                  <div className="flex flex-col items-center gap-6 relative z-10">
                    {/* Loading animation */}
                    <div className="relative">
                      <div className="w-16 h-16 border-2 border-sky-500 border-t-transparent rounded-full animate-spin" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Cloud className="w-6 h-6 text-sky-500 dark:text-sky-400" />
                      </div>
                    </div>
                    <div className="text-center">
                      <p className="text-sky-600 dark:text-sky-400 text-sm font-medium mb-1">
                        Syncing live atmosphere data...
                      </p>
                      <p className="text-gray-500 dark:text-neutral-500 text-xs">
                        Connecting to Rust backend
                      </p>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Error State */}
              {hasError && (
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-white via-sky-50 to-white dark:from-[#050a14] dark:via-[#081018] dark:to-[#050a14] z-10">
                  <div className="flex flex-col items-center gap-6 text-center px-8">
                    <AlertCircle className="w-16 h-16 text-amber-500" />
                    <div>
                      <p className="text-gray-900 dark:text-white font-medium mb-2 text-lg">Connection Error</p>
                      <p className="text-gray-600 dark:text-neutral-400 text-sm mb-4 max-w-md">
                        Unable to connect to Aeria Weather. The Render backend may be cold-starting (30-60s).
                      </p>
                    </div>
                    <div className="flex gap-3">
                      <button
                        onClick={handleRefresh}
                        className="px-5 py-2.5 bg-gray-100 dark:bg-[#1a2438] text-gray-900 dark:text-white rounded-xl hover:bg-gray-200 dark:hover:bg-[#2a3a58] transition-colors text-sm font-medium flex items-center gap-2 border border-gray-200 dark:border-sky-900/30"
                      >
                        <RefreshCw className="w-4 h-4" />
                        Reconnect
                      </button>
                      <a
                        href="https://aeria-weather.vercel.app"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-5 py-2.5 bg-gradient-to-r from-sky-500 to-cyan-500 dark:from-sky-600 dark:to-cyan-600 text-white rounded-xl hover:from-sky-600 hover:to-cyan-600 dark:hover:from-sky-500 dark:hover:to-cyan-500 transition-all text-sm font-medium flex items-center gap-2"
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
                src="https://aeria-weather.vercel.app"
                className="w-full h-full border-0 bg-transparent"
                onLoad={handleIframeLoad}
                allow="clipboard-read; clipboard-write"
                sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox"
                title="Aeria Weather Studio Preview"
              />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
  
  return createPortal(modalContent, document.body);
}

// Aeria Weather Screenshot Component with atmospheric hover effect
export function AeriaWeatherScreenshot({ onClick }: { onClick: () => void }) {
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
      <div className="absolute inset-0 bg-white dark:bg-[#050a14]">
        <img
          src="/images/projects/aeria-weather-dashboard.png"
          alt="Aeria Weather Studio Dashboard Preview"
          className={`w-full h-full object-cover object-top transition-all duration-700 ${
            imageLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
          }`}
          onLoad={() => setImageLoaded(true)}
        />
        
        {/* Loading fallback with weather theme */}
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gradient-to-br from-white via-sky-50 to-white dark:from-[#050a14] dark:via-[#081018] dark:to-[#050a14]">
            <div className="absolute inset-0 bg-[linear-gradient(rgba(56,189,248,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(56,189,248,0.05)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(56,189,248,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(56,189,248,0.02)_1px,transparent_1px)] bg-[size:30px_30px]" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-8 h-8 border-2 border-sky-500 border-t-transparent rounded-full animate-spin" />
            </div>
          </div>
        )}
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/10 to-transparent dark:from-[#050a14]/90 dark:via-[#050a14]/20 dark:to-transparent pointer-events-none" />

      {/* Bottom Info Bar - Mobile optimized */}
      <div className="absolute bottom-0 left-0 right-0 p-2 sm:p-4 bg-gradient-to-t from-gray-900 via-gray-900/90 to-transparent dark:from-[#050a14] dark:via-[#050a14]/95 dark:to-transparent">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 sm:gap-4 flex-wrap">
            <div className="flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1 sm:py-1.5 rounded-md sm:rounded-lg bg-sky-500/20 border border-sky-400/50 dark:bg-sky-500/10 dark:border-sky-500/30">
              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-sky-400 dark:bg-sky-500 animate-pulse" />
              <span className="text-[10px] sm:text-xs text-sky-200 dark:text-sky-400 font-medium">Live Data</span>
            </div>
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-amber-500/20 border border-amber-400/50 dark:bg-amber-500/10 dark:border-amber-500/30">
              <span className="text-xs text-amber-200 dark:text-amber-400 font-medium">Rust Backend</span>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-6">
            <div className="flex items-center gap-2">
              <span className="text-sm text-white font-bold">Global</span>
              <span className="text-xs text-gray-300 dark:text-neutral-500">Coverage</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-white font-bold">7-Day</span>
              <span className="text-xs text-gray-300 dark:text-neutral-500">Forecast</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-white font-bold">AQI</span>
              <span className="text-xs text-gray-300 dark:text-neutral-500">Monitor</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Hover overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-sky-900/0 via-[#050a14]/0 to-amber-900/0 group-hover:from-sky-900/60 group-hover:via-gray-900/70 group-hover:to-amber-900/60 dark:group-hover:from-sky-900/40 dark:group-hover:via-[#050a14]/60 dark:group-hover:to-amber-900/40 transition-all duration-500 flex items-center justify-center active:from-sky-900/60 active:via-gray-900/70 active:to-amber-900/60 dark:active:from-sky-900/40 dark:active:via-[#050a14]/60 dark:active:to-amber-900/40">
        <div className="opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-all duration-300 flex flex-col items-center gap-2 sm:gap-4 px-4">
          {/* Play button */}
          <div className="relative w-14 h-14 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-sky-500/50 to-cyan-500/50 dark:from-sky-500/30 dark:to-cyan-500/30 backdrop-blur-md flex items-center justify-center border border-white/40 dark:border-sky-500/50 active:scale-95 sm:hover:scale-110 transition-transform shadow-xl shadow-sky-900/50">
            <svg className="w-6 h-6 sm:w-8 sm:h-8 text-white ml-0.5 sm:ml-1" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z"/>
            </svg>
          </div>
          
          <div className="text-center drop-shadow-md">
            <span className="text-white font-semibold text-base sm:text-lg block">Explore Aeria Weather</span>
            <span className="text-sky-200 dark:text-sky-400 text-xs sm:text-sm">Full-Stack Rust Dashboard</span>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2 mt-1 sm:mt-2 flex-wrap justify-center drop-shadow-sm">
            <span className="px-2 sm:px-3 py-0.5 sm:py-1 text-[10px] sm:text-xs bg-sky-500/30 text-white dark:bg-sky-500/20 dark:text-sky-400 rounded-full border border-white/30 dark:border-sky-500/30">
              Rust
            </span>
            <span className="px-2 sm:px-3 py-0.5 sm:py-1 text-[10px] sm:text-xs bg-amber-500/30 text-white dark:bg-amber-500/20 dark:text-amber-400 rounded-full border border-white/30 dark:border-amber-500/30">
              Tauri
            </span>
            <span className="hidden xs:inline px-2 sm:px-3 py-0.5 sm:py-1 text-[10px] sm:text-xs bg-cyan-500/30 text-white dark:bg-cyan-500/20 dark:text-cyan-400 rounded-full border border-white/30 dark:border-cyan-500/30">
              Desktop
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
