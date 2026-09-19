/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,
  // Cap the page-data-collection worker pool. Next.js spawns one worker per CPU
  // by default, which OOMs memory-constrained CI/hosting environments (2GB limit)
  // while collecting 500+ routes. Four workers keep builds deterministic.
  experimental: {
    cpus: 2,
  },
  // Keep the stable Next.js configuration. Experimental cacheComponents was
  // previously disabled because it interfered with stable development/build behavior.
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  async headers() {
    return [
      {
        source: '/sw.js',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=0, must-revalidate',
          },
          {
            key: 'Service-Worker-Allowed',
            value: '/',
          },
        ],
      },
      {
        source: '/manifest.json',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=0, must-revalidate',
          },
        ],
      },
      {
        source: '/icon-:size(48|72|96|128|144|152|192|256|384|512)x:size.png',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/apple-touch-icon.png',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
