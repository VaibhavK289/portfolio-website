"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { ArrowLeft, Clock, CalendarDays, Share2, BookmarkPlus } from "lucide-react";
import Link from "next/link";
import { Post, Tag } from "@prisma/client";
import { MDXRemote } from "next-mdx-remote/rsc";

export default function BlogPostClient({ post }: { post: Post & { tags?: Tag[] } }) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <>
      {/* Reading Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-500 to-accent-500 origin-left z-50 rounded-r-full"
        style={{ scaleX }}
      />

      <article className="min-h-screen py-24">
        {/* Header Section */}
        <header className="container mx-auto px-4 max-w-4xl pt-12 pb-16 border-b border-grid-white/[0.02]">
          <Link 
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-neutral-500 hover:text-primary-400 transition-colors mb-12 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Writing
          </Link>

          <div className="flex gap-2 mb-6">
            {post.tags?.map((tag: any) => (
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

          <div className="flex items-center gap-6 text-sm text-neutral-500">
            <div className="flex items-center gap-2">
              <CalendarDays className="w-4 h-4" />
              <time>{new Date(post.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</time>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>{post.readingTime} min read</span>
            </div>
          </div>
        </header>

        {/* Content Layout */}
        <div className="container mx-auto px-4 max-w-6xl mt-16 flex flex-col md:flex-row gap-12 relative">
          
          {/* Main Content */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex-1 max-w-3xl font-sans text-neutral-400"
          >
             <MDXRemote 
                source={post.content} 
                components={{
                  h1: (props: any) => <h1 className="text-4xl font-display font-bold text-white mt-12 mb-6" {...props} />,
                  h2: (props: any) => <h2 className="text-3xl font-display font-bold text-white mt-10 mb-4" {...props} />,
                  h3: (props: any) => <h3 className="text-2xl font-display font-bold text-white mt-8 mb-4" {...props} />,
                  p: (props: any) => <p className="text-lg leading-relaxed text-neutral-300 mb-6" {...props} />,
                  a: (props: any) => <a className="text-primary-400 hover:text-accent-400 underline decoration-primary-500/30 underline-offset-4 transition-colors" {...props} />,
                  blockquote: (props: any) => <blockquote className="border-l-4 border-primary-500 pl-4 py-2 italic text-neutral-400 my-8 bg-neutral-900/40 rounded-r-xl" {...props} />,
                  ul: (props: any) => <ul className="list-disc list-outside leading-loose pl-6 mb-6 text-neutral-300" {...props} />,
                  ol: (props: any) => <ol className="list-decimal list-outside leading-loose pl-6 mb-6 text-neutral-300" {...props} />,
                  code: (props: any) => <code className="bg-neutral-900 border border-neutral-800 rounded-md px-1.5 py-0.5 font-mono text-sm text-neutral-300" {...props} />,
                  pre: (props: any) => <pre className="bg-neutral-950 border border-neutral-800 rounded-xl p-4 overflow-x-auto my-8 shape-ticket" {...props} />
                }}
             />
          </motion.div>

          {/* Sticky Sidebar / Actions */}
          <aside className="w-full md:w-64 space-y-8">
             <div className="sticky top-24 glass p-6 rounded-2xl border border-neutral-800">
                <h4 className="font-display font-bold text-white mb-4">Share Article</h4>
                <div className="flex gap-4">
                  <button className="p-3 bg-neutral-900 rounded-full hover:bg-primary-500/20 hover:text-primary-400 transition-colors text-neutral-400">
                    <Share2 className="w-5 h-5" />
                  </button>
                  <button className="p-3 bg-neutral-900 rounded-full hover:bg-accent-500/20 hover:text-accent-400 transition-colors text-neutral-400">
                    <BookmarkPlus className="w-5 h-5" />
                  </button>
                </div>
             </div>
          </aside>
        </div>
      </article>
    </>
  );
}
