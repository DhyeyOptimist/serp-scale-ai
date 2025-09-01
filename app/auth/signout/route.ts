import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'

export async function POST(request: NextRequest) {
  const supabase = createClient()
  
  // Sign out the user
  await supabase.auth.signOut()
  
  // Get the origin from the request for proper redirect
  const origin = request.nextUrl.origin
  
  // Redirect to the admin page (which will show login form)
  return NextResponse.redirect(new URL('/admin', origin))
}
