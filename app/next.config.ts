import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {},
  // Disable development indicators
  devIndicators: false,
  // Allow images from common sources
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: '**.githubusercontent.com' },
      { protocol: 'https', hostname: '**.googleusercontent.com' },
    ],
  },
  // Disable TypeScript and ESLint errors during development
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;