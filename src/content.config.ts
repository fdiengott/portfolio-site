import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
	loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
	schema: z.object({
		title: z.string(),
		date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'date must be YYYY-MM-DD'),
		tags: z.array(z.string()),
		pinned: z.boolean().optional(),
		searchable: z.boolean().optional(),
		books: z.boolean().optional(),
	}),
});

// One file per book: src/content/books/NNN-slug.md. Higher NNN = more recent.
const books = defineCollection({
	loader: glob({ pattern: '**/*.md', base: './src/content/books' }),
	schema: z.object({
		title: z.string(),
		subtitle: z.string().optional(),
		author: z.string(),
		date: z
			.string()
			.regex(/^\d{4}-\d{2}-\d{2}$/, 'date must be YYYY-MM-DD')
			.optional(),
		note: z.string().optional(),
	}),
});

export const collections = { blog, books };
