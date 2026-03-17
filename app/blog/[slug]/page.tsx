import { getPostBySlug } from "@/actions/post";
import { notFound } from "next/navigation";
import BlogPostClient from "./BlogPostClient";

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const { post } = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return <BlogPostClient post={post} />;
}
