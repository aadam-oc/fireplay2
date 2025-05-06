import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:slug',
        destination: 'https://api.rawg.io/api/games/:slug', // Proxy hacia la API RAWG
      },
    ];
  },
};

export default nextConfig;
