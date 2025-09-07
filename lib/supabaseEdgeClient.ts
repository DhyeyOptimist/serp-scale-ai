import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client for Edge compatibility
// Environment variables are injected by Next.js at build time
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('⚠️ CRITICAL: Missing Supabase environment variables.');
}

// Use environment variables with no fallbacks
const url = supabaseUrl || '';
const key = supabaseAnonKey || '';

// Create a lightweight version of the Supabase client that works with Edge Runtime
export const createEdgeClient = () => {
  return createClient(url, key, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false
    },
    global: {
      fetch: fetch
    }
  });
};

// Export a pre-created client for direct use
export const supabaseEdge = createEdgeClient();
