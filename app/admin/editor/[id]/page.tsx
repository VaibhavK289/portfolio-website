"use client";

import React, { useState, useEffect } from "react";
import TailwindEditor from "@/components/editor/tailwind-editor";
import { savePost, getPostById } from "@/actions/post";
import { useRouter } from "next/navigation";

export default function EditorPage({ params }: { params: Promise<{ id: string }> }) {
  const unwrappedParams = React.use(params);
  const isNew = unwrappedParams.id === "new";
  const router = useRouter();
  
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [section, setSection] = useState("Blogs");
  
  const [isSaving, setIsSaving] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const [isLoading, setIsLoading] = useState(!isNew);

  useEffect(() => {
    async function loadPost() {
      if (isNew) return;
      try {
        const result = await getPostById(unwrappedParams.id);
        if (result.success && result.post) {
          setTitle(result.post.title);
          setContent(result.post.content);
          setTags(result.post.tags.map((t: { name: string }) => t.name).join(", "));
          setCoverImage(result.post.coverImage || "");
          setSection(result.post.section || "Blogs");
        }
      } catch (error) {
        console.error("Failed to load post:", error);
      } finally {
        setIsLoading(false);
      }
    }
    loadPost();
  }, [isNew, unwrappedParams.id]);

  const handleSave = async (publish: boolean) => {
    if (!title || !content) {
      alert("Please provide a title and content.");
      return;
    }
    
    if (publish) setIsPublishing(true);
    else setIsSaving(true);
    
    const tagsArray = tags.split(",").map(t => t.trim()).filter(Boolean);

    try {
      const result = await savePost(
        title,
        content,
        tagsArray,
        isNew ? undefined : unwrappedParams.id,
        publish,
        coverImage,
        section
      );
      
      if (result.success) {
        if (publish) {
           router.push("/admin");
        } else if (isNew && result.postId) {
           // Redirect from /new to the actual ID after first save
           router.replace(`/admin/editor/${result.postId}`);
        }
      } else {
        alert(result.error || "Failed to save.");
      }
    } catch {
      alert("An error occurred");
    } finally {
      setIsSaving(false);
      setIsPublishing(false);
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto space-y-6 pt-20 text-center text-neutral-400">
        Loading post...
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between sticky top-[65px] bg-neutral-950/80 backdrop-blur-md py-4 z-40 border-b border-neutral-900">
        <div className="flex items-center gap-4">
          <a href="/admin" className="text-neutral-400 hover:text-white transition-colors">
            ← Back
          </a>
          <div className="text-sm font-medium text-neutral-500">
            {isNew ? "Drafting New Post" : "Editing Post"}
          </div>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={() => handleSave(false)}
            disabled={isSaving || isPublishing}
            className="px-4 py-2 text-sm font-medium bg-white text-black rounded-full hover:bg-neutral-200 transition-colors disabled:opacity-50"
          >
            {isSaving ? "Saving..." : "Save Draft"}
          </button>
          <button 
            onClick={() => handleSave(true)}
            disabled={isSaving || isPublishing}
            className="px-4 py-2 text-sm font-medium bg-primary-500 text-white rounded-full hover:bg-primary-600 transition-colors shadow-[0_0_15px_rgba(6,182,212,0.3)] disabled:opacity-50"
          >
            {isPublishing ? "Publishing..." : "Publish"}
          </button>
        </div>
      </div>

      <div className="space-y-4">
        <input
          type="text"
          placeholder="Article Title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full text-4xl md:text-5xl font-display font-bold bg-transparent border-none outline-none text-white placeholder:text-neutral-700 focus:ring-0 px-0"
        />
        
        <div className="flex flex-col md:flex-row gap-4">
          <input 
             type="text" 
             placeholder="Add tags (comma separated)"
             value={tags}
             onChange={(e) => setTags(e.target.value)}
             className="flex-1 bg-neutral-900 border border-neutral-800 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-primary-500/50 transition-colors"
          />
          <input 
             type="url" 
             placeholder="Cover Image URL (Optional)"
             value={coverImage}
             onChange={(e) => setCoverImage(e.target.value)}
             className="flex-1 bg-neutral-900 border border-neutral-800 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-primary-500/50 transition-colors"
          />
          <div className="flex-1 bg-neutral-900 border border-neutral-800 rounded-2xl p-4">
            <label className="block text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-2">Section</label>
            <div className="flex flex-wrap gap-2">
              {["Blogs", "Articles", "Tools Summary", "Update/Community", "Updates"].map(s => (
                <button
                  key={s}
                  onClick={() => setSection(s)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                    section === s 
                      ? "bg-primary-500 text-white shadow-[0_0_10px_rgba(6,182,212,0.3)]" 
                      : "bg-neutral-800/50 text-neutral-400 border border-neutral-700 hover:border-neutral-600 hover:text-white"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Cover Image Preview */}
        {coverImage && (
          <div className="relative aspect-[21/9] md:aspect-[3/1] max-h-64 rounded-2xl overflow-hidden border border-neutral-800 bg-neutral-900 mt-4 group">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={coverImage} alt="Cover Preview" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
               <span className="text-white font-medium text-sm bg-black/50 px-3 py-1.5 rounded-full backdrop-blur-md">Cover Preview</span>
            </div>
          </div>
        )}
      </div>

      <div className="mt-8">
        <TailwindEditor onChange={(val) => setContent(val)} />
      </div>
    </div>
  );
}
