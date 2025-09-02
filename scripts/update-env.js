// update-env.js - Script to update the service key in .env.local
const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Path to .env.local file
const envPath = path.join(process.cwd(), '.env.local');

// Function to update the service key
function updateServiceKey(serviceKey) {
  try {
    // Read the current .env.local file
    const envContent = fs.readFileSync(envPath, 'utf8');
    
    // Replace the service key line or add it if it doesn't exist
    const updatedContent = envContent.includes('SUPABASE_SERVICE_KEY=')
      ? envContent.replace(/SUPABASE_SERVICE_KEY=.*(\r?\n|$)/g, `SUPABASE_SERVICE_KEY=${serviceKey}$1`)
      : envContent + `\nSUPABASE_SERVICE_KEY=${serviceKey}\n`;
    
    // Write the updated content back to the file
    fs.writeFileSync(envPath, updatedContent);
    
    console.log('\n✅ .env.local file updated successfully with the new service key!');
    console.log('\nNow you can run the seeding script:');
    console.log('npm run db:seed');
  } catch (error) {
    console.error('❌ Error updating .env.local file:', error.message);
  }
}

console.log('==== SUPABASE SERVICE KEY UPDATER ====');
console.log('\nThis script will update your SUPABASE_SERVICE_KEY in .env.local\n');
console.log('To get your service role key:');
console.log('1. Go to your Supabase dashboard: https://supabase.com/dashboard');
console.log('2. Select your project');
console.log('3. Go to Project Settings > API');
console.log('4. Copy the "service_role key" (NOT the anon key)');
console.log('\nPaste your Supabase service role key below:');

rl.question('> ', (key) => {
  if (!key || key.trim() === '' || key.includes('your-') || key === 'your-supabase-service-key-here') {
    console.log('\n❌ Invalid key provided. Please enter your actual Supabase service role key.');
  } else {
    updateServiceKey(key.trim());
  }
  rl.close();
});
