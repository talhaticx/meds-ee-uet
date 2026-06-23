import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const posts = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdoc}', base: './src/content/posts' }),
  schema: z.object({
    title: z.string(),
    publishedAt: z.coerce.date(),
    author: z.string().nullable().optional(),
    mainImage: z.string().nullable().optional(),
    mainImageAlt: z.string().nullable().optional(),
    excerpt: z.string().nullable().optional(),
  }),
});

const projects = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdoc}', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    status: z.enum(['Active', 'Completed']).default('Active'),
    abstract: z.string().nullable().optional(),
    techStack: z.array(z.string()).default([]),
    heroImage: z.string().nullable().optional(),
    heroImageAlt: z.string().nullable().optional(),
    featuredOrder: z.number().nullable().optional(),
  }),
});

const members = defineCollection({
  loader: glob({ pattern: '**/*.{yml,yaml}', base: './src/content/members' }),
  schema: z.object({
    name: z.string(),
    role: z.string().nullable().optional(),
    bio: z.string().nullable().optional(),
    linkedin: z.string().url().nullable().optional(),
    image: z.string().nullable().optional(),
    imageAlt: z.string().nullable().optional(),
    sortOrder: z.number().nullable().optional(),
  }),
});

const publications = defineCollection({
  loader: glob({ pattern: '**/*.{yml,yaml}', base: './src/content/publications' }),
  schema: z.object({
    title: z.string(),
    authors: z.string().nullable().optional(),
    publishedDate: z.coerce.date().nullable().optional(),
    venue: z.string().nullable().optional(),
    link: z.string().url().nullable().optional(),
  }),
});

const activities = defineCollection({
  loader: glob({ pattern: '**/*.{yml,yaml}', base: './src/content/activities' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    location: z.string().nullable().optional(),
    description: z.string().nullable().optional(),
    imageGallery: z.array(z.object({
      image: z.string().nullable().optional(),
      alt: z.string().nullable().optional(),
    })).default([]),
  }),
});

export const collections = { posts, projects, members, publications, activities };
