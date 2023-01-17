module.exports = {
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  ignorePatterns: [
    '.github',
  ],
  root: true,
  env: {
    node: true,
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
    '@typescript-eslint/no-unused-vars': 'error',
    'quote-props': ['error', 'as-needed'],
    'eol-last': ['error', 'always'],
    '@typescript-eslint/object-curly-spacing': ['error', 'always'],
    'key-spacing': ['error', { afterColon: true }],
    'space-infix-ops': 'error',
    curly: 'error',
    'object-curly-newline': 'error',
    'brace-style': ['error', '1tbs'],
  },
};
