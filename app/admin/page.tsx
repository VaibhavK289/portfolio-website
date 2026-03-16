import { auth, signIn, signOut } from "@/auth";
import { getPosts } from "@/actions/post";
import Link from "next/link";
import { Post } from "@prisma/client";

export default async function AdminDashboard() {
  const session = await auth();

  if (!session?.user) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="p-8 glass rounded-2xl max-w-sm w-full text-center">
          <h1 className="text-2xl font-bold font-display mb-2">Editor Access</h1>
          <p className="text-neutral-400 mb-6 text-sm">Please sign in to access the drafting dashboard.</p>
          <form
            action={async () => {
              "use server";
              await signIn("google");
            }}
          >
            <button className="w-full py-3 px-4 bg-white text-black font-semibold rounded-lg hover:bg-neutral-200 transition-colors">
              Sign in with Google
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Fetch true posts
  const { posts } = await getPosts();
  const publishedCount = posts?.filter((p: Post) => p.published).length || 0;
  const draftCount = posts?.filter((p: Post) => !p.published).length || 0;

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold font-display tracking-tight text-white mb-1">
            Welcome back, {session.user.name?.split(" ")[0]}
          </h1>
          <p className="text-neutral-400">Manage your posts, essays and drafts.</p>
        </div>
        <form
          action={async () => {
            "use server";
            await signOut();
          }}
        >
          <button className="px-4 py-2 border border-neutral-800 text-neutral-300 rounded-lg hover:bg-neutral-900 transition-colors text-sm font-medium">
            Sign Out
          </button>
        </form>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="glass p-6 rounded-2xl border border-neutral-800">
          <div className="text-sm font-medium text-neutral-400 mb-1">Published Posts</div>
          <div className="text-3xl font-display font-bold text-primary-400">{publishedCount}</div>
        </div>
        <div className="glass p-6 rounded-2xl border border-neutral-800">
          <div className="text-sm font-medium text-neutral-400 mb-1">Drafts</div>
          <div className="text-3xl font-display font-bold">{draftCount}</div>
        </div>
        <div className="glass p-6 rounded-2xl border border-neutral-800 bg-gradient-to-br from-neutral-900 to-black hover:border-primary-500/30 transition-colors">
          <Link href="/admin/editor/new" className="h-full flex flex-col items-center justify-center text-center group">
            <div className="w-10 h-10 rounded-full bg-primary-500/10 text-primary-400 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
              +
            </div>
            <span className="font-medium text-white group-hover:text-primary-400 transition-colors">Write New Post</span>
          </Link>
        </div>
      </div>
{/* Database List */}
      <div className="mt-12">
        <h2 className="text-xl font-display font-bold mb-4">Your Content</h2>
        <div className="glass rounded-xl border border-neutral-800 divide-y divide-neutral-800/50">
           {posts?.map((post: any) => (
              <div key={post.id} className="p-4 flex items-center justify-between hover:bg-neutral-900/50 transition-colors">
                  <div>
                    <Link href={`/admin/editor/${post.id}`} className="font-bold text-white hover:text-primary-400 transition-colors">
                      {post.title}
                    </Link>
                    <div className="text-sm text-neutral-500 mt-1">
                      {new Date(post.createdAt).toLocaleDateString()} • {post.readingTime} min read
                    </div>
                  </div>
                  <span className={`px-2 py-1 text-xs rounded-lg font-medium ${post.published ? 'bg-primary-500/10 text-primary-400' : 'bg-neutral-800 text-neutral-400'}`}>
                    {post.published ? 'Published' : 'Draft'}
                  </span>
              </div>
           ))}
           {(!posts || posts.length === 0) && (
              <div className="p-8 text-center text-neutral-500 text-sm">
                 No posts found. Start writing!
              </div>
           )}
        </div>
      </div>
    </div>
  );
}
