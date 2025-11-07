import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./libs/i18n/request.ts');

const nextConfig = {
  experimental: {
    typedRoutes: true
  },
  eslint: {
    dirs: ['app', 'components', 'libs', 'messages']
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**'
      }
    ]
  },
  transpilePackages: ['sonner']
};

export default withNextIntl(nextConfig);
