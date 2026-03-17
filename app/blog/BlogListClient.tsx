"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Link from "next/link";
import { Post, Tag } from "@prisma/client";
import Fuse from "fuse.js";

interface BlogListClientProps {
  initialPosts: (Post & { tags?: Tag[] })[];
}

export default function BlogListClient({ initialPosts }: BlogListClientProps) {
  const [searchQuery, setSearchQuery] = useState("");
  
  const fuse = new Fuse(initialPosts, {
    keys: ["title", "tags.name", "excerpt"],
    threshold: 0.3,
  });

  const filteredPosts = searchQuery 
    ? fuse.search(searchQuery).map(result => result.item)
    : initialPosts;

  return (
    <>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-2xl mx-auto mb-20"
      >
        {/* Search Bar */}
        <div className="relative group mt-8">
           <div className="absolute inset-0 bg-primary-500/20 blur-xl rounded-full group-hover:bg-primary-500/30 transition-colors opacity-0 group-hover:opacity-100"></div>
           <input
              type="text"
              placeholder="Search articles by title or tag..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full relative bg-neutral-900 border border-neutral-800 rounded-full px-6 py-4 text-white placeholder:text-neutral-500 focus:outline-none focus:border-primary-500/50 shadow-lg glass transition-all"
           />
        </div>
      </motion.div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPosts.map((post, index) => (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            key={post.id}
          >
            <Link 
              href={`/blog/${post.slug}`}
              className="group glass p-6 rounded-[--radius-2xl] border border-neutral-800 card-hover flex flex-col h-full bg-neutral-900/40 relative overflow-hidden"
            >
              {/* Top Gradient Accent */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary-500 to-accent-500 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
              
              <div className="flex gap-2 mb-4 flex-wrap">
                {post.tags?.map((tag: any) => (
                  <span key={tag.id} className="text-xs font-semibold px-2.5 py-1 bg-neutral-800 text-neutral-300 rounded-full group-hover:bg-primary-500/10 group-hover:text-primary-400 transition-colors">
                    {tag.name}
                  </span>
                ))}
              </div>
              
              <h2 className="text-2xl font-display font-bold text-white mb-3 group-hover:text-primary-400 transition-colors">
                {post.title}
              </h2>
              
              <p className="text-neutral-400 leading-relaxed text-sm mb-6 flex-grow">
                {post.excerpt}
              </p>
              
              <div className="flex items-center justify-between text-xs font-medium text-neutral-500 mt-auto pt-4 border-t border-neutral-800/50">
                <span>{new Date(post.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                <span className="flex items-center gap-1">⏱️ {post.readingTime} min read</span>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Empty State */}
      {filteredPosts.length === 0 && (
        <div className="text-center py-20 animate-fade-in">
          <p className="text-neutral-500 text-lg">No articles found matching &quot;{searchQuery}&quot;</p>
        </div>
      )}
    </>
  );
}
