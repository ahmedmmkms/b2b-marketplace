import { nextIntlPlugin } from 'next-intl/plugin';

const withNextIntl = nextIntlPlugin('./libs/i18n/request.ts');

const nextConfig = {
  experimental: {
    serverActions: true
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**'
      }
    ]
  },
  reactStrictMode: true
};

export default withNextIntl(nextConfig);
