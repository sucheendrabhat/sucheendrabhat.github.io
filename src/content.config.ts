import { defineCollection, reference } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    status: z.enum(['planning', 'active', 'paused', 'completed']),
    startDate: z.coerce.date(),
    endDate: z.coerce.date().optional(),
    tags: z.array(z.string()).default([]),
    techStack: z.array(z.string()).default([]),
    repoUrl: z.string().url().optional(),
    demoUrl: z.string().url().optional(),
    featured: z.boolean().default(false),
  }),
});

const projectLogs = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/project-logs' }),
  schema: z.object({
    project: reference('projects'),
    title: z.string(),
    date: z.coerce.date(),
    tags: z.array(z.string()).default([]),
  }),
});

const skills = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/skills' }),
  schema: z.object({
    title: z.string(),
    category: z.string(),
    description: z.string(),
    status: z.enum(['exploring', 'active', 'maintaining', 'paused']),
    startDate: z.coerce.date(),
    tags: z.array(z.string()).default([]),
  }),
});

const skillLogs = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/skill-logs' }),
  schema: z.object({
    skill: reference('skills'),
    title: z.string(),
    date: z.coerce.date(),
    tags: z.array(z.string()).default([]),
  }),
});

export const collections = { projects, projectLogs, skills, skillLogs };
