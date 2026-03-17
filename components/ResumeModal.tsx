'use client';

import { useState, useEffect, useCallback, useSyncExternalStore } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Maximize2, 
  Minimize2, 
  ExternalLink, 
  RefreshCw, 
  Shield,
  Download,
  FileText,
  Eye
} from 'lucide-react';
import { personalInfo } from '@/data/socials';

// Custom hook to safely check for client-side rendering
function useIsMounted() {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );
}

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [iframeKey, setIframeKey] = useState(0);
  const isMounted = useIsMounted();

  // Detect mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));
    };
    checkMobile();
  }, []);

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
    setIframeKey(prev => prev + 1);
  }, []);

  if (!isMounted) return null;

  // For mobile, we might want to use a more reliable viewer URL or just provide a direct link
  // Google Docs viewer is a common fallback for mobile iframes
  const baseUrl = isMounted ? window.location.origin : '';
  const fullPdfUrl = `${baseUrl}${personalInfo.resumeUrl}`;
  const mobileViewerUrl = `https://docs.google.com/viewer?url=${encodeURIComponent(fullPdfUrl)}&embedded=true`;

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
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3 }}
            className={`fixed z-[9999] bg-neutral-900 rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl border border-neutral-800 ${
              isFullscreen 
                ? 'inset-2 sm:inset-4' 
                : 'inset-2 sm:top-1/2 sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 sm:w-[90vw] sm:max-w-5xl sm:h-[85vh]'
            }`}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-3 sm:px-4 py-2 sm:py-3 bg-neutral-950 border-b border-neutral-800">
              <div className="flex items-center gap-2 sm:gap-3">
                {/* Traffic lights */}
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <button
                    onClick={onClose}
                    className="w-4 h-4 sm:w-3.5 sm:h-3.5 rounded-full bg-red-500 hover:bg-red-400 transition-colors group flex items-center justify-center"
                    aria-label="Close"
                  >
                    <X className="w-2.5 h-2.5 sm:w-2 sm:h-2 text-red-900 opacity-100 sm:opacity-0 sm:group-hover:opacity-100" />
                  </button>
                  <button 
                    className="w-3.5 h-3.5 rounded-full bg-yellow-500 hover:bg-yellow-400 transition-colors hidden sm:block"
                    aria-label="Minimize"
                  />
                  <button
                    onClick={() => setIsFullscreen(!isFullscreen)}
                    className="w-3.5 h-3.5 rounded-full bg-green-500 hover:bg-green-400 transition-colors group flex items-center justify-center hidden sm:flex"
                    aria-label="Fullscreen"
                  >
                    {isFullscreen ? (
                      <Minimize2 className="w-2 h-2 text-green-900 opacity-0 group-hover:opacity-100" />
                    ) : (
                      <Maximize2 className="w-2 h-2 text-green-900 opacity-0 group-hover:opacity-100" />
                    )}
                  </button>
                </div>
                
                <div className="hidden sm:flex items-center gap-2 px-2 py-1 rounded-md bg-neutral-900 border border-neutral-800">
                  <FileText className="w-3.5 h-3.5 text-primary-400" />
                  <span className="text-[10px] uppercase tracking-wider font-bold text-neutral-400">Resume Viewer</span>
                </div>
              </div>
              
              {/* URL Bar */}
              <div className="flex-1 mx-2 sm:mx-4 max-w-md">
                <div className="flex items-center gap-2 px-3 py-1.5 bg-neutral-900 rounded-lg border border-neutral-800">
                  <Shield className="w-3 h-3 text-green-500" />
                  <span className="text-[10px] sm:text-xs text-neutral-400 truncate font-mono">
                    vaibhav_kumar_kandhway_resume.pdf
                  </span>
                </div>
              </div>
              
              {/* Actions */}
              <div className="flex items-center gap-1 sm:gap-2">
                <button
                  onClick={handleRefresh}
                  className="p-1.5 sm:p-2 text-neutral-400 hover:text-white transition-colors rounded-lg hover:bg-neutral-800 hidden sm:block"
                  aria-label="Refresh"
                >
                  <RefreshCw className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${isLoading ? 'animate-spin' : ''}`} />
                </button>
                <a
                  href={personalInfo.resumeUrl}
                  download="vaibhav_kumar_kandhway_resume.pdf"
                  className="flex items-center gap-2 px-3 py-1.5 bg-primary-600 hover:bg-primary-500 text-white rounded-lg transition-all text-[10px] sm:text-xs font-bold shadow-lg shadow-primary-500/20"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span className="hidden xs:block">Download</span>
                </a>
                <a
                  href={personalInfo.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 sm:p-2 text-neutral-400 hover:text-white transition-colors rounded-lg hover:bg-neutral-800"
                  aria-label="Open in new tab"
                >
                  <ExternalLink className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </a>
              </div>
            </div>
            
            {/* Content */}
            <div className="relative w-full h-[calc(100%-48px)] sm:h-[calc(100%-52px)] bg-neutral-950">
              {/* Mobile Fallback UI */}
              {isMobile && !isLoading && (
                <div className="absolute inset-x-0 bottom-4 px-4 z-20">
                  <motion.a
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    href={personalInfo.resumeUrl}
                    target="_blank"
                    className="w-full flex items-center justify-center gap-3 py-4 bg-primary-500 text-white rounded-xl font-bold shadow-xl shadow-primary-500/30"
                  >
                    <Eye className="w-5 h-5" />
                    Open Full PDF for Mobile
                  </motion.a>
                </div>
              )}

              {/* Loading State */}
              {isLoading && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-neutral-950 z-10 text-center px-6">
                  <div className="w-10 h-10 border-2 border-primary-500 border-t-transparent rounded-full animate-spin" />
                  <p className="mt-4 text-neutral-400 text-sm font-medium animate-pulse">
                    Loading Resume Document...
                  </p>
                  {isMobile && (
                    <p className="mt-2 text-neutral-500 text-xs italic">
                      Mobile browsers may take longer to preview PDFs
                    </p>
                  )}
                </div>
              )}
              
              {/* PDF Preview Iframe - Use Google Viewer as fallback for mobile if direct fails */}
              <iframe
                key={iframeKey}
                src={isMobile 
                  ? mobileViewerUrl 
                  : `${personalInfo.resumeUrl}#toolbar=0&navpanes=0&scrollbar=1`
                }
                className="w-full h-full border-0"
                onLoad={handleIframeLoad}
                title="Resume Preview"
              />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
  
  return createPortal(modalContent, document.body);
}
