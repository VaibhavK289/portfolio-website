import { getPostBySlug } from "@/actions/post";
import { notFound } from "next/navigation";
import BlogPostClient from "./BlogPostClient";

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const { post } = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <BlogPostClient post={post}>
      <div 
        className="blog-content prose prose-lg prose-invert max-w-none
          prose-headings:font-display prose-headings:text-white prose-headings:font-bold
          prose-h1:text-4xl prose-h1:mt-12 prose-h1:mb-6
          prose-h2:text-3xl prose-h2:mt-10 prose-h2:mb-4
          prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4
          prose-p:text-lg prose-p:leading-relaxed prose-p:text-neutral-300 prose-p:mb-6
          prose-a:text-primary-400 prose-a:underline prose-a:decoration-primary-500/30 prose-a:underline-offset-4 hover:prose-a:text-accent-400
          prose-blockquote:border-l-4 prose-blockquote:border-primary-500 prose-blockquote:pl-4 prose-blockquote:py-2 prose-blockquote:italic prose-blockquote:text-neutral-400 prose-blockquote:my-8 prose-blockquote:bg-neutral-900/40 prose-blockquote:rounded-r-xl
          prose-ul:list-disc prose-ul:leading-loose prose-ul:pl-6 prose-ul:mb-6 prose-ul:text-neutral-300
          prose-ol:list-decimal prose-ol:leading-loose prose-ol:pl-6 prose-ol:mb-6 prose-ol:text-neutral-300
          prose-code:bg-neutral-900 prose-code:border prose-code:border-neutral-800 prose-code:rounded-md prose-code:px-1.5 prose-code:py-0.5 prose-code:font-mono prose-code:text-sm prose-code:text-neutral-300
          prose-pre:bg-neutral-950 prose-pre:border prose-pre:border-neutral-800 prose-pre:rounded-xl prose-pre:p-4 prose-pre:overflow-x-auto prose-pre:my-8
          prose-img:rounded-2xl prose-img:border prose-img:border-neutral-800 prose-img:my-8
          prose-hr:border-neutral-800 prose-hr:my-12
          prose-strong:text-white prose-em:text-neutral-200"
        dangerouslySetInnerHTML={{ __html: post.content }} 
      />
    </BlogPostClient>
  );
}

