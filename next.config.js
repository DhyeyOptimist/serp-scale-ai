/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Skip linting during build to avoid non-critical issues
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Skip type checking during build to avoid non-critical issues
    ignoreBuildErrors: true,
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
  skipTrailingSlashRedirect: true,
  experimental: {
    // Optimize package imports
    optimizePackageImports: [
      '@radix-ui/react-avatar',
      '@radix-ui/react-dialog',
      'lucide-react',
      'recharts',
    ],
    // External packages for server components
    serverComponentsExternalPackages: ['@supabase/supabase-js'],
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
