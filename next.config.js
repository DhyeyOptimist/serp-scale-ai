/** @type {import('next').NextConfig} */
const nextConfig = {
  // Remove static export to enable server actions
  // output: 'export',
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
  experimental: {
    serverActions: true,
  },
};

module.exports = nextConfig;
