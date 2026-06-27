import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import sveltePlugin from 'eslint-plugin-svelte';
import tailwindPlugin from 'eslint-plugin-tailwindcss';
import globals from 'globals';

export default tseslint.config(
  js.configs.recommended,
  ...tseslint.configs.recommended,
  ...sveltePlugin.configs['flat/recommended'],
  {
    plugins: { tailwindcss: tailwindPlugin },
    settings: {
      tailwindcss: {
        cssConfigPath: 'src/app.css',
      },
    },
    rules: {
      ...tailwindPlugin.configs.recommended.rules,
    },
  },
  {
    languageOptions: {
      globals: { ...globals.browser },
    },
  },
  {
    files: ['**/*.svelte'],
    languageOptions: {
      parserOptions: {
        parser: tseslint.parser,
      },
    },
  },
  {
    ignores: ['dist/**', 'node_modules/**'],
  }
);
