import { defineConfig } from 'vitest/config';
import path from 'node:path';

export default defineConfig({
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./vitest.setup.ts'],
    css: false,
    exclude: [
      '**/node_modules/**',
      'dist/**',
      '.next/**',
      'coverage/**',
      'e2e/**',
      'e2e_tests/**'
    ]
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '.')
    }
  }
});
