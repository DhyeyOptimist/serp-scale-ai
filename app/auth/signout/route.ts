import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { type NextRequest } from 'next/server'
import '../config'

export async function POST(request: NextRequest) {
  const requestUrl = new URL(request.url)
  const supabase = createClient()
  
  // Sign out the user
  await supabase.auth.signOut()
  
  // Clear cookies to ensure session is fully removed
  const cookieStore = cookies()
  const authCookies = cookieStore.getAll()
  
  // Get origin for redirect
  const origin = requestUrl.origin
  const redirectUrl = new URL('/admin', origin)
  
  // Create response with redirect
  const response = NextResponse.redirect(redirectUrl, {
    status: 302,
  })
  
  // Explicitly clear auth cookies in response
  for (const cookie of authCookies) {
    if (cookie.name.includes('supabase')) {
      response.cookies.delete(cookie.name)
    }
  }
  
  return response
}
