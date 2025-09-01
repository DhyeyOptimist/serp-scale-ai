#!/bin/bash

echo "==== Vercel-like Build Test ===="
echo "Running build check..."

# Install dependencies
echo "\n[1/4] Installing dependencies..."
npm install

# Run lint checks (with --no-cache to simulate CI)
echo "\n[2/4] Running lint checks..."
npm run lint

# Build the project
echo "\n[3/4] Building project..."
npm run build

# Check build output
echo "\n[4/4] Checking build output..."
if [ -d ".next" ]; then
  echo "✅ Build successful!"
  echo "Next.js build completed successfully"
  ls -la .next
else
  echo "❌ Build failed!"
  echo "No .next directory found"
  exit 1
fi

echo "\n==== Build Test Complete ===="
echo "Your project should now be ready for Vercel deployment"
echo "Make sure to set these environment variables in your Vercel project settings:"
echo "- NEXT_PUBLIC_SUPABASE_URL"
echo "- NEXT_PUBLIC_SUPABASE_ANON_KEY"
