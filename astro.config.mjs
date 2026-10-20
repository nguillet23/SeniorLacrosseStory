// @ts-check
import process from 'node:process';
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

// On GitHub Actions, derive site and base from the repo being deployed so the
// same build works for xrlacrosse-nova/NovaXRLacrosse and nguillet23/SeniorLacrosseStory.
const [owner, repo] = (process.env.GITHUB_REPOSITORY ?? 'xrlacrosse-nova/NovaXRLacrosse').split(
  '/',
);

// https://astro.build/config
export default defineConfig({
  site: `https://${owner}.github.io`,
  base: `/${repo}`,
  output: 'static',
  trailingSlash: 'always',
  integrations: [mdx(), sitemap()],
});
