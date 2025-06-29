import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const baseSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  comments: z.boolean().default(false).optional(),
  categories: z.array(z.string()).default([]),
  tags: z.array(z.string()).default([]),
});

const diary = defineCollection({
  loader: glob({
    pattern: "*.md",
    base: "./src/content/diary",
  }),
  schema: baseSchema,
});

const paint = defineCollection({
  loader: glob({
    pattern: "*.md",
    base: "./src/content/paint",
  }),
  schema: baseSchema.extend({
    directory: z.string(),
    images: z.array(z.string()).default([]),
  }),
});

const practice = defineCollection({
  loader: glob({
    pattern: "*.md",
    base: "./src/content/practice",
  }),
  schema: baseSchema,
});

export const collections = { diary, paint, practice };
