import { getPostBySlug } from "@/actions/post";
import { notFound } from "next/navigation";
import BlogPostClient from "./BlogPostClient";

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const { post } = await getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  return <BlogPostClient post={post} />;
}
