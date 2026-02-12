import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  experimental: {
    ppr: true,
  },
  images: {
    unoptimized: true,

    remotePatterns: [
      {
        hostname: 'avatar.vercel.sh',
        
      },
    ],
  },
};

export default nextConfig;
