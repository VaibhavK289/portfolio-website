"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Fuse from "fuse.js";
import { FileText, PenLine, Wrench, Users, Megaphone, Clock, Calendar } from "lucide-react";

interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt?: string | null;
  content: string;
  readingTime?: number | null;
  createdAt: Date | string;
  published: boolean;
  section?: string | null;
  coverImage?: string | null;
}

interface Tag {
  id: string;
  name: string;
  slug?: string;
}

interface BlogListClientProps {
  initialPosts: (Post & { tags?: Tag[] })[];
}

const SECTIONS = [
  { key: "Articles", icon: FileText, css: "section-articles", badge: "badge-articles", accent: "accent-articles", glow: "glow-articles", color: "#3b82f6" },
  { key: "Blogs", icon: PenLine, css: "section-blogs", badge: "badge-blogs", accent: "accent-blogs", glow: "glow-blogs", color: "#06b6d4" },
  { key: "Tools Summary", icon: Wrench, css: "section-tools", badge: "badge-tools", accent: "accent-tools", glow: "glow-tools", color: "#a855f7" },
  { key: "Update/Community", icon: Users, css: "section-community", badge: "badge-community", accent: "accent-community", glow: "glow-community", color: "#f59e0b" },
  { key: "Updates", icon: Megaphone, css: "section-updates", badge: "badge-updates", accent: "accent-updates", glow: "glow-updates", color: "#10b981" },
] as const;

