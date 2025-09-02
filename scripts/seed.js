// seed.js - A simplified version of our seeder script
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

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

// Display information about the environment variables (without revealing the full key)
console.log('Environment variables:');
console.log(`- NEXT_PUBLIC_SUPABASE_URL: ${supabaseUrl}`);
console.log(`- SUPABASE_SERVICE_KEY: ${supabaseServiceKey.substring(0, 5)}...${supabaseServiceKey.substring(supabaseServiceKey.length - 5)}`);

// Create Supabase client with Service Role Key for admin privileges
const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Sample data for seeding the database - 5 example tools
const seedTools = [
  {
    name: 'ChatGPT',
    short_description: 'Conversational AI assistant for natural language understanding and generation',
    full_description: 'ChatGPT is an advanced AI assistant built by OpenAI that can understand and generate human-like text.',
    logo_url: 'https://static.vecteezy.com/system/resources/previews/021/495/996/original/chatgpt-openai-logo-icon-free-png.png',
    website_url: 'https://chat.openai.com/',
    rating: 4.8,
    pricing_model: 'Freemium',
    category: 'AI Assistants',
    faqs: [
      {
        q: "What can ChatGPT do?",
        a: "ChatGPT can answer questions, assist with writing tasks, explain complex topics, and more."
      }
    ],
    is_featured: true,
    slug: 'chatgpt'
  },
  {
    name: 'Midjourney',
    short_description: 'AI art generator that creates stunning images from text descriptions',
    full_description: 'Midjourney is an independent research lab that produces an AI program that creates images from text.',
    logo_url: 'https://upload.wikimedia.org/wikipedia/commons/e/e6/Midjourney_Emblem.png',
    website_url: 'https://www.midjourney.com/',
    rating: 4.7,
    pricing_model: 'Subscription',
    category: 'AI Image Generation',
    faqs: [
      {
        q: "How do I use Midjourney?",
        a: "Midjourney operates primarily through Discord. Join their server and use the /imagine command."
      }
    ],
    is_featured: true,
    slug: 'midjourney'
  },
  {
    name: 'DALL-E 3',
    short_description: "OpenAI's advanced image generation model",
    full_description: 'DALL-E 3 creates highly detailed images based on text prompts.',
    logo_url: 'https://seeklogo.com/images/D/dall-e-logo-1F945968D7-seeklogo.com.png',
    website_url: 'https://openai.com/dall-e-3',
    rating: 4.9,
    pricing_model: 'Included with ChatGPT Plus',
    category: 'AI Image Generation',
    faqs: [
      {
        q: "How can I access DALL-E 3?",
        a: "DALL-E 3 is available through ChatGPT Plus and Enterprise subscriptions."
      }
    ],
    is_featured: true,
    slug: 'dall-e-3'
  },
  {
    name: 'GitHub Copilot',
    short_description: 'AI pair programmer that helps write better code faster',
    full_description: 'GitHub Copilot is an AI tool that helps developers write code more efficiently.',
    logo_url: 'https://github.githubassets.com/assets/GitHub-Mark-ea2971cee799.png',
    website_url: 'https://github.com/features/copilot',
    rating: 4.7,
    pricing_model: 'Subscription',
    category: 'Developer Tools',
    faqs: [
      {
        q: "How accurate is the code suggested by GitHub Copilot?",
        a: "GitHub Copilot generally provides helpful suggestions, but code quality can vary."
      }
    ],
    is_featured: true,
    slug: 'github-copilot'
  },
  {
    name: 'Stable Diffusion',
    short_description: 'Open-source AI image generation model',
    full_description: 'Stable Diffusion is an open-source AI model that creates detailed images from text descriptions.',
    logo_url: 'https://stability.ai/assets/images/stability-ai-logo-black.svg',
    website_url: 'https://stability.ai/stable-diffusion',
    rating: 4.6,
    pricing_model: 'Open Source / Freemium',
    category: 'AI Image Generation',
    faqs: [
      {
        q: "Is Stable Diffusion completely free?",
        a: "The core Stable Diffusion model is free and open-source."
      }
    ],
    is_featured: true,
    slug: 'stable-diffusion'
  }
];

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

// Full seed function that imports all tools from full-seed-data.js
async function seedFullDatabase() {
  console.log('🌱 Starting FULL database seeding process...');
  
  try {
    // Import the full set of tools
    const fullSeedTools = require('./full-seed-data.js');
    
    // 1. Delete all existing tools from the table
    console.log('🗑️  Deleting existing tools...');
    const { error: deleteError } = await supabase.from('tools').delete().neq('id', 0);
    
    if (deleteError) {
      throw new Error(`Failed to delete existing tools: ${deleteError.message}`);
    }
    
    console.log('✅ Successfully deleted existing tools.');
    
    // 2. Insert all tools from full seed data
    console.log(`📥 Inserting ${fullSeedTools.length} tools...`);
    const { data, error: insertError } = await supabase.from('tools').insert(fullSeedTools).select();
    
    if (insertError) {
      throw new Error(`Failed to insert tools: ${insertError.message}`);
    }
    
    // 3. Log results
    console.log(`✅ Successfully inserted ${data?.length || 0} tools.`);
    console.log('\nTools added:');
    data?.forEach((tool, index) => {
      console.log(`  ${index + 1}. ${tool.name} (ID: ${tool.id})`);
    });
    
    console.log('\n✨ Full database seeding completed successfully!');
    
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
}

// Check if this file is being run directly
if (require.main === module) {
  // Run the basic seeding function by default
  seedDatabase().catch(console.error);
} else {
  // Export functions for use in other scripts
  module.exports = {
    seedDatabase,
    seedFull: seedFullDatabase
  };
}
