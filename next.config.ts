import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ["@prisma/client", "prisma"],
  images: {
    qualities: [25, 50, 75, 90, 100],
  },
};

export default nextConfig;
