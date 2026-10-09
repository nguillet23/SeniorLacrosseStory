// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://xrlacrosse-nova.github.io',
  base: '/NovaXRLacrosse',
  output: 'static',
  trailingSlash: 'always',
  integrations: [mdx(), sitemap()],
});
