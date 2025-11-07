import path from 'node:path';
import { fileURLToPath } from 'node:url';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./libs/i18n/request.ts');
const projectRoot = path.dirname(fileURLToPath(import.meta.url));

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
  transpilePackages: ['sonner'],
  webpack: config => {
    config.resolve.alias = {
      ...(config.resolve.alias ?? {}),
      '@': projectRoot
    };

    return config;
  }
};

export default withNextIntl(nextConfig);
