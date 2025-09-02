// check-env.js - Script to check environment variables
require('dotenv').config({ path: '.env.local' });

// Show all environment variables without revealing full keys
console.log('==== ENVIRONMENT VARIABLES ====');
console.log('Showing first and last few characters of keys for security:');
console.log();

// Check Supabase URL
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
if (supabaseUrl) {
  console.log(`✅ NEXT_PUBLIC_SUPABASE_URL is set: ${supabaseUrl}`);
} else {
  console.log('❌ NEXT_PUBLIC_SUPABASE_URL is missing');
}

// Check Supabase Anon Key
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
if (supabaseAnonKey) {
  console.log(`✅ NEXT_PUBLIC_SUPABASE_ANON_KEY is set: ${supabaseAnonKey.substring(0, 5)}...${supabaseAnonKey.substring(supabaseAnonKey.length - 5)}`);
} else {
  console.log('❌ NEXT_PUBLIC_SUPABASE_ANON_KEY is missing');
}

// Check Supabase Service Key
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY;
if (supabaseServiceKey) {
  if (supabaseServiceKey === 'your-supabase-service-key-here' || 
      supabaseServiceKey.includes('your-') || 
      supabaseServiceKey.length < 20) {
    console.log(`❌ SUPABASE_SERVICE_KEY appears to be a placeholder: ${supabaseServiceKey.substring(0, 5)}...${supabaseServiceKey.substring(supabaseServiceKey.length - 5)}`);
    console.log('\nYou need to replace this with your actual service role key from Supabase.');
  } else {
    console.log(`✅ SUPABASE_SERVICE_KEY is set: ${supabaseServiceKey.substring(0, 5)}...${supabaseServiceKey.substring(supabaseServiceKey.length - 5)}`);
  }
} else {
  console.log('❌ SUPABASE_SERVICE_KEY is missing');
}

console.log();
console.log('==== INSTRUCTIONS ====');
console.log('To fix the "Invalid API key" error:');
console.log('1. Go to your Supabase dashboard: https://supabase.com/dashboard');
console.log('2. Select your project');
console.log('3. Go to Project Settings > API');
console.log('4. Copy the "service_role key" (NOT the anon key)');
console.log('5. Update your .env.local file with the correct key');
console.log('\nExample .env.local entry:');
console.log('SUPABASE_SERVICE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...');
console.log('\nRemember: The service role key has superuser access, so keep it secret!');
