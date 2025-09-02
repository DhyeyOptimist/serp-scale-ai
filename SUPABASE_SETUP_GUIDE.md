# Connecting Your Next.js App to Supabase

This guide will walk you through the process of connecting your serp-scale-ai project to a Supabase backend.

## Step 1: Create a Supabase Project

1. Go to [app.supabase.com](https://app.supabase.com) and sign in
2. Click "New project"
3. Fill in the form:
   - Name: serp-scale-ai (or any name you prefer)
   - Database Password: Create a strong password (save this somewhere safe)
   - Region: Choose the one closest to you
   - Pricing Plan: Free tier
4. Click "Create new project" and wait for it to be created (may take a few minutes)

## Step 2: Get Your Supabase Credentials

1. In your Supabase dashboard, click on the gear icon (⚙️) in the left sidebar
2. Click on "API" in the Project Settings menu
3. Under "Project API keys", find:
   - **Project URL**: Copy this for `NEXT_PUBLIC_SUPABASE_URL` 
   - **anon/public key**: Copy this for `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## Step 3: Set Up Your Database

1. In your Supabase dashboard, go to "SQL Editor" in the left sidebar
2. Click "New Query"
3. Copy and paste the contents of the `supabase-setup.sql` file
4. Click "Run" to execute the SQL script

This will create:
- A `tools` table with the correct schema
- Appropriate indexes for performance
- Row Level Security policies to protect your data

## Step 4: Create an Admin User

1. In your Supabase dashboard, go to "Authentication" in the left sidebar
2. Click on "Users" tab
3. Click "Add User" button
4. Fill in the form:
   - Email: Your email address
   - Password: Create a strong password (remember this for logging in)
   - Optional: Check "Auto-confirm" to bypass email verification
5. Click "Add User"

## Step 5: Configure Your Local Environment

1. In your project folder, edit the `.env.local` file
2. Update it with your Supabase credentials:

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

## Step 6: Restart Your Development Server

1. Stop any running Next.js servers
2. Run `npm run dev` to start the server with the new environment variables

## Step 7: Test the Authentication

1. Go to `http://localhost:3000/admin/signup` to create a user account
2. Then try logging in at `http://localhost:3000/admin`

## Troubleshooting

- **"Invalid credentials" error**: Make sure you've created a user in Supabase and are using the correct email/password
- **Connection errors**: Double-check your environment variables match exactly what's in your Supabase dashboard
- **Database errors**: Ensure you've run the SQL setup script properly
- **Authentication issues**: Check that your user is confirmed in the Supabase dashboard

## Production Deployment

When deploying to production:

1. Add your Supabase environment variables to your hosting platform (e.g., Vercel)
2. In your Supabase dashboard, go to Authentication > URL Configuration
3. Add your production URL to the allowed redirect URLs

## Security Notes

- Never commit your `.env.local` file to git
- Keep your database password secure
- For production, consider using more restrictive Row Level Security policies
