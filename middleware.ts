import { NextResponse, type NextRequest } from 'next/server'
import { createServerClient } from '@supabase/ssr'

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  try {
    // Skip auth checks for static files
    if (
      request.nextUrl.pathname.startsWith('/_next') || 
      request.nextUrl.pathname.startsWith('/static') || 
      request.nextUrl.pathname.includes('.')
    ) {
      return response;
    }
    
    // Only perform Supabase auth checks on routes that require it
    if (request.nextUrl.pathname.startsWith('/admin') || 
        request.nextUrl.pathname.startsWith('/auth')) {
      
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

        // If there's no active session and not already on /admin/login
        // Let the layout handle the redirect to login form
      }
    }
  } catch (error) {
    console.error('Middleware error:', error);
    // Continue with the request even if there was an error
    // The page will handle auth requirements
  }

  return response
}

// Specify which routes this middleware should run on
export const config = {
  matcher: ['/admin/:path*', '/auth/:path*'],
}
