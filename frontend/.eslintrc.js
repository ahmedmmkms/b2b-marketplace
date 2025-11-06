module.exports = {
  root: true,
  extends: ['next', 'next/core-web-vitals'],
  parserOptions: {
    ecmaVersion: 2023
  },
  rules: {
    'no-console': ['warn', { allow: ['warn', 'error'] }],
    '@next/next/no-img-element': 'off'
  }
};
