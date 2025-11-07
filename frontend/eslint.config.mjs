import eslintConfigNext from 'eslint-config-next';
import eslintConfigPrettier from 'eslint-config-prettier';

export default [
  {
    ignores: ['**/dist/**', '**/.next/**']
  },
  ...eslintConfigNext(),
  {
    rules: {
      '@next/next/no-img-element': 'off',
      'react-hooks/exhaustive-deps': 'warn',
      'react/jsx-key': 'error'
    }
  },
  eslintConfigPrettier
];
