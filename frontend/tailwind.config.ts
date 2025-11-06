import type { Config } from 'tailwindcss';
import { fontFamily } from 'tailwindcss/defaultTheme';

const config: Config = {
  darkMode: 'class',
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './features/**/*.{ts,tsx}',
    './libs/**/*.{ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#2363EB',
          foreground: '#FFFFFF'
        },
        accent: {
          DEFAULT: '#00B894',
          foreground: '#0F172A'
        },
        success: '#12B76A',
        warning: '#F79009',
        danger: '#F04438'
      },
      fontFamily: {
        sans: ['var(--font-inter)', ...fontFamily.sans],
        arabic: ['var(--font-cairo)', ...fontFamily.sans]
      },
      boxShadow: {
        brand: '0 18px 40px -15px rgba(35, 99, 235, 0.35)'
      }
    }
  },
  plugins: []
};

export default config;
