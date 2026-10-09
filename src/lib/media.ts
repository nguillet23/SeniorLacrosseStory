import type { ImageMetadata } from 'astro';

// Every file under src/assets/images/ (any subfolder) can be referenced by its path relative to
// that folder, for example "unity/gameplay.png". Astro optimizes them at build time.
const images = import.meta.glob<{ default: ImageMetadata }>(
  '/src/assets/images/**/*.{jpg,jpeg,png,webp,avif,gif,svg}',
  { eager: true },
);

const PREFIX = '/src/assets/images/';

export function resolveImage(name: string): ImageMetadata {
  const match = images[`${PREFIX}${name.replace(/^\/+/, '')}`];
  if (!match) {
    const available = Object.keys(images).map((key) => key.slice(PREFIX.length));
    throw new Error(
      `Image "${name}" not found in src/assets/images/. ` +
        (available.length ? `Available: ${available.join(', ')}` : 'The folder has no images yet.'),
    );
  }
  return match.default;
}
