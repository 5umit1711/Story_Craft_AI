import { neon } from '@neondatabase/serverless'
import { defineConfig } from 'drizzle-kit'

export default defineConfig({
  schema: "./config/schema.tsx",
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.NEXT_PUBLIC_DATABASE_URL as string,
  },
  verbose: true,
  strict: true,
})