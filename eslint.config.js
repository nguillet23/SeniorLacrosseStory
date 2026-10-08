import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import astro from 'eslint-plugin-astro';
import globals from 'globals';

export default [
  {
    ignores: ['dist/', '.astro/', 'node_modules/', 'Plans/', 'index.html', 'css/', 'js/'],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  // Includes the jsx-a11y rules for Astro templates
  ...astro.configs['flat/jsx-a11y-recommended'],
  {
    languageOptions: { globals: { ...globals.browser } },
  },
];
