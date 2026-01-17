'use client';

import { useState, useEffect, useCallback, useSyncExternalStore } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Maximize2, Minimize2, ExternalLink, RefreshCw, AlertCircle, Brain, Sparkles, WifiOff } from 'lucide-react';
import { NeuralNode } from '@/components/animations';

// Custom hook to safely check for client-side rendering
function useIsMounted() {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );
}

interface AllmaPreviewProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AllmaPreview({ isOpen, onClose }: AllmaPreviewProps) {
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
          {/* Backdrop with Neural Grid Pattern */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/90 backdrop-blur-md z-[9998]"
          >
            {/* Neural grid pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(139,92,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(139,92,246,0.03)_1px,transparent_1px)] bg-[size:40px_40px]" />
            
            {/* Floating neural nodes */}
            <div className="absolute top-20 left-20 opacity-30">
              <NeuralNode size={16} color="#8b5cf6" delay={0} />
            </div>
            <div className="absolute bottom-32 right-32 opacity-20">
              <NeuralNode size={12} color="#6366f1" delay={0.5} />
            </div>
          </motion.div>
          
          {/* Preview Window */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3 }}
            className={`fixed z-[9999] bg-gradient-to-br from-[#0a0a12] to-[#0c0c18] rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl border border-violet-500/30 ${
              isFullscreen 
                ? 'inset-2 sm:inset-4' 
                : 'inset-2 sm:top-1/2 sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 sm:w-[90vw] sm:max-w-5xl sm:h-[80vh]'
            }`}
            style={{
              boxShadow: '0 0 60px rgba(139, 92, 246, 0.15), 0 0 120px rgba(99, 102, 241, 0.1)',
            }}
          >
            {/* Corner accents - Violet/Indigo theme */}
            <div className="hidden sm:block absolute top-0 left-0 w-20 h-20 pointer-events-none">
              <div className="absolute top-2 left-2 w-8 h-0.5 bg-gradient-to-r from-violet-500 to-transparent" />
              <div className="absolute top-2 left-2 w-0.5 h-8 bg-gradient-to-b from-violet-500 to-transparent" />
            </div>
            <div className="hidden sm:block absolute top-0 right-0 w-20 h-20 pointer-events-none">
              <div className="absolute top-2 right-2 w-8 h-0.5 bg-gradient-to-l from-indigo-500 to-transparent" />
              <div className="absolute top-2 right-2 w-0.5 h-8 bg-gradient-to-b from-indigo-500 to-transparent" />
            </div>

            {/* Window Header - AI themed */}
            <div className="flex items-center justify-between px-3 sm:px-4 py-2 sm:py-3 bg-gradient-to-r from-[#0c0c18] via-[#12121f] to-[#0c0c18] border-b border-violet-900/40">
              <div className="flex items-center gap-2 sm:gap-3">
                {/* Traffic lights */}
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <button
                    onClick={onClose}
                    className="w-5 h-5 sm:w-3.5 sm:h-3.5 rounded-full bg-red-500 hover:bg-red-400 transition-colors group flex items-center justify-center"
                    aria-label="Close"
                  >
                    <X className="w-3 h-3 sm:w-2 sm:h-2 text-red-900 opacity-100 sm:opacity-0 sm:group-hover:opacity-100" />
                  </button>
                  <button 
                    className="w-5 h-5 sm:w-3.5 sm:h-3.5 rounded-full bg-yellow-500 hover:bg-yellow-400 transition-colors hidden sm:block"
                    aria-label="Minimize"
                  />
                  <button
                    onClick={() => setIsFullscreen(!isFullscreen)}
                    className="w-5 h-5 sm:w-3.5 sm:h-3.5 rounded-full bg-green-500 hover:bg-green-400 transition-colors group flex items-center justify-center"
                    aria-label="Fullscreen"
                  >
                    {isFullscreen ? (
                      <Minimize2 className="w-3 h-3 sm:w-2 sm:h-2 text-green-900 opacity-100 sm:opacity-0 sm:group-hover:opacity-100" />
                    ) : (
                      <Maximize2 className="w-3 h-3 sm:w-2 sm:h-2 text-green-900 opacity-100 sm:opacity-0 sm:group-hover:opacity-100" />
                    )}
                  </button>
                </div>
                
