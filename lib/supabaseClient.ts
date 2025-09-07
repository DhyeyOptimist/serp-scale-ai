import { createBrowserClient } from '@supabase/ssr';
import { createClient as createSupabaseJsClient } from '@supabase/supabase-js';

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
  console.error('⚠️ CRITICAL: Missing Supabase environment variables. Authentication will not work.');
  console.error('Please ensure you have a .env.local file with NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY values.');
}

// Use environment variables with no fallbacks
const url = supabaseUrl || '';
const key = supabaseAnonKey || '';

// Create the Supabase client with improved error handling
export const createClient = () => {
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
      return createSupabaseJsClient(url, key, {
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

// Create an instance of the client for direct use
export const supabase = createClient();
