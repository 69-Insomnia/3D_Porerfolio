/** @type {import('next').NextConfig} */
const nextConfig = {
  // Strict mode for development
  reactStrictMode: true,

  // SWC minification for faster builds
  swcMinify: true,

  // Image optimization
  images: {
    formats: ['image/avif', 'image/webp'],
  },

  // Performance optimizations
  compress: true,

  // Generate ETags for caching
  generateEtags: true,

  // Power by header (optional - set to false for production)
  poweredByHeader: false,

  // Production source maps (optional - disable for smaller builds)
  productionBrowserSourceMaps: false,

  // Trailing slash configuration
  trailingSlash: false,

  // Custom headers for security and caching
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
        ],
      },
    ];
  },

  // Redirects configuration (optional)
  async redirects() {
    return [];
  },

  // Rewrites configuration (optional)
  async rewrites() {
    return [];
  },
};

module.exports = nextConfig;
