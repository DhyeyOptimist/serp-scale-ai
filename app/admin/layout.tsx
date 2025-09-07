import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { getIronSession } from 'iron-session'
import AdminHeader from '@/components/admin/AdminHeader'
import { AdminSession, sessionOptions } from '@/lib/session'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  try {
    // Get the session from cookies
    const session = await getIronSession<AdminSession>(
      cookies(),
      sessionOptions
    )

    // If not logged in, redirect to login page
    // We use a separate page for login since components using client hooks
    // (like useRouter) can't be rendered directly in a Server Component layout
    if (!session.isLoggedIn) {
      redirect('/admin/login')
    }

    // If user is authenticated, render the admin content
    return (
      <div className="min-h-screen bg-background">
        <AdminHeader username={session.username || 'Admin'} />
        <main className="container mx-auto py-6 px-4">
          {children}
        </main>
      </div>
    )
  } catch (error) {
    console.error('Error in admin layout:', error)
    // Redirect to login on error
    redirect('/admin/login')
  }
}
