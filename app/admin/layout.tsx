import { createClient } from '@/lib/supabase/server'
import LoginForm from '@/components/admin/LoginForm'
import AdminHeader from '@/components/admin/AdminHeader'
import './config' // Import the edge runtime configuration

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  try {
    const supabase = createClient()

    // Check for an active user session
    const {
      data: { user },
    } = await supabase.auth.getUser()

    // If no user session exists, show the login form instead of children
    if (!user) {
      return <LoginForm />
    }

    // If user is authenticated, render the admin content
    return (
      <div className="min-h-screen bg-background">
        <AdminHeader user={user} />
        <main className="container mx-auto py-6 px-4">
          {children}
        </main>
      </div>
    )
  } catch (error) {
    console.error('Error in admin layout:', error)
    // Fallback to login form if there's an error
    return <LoginForm />
  }
}
