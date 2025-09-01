# AI Tools Directory

This is a Next.js application for showcasing AI tools, featuring a Supabase backend and authenticated admin area.

## Deployment Instructions for Vercel

### Prerequisites
- A Supabase account with a project set up
- A Vercel account

### Environment Variables
Add the following environment variables to your Vercel project:

1. `NEXT_PUBLIC_SUPABASE_URL` - Your Supabase project URL
2. `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Your Supabase project anonymous key

### Deployment Steps
1. Connect your repository to Vercel
2. Configure the environment variables listed above
3. Deploy the project
4. After deployment, set up authentication in your Supabase project:
   - Enable Email/Password authentication in Supabase Auth settings
   - Create an admin user through the Supabase dashboard

### Local Development
1. Clone the repository
2. Install dependencies: `npm install`
3. Create a `.env.local` file with the environment variables listed above
4. Run the development server: `npm run dev`

### Build Commands
- Development: `npm run dev`
- Build: `npm run build`
- Start: `npm run start`

## Project Structure
- `/app` - Next.js App Router pages and layouts
- `/components` - React components 
- `/lib` - Utility functions and Supabase clients
- `/models` - Data models and types
- `/supabase` - Supabase migrations and types

## Tech Stack
- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- Supabase (Database and Authentication)
- Edge Runtime for optimal performance

## Troubleshooting
If you encounter any issues with the deployment:

1. Ensure your environment variables are properly set in Vercel
2. Check that your Supabase URL and anon key are correct
3. Make sure email authentication is enabled in Supabase
4. Review Vercel build logs for any specific errors

For local development issues:
- Use `npm run build` to verify your changes build correctly
- Check for any ESLint errors with `npm run lint`
