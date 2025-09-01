import { createBrowserClient } from '@supabase/ssr';

// Initialize Supabase client for browser usage
// Environment variables are injected by Next.js at build time

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Missing Supabase environment variables. Please check your environment configuration.');
}

// Use createBrowserClient for client components
export const supabase = createBrowserClient(
  supabaseUrl || 'https://example.supabase.co',
  supabaseAnonKey || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9'
);