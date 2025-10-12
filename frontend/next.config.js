const createNextIntlPlugin = require('next-intl/plugin');

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // For static export compatible with Cloudflare Pages
  trailingSlash: true, // Required for Cloudflare Pages
  images: {
    unoptimized: true // Required for static exports
  },
  experimental: {
    serverComponentsExternalPackages: ['@libsql/client']
  }
};

module.exports = withNextIntl(nextConfig);
