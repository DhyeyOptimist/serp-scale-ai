# Deployment Troubleshooting Guide

## Fixed Issues ✅

### 1. Environment Variables
- **Problem**: Missing Supabase environment variables causing deployment failures
- **Fix**: Added proper validation and fallback values
- **Action Required**: Set these environment variables in your deployment platform:
  ```
  NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
  NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
  ```

### 2. Server Actions Configuration
- **Problem**: Experimental server actions causing build issues
- **Fix**: Updated Next.js configuration with proper settings
- **Result**: Stable server-side authentication

### 3. Static Export Conflict
- **Problem**: Project was configured for static export but uses server features
- **Fix**: Removed static export configuration, enabled dynamic rendering
- **Result**: Server-side authentication now works properly

### 4. Image Optimization
- **Problem**: External images might fail on some platforms
- **Fix**: Added image domains and unoptimized setting
- **Result**: Images load correctly across platforms

### 5. Supabase Client Initialization
- **Problem**: Runtime errors when Supabase variables missing
- **Fix**: Added graceful error handling and fallbacks
- **Result**: Better error messages and build stability

## Deployment Instructions

### For Vercel (Recommended)

1. **Connect your repository to Vercel**
2. **Set environment variables** in Vercel dashboard:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
3. **Deploy** - Vercel will automatically detect Next.js

### For Netlify

1. **Build command**: `npm run build`
2. **Publish directory**: `.next`
3. **Add environment variables** in Netlify dashboard
4. **Enable serverless functions** (automatic for Next.js)

### For Railway/Render

1. **Add environment variables**
2. **Use Node.js 18+**
3. **Build command**: `npm run build`
4. **Start command**: `npm start`

## Common Deployment Errors & Solutions

### Error: "Missing environment variables"
**Solution**: Add Supabase environment variables to your deployment platform

### Error: "Server actions not supported"
**Solution**: Make sure your deployment platform supports Next.js App Router (most modern platforms do)

### Error: "Cannot resolve module '@supabase/ssr'"
**Solution**: Ensure `@supabase/ssr` is in dependencies (already fixed in package.json)

### Error: "Authentication not working in production"
**Solution**: Check that your Supabase project allows your production domain in auth settings

## Post-Deployment Checklist

- [ ] Environment variables are set correctly
- [ ] Supabase project is configured for your domain
- [ ] Admin authentication works (`/admin` route)
- [ ] Database connection is working
- [ ] Images load correctly

## Testing Your Deployment

1. Visit your deployed site
2. Go to `/admin` - should show login form
3. Try logging in with test credentials
4. Verify redirects work properly
5. Test sign-out functionality

## Need Help?

If you're still having deployment issues:

1. Check the build logs on your deployment platform
2. Verify all environment variables are set
3. Test the build locally with `npm run build && npm start`
4. Check Supabase project settings for your domain

## Files Modified for Deployment

- `next.config.js` - Updated for production stability
- `lib/supabase/server.ts` - Added environment validation
- `lib/supabaseClient.ts` - Added graceful error handling
- `app/auth/signout/route.ts` - Fixed redirect handling
- `vercel.json` - Added Vercel-specific configuration
- `.env.example` - Template for required environment variables
