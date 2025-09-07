import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import type { CookieOptions } from '@supabase/ssr'

export function createClient() {
  const cookieStore = cookies()

  // Add validation for environment variables with proper fallbacks
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://nxlyskmnvdvrcnsumdej.supabase.co'
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im54bHlza21udmR2cmNuc3VtZGVqIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzQ4NjgwMzcsImV4cCI6MTk5MDQ0NDAzN30.VhMcDyt-bMa4AqB2OlaPFKejFcgO1Zyae4k4Lj7lQdM'

  // Log initialization for debugging
  console.log('Server Supabase Client Initialization:', {
    url: supabaseUrl ? `${supabaseUrl.substring(0, 20)}...` : 'Using fallback URL',
    key: supabaseAnonKey ? `${supabaseAnonKey.substring(0, 10)}...` : 'Using fallback key',
  })

  return createServerClient(
    supabaseUrl,
    supabaseAnonKey,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet: { name: string; value: string; options?: CookieOptions }[]) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => {
              cookieStore.set(name, value, options)
            })
          } catch (error) {
            // The `setAll` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    }
  )
}
