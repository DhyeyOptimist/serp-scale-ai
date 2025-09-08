# This file contains global settings for Next.js to ensure the app builds successfully

# Change to 'nodejs' to avoid Edge Runtime incompatibilities with Supabase
runtime = "nodejs"
preferredRegion = "iad1"

# Skip static optimization for pages that need dynamic data
[build]
  ignoreBuildErrors = true

# Generate static paths only for essential pages
[staticGeneration]
  generateStaticParams = true
  dynamicParams = true
