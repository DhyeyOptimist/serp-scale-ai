/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { 
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
      },
      // Allow Supabase storage URLs for images
      {
        protocol: 'https',
        hostname: '*.supabase.co',
      },
    ],
  },
  experimental: {
    // Next.js 14 server actions configuration
    serverActions: true,
    // Optimize for Edge runtime
    optimizePackageImports: [
      '@radix-ui/react-avatar',
      '@radix-ui/react-dialog',
      'lucide-react',
      'recharts',
    ],
  },
  
  // Suppress Supabase realtime warnings in build
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
      };
    }
    return config;
  },
  // Vercel specific settings for optimal builds
  poweredByHeader: false,
  reactStrictMode: true,
};

module.exports = nextConfig;
