import { NextRequest, NextResponse } from 'next/server'
import { getIronSession } from 'iron-session'
import { sessionOptions, AdminSession } from '@/lib/session'

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

    // Create a new response to store cookies
    const response = NextResponse.json({ success: true })
    
    // Get session from request and response
    const session = await getIronSession<AdminSession>(req, response, sessionOptions)
    
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
