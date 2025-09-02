import { createBrowserClient } from '@supabase/ssr';

// Initialize Supabase client for browser usage
// Environment variables are injected by Next.js at build time
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Log the status of the environment variables
console.log('Supabase Client Initialization:', {
  url: supabaseUrl ? `${supabaseUrl.substring(0, 20)}...` : 'Missing URL',
  key: supabaseAnonKey ? `${supabaseAnonKey.substring(0, 10)}...` : 'Missing Key',
});

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('⚠️ CRITICAL: Missing Supabase environment variables. Authentication will not work. Check your .env.local file.');
}

// Use createBrowserClient for client components, but make sure we don't use dummy values
// that will cause authentication to fail silently
const url = supabaseUrl || 'https://example.supabase.co';
const key = supabaseAnonKey || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9';

if (url === 'https://example.supabase.co') {
  console.error('⚠️ WARNING: Using example Supabase URL. Authentication will not work.');
}

// Create the client
export const supabase = createBrowserClient(url, key);