                {/* AI Indicator - hidden on mobile */}
                <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-lg bg-violet-500/10 border border-violet-500/20">
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Brain className="w-4 h-4 text-violet-400" />
                  </motion.div>
                  <span className="text-xs text-violet-400 font-medium">Local AI</span>
                </div>
              </div>
              
              {/* URL Bar */}
              <div className="flex-1 mx-2 sm:mx-4">
                <div className="flex items-center gap-1.5 sm:gap-2 px-2 sm:px-4 py-1.5 sm:py-2 bg-[#08080c]/80 rounded-lg sm:rounded-xl border border-violet-900/40 max-w-lg mx-auto">
                  <div className={`w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full flex-shrink-0 ${hasError ? 'bg-red-500' : 'bg-violet-500 animate-pulse'}`} />
                  <span className="text-[10px] sm:text-xs text-neutral-300 truncate font-mono">
                    allma-studio.vercel.app
                  </span>
                  <WifiOff className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-emerald-500 ml-auto hidden xs:block" />
                </div>
              </div>
              
              {/* Actions */}
              <div className="flex items-center gap-1 sm:gap-2">
                <button
                  onClick={handleRefresh}
                  className="p-1.5 sm:p-2 text-neutral-400 hover:text-violet-400 transition-colors rounded-lg hover:bg-violet-500/10"
                  aria-label="Refresh"
                >
                  <RefreshCw className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${isLoading ? 'animate-spin' : ''}`} />
                </button>
                <a
                  href="https://allma-studio.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 sm:p-2 text-neutral-400 hover:text-violet-400 transition-colors rounded-lg hover:bg-violet-500/10"
                  aria-label="Open in new tab"
                >
                  <ExternalLink className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </a>
              </div>
            </div>
            
            {/* Content Area */}
            <div className="relative w-full h-[calc(100%-44px)] sm:h-[calc(100%-52px)] bg-[#050508]">
              {/* Loading State */}
              {isLoading && !hasError && (
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#050508] via-[#08080c] to-[#050508] z-10">
                  <div className="absolute inset-0 bg-[linear-gradient(rgba(139,92,246,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(139,92,246,0.02)_1px,transparent_1px)] bg-[size:30px_30px]" />
                  
                  <div className="flex flex-col items-center gap-6 relative z-10">
                    {/* Neural loading animation */}
                    <div className="relative">
                      <div className="w-16 h-16 border-2 border-violet-500 border-t-transparent rounded-full animate-spin" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Brain className="w-6 h-6 text-violet-400" />
                      </div>
                    </div>
                    <div className="text-center">
                      <p className="text-violet-400 text-sm font-medium mb-1">
                        Initializing Allma Studio...
                      </p>
                      <p className="text-neutral-500 text-xs">
                        Loading local AI interface
                      </p>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Error State */}
              {hasError && (
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#050508] via-[#08080c] to-[#050508] z-10">
                  <div className="flex flex-col items-center gap-6 text-center px-8">
                    <AlertCircle className="w-16 h-16 text-amber-500" />
                    <div>
                      <p className="text-white font-medium mb-2 text-lg">Connection Error</p>
                      <p className="text-neutral-400 text-sm mb-4 max-w-md">
                        Unable to connect to Allma Studio. The demo requires the backend to be running.
                      </p>
                    </div>
                    <div className="flex gap-3">
                      <button
                        onClick={handleRefresh}
                        className="px-5 py-2.5 bg-[#1a1a2e] text-white rounded-xl hover:bg-[#2a2a4a] transition-colors text-sm font-medium flex items-center gap-2 border border-violet-900/30"
                      >
                        <RefreshCw className="w-4 h-4" />
                        Reconnect
                      </button>
                      <a
                        href="https://allma-studio.vercel.app/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-5 py-2.5 bg-gradient-to-r from-violet-600 to-indigo-600 text-white rounded-xl hover:from-violet-500 hover:to-indigo-500 transition-all text-sm font-medium flex items-center gap-2"
                      >
                        Open Platform <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Iframe */}
              <iframe
                key={iframeKey}
                src="https://allma-studio.vercel.app/"
                className="w-full h-full border-0"
                onLoad={handleIframeLoad}
                allow="clipboard-read; clipboard-write"
                sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox"
                title="Allma Studio Preview"
              />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
  
  return createPortal(modalContent, document.body);
}

// Allma Screenshot Component with AI-themed hover effect
export function AllmaScreenshot({ onClick }: { onClick: () => void }) {
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
        <img
          src="/images/projects/allma_homepage.png"
          alt="Allma Studio AI Chat Platform Preview"
          className={`w-full h-full object-cover object-top transition-all duration-700 ${
            imageLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
          }`}
          onLoad={() => setImageLoaded(true)}
        />
        
        {/* Loading fallback with AI theme */}
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gradient-to-br from-[#050508] via-[#08080c] to-[#050508]">
            <div className="absolute inset-0 bg-[linear-gradient(rgba(139,92,246,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(139,92,246,0.02)_1px,transparent_1px)] bg-[size:30px_30px]" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-8 h-8 border-2 border-violet-500 border-t-transparent rounded-full animate-spin" />
            </div>
          </div>
        )}
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#050508]/90 via-[#050508]/20 to-transparent pointer-events-none" />

      {/* Bottom Info Bar - Mobile optimized */}
      <div className="absolute bottom-0 left-0 right-0 p-2 sm:p-4 bg-gradient-to-t from-[#050508] via-[#050508]/95 to-transparent">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 sm:gap-4 flex-wrap">
            <div className="flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1 sm:py-1.5 rounded-md sm:rounded-lg bg-violet-500/10 border border-violet-500/30">
              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-violet-500 animate-pulse" />
              <span className="text-[10px] sm:text-xs text-violet-400 font-medium">Local AI</span>
            </div>
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-indigo-500/10 border border-indigo-500/30">
              <span className="text-xs text-indigo-400 font-medium">RAG Enabled</span>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-6">
            <div className="flex items-center gap-2">
              <span className="text-sm text-white font-bold">100%</span>
              <span className="text-xs text-neutral-500">Private</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-white font-bold">5+</span>
              <span className="text-xs text-neutral-500">Models</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-white font-bold">$0</span>
              <span className="text-xs text-neutral-500">Cost</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Hover overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-violet-900/0 via-[#050508]/0 to-indigo-900/0 group-hover:from-violet-900/40 group-hover:via-[#050508]/60 group-hover:to-indigo-900/40 transition-all duration-500 flex items-center justify-center active:from-violet-900/40 active:via-[#050508]/60 active:to-indigo-900/40">
        <div className="opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-all duration-300 flex flex-col items-center gap-2 sm:gap-4 px-4">
          {/* Play button */}
          <div className="relative w-14 h-14 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-violet-500/30 to-indigo-500/30 backdrop-blur-md flex items-center justify-center border border-violet-500/50 active:scale-95 sm:hover:scale-110 transition-transform">
            <svg className="w-6 h-6 sm:w-8 sm:h-8 text-white ml-0.5 sm:ml-1" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z"/>
            </svg>
          </div>
          
          <div className="text-center">
            <span className="text-white font-semibold text-base sm:text-lg block">Try Allma Studio</span>
            <span className="text-violet-400 text-xs sm:text-sm">Privacy-First AI Chat</span>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2 mt-1 sm:mt-2 flex-wrap justify-center">
            <span className="px-2 sm:px-3 py-0.5 sm:py-1 text-[10px] sm:text-xs bg-violet-500/20 text-violet-400 rounded-full border border-violet-500/30">
              Local LLM
            </span>
            <span className="px-2 sm:px-3 py-0.5 sm:py-1 text-[10px] sm:text-xs bg-indigo-500/20 text-indigo-400 rounded-full border border-indigo-500/30">
              RAG
            </span>
            <span className="hidden xs:inline px-2 sm:px-3 py-0.5 sm:py-1 text-[10px] sm:text-xs bg-cyan-500/20 text-cyan-400 rounded-full border border-cyan-500/30">
              Offline
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
