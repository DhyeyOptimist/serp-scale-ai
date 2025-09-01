import { NextResponse, type NextRequest } from 'next/server'
import { createServerClient } from '@supabase/ssr'

export const runtime = 'experimental-edge'

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  // Create a Supabase client for middleware (handles auth automatically)
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => request.cookies.getAll(),
        setAll: (cookies) => {
          cookies.forEach((cookie) => {
            response.cookies.set(cookie.name, cookie.value, cookie.options)
          })
        },
      },
    }
  )

  // For admin routes, check authentication
  if (request.nextUrl.pathname.startsWith('/admin')) {
    const {
      data: { session },
    } = await supabase.auth.getSession()

    // If there's no active session and not already on /admin
    // Let the layout handle the redirect to login form
    // This middleware just ensures auth cookies are correctly handled
  }

  return response
}

// Specify which routes this middleware should run on
export const config = {
  matcher: ['/admin/:path*', '/auth/:path*'],
}
