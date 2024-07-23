module.exports = {
  root: true,
  env: {
    browser: true,
    es2020: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  settings: {
    react: {
      version: '18.2',
    },
  },
  plugins: ['react-refresh'],
  rules: {
    // Existing rules
    'react/jsx-no-target-blank': 'off',
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    // Add custom rules to avoid specific warnings
    'react/prop-types': 'off', // Turn off prop-types validation
    'react/no-unused-vars': 'off', // Turn off no-unused-vars warning for React
    'no-console': 'off', // Allow console statements
    'no-debugger': 'off', // Allow debugger statements
    'react/jsx-props-no-spreading': 'off', // Allow props spreading
    'react/jsx-no-duplicate-props': 'off', // Turn off duplicate props warning
    'react/no-array-index-key': 'off', // Allow array index as key
  },
};
