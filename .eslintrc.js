module.exports = {
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  root: true,
  env: {
    'node': true,
  },
  rules: {
    semi: ['error', 'always'],
    'no-trailing-spaces': 'error',
    'no-extra-parens': 'error',
    indent: ['error', 2],
    'comma-dangle': ['error', 'always-multiline'],
    quotes: ['error', 'single'],
    'max-len': ['warn', 120],
    'prefer-const': 'error',
    '@typescript-eslint/no-explicit-any': 'error',
  },
};
