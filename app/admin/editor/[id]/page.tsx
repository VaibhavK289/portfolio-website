"use client";

import { useState } from "react";
import TailwindEditor from "@/components/editor/tailwind-editor";
import { savePost } from "@/actions/post";
import { useRouter } from "next/navigation";

export default function EditorPage({ params }: { params: { id: string } }) {
  const isNew = params.id === "new";
  const router = useRouter();
  
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  
  const [isSaving, setIsSaving] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);

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
        isNew ? undefined : params.id,
        publish
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
    } catch (e) {
      alert("An error occurred");
    } finally {
      setIsSaving(false);
      setIsPublishing(false);
    }
  };

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
        
        <div className="flex gap-4">
          <input 
             type="text" 
             placeholder="Add tags (comma separated)"
             value={tags}
             onChange={(e) => setTags(e.target.value)}
             className="flex-1 bg-neutral-900 border border-neutral-800 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-primary-500/50 transition-colors"
          />
          <button className="px-4 py-2 bg-neutral-900 border border-neutral-800 rounded-lg text-sm text-neutral-300 hover:text-white transition-colors flex items-center gap-2">
            <span>📷</span> Add Cover
          </button>
        </div>
      </div>

      <div className="mt-8">
        <TailwindEditor onChange={(val) => setContent(val)} />
      </div>
    </div>
  );
}
