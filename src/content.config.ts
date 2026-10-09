import { defineCollection } from 'astro:content';
import { file, glob } from 'astro/loaders';
import { z } from 'astro/zod';

// "draft" content still holds placeholder text. The build lists it in a warning (see lib/drafts.ts).
const status = z.enum(['draft', 'final']).default('draft');

const sections = defineCollection({
  loader: glob({ pattern: '*.mdx', base: './src/content/sections' }),
  schema: z.object({
    title: z.string(),
    lead: z.string().optional(),
    navLabel: z.string(),
    order: z.number().int(),
    variant: z.enum(['chalk', 'turf']).default('chalk'),
    status,
  }),
});

const metrics = defineCollection({
  loader: file('src/content/metrics.json'),
  schema: z.object({
    value: z.string(),
    label: z.string(),
    note: z.string(),
    order: z.number().int(),
    status,
  }),
});

const testimonials = defineCollection({
  loader: file('src/content/testimonials.json'),
  schema: z.object({
    author: z.string(),
    position: z.string().optional(),
    quote: z.string(),
    order: z.number().int(),
    status,
  }),
});

const team = defineCollection({
  loader: file('src/content/team.json'),
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      position: z.string(),
      // Path relative to team.json, for example "../assets/images/team/nicholas.jpg"
      photo: image().optional(),
      order: z.number().int(),
      status,
    }),
});

export const collections = { sections, metrics, testimonials, team };
