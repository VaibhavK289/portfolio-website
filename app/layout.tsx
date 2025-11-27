import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SmoothScrollProvider } from "@/components/SmoothScrollProvider";
import { PageTransitionWrapper } from "@/components/PageTransitionWrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://vaibhavk-portfolio.vercel.app"),
  title: {
    default: "Vaibhav Kumar Kandhway | Aspiring Full-Stack Developer",
    template: "%s | Vaibhav Kumar Kandhway",
  },
  description:
    "Aspiring full-stack developer seeking entry-level opportunities. Skilled in React, Next.js, Node.js, and modern web technologies with 5+ completed projects.",
  keywords: [
    "Entry Level Developer",
    "Full-Stack Developer",
    "React Developer",
    "Next.js",
    "Node.js",
    "TypeScript",
    "Web Developer",
    "Fresh Graduate",
  ],
  authors: [{ name: "Vaibhav Kumar Kandhway" }],
  creator: "Vaibhav Kumar Kandhway",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://vaibhavk-portfolio.vercel.app",
    siteName: "Vaibhav Kumar Kandhway Portfolio",
    title: "Vaibhav Kumar Kandhway | Aspiring Full-Stack Developer",
    description:
      "Aspiring full-stack developer seeking entry-level opportunities with 5+ projects in React, Next.js, and Node.js.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Vaibhav Kumar Kandhway - Aspiring Full-Stack Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Vaibhav Kumar Kandhway | Aspiring Full-Stack Developer",
    description:
      "Aspiring full-stack developer seeking entry-level opportunities with 5+ projects in React, Next.js, and Node.js.",
    images: ["/og-image.png"],
    creator: "@yourusername",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-neutral-950 text-white`}
      >
        <ThemeProvider>
          <SmoothScrollProvider>
            <div className="flex min-h-screen flex-col">
              <Header />
              <main className="flex-1 pt-20">
                <PageTransitionWrapper>
                  {children}
                </PageTransitionWrapper>
              </main>
              <Footer />
            </div>
          </SmoothScrollProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
