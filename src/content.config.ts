import { defineCollection } from 'astro:content';
import { file, glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { photoKeys } from './data/photos';

const localized = z.object({ en: z.string(), fr: z.string() });
const photo = z.enum(photoKeys);

/** One entry per floorplan. `yardiId` is reserved for the live availability feed. */
const suites = defineCollection({
  loader: file('src/content/data/suites.json'),
  schema: z.object({
    name: z.string(),
    type: z.enum(['studio', '1bed', '1bed-den', '2bed', '2bed-den', '3bed']),
    beds: z.number().int().min(0),
    baths: z.number().min(1),
    sqft: z.number().int().positive(),
    priceFrom: z.number().int().positive(),
    availability: z.union([z.literal('now'), z.literal('waitlist'), z.iso.date()]),
    order: z.number(),
    floorplanImage: z.string().nullable(),
    yardiId: z.string().nullable(),
  }),
});

const amenities = defineCollection({
  loader: file('src/content/data/amenities.json'),
  schema: z.object({ order: z.number(), photo, location: localized, name: localized, blurb: localized }),
});

const places = defineCollection({
  loader: file('src/content/data/places.json'),
  schema: z.object({
    order: z.number(),
    category: z.enum(['coffee', 'groceries', 'transit', 'dining', 'parks', 'schools', 'fitness', 'culture']),
    name: z.string(),
    walkMinutes: z.number().int().positive(),
  }),
});

const faqs = defineCollection({
  loader: file('src/content/data/faqs.json'),
  schema: z.object({ order: z.number(), pages: z.array(z.string()), question: localized, answer: localized }),
});

const events = defineCollection({
  loader: file('src/content/data/events.json'),
  schema: z.object({ date: z.iso.date(), title: localized, location: localized }),
});

const gallery = defineCollection({
  loader: file('src/content/data/gallery.json'),
  schema: z.object({ photo, category: z.enum(['suites', 'amenities', 'building', 'neighbourhood']), order: z.number() }),
});

/** Page copy, one JSON file per page per language: src/content/pages/{en,fr}/{page}.json */
const pages = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/pages' }),
  schema: z.looseObject({
    seo: z.object({
      title: z.string().max(70, 'SEO title should be 70 characters or fewer'),
      description: z.string().min(50).max(170, 'Meta description should be 170 characters or fewer'),
    }),
  }),
});

export const collections = { suites, amenities, places, faqs, events, gallery, pages };
