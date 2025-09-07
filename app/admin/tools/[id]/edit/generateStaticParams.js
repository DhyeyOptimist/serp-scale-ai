// This file is used to generate static parameters for the [id] route
// to improve the build process

export function generateStaticParams() {
  // During build time, we'll only pre-render the most critical IDs
  // This ensures that the build completes even if Supabase is unavailable
  return [
    { id: '1' }
  ]
}
