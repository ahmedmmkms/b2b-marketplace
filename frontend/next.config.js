const createNextIntlPlugin = require('next-intl/plugin');

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true, // Required for Cloudflare Pages
  images: {
    unoptimized: true // Required for static exports
  },
  experimental: {
    serverComponentsExternalPackages: ['@libsql/client']
  }
};

module.exports = withNextIntl(nextConfig);
