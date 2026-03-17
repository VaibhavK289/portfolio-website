"use client";

import { useState, useEffect } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { ArrowLeft, Clock, CalendarDays, Share2, BookmarkPlus } from "lucide-react";
import Link from "next/link";

interface Post {
  id: string;
  title: string;
  content: string;
  excerpt?: string | null;
  readingTime?: number | null;
  createdAt: Date | string;
  updatedAt?: Date | string;
  slug?: string;
  authorId?: string;
}

interface Tag {
  id: string;
  name: string;
  slug?: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
}

export default function BlogPostClient({ 
  post, 
  children 
}: { 
  post: Post & { tags?: Tag[] };
  children: React.ReactNode;
}) {
  const [isMounted, setIsMounted] = useState(false);
  const { scrollYProgress } = useScroll();
  
  useEffect(() => {
    const frame = requestAnimationFrame(() => setIsMounted(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: post.title,
        text: post.excerpt || '',
        url: window.location.href,
      }).catch(console.error);
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  return (
    <>
      {/* Reading Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-500 to-accent-500 origin-left z-50 rounded-r-full"
        style={{ scaleX }}
      />

      <article className="min-h-screen py-24">
        {/* Header Section */}
        <header className="container mx-auto px-4 max-w-5xl pt-12 pb-16">
          <Link 
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-neutral-500 hover:text-primary-400 transition-colors mb-12 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Writing
          </Link>

          <div className="flex gap-2 mb-6">
            {post.tags?.map((tag) => (
              <span key={tag.id} className="text-xs font-semibold px-3 py-1 bg-primary-500/10 text-primary-400 rounded-full border border-primary-500/20">
                {tag.name}
              </span>
            ))}
          </div>

          <motion.h1 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl lg:text-7xl font-display font-bold tracking-tight text-white mb-6 leading-[1.1]"
          >
            {post.title}
          </motion.h1>

          <motion.p 
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             transition={{ delay: 0.1 }}
             className="text-xl text-neutral-400 leading-relaxed mb-8 max-w-2xl"
          >
            {post.excerpt}
          </motion.p>

          <div className="flex items-center gap-6 text-sm text-neutral-500 pb-16 border-b border-neutral-800/50">
            <div className="flex items-center gap-2">
              <CalendarDays className="w-4 h-4" />
              <time>
                {isMounted 
                  ? new Date(post.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
                  : ''
                }
              </time>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>{post.readingTime} min read</span>
            </div>
          </div>
        </header>

        {/* Content Layout */}
        <div className="container mx-auto px-4 max-w-5xl mt-16 flex flex-col md:flex-row gap-16 relative">
          
          {/* Main Content */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex-1 max-w-3xl font-sans text-neutral-400"
          >
             {children}
          </motion.div>

          {/* Sticky Sidebar / Actions */}
          <aside className="w-full md:w-64">
             <div className="sticky top-32 space-y-8">
                <div className="glass p-8 rounded-3xl border border-neutral-800 relative group overflow-hidden">
                   <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 to-accent-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                   <h4 className="font-display font-bold text-white mb-6 relative z-10">Share Article</h4>
                   <div className="flex gap-4 relative z-10">
                     <button 
                       onClick={handleShare}
                       className="p-4 bg-neutral-900/80 rounded-2xl hover:bg-primary-500/20 hover:text-primary-400 transition-all text-neutral-400 border border-neutral-800 hover:border-primary-500/30"
                       title="Share Article"
                     >
                       <Share2 className="w-5 h-5" />
                     </button>
                     <button 
                       onClick={() => alert("Added to bookmarks!")}
                       className="p-4 bg-neutral-900/80 rounded-2xl hover:bg-accent-500/20 hover:text-accent-400 transition-all text-neutral-400 border border-neutral-800 hover:border-accent-500/30"
                       title="Save for Later"
                     >
                       <BookmarkPlus className="w-5 h-5" />
                     </button>
                   </div>
                </div>
             </div>
          </aside>
        </div>
      </article>
    </>
  );
}
