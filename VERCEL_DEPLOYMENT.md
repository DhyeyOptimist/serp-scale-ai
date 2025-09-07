# Vercel Deployment Guide

## Required Environment Variables

To properly deploy this application on Vercel, make sure to add the following environment variables in your Vercel project settings:

### Supabase Configuration
```
NEXT_PUBLIC_SUPABASE_URL=https://nxlyskmnvdvrcnsumdej.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im54bHlza21udmR2cmNuc3VtZGVqIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzQ4NjgwMzcsImV4cCI6MTk5MDQ0NDAzN30.VhMcDyt-bMa4AqB2OlaPFKejFcgO1Zyae4k4Lj7lQdM
```

### Admin Authentication
```
ADMIN_USERNAME=admin
ADMIN_PASSWORD=admin123password
SECRET_COOKIE_PASSWORD=change-this-to-a-secure-random-string-of-at-least-32-characters-long
```

## Important Notes:

1. The `SECRET_COOKIE_PASSWORD` must be at least 32 characters long
2. Make sure these environment variables are added in the Vercel project settings, not just in your local `.env.local` file
3. After adding these environment variables, trigger a new deployment

## How to Add Environment Variables in Vercel:

1. Go to your Vercel dashboard
2. Select your project
3. Click on "Settings" tab
4. Select "Environment Variables" from the sidebar
5. Add each variable with its key and value
6. Click "Save"
7. Redeploy your application

## Troubleshooting:

If you still encounter issues:
1. Make sure the variable names match exactly as shown above
2. Check that there are no extra spaces in your variable values
3. Try clearing the build cache and redeploying
4. Check the build logs for any specific error messages

For more assistance, refer to [Vercel's documentation on environment variables](https://vercel.com/docs/concepts/projects/environment-variables).
