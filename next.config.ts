import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  reactStrictMode: false,
  images: {
    domains: ['blog.samlee.ch'],
  },
};

export default nextConfig;
