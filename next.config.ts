import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    // Add remote hosts here if product/hero images end up served from a CMS or CDN
    // instead of the local /public folder — same pattern Volpino uses for Sanity.
    remotePatterns: [],
  },
}

export default nextConfig
