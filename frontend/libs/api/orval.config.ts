import { defineConfig } from 'orval';

export default defineConfig({
  marketplace: {
    input: '../../../docs/openapi.yaml',
    output: {
      target: './generated.ts',
      schemas: './schemas',
      client: 'react-query',
      mode: 'single',
      prettier: true,
      override: {
        mutator: {
          path: './mutator.ts',
          name: 'httpMutator',
        },
      },
    },
    hooks: {
      afterAllFilesWrite: ['pnpm format:write --loglevel silent'],
    },
  },
});
