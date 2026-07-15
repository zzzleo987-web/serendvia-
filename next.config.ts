import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  distDir: "dist",
  experimental: {
    inlineCss: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "media.istockphoto.com",
      },
    ],
  },
};


export default nextConfig;
