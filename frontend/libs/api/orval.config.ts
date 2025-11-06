import { defineConfig } from 'orval';
import path from 'node:path';

const tsconfigPath = path.join(process.cwd(), 'tsconfig.codegen.json');

export default defineConfig({
  miniMvp: {
    input: path.join(process.cwd(), '..', 'docs', 'openapi.yaml'),
    output: {
      target: './libs/api/orval-generated.ts',
      schemas: './libs/api/orval-schemas',
      mode: 'tags-split',
      client: 'react-query',
      tsconfig: tsconfigPath,
      override: {
        mutator: {
          path: path.join(process.cwd(), 'libs', 'api', 'orval-mutator.ts'),
          name: 'orvalMutator'
        }
      }
    }
  }
});
