import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { getIronSession } from 'iron-session'
import { AdminSession, sessionOptions, defaultSession } from '@/lib/session'

export async function POST() {
  const session = await getIronSession<AdminSession>(
    cookies(),
    sessionOptions
  )
  
  // Reset session data
  Object.assign(session, defaultSession())
  await session.save()
  
  // Redirect to the login page
  return NextResponse.redirect(new URL('/admin/login', process.env.VERCEL_URL || 'http://localhost:3000'))
}
