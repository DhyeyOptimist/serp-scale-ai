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
    
    // Skip middleware processing for login page and debug/api endpoints
    // to prevent redirect loops and allow API handling
    if (
      request.nextUrl.pathname === '/admin/login' ||
      request.nextUrl.pathname.startsWith('/admin/login/') ||
      request.nextUrl.pathname === '/admin/debug-auth' ||
      request.nextUrl.pathname.startsWith('/admin/api/')
    ) {
      return response;
    }
    
    // Only perform auth checks on admin routes
    if (request.nextUrl.pathname.startsWith('/admin')) {
      // Protect admin routes by checking the presence of iron-session cookie.
      // We intentionally avoid decoding the session here (not supported in middleware).
      const hasAdminSessionCookie = request.cookies.has('serp-scale-ai-admin-session')

      // If no session cookie, redirect to the login page
      if (!hasAdminSessionCookie) {
        const loginUrl = new URL('/admin/login', request.url)
        return NextResponse.redirect(loginUrl)
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
