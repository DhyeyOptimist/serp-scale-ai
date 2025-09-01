#!/bin/bash

echo "🚀 Starting the AI Tools Directory project..."

# Check if .env.local file exists
if [ ! -f .env.local ]; then
  echo "⚠️  Warning: .env.local file not found!"
  echo "Creating a template .env.local file. Please fill in your Supabase credentials."
  
  cat > .env.local << EOL
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
EOL

  echo "✅ Created .env.local template"
fi

# Start the dev server
echo "🔧 Starting Next.js development server..."
npm run dev
