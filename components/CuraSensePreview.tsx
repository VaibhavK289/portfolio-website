'use client';

import { useState, useEffect, useCallback, useSyncExternalStore } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Maximize2, Minimize2, ExternalLink, RefreshCw, AlertCircle } from 'lucide-react';

// Custom hook to safely check for client-side rendering
function useIsMounted() {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );
}

interface CuraSensePreviewProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CuraSensePreview({ isOpen, onClose }: CuraSensePreviewProps) {
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
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[9998]"
          />
          
          {/* Window */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className={`fixed z-[9999] bg-neutral-900 rounded-xl overflow-hidden shadow-2xl border border-neutral-700 ${
              isFullscreen 
                ? 'inset-4' 
                : 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-5xl h-[80vh]'
            }`}
          >
            {/* Window Header - macOS style */}
            <div className="flex items-center justify-between px-4 py-3 bg-neutral-800 border-b border-neutral-700">
              <div className="flex items-center gap-2">
                {/* Traffic lights */}
                <button
                  onClick={onClose}
                  className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-400 transition-colors group flex items-center justify-center"
                  aria-label="Close"
                >
                  <X className="w-2 h-2 text-red-900 opacity-0 group-hover:opacity-100" />
                </button>
                <button 
                  className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-400 transition-colors"
                  aria-label="Minimize"
                />
                <button
                  onClick={() => setIsFullscreen(!isFullscreen)}
                  className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-400 transition-colors group flex items-center justify-center"
                  aria-label="Fullscreen"
                >
                  {isFullscreen ? (
                    <Minimize2 className="w-2 h-2 text-green-900 opacity-0 group-hover:opacity-100" />
                  ) : (
                    <Maximize2 className="w-2 h-2 text-green-900 opacity-0 group-hover:opacity-100" />
                  )}
                </button>
              </div>
              
              {/* URL Bar */}
              <div className="flex-1 mx-4">
                <div className="flex items-center gap-2 px-3 py-1.5 bg-neutral-900/50 rounded-lg border border-neutral-700 max-w-md mx-auto">
                  <div className={`w-3 h-3 rounded-full flex-shrink-0 ${hasError ? 'bg-red-500' : 'bg-emerald-500'}`} />
                  <span className="text-xs text-neutral-400 truncate">curasense-frontend.vercel.app</span>
                </div>
              </div>
              
              {/* Actions */}
              <div className="flex items-center gap-2">
                <button
                  onClick={handleRefresh}
                  className="p-1.5 text-neutral-400 hover:text-white transition-colors"
                  aria-label="Refresh"
                >
                  <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
                </button>
                <a
                  href="https://curasense-frontend.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 text-neutral-400 hover:text-white transition-colors"
                  aria-label="Open in new tab"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
            
            {/* Content */}
            <div className="relative w-full h-[calc(100%-48px)] bg-[#0a0e17]">
              {/* Loading State */}
              {isLoading && !hasError && (
                <div className="absolute inset-0 flex items-center justify-center bg-[#0c1628] z-10">
                  <div className="flex flex-col items-center gap-4">
                    <div className="relative">
                      <div className="w-12 h-12 border-4 border-emerald-500/20 rounded-full" />
                      <div className="absolute inset-0 w-12 h-12 border-4 border-transparent border-t-emerald-500 rounded-full animate-spin" />
                    </div>
                    <p className="text-neutral-400 text-sm">Loading CuraSense...</p>
                  </div>
                </div>
              )}
              
              {/* Error State */}
              {hasError && (
                <div className="absolute inset-0 flex items-center justify-center bg-[#0c1628] z-10">
                  <div className="flex flex-col items-center gap-4 text-center px-8">
                    <AlertCircle className="w-12 h-12 text-amber-500" />
                    <div>
                      <p className="text-white font-medium mb-2">Unable to load preview</p>
                      <p className="text-neutral-400 text-sm mb-4">
                        The site may have restrictions on embedding. You can still view it directly.
                      </p>
                    </div>
                    <div className="flex gap-3">
                      <button
                        onClick={handleRefresh}
                        className="px-4 py-2 bg-[#1a2438] text-white rounded-lg hover:bg-[#2d3f5f] transition-colors text-sm"
                      >
                        Try Again
                      </button>
                      <a
                        href="https://curasense-frontend.vercel.app/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-500 transition-colors text-sm flex items-center gap-2"
                      >
                        Open Site <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Iframe */}
              <iframe
                key={iframeKey}
                src="https://curasense-frontend.vercel.app/"
                className="w-full h-full border-0"
                onLoad={handleIframeLoad}
                allow="clipboard-read; clipboard-write"
                sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox"
                title="CuraSense Preview"
              />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
  
  return createPortal(modalContent, document.body);
}

// CuraSense Screenshot Component using JPEG image
export function CuraSenseScreenshot({ onClick }: { onClick: () => void }) {
  return (
    <div 
      className="relative w-full h-full cursor-pointer group"
      onClick={onClick}
    >
      {/* CuraSense Hero Image */}
      <img
        src="/images/projects/curasense-hero.jpeg"
        alt="CuraSense AI Healthcare Platform Preview"
        className="w-full h-full object-cover object-top"
      />
      
      {/* Hover overlay */}
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center gap-3">
          <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/20">
            <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z"/>
            </svg>
          </div>
          <span className="text-white font-medium text-sm">Click to try CuraSense</span>
        </div>
      </div>
    </div>
  );
}
