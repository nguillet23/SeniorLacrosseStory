# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Project website for the XR Lacrosse Goalie Training senior design project (Villanova). Single page with six sections: Home, Unity, Hardware, Integration, Testing, Results. Repo: `nguillet23/SeniorLacrosseStory`. Live URL: https://nguillet23.github.io/SeniorLacrosseStory/

## Migration in progress (read this first)

The repo holds two sites side by side while a migration is underway on the `astro-migration` branch:

- **Legacy site** (root `index.html`, `css/style.css`, `js/script.js`): plain HTML/CSS/JS, no build. Reference only; it is deleted at cutover (Phase 9). ESLint and Prettier deliberately ignore it. Don't polish or extend it.
- **New site** (Astro 7 + strict TypeScript, `src/`, `public/`): currently just the scaffold. It is being built phase by phase (redesign, components, MDX content collections, JS port, media, CI/CD) per `Plans/astro-github-pages-migration.md`. `Plans/` is git-ignored (local only), so check there for the phase checklist and the decisions table (§10). Step 0 and Step 1 (scaffold) are done.

Key decisions from the plan: full redesign (not a CSS port), content in Markdown/MDX collections, self-hosted `.mp4` videos in `public/videos/` (not Git LFS), no Tailwind/React unless a concrete need appears.

## Commands

pnpm is the package manager (Node >= 22.12).

- `pnpm dev`: dev server, served under the base path: http://localhost:4321/SeniorLacrosseStory/
- `pnpm build`: static build to `dist/`; `pnpm preview` serves it (use this to test base-path behavior)
- `pnpm check`: `astro check` (type check)
- `pnpm lint` / `pnpm format:check` / `pnpm format`
- No test runner is configured yet.

## Gotchas

- **Base path:** `astro.config.mjs` sets `base: '/SeniorLacrosseStory'` and `trailingSlash: 'always'`. Root-absolute URLs like `/favicon.svg` break on Pages; build links and asset URLs from `import.meta.env.BASE_URL`.
- **TypeScript is pinned to 6.x** on purpose: `astro check` and `typescript-eslint` reject TypeScript 7. Don't upgrade until both support it.
- **esbuild build script** is approved via `allowBuilds` in `pnpm-workspace.yaml`; pnpm 12 blocks unapproved install scripts.

## Git workflow

**Never run `git commit` (or push); the user commits manually.** After finishing any coding task, end your reply by stating the commit that should be made: a suggested commit message (imperative, short subject line) and the files to include.

`main` is protected by rulesets in `.github/rulesets/` (PR required, 1 approval, squash merge only, linear history, no force push). Branch names must match `feature|fix|content|chore|docs/<lowercase-slug>` or be exactly `astro-migration`; other names are rejected. Add required status checks after the first CI run.
