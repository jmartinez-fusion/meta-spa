module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  extends: [
    'standard-with-typescript',
    'plugin:react/recommended',
    'eslint:recommended',
    'plugin:prettier/recommended',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    // project: './tsconfig.json',
  },
  plugins: ['react'],
  rules: {
    'react/prop-types': 'off',
    'react-refresh/only-export-components': ['off', { allowConstantExport: true }],
    'prettier/prettier': 'error',
    'react/react-in-jsx-scope': 'off',
    '@typescript-eslint/prefer-ts-expect-error': 'off',
    '@typescript-eslint/strict-boolean-expressions': 0,
  },
}
