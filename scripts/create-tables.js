// create-tables.js - Script to create required database tables
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

// Get Supabase credentials from environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Choose which key to use
let keyToUse = supabaseServiceKey;
let isServiceKey = true;

if (!supabaseServiceKey || supabaseServiceKey.includes('your-')) {
  console.log('⚠️ No valid service key found, falling back to anonymous key (limited permissions)');
  keyToUse = supabaseAnonKey;
  isServiceKey = false;
}

// Create Supabase client
const supabase = createClient(supabaseUrl, keyToUse);

async function createTables() {
  console.log('🏗️ Checking database tables...');

  try {
    // First, let's check if the tools table exists
    const { data: tableExists, error: checkError } = await supabase
      .from('tools')
      .select('id')
      .limit(1)
      .maybeSingle();
    
    if (checkError && !checkError.message.includes('relation "tools" does not exist')) {
      console.log('⚠️ Error checking if table exists:', checkError.message);
      // Continue anyway to attempt creation
    } else if (!checkError) {
      console.log('✅ tools table already exists');
      return true; // Table exists
    }

    console.log('🛠️ Creating tools table...');

    // For Supabase, we'll use SQL through their REST API
    // This requires a service role key!
    if (!isServiceKey) {
      console.error('❌ Creating tables requires a service role key.');
      console.log('\nPlease update your .env.local file with your service role key, then try again.');
      console.log('\nAlternatively, you can create the table manually in the Supabase dashboard:');
      console.log('1. Go to your Supabase project: https://supabase.com/dashboard');
      console.log('2. Go to "Table editor" > "New table"');
      console.log('3. Name the table "tools"');
      console.log('4. Add the following columns:');
      console.log('   - id: int8 (primary key, auto-increment)');
      console.log('   - name: text');
      console.log('   - short_description: text');
      console.log('   - full_description: text');
      console.log('   - logo_url: text');
      console.log('   - website_url: text');
      console.log('   - rating: numeric');
      console.log('   - pricing_model: text');
      console.log('   - category: text');
      console.log('   - faqs: jsonb');
      console.log('   - is_featured: boolean');
      console.log('   - slug: text');
      console.log('   - created_at: timestamptz (default: now())');
      return false;
    }

    // Using the REST API to execute SQL (requires service role key)
    const { data, error } = await supabase.rpc('exec_sql', {
      sql_string: `
        CREATE TABLE IF NOT EXISTS public.tools (
          id SERIAL PRIMARY KEY,
          name TEXT NOT NULL,
          short_description TEXT,
          full_description TEXT,
          logo_url TEXT,
          website_url TEXT,
          rating NUMERIC,
          pricing_model TEXT,
          category TEXT,
          faqs JSONB,
          is_featured BOOLEAN DEFAULT false,
          slug TEXT UNIQUE,
          created_at TIMESTAMPTZ DEFAULT NOW()
        );
        
        -- Add RLS policies
        ALTER TABLE public.tools ENABLE ROW LEVEL SECURITY;
        
        -- Create policy to allow anyone to read
        CREATE POLICY "Allow public read access" 
          ON public.tools 
          FOR SELECT 
          USING (true);
          
        -- Create policy to allow authenticated users to insert
        CREATE POLICY "Allow authenticated insert" 
          ON public.tools 
          FOR INSERT 
          WITH CHECK (auth.role() = 'authenticated');
      `
    });

    if (error) {
      console.error('❌ Error creating tables:', error.message);
      return false;
    }

    console.log('✅ Tools table created successfully!');
    return true;
    
  } catch (error) {
    console.error('❌ Unexpected error:', error.message);
    return false;
  }
}

// Run the function if this file is run directly
if (require.main === module) {
  createTables()
    .then(success => {
      if (success) {
        console.log('✨ Database setup complete');
      } else {
        console.log('⚠️ Database setup incomplete');
      }
    })
    .catch(err => {
      console.error('❌ Fatal error:', err);
      process.exit(1);
    });
}

// Export for use in other scripts
module.exports = { createTables };
