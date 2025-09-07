'use client'

import { useRouter } from 'next/navigation'

interface AdminHeaderProps {
  username: string
}

export default function AdminHeader({ username }: AdminHeaderProps) {
  const router = useRouter()

  const handleSignOut = async () => {
    // Use our server action to sign out
    const response = await fetch('/admin/signout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      }
    })
    
    if (response.redirected) {
      // If we're redirected, follow the redirect
      window.location.href = response.url
    } else {
      // Otherwise just refresh the page
      router.push('/admin')
      router.refresh()
    }
  }

  return (
    <header className="border-b border-border bg-card">
      <div className="flex h-16 items-center px-4">
        <div className="flex items-center space-x-4">
          <h1 className="text-xl font-semibold text-foreground">
            Serp-scale-AI Admin
          </h1>
        </div>
        <div className="ml-auto flex items-center space-x-4">
          <span className="text-sm text-muted-foreground">
            Welcome, {username}
          </span>
          <button
            onClick={handleSignOut}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Sign Out
          </button>
        </div>
      </div>
    </header>
  )
}
