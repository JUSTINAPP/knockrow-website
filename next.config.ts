import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // Sanity's image CDN — used once a real Sanity project is connected
      // (see src/lib/sanity.ts). Harmless to leave in even before that.
      { protocol: 'https', hostname: 'cdn.sanity.io' },
    ],
  },
}

export default nextConfig
