import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    domains: ['blog.samlee.ch'],
  },
};

export default nextConfig;
