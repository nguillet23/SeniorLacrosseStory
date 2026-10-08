# XR Lacrosse Goalie Training

Project website for the **Extended Reality Lacrosse Goalie Training** senior design project at Villanova University. The project combines a Magic Leap headset, Unity, and the Magic Leap controller to create an immersive goalie training system.

- **Repository:** https://github.com/nguillet23/SeniorLacrosseStory
- **Planned site URL:** https://nguillet23.github.io/SeniorLacrosseStory/

## Sections

The site is a single page with these sections:

1. **Home**: project overview
2. **Unity**: development environment (Unity and Magic Leap)
3. **Hardware**: the Magic Leap headset and controller
4. **Integration**: full system architecture
5. **Testing**: methodology, metrics, and user feedback
6. **Results**: outcomes, lessons learned, and the team

## Current State

The site is currently plain HTML, CSS, and JavaScript with no build step. Most content is still placeholder text. To view it, open `index.html` in a browser.

```
.
├── index.html      # page markup
├── css/style.css   # styles
├── js/script.js    # nav, scroll effects, animations
├── images/         # project images
└── videos/         # demo videos (.mp4)
```

## Editing Content

Until the migration lands, content lives directly in `index.html`.

1. **Find a placeholder.** Search the file for `placeholder-text` (grey bracketed text such as `[Your explanation of ...]`) or `placeholder-media` (boxes that stand in for images and video).
2. **Replace the text.** Delete the brackets and write your content. Keep the surrounding tags.
3. **Add an image.** Put the file in `images/` (JPG or WebP, ideally under 500 KB), then replace the `placeholder-media` block with `<img src="images/your-file.jpg" alt="Describe the image">`. Always write meaningful `alt` text.
4. **Add a video.** Put the `.mp4` in `videos/` and replace the placeholder block with `<video controls preload="metadata" src="videos/your-file.mp4"></video>`. GitHub rejects files over 100 MB and warns above 50 MB, so compress videos (H.264, 1080p or lower) and keep each clip short.
5. **Preview.** Open `index.html` in a browser and check it on a narrow window as well.
6. **Submit.** Work on a branch, commit, and open a pull request into `main` (see Contributing).

## Planned Migration

The site is moving to [Astro](https://astro.build) with TypeScript and Markdown/MDX content, a fresh visual design, and deployment to GitHub Pages with GitHub Actions. The plan is kept locally in `Plans/` (git-ignored). Once the migration lands, this README will be updated with the new setup and content-editing instructions.

|           | Now                         | After migration                  |
| --------- | --------------------------- | -------------------------------- |
| Framework | None (static HTML)          | Astro (static output)            |
| Language  | JavaScript                  | TypeScript                       |
| Content   | Written in HTML             | Markdown/MDX content collections |
| Design    | Original placeholder design | Redesign                         |
| Hosting   | Not deployed                | GitHub Pages via GitHub Actions  |

## Contributing

`main` is protected: changes go in through pull requests that need one approval and use squash merge.

1. Create a branch from `main` named `feature/...`, `fix/...`, `content/...`, `chore/...`, or `docs/...` (lowercase; `astro-migration` is also allowed).
2. Make your changes and check them in a browser.
3. Open a pull request into `main` and resolve any review comments.

The rules are defined in `.github/rulesets/` and can be imported in the GitHub repository settings under Rules, then Rulesets.

## Team

Villanova University Senior Design, 2026.

- David Sadasivam: Hardware Lead
- William Macleod: Animation and Gameplay Lead

## License

Copyright © 2026 Villanova University. All rights reserved.
