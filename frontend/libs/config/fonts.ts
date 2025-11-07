import localFont from 'next/font/local';
import { Inter } from 'next/font/google';

export const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

export const cairo = localFont({
  variable: '--font-rtl',
  display: 'swap',
  src: [
    {
      path: '../../public/fonts/cairo/cairo-arabic.woff2',
      weight: '400 700',
      style: 'normal',
    },
  ],
});

export const heading = Inter({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-heading',
  display: 'swap',
});
