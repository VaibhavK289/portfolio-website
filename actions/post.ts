"use server";

import prisma from "@/lib/db";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";

export async function savePost(
  title: string,
  content: string,
  tags: string[],
  postId?: string,
  publish: boolean = false
) {
  const session = await auth();
  
  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  // Generate a basic slug from title
  const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");
  
  // Create excerpt from content
  const excerptMatch = content.match(/<p>(.*?)<\/p>/);
  const excerpt = excerptMatch ? excerptMatch[1].substring(0, 160) + "..." : "";

  // Calculate reading time
  const words = content.replace(/<[^>]*>?/gm, '').split(/\s+/).length;
  const readingTime = Math.ceil(words / 200);

  try {
    let post;

    if (postId && postId !== "new") {
       post = await prisma.post.update({
         where: { id: postId },
         data: {
           title,
           content,
           excerpt,
           readingTime,
           published: publish,
           // Currently simplified tag handling for local DB
         }
       });
    } else {
       post = await prisma.post.create({
         data: {
           title,
           slug: slug + "-" + Date.now().toString().slice(-4), // Prevent collisions
           content,
           excerpt,
           readingTime,
           published: publish,
           authorId: session.user.id
         }
       });
    }

    revalidatePath("/blog");
    revalidatePath("/admin");
    return { success: true, postId: post.id };
  } catch (error) {
    console.error("Failed to save post:", error);
    return { success: false, error: "Failed to save to database." };
  }
}

export async function getPosts(publishedOnly: boolean = false) {
   try {
      const posts = await prisma.post.findMany({
         where: publishedOnly ? { published: true } : undefined,
         orderBy: { createdAt: 'desc' },
         include: { tags: true }
      });
      return { success: true, posts };
   } catch (error) {
      console.error(error);
      return { success: false, posts: [] };
   }
}

export async function getPostBySlug(slug: string) {
   try {
      const post = await prisma.post.findUnique({
         where: { slug },
         include: { tags: true }
      });
      return { success: true, post };
   } catch (error) {
       console.error(error);
       return { success: false, post: null };
   }
}
