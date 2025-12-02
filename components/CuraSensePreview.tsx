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

// CuraSense Screenshot SVG Component
export function CuraSenseScreenshot({ onClick }: { onClick: () => void }) {
  return (
    <div 
      className="relative w-full h-full cursor-pointer group"
      onClick={onClick}
    >
      {/* SVG Recreation of CuraSense UI */}
      <svg
        viewBox="0 0 1200 700"
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Background */}
        <defs>
          <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0f172a" />
            <stop offset="50%" stopColor="#1e293b" />
            <stop offset="100%" stopColor="#0f172a" />
          </linearGradient>
          <linearGradient id="accentGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#10b981" />
            <stop offset="100%" stopColor="#3b82f6" />
          </linearGradient>
          <linearGradient id="purpleGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#8b5cf6" />
            <stop offset="100%" stopColor="#a855f7" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
          {/* Grid pattern */}
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="1"/>
          </pattern>
        </defs>
        
        {/* Main background */}
        <rect width="1200" height="700" fill="url(#bgGradient)" />
        <rect width="1200" height="700" fill="url(#grid)" />
        
        {/* Left Sidebar */}
        <rect x="0" y="0" width="60" height="700" fill="#0f172a" />
        <rect x="59" y="0" width="1" height="700" fill="#1e293b" />
        
        {/* Sidebar icons */}
        <g fill="#10b981">
          <rect x="15" y="15" width="30" height="30" rx="8" fill="#10b981" opacity="0.2" />
          <circle cx="30" cy="30" r="8" fill="#10b981" />
        </g>
        
        {/* Navigation icons */}
        <g fill="#64748b">
          <circle cx="30" cy="90" r="10" opacity="0.3" />
          <circle cx="30" cy="140" r="10" opacity="0.3" />
          <circle cx="30" cy="190" r="10" opacity="0.3" />
          <circle cx="30" cy="240" r="10" opacity="0.3" />
          <circle cx="30" cy="290" r="10" opacity="0.3" />
        </g>
        
        {/* Top Header Bar */}
        <rect x="60" y="0" width="1140" height="60" fill="#0f172a" />
        <rect x="60" y="59" width="1140" height="1" fill="#1e293b" />
        
        {/* Logo */}
        <g transform="translate(80, 15)">
          <rect width="30" height="30" rx="8" fill="#10b981" opacity="0.2" />
          <text x="40" y="18" fill="#10b981" fontSize="14" fontWeight="bold">Cura</text>
          <text x="40" y="18" fill="#64748b" fontSize="14" fontWeight="bold" dx="32">Sense</text>
        </g>
        
        {/* Search bar */}
        <rect x="450" y="15" width="300" height="30" rx="15" fill="#1e293b" />
        <text x="480" y="35" fill="#64748b" fontSize="12">Search or jump to...</text>
        <text x="700" y="35" fill="#475569" fontSize="10">Ctrl+K</text>
        
        {/* User profile area */}
        <g transform="translate(1050, 15)">
          <circle cx="60" cy="15" r="15" fill="#6366f1" />
          <text x="60" y="20" fill="white" fontSize="10" textAnchor="middle" fontWeight="bold">DR</text>
          <text x="90" y="12" fill="white" fontSize="11" fontWeight="500">Dr. Sarah Chen</text>
          <text x="90" y="26" fill="#fbbf24" fontSize="9">👑 Pro Plan</text>
        </g>
        
        {/* Main Content Area */}
        <rect x="60" y="60" width="1140" height="640" fill="#111827" rx="0" />
        
        {/* Hero Section Background */}
        <rect x="60" y="60" width="1140" height="500" fill="url(#bgGradient)" opacity="0.5" />
        
        {/* Badge */}
        <g transform="translate(520, 110)">
          <rect width="240" height="28" rx="14" fill="#10b981" opacity="0.15" />
          <circle cx="15" cy="14" r="4" fill="#10b981" />
          <text x="30" y="18" fill="#10b981" fontSize="11" fontWeight="500">AI-Powered Healthcare Assistant</text>
        </g>
        
        {/* Main Heading */}
        <text x="600" y="200" fill="white" fontSize="42" fontWeight="bold" textAnchor="middle">Your Health, Powered by</text>
        <text x="600" y="260" fill="url(#purpleGradient)" fontSize="42" fontWeight="bold" textAnchor="middle">Intelligent AI</text>
        
        {/* Subtitle */}
        <text x="600" y="320" fill="#94a3b8" fontSize="14" textAnchor="middle">CuraSense combines cutting-edge AI with medical expertise to</text>
        <text x="600" y="340" fill="#94a3b8" fontSize="14" textAnchor="middle">provide instant analysis of prescriptions, medical images, and drug</text>
        <text x="600" y="360" fill="#94a3b8" fontSize="14" textAnchor="middle">comparisons.</text>
        
        {/* CTA Buttons */}
        <g transform="translate(420, 400)">
          {/* Primary button */}
          <rect width="160" height="44" rx="22" fill="#10b981" />
          <text x="60" y="28" fill="white" fontSize="13" fontWeight="600">✨ Start Diagnosis →</text>
          
          {/* Secondary button */}
          <rect x="180" width="160" height="44" rx="22" fill="transparent" stroke="#475569" strokeWidth="1" />
          <text x="240" y="28" fill="white" fontSize="13" fontWeight="500">🔗 Compare Medicines</text>
        </g>
        
        {/* Feature Cards at bottom */}
        <g transform="translate(100, 580)">
          {/* Card 1 */}
          <rect width="240" height="80" rx="12" fill="#1e293b" stroke="#334155" strokeWidth="1" />
          <rect x="20" y="20" width="40" height="40" rx="8" fill="#0ea5e9" opacity="0.2" />
          <text x="100" y="45" fill="#0ea5e9" fontSize="20">📄</text>
          <text x="100" y="65" fill="white" fontSize="11" fontWeight="500">Prescription</text>
          
          {/* Card 2 */}
          <rect x="260" width="240" height="80" rx="12" fill="#1e293b" stroke="#334155" strokeWidth="1" />
          <rect x="280" y="20" width="40" height="40" rx="8" fill="#10b981" opacity="0.2" />
          <text x="360" y="45" fill="#10b981" fontSize="20">🛡️</text>
          <text x="360" y="65" fill="white" fontSize="11" fontWeight="500">Medical Imaging</text>
          
          {/* Card 3 */}
          <rect x="520" width="240" height="80" rx="12" fill="#1e293b" stroke="#334155" strokeWidth="1" />
          <rect x="540" y="20" width="40" height="40" rx="8" fill="#f59e0b" opacity="0.2" />
          <text x="620" y="45" fill="#f59e0b" fontSize="20">⚡</text>
          <text x="620" y="65" fill="white" fontSize="11" fontWeight="500">Fast Analysis</text>
          
          {/* Card 4 */}
          <rect x="780" width="240" height="80" rx="12" fill="#1e293b" stroke="#334155" strokeWidth="1" />
          <rect x="800" y="20" width="40" height="40" rx="8" fill="#8b5cf6" opacity="0.2" />
          <text x="880" y="45" fill="#8b5cf6" fontSize="20">🩺</text>
          <text x="880" y="65" fill="white" fontSize="11" fontWeight="500">Drug Comparison</text>
        </g>
        
        {/* AI Chat bubble */}
        <g transform="translate(1100, 620)">
          <circle cx="30" cy="30" r="28" fill="url(#accentGradient)" />
          <text x="30" y="36" fill="white" fontSize="20" textAnchor="middle">💬</text>
          <circle cx="50" cy="10" r="8" fill="#ef4444" />
          <text x="50" y="14" fill="white" fontSize="8" textAnchor="middle" fontWeight="bold">AI</text>
        </g>
      </svg>
      
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
