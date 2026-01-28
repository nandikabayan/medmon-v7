/* eslint-env node */
module.exports = {
  root: true,

  env: {
    browser: true,
    node: true,
    es2021: true,
  },

  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: 'latest',
    sourceType: 'module',
  },

  plugins: ['vue', '@typescript-eslint'],

  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-recommended',
    'plugin:@typescript-eslint/recommended',
  ],

  rules: {
    // =====================
    // Vue
    // =====================
    'vue/multi-word-component-names': 'off',
    'vue/no-mutating-props': 'off',
    'vue/require-default-prop': 'off',

    // =====================
    // TypeScript
    // =====================
    '@typescript-eslint/no-unused-vars': [
      'warn',
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
      },
    ],
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',

    // =====================
    // General
    // =====================
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
  },
};
