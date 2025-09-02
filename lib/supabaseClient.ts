import { createBrowserClient } from '@supabase/ssr';
import { createClient } from '@supabase/supabase-js';

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

// Use hardcoded values as a fallback (only for development)
// In a real production app, you should never do this - it's only for debugging
const url = supabaseUrl || 'https://nxlyskmnvdvrcnsumdej.supabase.co';
const key = supabaseAnonKey || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im54bHlza21udmR2cmNuc3VtZGVqIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTM1MzY5ODQsImV4cCI6MjAwOTExMjk4NH0.BXuWnELLsFmZUQoHs8fphN6HVbDLyo3H24a8B_pcXeY';

// Create the Supabase client with improved error handling
const createSupabaseClient = () => {
  try {
    return createBrowserClient(url, key, {
      auth: {
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: true
      }
    });
  } catch (error) {
    console.error('Error creating Supabase browser client:', error);
    
    try {
      return createClient(url, key, {
        auth: {
          autoRefreshToken: true,
          persistSession: true
        }
      });
    } catch (fallbackError) {
      console.error('Critical error: Failed to create any Supabase client', fallbackError);
      throw new Error('Failed to initialize Supabase client');
    }
  }
};

export const supabase = createSupabaseClient();
