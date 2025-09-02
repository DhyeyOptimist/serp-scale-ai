# Database Seeding Guide

This guide explains how to seed your Supabase database with sample AI tools data.

## Prerequisites

Before running the seeding script, make sure you have:

1. A Supabase project set up with the proper schema (including the `tools` table)
2. Your Supabase credentials (URL, anon key, and service role key)

## Setup Instructions

### 1. Install Dependencies

First, install the required development dependencies:

```bash
npm install -D ts-node dotenv
```

### 2. Add Service Role Key to Environment Variables

Add your Supabase Service Role Key to your `.env.local` file:

1. Go to your Supabase Dashboard
2. Navigate to Project Settings > API
3. Copy the `service_role` key (NOT the anon/public key)
4. Add it to your `.env.local` file:

```
SUPABASE_SERVICE_KEY=your-service-role-key-here
```

⚠️ **IMPORTANT**: The Service Role Key has admin privileges and can bypass Row Level Security. Never expose it to the client-side code or commit it to your repository.

### 3. Run the Seeding Script

Execute the seeding script using the npm command:

```bash
npm run db:seed
```

This will:
1. Delete any existing tools in your database
2. Insert 15 sample AI tools with realistic data
3. Print the results of the operation

## What Gets Seeded

The script adds 15 popular AI tools to your database, including:
- ChatGPT
- Midjourney
- DALL-E 3
- Notion AI
- Descript
- Runway
- GitHub Copilot
- ElevenLabs
- Perplexity AI
- Tome
- And more...

Each tool includes complete data for all fields in your schema, including name, description, website URL, slug, rating, category, pricing model, featured status, and sample FAQs.

## Troubleshooting

If you encounter errors:

- Make sure your Supabase URL and Service Role Key are correct in `.env.local`
- Verify that your `tools` table schema matches the structure expected by the script
- Check that the `slug` column was added to your table using the SQL migration
- Ensure you have the necessary permissions on your Supabase project
