import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  productionBrowserSourceMaps: false,
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  async redirects() {
    return [
      // Keep a single canonical path shape for article collections.
      { source: '/blogs', destination: '/blog', permanent: true },
      { source: '/guide', destination: '/guides', permanent: true },
      { source: '/comparison', destination: '/compare', permanent: true },
      { source: '/comparisons', destination: '/compare', permanent: true },

      // Conventional aliases people type or link to, pointed at the real page
      // rather than left to 404.
      { source: '/privacy-policy', destination: '/privacy', permanent: true },
      { source: '/terms-of-service', destination: '/terms', permanent: true },
      { source: '/terms-and-conditions', destination: '/terms', permanent: true },
      { source: '/author/:slug', destination: '/authors/:slug', permanent: true },
      { source: '/team', destination: '/authors', permanent: true },

      // Feed and sitemap discovery conventions.
      { source: '/rss', destination: '/rss.xml', permanent: true },
      { source: '/feed', destination: '/rss.xml', permanent: true },
      { source: '/feed.xml', destination: '/rss.xml', permanent: true },
      { source: '/atom.xml', destination: '/rss.xml', permanent: true },
      { source: '/sitemap', destination: '/sitemap.xml', permanent: true },

      // Sections that live as anchors on a larger page.
      { source: '/disclosure', destination: '/about#funding', permanent: true },
      { source: '/funding', destination: '/about#funding', permanent: true },
      {
        source: '/editorial-policy',
        destination: '/about#editorial-standards',
        permanent: true,
      },
      {
        source: '/editorial-standards',
        destination: '/about#editorial-standards',
        permanent: true,
      },
      { source: '/templates', destination: '/resources#templates', permanent: true },
      { source: '/checklists', destination: '/resources#checklists', permanent: true },
      {
        source: '/whitepapers',
        destination: '/resources#compliance',
        permanent: true,
      },
      { source: '/newsletter', destination: '/#home-newsletter', permanent: true },
      { source: '/subscribe', destination: '/#home-newsletter', permanent: true },

      // Shorthand and the pre-rename URL for the Inventive AI review.
      {
        source: '/compare/inventive-ai',
        destination: '/compare/inventive-ai-review',
        permanent: true,
      },
      {
        source: '/inventive-ai',
        destination: '/compare/inventive-ai-review',
        permanent: true,
      },
      {
        source: '/compare/how-inventive-ai-approaches-rfp-automation',
        destination: '/compare/inventive-ai-review',
        permanent: true,
      },
      { source: '/best-rfp-software', destination: '/compare/best-rfp-software', permanent: true },
      { source: '/vendors', destination: '/compare', permanent: true },
    ];
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'X-DNS-Prefetch-Control', value: 'on' },
        ],
      },
    ];
  },
};

export default nextConfig;
