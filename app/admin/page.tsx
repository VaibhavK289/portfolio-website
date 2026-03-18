"use client";

import { useState, useCallback, useEffect } from "react";
import Link from "next/link";
import { Plus, Edit2, Trash2, Calendar, Clock, FileText, PenLine, Wrench, Users, Megaphone } from "lucide-react";
import { getPosts, deletePost } from "@/actions/post";

interface Post {
  id: string;
  title: string;
  slug: string;
  published: boolean;
  createdAt: Date | string;
  readingTime?: number | null;
  section?: string | null;
  coverImage?: string | null;
}

const SECTIONS = [
  { key: "Articles", icon: FileText, badge: "badge-articles" },
  { key: "Blogs", icon: PenLine, badge: "badge-blogs" },
  { key: "Tools Summary", icon: Wrench, badge: "badge-tools" },
  { key: "Update/Community", icon: Users, badge: "badge-community" },
  { key: "Updates", icon: Megaphone, badge: "badge-updates" },
] as const;

export default function AdminDashboard() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("All");

  const fetchPosts = useCallback(async () => {
    setIsLoading(true);
    const { posts: allPosts } = await getPosts();
    if (allPosts) {
      setPosts(allPosts);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const handleDelete = async (postId: string) => {
    if (!window.confirm("Are you sure you want to delete this post? This action cannot be undone.")) {
      return;
    }

    const { success } = await deletePost(postId);
    if (success) {
      setPosts(posts.filter(p => p.id !== postId));
    } else {
      alert("Failed to delete post. Please try again.");
    }
  };

  // Calculate stats
  const stats = SECTIONS.reduce((acc, section) => {
    acc[section.key] = {
      published: posts.filter(p => (p.section || "Blogs") === section.key && p.published).length,
      draft: posts.filter(p => (p.section || "Blogs") === section.key && !p.published).length,
    };
    return acc;
  }, {} as Record<string, { published: number; draft: number }>);

  const filteredPosts = posts.filter(p => 
    activeFilter === "All" ? true : (p.section || "Blogs") === activeFilter
  );

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl animate-fade-in">
      
      {/* Header & Quick Action */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
        <div>
          <h1 className="text-3xl font-display font-bold text-neutral-900 dark:text-white mb-2">
            Dashboard
          </h1>
          <p className="text-neutral-500">
            Manage your digital garden, articles, and community updates.
          </p>
        </div>
        <Link 
          href="/admin/editor/new"
          className="flex items-center gap-2 px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white rounded-full font-medium transition-all shadow-lg shadow-primary-500/25 hover:shadow-primary-500/40 hover:-translate-y-0.5"
        >
          <Plus className="w-5 h-5" />
          Write New Post
        </Link>
      </div>

      {/* Analytics Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-12">
        {SECTIONS.map((section) => {
          const Icon = section.icon;
          const sectionStats = stats[section.key] || { published: 0, draft: 0 };
          return (
            <div 
              key={section.key}
              className={`admin-stat-card glass p-5 rounded-2xl border border-neutral-800 bg-neutral-950/40 relative overflow-hidden`}
            >
              <div className="flex items-center gap-3 mb-4 relative z-10">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${section.badge}`}>
                  <Icon className="w-4 h-4" />
                </div>
                <h3 className="font-semibold text-white truncate text-sm">{section.key}</h3>
              </div>
              <div className="flex justify-between items-end relative z-10">
                <div>
                  <p className="text-2xl font-bold text-white leading-none mb-1">{sectionStats.published}</p>
                  <p className="text-[10px] text-neutral-400 font-medium uppercase tracking-wider">Published</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-semibold text-neutral-300 leading-none mb-1">{sectionStats.draft}</p>
                  <p className="text-[10px] text-neutral-500 font-medium uppercase tracking-wider">Drafts</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Content Section */}
      <div className="space-y-6">
        
        {/* Filters */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide flex-wrap">
          <button
            onClick={() => setActiveFilter("All")}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
              activeFilter === "All"
                ? "bg-primary-500 text-white shadow-md shadow-primary-500/20"
                : "bg-white dark:bg-neutral-900 text-neutral-600 dark:text-neutral-400 border border-neutral-200 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700"
            }`}
          >
            All Posts
          </button>
          {SECTIONS.map((section) => {
            const Icon = section.icon;
            return (
              <button
                key={section.key}
                onClick={() => setActiveFilter(section.key)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap flex items-center gap-1.5 ${
                  activeFilter === section.key
                    ? `${section.badge} border border-current/20 shadow-sm`
                    : "bg-white dark:bg-neutral-900 text-neutral-600 dark:text-neutral-400 border border-neutral-200 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {section.key}
              </button>
            );
          })}
        </div>

        {/* Desktop Table view */}
        <div className="hidden md:block glass rounded-2xl border border-neutral-200 dark:border-neutral-800 overflow-hidden bg-white/50 dark:bg-neutral-950/50">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/50">
                <th className="py-4 px-6 text-xs font-semibold text-neutral-500 uppercase tracking-wider">Post</th>
                <th className="py-4 px-6 text-xs font-semibold text-neutral-500 uppercase tracking-wider">Section</th>
                <th className="py-4 px-6 text-xs font-semibold text-neutral-500 uppercase tracking-wider">Status</th>
                <th className="py-4 px-6 text-xs font-semibold text-neutral-500 uppercase tracking-wider">Date</th>
                <th className="py-4 px-6 text-xs font-semibold text-neutral-500 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800">
              {isLoading ? (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-neutral-500">Loading posts...</td>
                </tr>
              ) : filteredPosts.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-neutral-500">No posts found.</td>
                </tr>
              ) : (
                filteredPosts.map((post) => {
                  const sectionDef = SECTIONS.find(s => s.key === (post.section || "Blogs"));
                  return (
                    <tr key={post.id} className="hover:bg-white/40 dark:hover:bg-neutral-900/40 transition-colors group">
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-4">
                          {post.coverImage ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img src={post.coverImage} alt="" className="w-12 h-8 rounded object-cover border border-neutral-200 dark:border-neutral-800" />
                          ) : (
                            <div className="w-12 h-8 rounded bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 flex items-center justify-center">
                              <FileText className="w-3 h-3 text-neutral-400" />
                            </div>
                          )}
                          <div>
                            <p className="font-semibold text-neutral-900 dark:text-white max-w-md truncate">{post.title}</p>
                            {post.readingTime && (
                              <p className="text-xs text-neutral-500 flex items-center gap-1 mt-1">
                                <Clock className="w-3 h-3" /> {post.readingTime}m read
                              </p>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${sectionDef?.badge || "bg-neutral-100 text-neutral-600"}`}>
                          {sectionDef?.key || "Blogs"}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                          post.published 
                            ? "bg-emerald-100 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/20" 
                            : "bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 border border-neutral-200 dark:border-neutral-700"
                        }`}>
                          {post.published ? "Published" : "Draft"}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-sm text-neutral-500">
                        <span className="flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5" />
                          {new Date(post.createdAt).toLocaleDateString()}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-right">
                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Link 
                            href={`/admin/editor/${post.id}`}
                            className="p-2 text-neutral-500 hover:text-primary-500 hover:bg-primary-50 dark:hover:bg-primary-500/10 rounded-lg transition-colors"
                            title="Edit"
                          >
                            <Edit2 className="w-4 h-4" />
                          </Link>
                          <button
                            onClick={() => handleDelete(post.id)}
                            className="p-2 text-neutral-500 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-colors"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile Card view */}
        <div className="md:hidden space-y-4">
          {isLoading ? (
            <p className="py-8 text-center text-neutral-500">Loading posts...</p>
          ) : filteredPosts.length === 0 ? (
            <p className="py-8 text-center text-neutral-500">No posts found.</p>
          ) : (
            filteredPosts.map((post) => {
              const sectionDef = SECTIONS.find(s => s.key === (post.section || "Blogs"));
              return (
                <div key={post.id} className="glass p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950/40">
                  <div className="flex justify-between items-start mb-3">
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium ${sectionDef?.badge || "bg-neutral-100 text-neutral-600"}`}>
                      {sectionDef?.key || "Blogs"}
                    </span>
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium ${
                      post.published ? "text-emerald-600 dark:text-emerald-400" : "text-neutral-500"
                    }`}>
                      {post.published ? "Published" : "Draft"}
                    </span>
                  </div>
                  <h4 className="font-semibold text-neutral-900 dark:text-white mb-3 leading-snug">{post.title}</h4>
                  <div className="flex items-center justify-between text-xs text-neutral-500 border-t border-neutral-100 dark:border-neutral-800/50 pt-3">
                    <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                    <div className="flex gap-3">
                      <Link href={`/admin/editor/${post.id}`} className="text-primary-500 flex items-center gap-1 font-medium">
                        <Edit2 className="w-3 h-3" /> Edit
                      </Link>
                      <button onClick={() => handleDelete(post.id)} className="text-red-500 flex items-center gap-1 font-medium">
                        <Trash2 className="w-3 h-3" /> Delete
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

      </div>
    </div>
  );
}
