```javascript
module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'prettier'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended' // Enables eslint-plugin-prettier and eslint-config-prettier
  ],
  env: {
    node: true,
    jest: true,
    es2020: true
  },
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module'
  },
  rules: {
    // Add custom rules here
    '@typescript-eslint/no-explicit-any': 'off', // Allow 'any' for flexibility in examples
    '@typescript-eslint/explicit-module-boundary-types': 'off', // Allow inferred return types
    'prettier/prettier': 'error' // Enforce Prettier formatting
  }
};
```