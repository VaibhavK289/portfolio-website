import type { Metadata } from "next";
import { Geist, Geist_Mono, Space_Grotesk } from "next/font/google";
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

// Display font for hero headings - adds typographic contrast
const spaceGrotesk = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://vaibhavk-portfolio.vercel.app"),
  title: {
    default: "Vaibhav Kumar Kandhway | Full-Stack Developer",
    template: "%s | Vaibhav Kumar Kandhway",
  },
  description:
    "Full-stack developer building production-ready applications with React, Next.js, and Node.js. Final-year CS student at VIT shipping real projects with real users.",
  keywords: [
    "Full-Stack Developer",
    "React Developer",
    "Next.js Developer",
    "Node.js",
    "TypeScript",
    "Web Developer",
    "Vellore Institute of Technology",
    "Software Engineer",
  ],
  authors: [{ name: "Vaibhav Kumar Kandhway" }],
  creator: "Vaibhav Kumar Kandhway",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://vaibhavk-portfolio.vercel.app",
    siteName: "Vaibhav Kumar Kandhway Portfolio",
    title: "Vaibhav Kumar Kandhway | Full-Stack Developer",
    description:
      "Full-stack developer building production-ready applications with React, Next.js, and Node.js. Projects with real users and real impact.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Vaibhav Kumar Kandhway - Full-Stack Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Vaibhav Kumar Kandhway | Full-Stack Developer",
    description:
      "Full-stack developer building production-ready applications. Final-year CS student at VIT shipping real projects.",
    images: ["/og-image.png"],
    creator: "@VaibhavK289",
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
        className={`${geistSans.variable} ${geistMono.variable} ${spaceGrotesk.variable} antialiased bg-neutral-950 text-white`}
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
