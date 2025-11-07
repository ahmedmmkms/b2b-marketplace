import path from 'node:path';
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '.'),
      '@/*': path.resolve(__dirname, '.'),
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./tests/setup/vitest-setup.ts'],
    include: [
      'app/**/*.{test,spec}.{ts,tsx}',
      'components/**/*.{test,spec}.{ts,tsx}',
      'libs/**/*.{test,spec}.{ts,tsx}',
    ],
    coverage: {
      reporter: ['text', 'html'],
      thresholds: {
        statements: 0.75,
        branches: 0.7,
        functions: 0.75,
        lines: 0.8,
      },
    },
  },
});
