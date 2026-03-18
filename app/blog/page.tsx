import { getPosts } from "@/actions/post";
import BlogListClient from "./BlogListClient";

export const metadata = {};
export default async function BlogArchive() {
  const { posts } = await getPosts(true); // Only fetch published posts

  return (
    <div className="container mx-auto px-4 py-24 max-w-6xl">
      {/* Header Section */}
      <div className="text-center max-w-2xl mx-auto mb-16 animate-fade-in">
        <h1 className="text-5xl md:text-7xl font-display font-bold mb-6 tracking-tight">
          Writing & <span className="gradient-text">Thoughts</span>
        </h1>
        <p className="text-xl text-neutral-400 leading-relaxed mb-8">
          Essays on software engineering, deep-dive articles, tools I use, and updates from my journey.
        </p>
      </div>

      <BlogListClient initialPosts={posts || []} />
    </div>
  );
}
