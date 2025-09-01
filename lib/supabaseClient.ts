import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
// Make sure to create a .env.local file in your project root with:
// NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
// NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables. Please check your .env.local file.');
  // Provide fallback for development/build time
}

export const supabase = createClient(
  supabaseUrl || 'http://localhost:54321', 
  supabaseAnonKey || 'dummy-key'
);