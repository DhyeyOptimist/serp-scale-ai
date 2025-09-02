import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
// Using require for local module import to avoid ESM/CommonJS compatibility issues
const { seedTools } = require('./seed-data');

// Load environment variables from .env.local file
dotenv.config({ path: '.env.local' });

// Get Supabase credentials from environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY;

// Validate environment variables
if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing required environment variables:');
  if (!supabaseUrl) console.error('  - NEXT_PUBLIC_SUPABASE_URL');
  if (!supabaseServiceKey) console.error('  - SUPABASE_SERVICE_KEY');
  console.error('\nPlease add these to your .env.local file.');
  console.error('\nFind your Service Role Key in Supabase Dashboard > Project Settings > API > service_role key');
  process.exit(1);
}

// Create Supabase client with Service Role Key for admin privileges
const supabase = createClient(supabaseUrl, supabaseServiceKey);

/**
 * Main function to seed the database
 */
async function seedDatabase() {
  console.log('🌱 Starting database seeding process...');
  
  try {
    // 1. Delete all existing tools from the table
    console.log('🗑️  Deleting existing tools...');
    const { error: deleteError } = await supabase.from('tools').delete().neq('id', 0);
    
    if (deleteError) {
      throw new Error(`Failed to delete existing tools: ${deleteError.message}`);
    }
    
    console.log('✅ Successfully deleted existing tools.');
    
    // 2. Insert new tools from seed data
    console.log(`📥 Inserting ${seedTools.length} new tools...`);
    const { data, error: insertError } = await supabase.from('tools').insert(seedTools).select();
    
    if (insertError) {
      throw new Error(`Failed to insert tools: ${insertError.message}`);
    }
    
    // 3. Log results
    console.log(`✅ Successfully inserted ${data?.length || 0} tools.`);
    console.log('\nTools added:');
    data?.forEach((tool, index) => {
      console.log(`  ${index + 1}. ${tool.name} (ID: ${tool.id})`);
    });
    
    console.log('\n✨ Database seeding completed successfully!');
    
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
}

// Run the seeding function
seedDatabase().catch(console.error);
