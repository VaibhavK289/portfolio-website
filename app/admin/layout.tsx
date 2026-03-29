import { ReactNode } from "react";
import Link from 'next/link';
import { auth } from "@/auth";
import { SessionProvider } from "next-auth/react";
import AdminSignIn from "@/components/admin/AdminSignIn";

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const session = await auth();

  // Show sign-in page if not authenticated
  if (!session?.user) {
    return (
      <SessionProvider>
        <AdminSignIn />
      </SessionProvider>
    );
  }

  return (
    <SessionProvider session={session}>
      <div className="min-h-screen bg-neutral-950 flex flex-col">
        <div className="border-b border-neutral-800 bg-black/50 backdrop-blur-xl sticky top-0 z-50">
          <div className="container mx-auto px-4 h-16 flex items-center justify-between">
            <div className="flex items-center gap-4">
            <Link href="/admin" className="font-display font-bold text-xl text-neutral-900 dark:text-white">
              Admin
            </Link>
            <div className="h-4 w-px bg-neutral-200 dark:bg-neutral-800" />
            <nav className="hidden md:flex items-center gap-2 text-sm text-neutral-500">
              <Link href="/admin" className="hover:text-primary-500 transition-colors">
                Dashboard
              </Link>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-xs text-neutral-500 hidden sm:inline">
              {session.user.email}
            </span>
            <Link 
              href="/"
              className="text-sm font-medium text-neutral-500 hover:text-primary-500 transition-colors"
            >
              View Live Site
            </Link>
          </div>
          </div>
        </div>
        <main className="flex-1 container mx-auto px-4 py-8">
          {children}
        </main>
      </div>
    </SessionProvider>
  );
}
