import { getPostBySlug } from "@/actions/post";
import { notFound } from "next/navigation";
import BlogPostClient from "./BlogPostClient";
import { MDXRemote } from "next-mdx-remote/rsc";

const mdxComponents = {
  h1: (props: React.ComponentPropsWithoutRef<"h1">) => <h1 className="text-4xl font-display font-bold text-white mt-12 mb-6" {...props} />,
  h2: (props: React.ComponentPropsWithoutRef<"h2">) => <h2 className="text-3xl font-display font-bold text-white mt-10 mb-4" {...props} />,
  h3: (props: React.ComponentPropsWithoutRef<"h3">) => <h3 className="text-2xl font-display font-bold text-white mt-8 mb-4" {...props} />,
  p: (props: React.ComponentPropsWithoutRef<"p">) => <p className="text-lg leading-relaxed text-neutral-300 mb-6" {...props} />,
  a: (props: React.ComponentPropsWithoutRef<"a">) => <a className="text-primary-400 hover:text-accent-400 underline decoration-primary-500/30 underline-offset-4 transition-colors" {...props} />,
  blockquote: (props: React.ComponentPropsWithoutRef<"blockquote">) => <blockquote className="border-l-4 border-primary-500 pl-4 py-2 italic text-neutral-400 my-8 bg-neutral-900/40 rounded-r-xl" {...props} />,
  ul: (props: React.ComponentPropsWithoutRef<"ul">) => <ul className="list-disc list-outside leading-loose pl-6 mb-6 text-neutral-300" {...props} />,
  ol: (props: React.ComponentPropsWithoutRef<"ol">) => <ol className="list-decimal list-outside leading-loose pl-6 mb-6 text-neutral-300" {...props} />,
  code: (props: React.ComponentPropsWithoutRef<"code">) => <code className="bg-neutral-900 border border-neutral-800 rounded-md px-1.5 py-0.5 font-mono text-sm text-neutral-300" {...props} />,
  pre: (props: React.ComponentPropsWithoutRef<"pre">) => <pre className="bg-neutral-950 border border-neutral-800 rounded-xl p-4 overflow-x-auto my-8 shape-ticket" {...props} />
};

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const { post } = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <BlogPostClient post={post}>
      <MDXRemote 
        source={post.content.replace(/class=/g, 'className=')} 
        components={mdxComponents} 
      />
    </BlogPostClient>
  );
}
