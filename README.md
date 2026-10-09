# XR Lacrosse Goalie Training

Project website for the **Extended Reality Lacrosse Goalie Training** senior design project at Villanova University. The project combines a Magic Leap headset, Unity, and the Magic Leap controller to create an immersive goalie training system.

- **Repository:** https://github.com/xrlacrosse-nova/NovaXRLacrosse
- **Live site:** https://xrlacrosse-nova.github.io/NovaXRLacrosse/

The site is a single page built with [Astro](https://astro.build) and strict TypeScript. Content lives in Markdown/MDX and JSON files, and GitHub Actions publishes it to GitHub Pages.

## Running the site locally

You need Node 22.12 or newer and [pnpm](https://pnpm.io).

```sh
pnpm install
pnpm dev
```

Open http://localhost:4321/NovaXRLacrosse/ (the site is served under its Pages base path).

| Command                             | What it does                                    |
| ----------------------------------- | ----------------------------------------------- |
| `pnpm dev`                          | Dev server with live reload                     |
| `pnpm build`                        | Static build into `dist/`                       |
| `pnpm preview`                      | Serves `dist/` (use this to test the base path) |
| `pnpm check`                        | Type check (`astro check`)                      |
| `pnpm lint`                         | ESLint                                          |
| `pnpm format` / `pnpm format:check` | Prettier (write / check only)                   |

## Project layout

```
src/
├── content/
│   ├── sections/      # one .mdx file per page section (unity, hardware, integration, testing, finale)
│   ├── metrics.json   # testing metric cards
│   ├── testimonials.json
│   └── team.json      # team members
├── assets/images/     # images, optimized at build time
├── components/        # reusable Astro components
├── layouts/           # BaseLayout (head, SEO, fonts)
├── pages/             # index.astro and 404.astro
├── scripts/           # small typed modules: menu, active nav, scroll state, counters
└── styles/            # tokens.css (colors, spacing, type) and global.css
public/
├── videos/            # self-hosted .mp4 files
└── robots.txt
```

## Editing content

### Sections

Each section is one file in `src/content/sections/`. The frontmatter at the top sets the heading and behavior; the body is the text.

```mdx
---
title: Development environment
lead: Building with Unity and Magic Leap
navLabel: Unity
order: 1
variant: chalk
status: draft
---
```

- `title`: the section heading.
- `navLabel`: the label in the navigation bar.
- `order`: the position on the page.
- `variant`: `chalk` (light) or `turf` (dark).
- `status`: `draft` while the file holds placeholder text, `final` when it is done.

Replace each `<Todo>` block with your real text, then set `status: final` once a file has no placeholders left. A missing or invalid field fails the build.

### Metrics, testimonials and team

Edit `src/content/metrics.json`, `testimonials.json` and `team.json`. Each entry has an `order` and a `status`. A team member can have a photo: set `photo` to a path such as `../assets/images/team/nicholas.jpg`.

### Placeholder report

`pnpm build` prints a warning listing every section, metric and testimonial that is still a placeholder. It never fails the build, so use it as a to-do list.

## Adding images

1. Put the file in `src/assets/images/` (subfolders are fine, for example `unity/gameplay.png`). JPG, PNG, WebP, AVIF, GIF and SVG work.
2. Reference it by its path inside that folder, and always write `alt` text:

```mdx
<MediaBlock kind="image" src="unity/gameplay.png" alt="Goalie's view of an incoming shot" />

<Split media={{ kind: 'image', src: 'hardware/headset.jpg', alt: 'Magic Leap headset' }}>
```

Astro resizes the image and converts it to modern formats during the build. A wrong filename fails the build and lists the images it can find. Add `ratio="3 / 4"` (or `ratio: '3 / 4'` inside `Split`) for portrait photos; the default frame is 16:9.

## Adding videos

1. Compress the clip (H.264, 1080p or lower, ideally under 50 MB) and put the `.mp4` in `public/videos/`. GitHub rejects files over 100 MB, and Git LFS files are not served by GitHub Pages, so do not use LFS. Keep the original uncompressed files out of the repo.
2. Reference it, with a label and an optional poster image:

```mdx
<MediaBlock
  kind="video"
  src="videos/demo.mp4"
  poster="videos/demo-poster.jpg"
  label="Demo of a save in the training scene"
/>
```

For a clip that is too large, use a YouTube or Vimeo embed instead: `<MediaBlock kind="embed" src="https://www.youtube.com/embed/VIDEO_ID" title="Full system demo" />`.

## Contributing

`main` is protected: changes go in through pull requests that need one approval and use squash merge.

1. Create a branch from `main` named `feature/...`, `fix/...`, `content/...`, `chore/...`, or `docs/...` (lowercase; `astro-migration` is also allowed).
2. Make your changes and check them with `pnpm dev`. Before pushing, run `pnpm check`, `pnpm lint` and `pnpm format:check`.
3. Open a pull request into `main` and resolve any review comments.

The rules are defined in `.github/rulesets/` and can be imported in the GitHub repository settings under Rules, then Rulesets.

## How deploys work

- **Pull requests** run `.github/workflows/ci.yml`: lint, format check, type check and build, followed by a Lighthouse audit (performance 90, accessibility, best practices and SEO 95) and a link check.
- **Pushes to `main`** run `.github/workflows/deploy.yml`, which builds the site and publishes `dist/` to GitHub Pages. Merging a pull request is the whole release process.
- In the repository settings, Pages must use **GitHub Actions** as its source.

## Team

Villanova University Senior Design, 2026.

- Nicholas Guillet: Software Lead
- David Sadasivam: Hardware Lead
- William Macleod: Animation and Gameplay Lead

## License

Copyright © 2026 Villanova University. All rights reserved.
