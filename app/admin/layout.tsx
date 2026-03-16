import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

export default function AdminLayout({ children }: { children: ReactNode }) {
  // We'll wrap with auth check in server component
  return (
    <div className="min-h-screen bg-neutral-950 flex flex-col">
      <div className="border-b border-neutral-800 bg-black/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="font-display font-bold text-xl tracking-tight text-white flex items-center gap-2">
            <span className="text-primary-400">⚡</span> Admin Dashboard
          </div>
          <div className="flex items-center gap-4 text-sm text-neutral-400">
            <a href="/" className="hover:text-white transition-colors">← Back to Site</a>
          </div>
        </div>
      </div>
      <main className="flex-1 container mx-auto px-4 py-8">
        {children}
      </main>
    </div>
  );
}
