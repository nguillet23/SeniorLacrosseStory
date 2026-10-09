# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Project website for the XR Lacrosse Goalie Training senior design project (Villanova). Single page with six sections: Home, Unity, Hardware, Integration, Testing, Results. Repo: `xrlacrosse-nova/NovaXRLacrosse`. Live URL: https://xrlacrosse-nova.github.io/NovaXRLacrosse/

## Migration in progress (read this first)

The repo holds two sites side by side while a migration is underway on the `astro-migration` branch:

- **Legacy site** (root `index.html`, `css/style.css`, `js/script.js`): plain HTML/CSS/JS, no build. Reference only; it is deleted at cutover (Phase 9). ESLint and Prettier deliberately ignore it. Don't polish or extend it.
- **New site** (Astro 7 + strict TypeScript, `src/`, `public/`): built phase by phase (redesign, components, MDX content collections, JS port, media, CI/CD) per `Plans/astro-github-pages-migration.md`. `Plans/` is git-ignored (local only), so check there for the phase checklist and the decisions table (§10). Steps 0 to 3 are done (scaffold, design system and layout, components). The page in `src/pages/index.astro` still holds placeholder copy inline; Step 4 moves it into content collections.

Key decisions from the plan: full redesign (not a CSS port), content in Markdown/MDX collections, self-hosted `.mp4` videos in `public/videos/` (not Git LFS), no Tailwind/React unless a concrete need appears.

## Commands

pnpm is the package manager (Node >= 22.12).

- `pnpm dev`: dev server, served under the base path: http://localhost:4321/NovaXRLacrosse/
- `pnpm build`: static build to `dist/`; `pnpm preview` serves it (use this to test base-path behavior)
- `pnpm check`: `astro check` (type check)
- `pnpm lint` / `pnpm format:check` / `pnpm format`
- No test runner is configured yet.

## Gotchas

- **Base path:** `astro.config.mjs` sets `base: '/NovaXRLacrosse'` and `trailingSlash: 'always'`. Root-absolute URLs like `/favicon.svg` break on Pages; build links and asset URLs from `import.meta.env.BASE_URL`.
- **TypeScript is pinned to 6.x** on purpose: `astro check` and `typescript-eslint` reject TypeScript 7. Don't upgrade until both support it.
- **Don't name a component prop `role`:** the jsx-a11y lint rule reads it as an ARIA role and fails. Use `position` (see `TeamMember`, `Testimonial`).
- **Media text alternatives are enforced by types:** `MediaBlock` is a union on `kind`; a missing `alt` (image), `label` (video, placeholder) or `title` (embed) fails `pnpm check`.
- **esbuild build script** is approved via `allowBuilds` in `pnpm-workspace.yaml`; pnpm 12 blocks unapproved install scripts.

## Markdown files

**Do not create or edit any `.md` file (README.md, CLAUDE.md, anything under `Plans/`) unless the user explicitly asks.** If code changes make a doc stale, say so in the reply and let the user decide.

## Git workflow

**Never run `git commit` (or push); the user commits manually.** After finishing any coding task, end your reply by stating the commit that should be made: a suggested commit message (imperative, short subject line) and the files to include.

`main` is protected by rulesets in `.github/rulesets/` (PR required, 1 approval, squash merge only, linear history, no force push). Branch names must match `feature|fix|content|chore|docs/<lowercase-slug>` or be exactly `astro-migration`; other names are rejected. Add required status checks after the first CI run.
