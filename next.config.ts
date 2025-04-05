import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: ['se2-backend.s3.ap-southeast-1.amazonaws.com'],
  },
};

export default nextConfig;
