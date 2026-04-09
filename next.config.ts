import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true
  },
  images: {
    remotePatterns: [{ protocol: 'https', hostname: 'i.ytimg.com' }]
  }
};

export default nextConfig;
