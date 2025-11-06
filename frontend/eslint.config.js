import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import prettierPlugin from 'eslint-plugin-prettier'

// ESLint v9 Flat Config
// This config enables TypeScript (with type-aware rules), React Hooks, and Vite/ESM env.
export default tseslint.config(
  // Global ignores
  {
    ignores: [
      'dist',
      'node_modules',
      'coverage',
      'vite/**/*',
      '**/*.gen.ts',
      '**/*.d.ts',
    ],
  },

  // TypeScript + React source files
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2023,
      sourceType: 'module',
      globals: globals.browser,
      parserOptions: {
        // Enable type-aware linting rules
        project: ['./tsconfig.json', './tsconfig.app.json', './tsconfig.node.json'],
        tsconfigRootDir: import.meta.dirname,
      },
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      prettier: prettierPlugin,
    },
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommended,
      ...tseslint.configs.recommendedTypeChecked,
      ...tseslint.configs.stylisticTypeChecked,
      // Enable Prettier and disable stylistic rules that conflict with it
      prettierPlugin.configs.recommended,
    ],
    rules: {
      // React Hooks rules
      ...reactHooks.configs.recommended.rules,

      // Allow React Fast Refresh with function components
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],

      // Common TS rule tuning
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
    },
  },

  // Plain JS files (if any)
  {
    files: ['**/*.{js,jsx,cjs,mjs}'],
    languageOptions: {
      ecmaVersion: 2023,
      sourceType: 'module',
      globals: { ...globals.browser, ...globals.node },
    },
    plugins: {
      prettier: prettierPlugin,
    },
    extends: [
      js.configs.recommended,
      prettierPlugin.configs.recommended,
    ],
  },

  // Node environment for config/build scripts
  {
    files: ['vite.config.*', 'eslint.config.js', 'vite/**/*.{ts,js}'],
    languageOptions: {
      globals: globals.node,
    },
    plugins: {
      prettier: prettierPlugin,
    },
    extends: [
      prettierPlugin.configs.recommended,
    ],
  },
)
