import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { getIronSession } from 'iron-session'
import { AdminSession, sessionOptions } from '@/lib/session'

export async function GET(req: NextRequest) {
  try {
    const cookieStore = cookies()
    const allCookies = cookieStore.getAll()
    
    // Get the current session
    const session = await getIronSession<AdminSession>(
      req,
      NextResponse.next(),
      sessionOptions
    )
    
    // Add environment variable status
    const envVars = {
      hasUsername: !!process.env.ADMIN_USERNAME,
      usernameValue: process.env.ADMIN_USERNAME || 'not set',
      hasPassword: !!process.env.ADMIN_PASSWORD,
      hasSecret: !!process.env.SECRET_COOKIE_PASSWORD,
      secretLength: process.env.SECRET_COOKIE_PASSWORD?.length || 0
    }
    
    // Return sanitized cookie info (hide values)
    const sanitizedCookies = allCookies.map(cookie => ({
      name: cookie.name,
      value: cookie.name.includes('session') ? '****hidden****' : cookie.value.substring(0, 5) + '...'
    }))
    
    return NextResponse.json({
      session: {
        isLoggedIn: session.isLoggedIn,
        username: session.username,
        envVars
      },
      cookies: sanitizedCookies
    })
  } catch (error) {
    console.error('Auth debug error:', error)
    return NextResponse.json(
      { error: 'Failed to retrieve authentication information' },
      { status: 500 }
    )
  }
}