export default function BlogListClient({ initialPosts }: BlogListClientProps) {
  const [isMounted, setIsMounted] = useState(false);
  const [activeFilter, setActiveFilter] = useState("All");
  
  useEffect(() => {
    const frame = requestAnimationFrame(() => setIsMounted(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  const [searchQuery, setSearchQuery] = useState("");
  
  const fuse = new Fuse(initialPosts, {
    keys: ["title", "tags.name", "excerpt"],
    threshold: 0.3,
  });

  const filteredPosts = searchQuery 
    ? fuse.search(searchQuery).map((result: { item: Post & { tags?: Tag[] } }) => result.item)
    : initialPosts;

  return (
    <>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-2xl mx-auto mb-12"
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

      {/* Filter Pills */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex gap-2 mb-12 overflow-x-auto pb-2 scrollbar-hide justify-center flex-wrap"
      >
        <button
          onClick={() => setActiveFilter("All")}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
            activeFilter === "All"
              ? "bg-primary-500 text-white shadow-[0_0_15px_rgba(6,182,212,0.3)]"
              : "bg-neutral-900 text-neutral-400 border border-neutral-800 hover:border-neutral-700 hover:text-white"
          }`}
        >
          All
        </button>
        {SECTIONS.map((section) => {
          const Icon = section.icon;
          return (
            <button
              key={section.key}
              onClick={() => setActiveFilter(section.key)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap flex items-center gap-1.5 ${
                activeFilter === section.key
                  ? `${section.badge} border border-current/20 shadow-md`
                  : "bg-neutral-900 text-neutral-400 border border-neutral-800 hover:border-neutral-700 hover:text-white"
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              {section.key}
            </button>
          );
        })}
      </motion.div>

      {/* Sections */}
      <div className="space-y-10">
        {SECTIONS.map((section) => {
          if (activeFilter !== "All" && activeFilter !== section.key) return null;
          
          const sectionPosts = filteredPosts.filter(
            (p: Post & { tags?: Tag[] }) => (p.section || "Blogs") === section.key
          );
          if (sectionPosts.length === 0) return null;

          const Icon = section.icon;
          const isCompactSection = section.key === "Update/Community" || section.key === "Updates";

          return (
            <motion.div
              key={section.key}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className={`p-6 md:p-8 rounded-[--radius-3xl] border ${section.css} relative overflow-hidden`}
            >
              {/* Decorative corner accent */}
              <div 
                className="absolute top-0 right-0 w-32 h-32 opacity-[0.03] rounded-full blur-2xl pointer-events-none"
                style={{ background: section.color }}
              />

              {/* Section Header */}
              <div className="flex items-center gap-3 mb-6">
                <div 
                  className={`w-10 h-10 rounded-xl flex items-center justify-center ${section.badge}`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-2xl font-display font-bold text-white">
                    {section.key}
                  </h3>
                  <div className={`h-0.5 w-12 mt-1 rounded-full ${section.accent}`} />
                </div>
                <span className={`ml-auto text-xs font-medium px-2.5 py-1 rounded-full ${section.badge}`}>
                  {sectionPosts.length} {sectionPosts.length === 1 ? "post" : "posts"}
                </span>
              </div>

              {/* Content */}
              {isCompactSection ? (
                /* Compact feed layout for Community & Updates */
                <div className="space-y-3">
                  {sectionPosts.map((post: Post & { tags?: Tag[] }, index: number) => (
                    <motion.div
                      key={post.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Link
                        href={`/blog/${post.slug}`}
                        className="group flex items-center gap-4 p-4 rounded-2xl border border-neutral-800/50 bg-neutral-950/40 hover:bg-neutral-900/60 transition-all"
                      >
                        <div
                          className="w-2 h-2 rounded-full shrink-0"
                          style={{ background: section.color }}
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-semibold text-white group-hover:text-primary-400 transition-colors truncate">
                            {post.title}
                          </h4>
                          {post.excerpt && (
                            <p className="text-xs text-neutral-500 truncate mt-0.5">{post.excerpt}</p>
                          )}
                        </div>
                        <div className="flex items-center gap-3 text-xs text-neutral-500 shrink-0">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {isMounted
                              ? new Date(post.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
                              : ''
                            }
                          </span>
                          {post.readingTime && (
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {post.readingTime}m
                            </span>
                          )}
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              ) : (
                /* Card grid for Articles, Blogs, Tools Summary */
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {sectionPosts.map((post: Post & { tags?: Tag[] }, index: number) => (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      key={post.id}
                    >
                      <Link 
                        href={`/blog/${post.slug}`}
                        className={`group glass rounded-[--radius-2xl] border border-neutral-800 card-hover flex flex-col h-full bg-neutral-950/60 relative overflow-hidden`}
                      >
                        {/* Cover Image */}
                        {post.coverImage ? (
                          <div className="relative aspect-[16/9] overflow-hidden rounded-t-[--radius-2xl]">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img 
                              src={post.coverImage} 
                              alt={post.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/60 via-transparent to-transparent" />
                          </div>
                        ) : (
                          /* Decorative header gradient when no cover image */
                          <div 
                            className="h-1 w-full transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"
                            style={{ background: `linear-gradient(90deg, ${section.color}, transparent)` }}
                          />
                        )}
                        
                        <div className="p-5 flex flex-col flex-1">
                          {/* Tags */}
                          <div className="flex gap-1.5 mb-3 flex-wrap">
                            {post.tags?.slice(0, 3).map((tag: Tag) => (
                              <span key={tag.id} className="text-[10px] font-semibold px-2 py-0.5 bg-neutral-800 text-neutral-300 rounded-full group-hover:bg-primary-500/10 group-hover:text-primary-400 transition-colors uppercase tracking-wider">
                                {tag.name}
                              </span>
                            ))}
                          </div>
                          
                          <h2 className="text-lg font-display font-bold text-white mb-2 group-hover:text-primary-400 transition-colors leading-snug line-clamp-2">
                            {post.title}
                          </h2>
                          
                          <p className="text-neutral-400 leading-relaxed text-sm mb-4 flex-grow line-clamp-3">
                            {post.excerpt}
                          </p>
                          
                          <div className="flex items-center justify-between text-[11px] font-medium text-neutral-500 mt-auto pt-3 border-t border-neutral-800/50">
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {isMounted 
                                ? new Date(post.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
                                : ''
                              }
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {post.readingTime} min
                            </span>
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          );
        })}
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
