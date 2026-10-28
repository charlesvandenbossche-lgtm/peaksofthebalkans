import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const articles = defineCollection({
  // src/content/articles/<lang>/<slug>.md  →  id = "<lang>/<slug>"
  loader: glob({ pattern: '**/*.md', base: './src/content/articles' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    // name of a file in src/assets/img (without .jpg)
    image: z.string(),
    imageAlt: z.string(),
    // short, direct answer to the question in the title (shown at the top + FAQ schema)
    answer: z.string().optional(),
    category: z.enum(['guide', 'planning', 'news']),
    order: z.number().default(50),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
  }),
});

export const collections = { articles };
