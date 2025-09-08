import { cookies } from 'next/headers'
import { getIronSession } from 'iron-session'
import AdminHeader from '@/components/admin/AdminHeader'
import { AdminSession, sessionOptions } from '@/lib/session'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  try {
    // Get the session from cookies (non-blocking UI: no redirects here)
    const session = await getIronSession<AdminSession>(cookies(), sessionOptions)

    // Render header only if authenticated; middleware guards the routes
    return (
      <div className="min-h-screen bg-background">
        {session?.isLoggedIn && (
          <AdminHeader username={session.username || 'Admin'} />
        )}
        <main className="container mx-auto py-6 px-4">
          {children}
        </main>
      </div>
    )
  } catch (error) {
    console.error('Error in admin layout:', error)
    // On error, render children without header; middleware still protects routes
    return (
      <div className="min-h-screen bg-background">
        <main className="container mx-auto py-6 px-4">
          {children}
        </main>
      </div>
    )
  }
}
