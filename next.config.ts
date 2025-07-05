import type { NextConfig } from "next";

const isProduction = process.env.NODE_ENV === 'production';

const nextConfig: NextConfig = {
  output: 'export',
  reactStrictMode: false,
  assetPrefix: isProduction ? `/blog.samlee.ch` : '',
  basePath: isProduction ? `/blog.samlee.ch` : '',
  trailingSlash: true,
  images: {
    domains: ['blog.samlee.ch'],
  },
};

export default nextConfig;
