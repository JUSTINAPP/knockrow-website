import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './sanity/schemaTypes'

// NEEDS FROM YOU: this points at a placeholder project until a real Sanity
// project exists for Knockrow. Run `npx sanity init` in this folder (it'll
// prompt you to log in and create/select a project — separate from your
// other client's), then either paste the real project ID below or, better,
// set NEXT_PUBLIC_SANITY_PROJECT_ID in .env.local / Vercel so it matches
// src/lib/sanity.ts automatically. Studio then lives at /studio.
export default defineConfig({
  name: 'knockrow',
  title: 'Knockrow Distillers',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'placeholder-project-id',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  basePath: '/studio',
  plugins: [structureTool(), visionTool()],
  schema: { types: schemaTypes },
})
