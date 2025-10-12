import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  experimental: {
    serverComponentsExternalPackages: ['@libsql/client']
  }
};

const withNextIntl = createNextIntlPlugin('./next-intl.config.js');

export default withNextIntl(nextConfig);