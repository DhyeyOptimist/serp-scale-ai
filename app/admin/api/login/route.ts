import { NextRequest, NextResponse } from 'next/server'
import { getIronSession } from 'iron-session'
import { sessionOptions, AdminSession } from '@/lib/session'
import { cookies } from 'next/headers'

export async function POST(req: NextRequest) {
  try {
    const { username, password } = await req.json()
    
    console.log('Login attempt:', { username, expectedUsername: process.env.ADMIN_USERNAME })
    
    // Validate credentials
    if (
      username !== process.env.ADMIN_USERNAME || 
      password !== process.env.ADMIN_PASSWORD
    ) {
      return NextResponse.json(
        { error: 'Invalid username or password' },
        { status: 401 }
      )
    }

    // Create a response object to save cookies
    const response = NextResponse.json({ success: true })
    
    // Get the session using cookies() instead of req
    const session = await getIronSession<AdminSession>(
      cookies(),
      sessionOptions
    )

    // Set session data
    session.isLoggedIn = true
    session.username = username
    await session.save()

    console.log('Session saved successfully:', { isLoggedIn: session.isLoggedIn, username: session.username })

    return response
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    )
  }
}
