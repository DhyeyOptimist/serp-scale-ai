import { createClient } from '@/lib/supabase/server'

export default async function AdminDashboard() {
  const supabase = createClient()
  
  // Get the current user for welcome message
  const {
    data: { user },
  } = await supabase.auth.getUser()

  return (
    <div className="space-y-6">
      <div className="border-b border-border pb-4">
        <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
        <p className="text-muted-foreground mt-2">
          Welcome back! Manage your AI tools directory from here.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Quick Stats Cards */}
        <div className="rounded-lg border border-border bg-card p-6">
          <h3 className="text-lg font-semibold text-foreground mb-2">
            Total Tools
          </h3>
          <p className="text-3xl font-bold text-primary">0</p>
          <p className="text-sm text-muted-foreground mt-1">
            AI tools in directory
          </p>
        </div>

        <div className="rounded-lg border border-border bg-card p-6">
          <h3 className="text-lg font-semibold text-foreground mb-2">
            Featured Tools
          </h3>
          <p className="text-3xl font-bold text-primary">0</p>
          <p className="text-sm text-muted-foreground mt-1">
            Currently featured
          </p>
        </div>

        <div className="rounded-lg border border-border bg-card p-6">
          <h3 className="text-lg font-semibold text-foreground mb-2">
            Categories
          </h3>
          <p className="text-3xl font-bold text-primary">8</p>
          <p className="text-sm text-muted-foreground mt-1">
            Available categories
          </p>
        </div>
      </div>

      <div className="rounded-lg border border-border bg-card p-6">
        <h2 className="text-xl font-semibold text-foreground mb-4">
          Quick Actions
        </h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <button className="rounded-md border border-border bg-background p-4 text-left hover:bg-accent transition-colors">
            <h4 className="font-medium text-foreground">Add New Tool</h4>
            <p className="text-sm text-muted-foreground mt-1">
              Add a new AI tool to the directory
            </p>
          </button>
          
          <button className="rounded-md border border-border bg-background p-4 text-left hover:bg-accent transition-colors">
            <h4 className="font-medium text-foreground">Manage Tools</h4>
            <p className="text-sm text-muted-foreground mt-1">
              Edit existing tools and settings
            </p>
          </button>
          
          <button className="rounded-md border border-border bg-background p-4 text-left hover:bg-accent transition-colors">
            <h4 className="font-medium text-foreground">Categories</h4>
            <p className="text-sm text-muted-foreground mt-1">
              Manage tool categories
            </p>
          </button>
          
          <button className="rounded-md border border-border bg-background p-4 text-left hover:bg-accent transition-colors">
            <h4 className="font-medium text-foreground">Analytics</h4>
            <p className="text-sm text-muted-foreground mt-1">
              View usage statistics
            </p>
          </button>
        </div>
      </div>

      {user && (
        <div className="rounded-lg border border-border bg-card p-6">
          <h2 className="text-xl font-semibold text-foreground mb-4">
            Account Information
          </h2>
          <div className="space-y-2">
            <p className="text-sm">
              <span className="font-medium text-foreground">Email:</span>{' '}
              <span className="text-muted-foreground">{user.email}</span>
            </p>
            <p className="text-sm">
              <span className="font-medium text-foreground">User ID:</span>{' '}
              <span className="text-muted-foreground font-mono">{user.id}</span>
            </p>
            <p className="text-sm">
              <span className="font-medium text-foreground">Last Sign In:</span>{' '}
              <span className="text-muted-foreground">
                {user.last_sign_in_at ? new Date(user.last_sign_in_at).toLocaleString() : 'Never'}
              </span>
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
