import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const brokerGuides = defineCollection({
  loader: glob({
    base: "./src/components/brokers/md",
    pattern: "**/index.md",
    generateId: ({ entry }) => entry.replace(/[\\/]+index\.md$/, ""),
  }),
  schema: z.object({
    name: z.string(),
    logoSrc: z.string().optional(),
    searchAliases: z.array(z.string()).default([]),
    order: z.number().optional(),
    description: z.string().optional(),
  }),
});

export const collections = {
  brokerGuides,
};
