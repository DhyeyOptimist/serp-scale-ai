import { NextRequest, NextResponse } from 'next/server'
import { getIronSession } from 'iron-session'
import { sessionOptions } from '@/lib/session'

export async function POST(req: NextRequest) {
  try {
    const { username, password } = await req.json()
    
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

    const session = await getIronSession<{
      isLoggedIn: boolean,
      username: string
    }>(req, NextResponse.next(), sessionOptions)

    // Set session data
    session.isLoggedIn = true
    session.username = username
    await session.save()

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    )
  }
}
