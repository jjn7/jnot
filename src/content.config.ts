import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

/**
 * One folder per project:  src/content/projects/<id>/index.md
 * Screenshots sit beside it and are picked up automatically (see src/lib/projects.ts):
 *   desktop.webp|png|jpg  — 1440×900 viewport, captured at 2x
 *   mobile.webp|png|jpg   — 390×844 viewport, captured at 2x
 * `npm run shoot -- <id>` captures both from the project's `url`.
 */
const projects = defineCollection({
  loader: glob({
    pattern: '*/index.md',
    base: './src/content/projects',
    generateId: ({ entry }) => entry.split('/')[0]!,
  }),
  schema: z.object({
    /** Position in the grid (lowest first). */
    order: z.number(),
    /** Only featured projects get a card and a case study page. */
    featured: z.boolean().default(false),

    /**
     * Who the work was for. `direct` = my own client; `own` = my own ventures and
     * products; `agency` = built as a developer at an Adelaide marketing agency.
     * Never write the agency's name anywhere in this repo: it's public, and the name
     * shouldn't be searchable alongside mine.
     */
    via: z.enum(['direct', 'own', 'agency']),

    /**
     * The client's real name. Leave it out until the client (and, for agency work,
     * the agency) has agreed. This repo is public, so an unapproved name here is
     * already published, even if the site doesn't show it.
     */
    name: z.string().optional(),
    /** What the project is called on the site until it can be named. */
    anonymous: z.string(),

    clientType: z.string(),
    location: z.string(),
    platform: z.string(),
    role: z.string(),

    /** One line for the card. */
    summary: z.string(),
    /** The brief, in 1–2 sentences. */
    brief: z.string(),
    /** What I built: 3–5 bullets. */
    built: z.array(z.string()).min(3).max(5),

    /** Live site. Leave out until it's confirmed and linkable. */
    url: z.url().optional(),
    outcome: z
      .object({
        quote: z.string(),
        by: z.string().optional(),
      })
      .optional(),

    /** True until the copy has been checked against the real project. */
    draft: z.boolean().default(true),
  }),
});

export const collections = { projects };
