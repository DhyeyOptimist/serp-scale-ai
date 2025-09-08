'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabaseClient'
import type { Tool } from '@/models/Tool'
import Link from 'next/link'
import DeleteButton from '@/components/admin/DeleteButton'

export default function AdminDashboard() {
  const [tools, setTools] = useState<Tool[]>([])
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  
  // Calculate stats
  const totalTools = tools?.length || 0
  const featuredTools = tools?.filter(tool => tool.is_featured)?.length || 0
  
  // Get unique categories
  const uniqueCategories = new Set<string>()
  tools?.forEach(tool => {
    if (tool.category) uniqueCategories.add(tool.category)
  })
  const categoriesCount = uniqueCategories.size

  useEffect(() => {
    async function fetchTools() {
      try {
        setLoading(true)
        const supabase = createClient()
        
        // Fetch tools from database ordered by created_at in descending order
        const { data, error: supabaseError } = await supabase
          .from('tools')
          .select('*')
          .order('created_at', { ascending: false })
          
        if (supabaseError) throw supabaseError
        
        setTools(data || [])
      } catch (err) {
        console.error('Error fetching tools:', err)
        setError(err instanceof Error ? err.message : 'Unknown error occurred')
      } finally {
        setLoading(false)
      }
    }
    
    fetchTools()
  }, [])

  return (
    <div className="space-y-6">
      <div className="border-b border-border pb-4 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
          <p className="text-muted-foreground mt-2">
            Welcome back! Manage your AI tools directory from here.
          </p>
        </div>
        <Link 
          href="/admin/tools/new"
          className="px-4 py-2 bg-primary text-primary-foreground hover:bg-primary/90 rounded-md font-medium"
        >
          Add New Tool
        </Link>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Quick Stats Cards */}
        <div className="rounded-lg border border-border bg-card p-6">
          <h3 className="text-lg font-semibold text-foreground mb-2">
            Total Tools
          </h3>
          <p className="text-3xl font-bold text-primary">{totalTools}</p>
          <p className="text-sm text-muted-foreground mt-1">
            AI tools in directory
          </p>
        </div>

        <div className="rounded-lg border border-border bg-card p-6">
          <h3 className="text-lg font-semibold text-foreground mb-2">
            Featured Tools
          </h3>
          <p className="text-3xl font-bold text-primary">{featuredTools}</p>
          <p className="text-sm text-muted-foreground mt-1">
            Currently featured
          </p>
        </div>

        <div className="rounded-lg border border-border bg-card p-6">
          <h3 className="text-lg font-semibold text-foreground mb-2">
            Categories
          </h3>
          <p className="text-3xl font-bold text-primary">{categoriesCount}</p>
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
          <Link 
            href="/admin/tools/new"
            className="rounded-md border border-border bg-background p-4 text-left hover:bg-accent transition-colors"
          >
            <h4 className="font-medium text-foreground">Add New Tool</h4>
            <p className="text-sm text-muted-foreground mt-1">
              Add a new AI tool to the directory
            </p>
          </Link>
          
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
      
      {/* Tools Table */}
      <div className="rounded-lg border border-border bg-card p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-foreground">
            AI Tools
          </h2>
          <Link 
            href="/admin/tools/new"
            className="px-4 py-2 bg-primary text-primary-foreground hover:bg-primary/90 rounded-md text-sm font-medium"
          >
            Add New Tool
          </Link>
        </div>
        
        {error && (
          <div className="p-4 mb-4 text-sm rounded-lg bg-destructive/15 text-destructive">
            Error loading tools: {error}
          </div>
        )}
        
        {!tools || tools.length === 0 ? (
          <div className="text-center py-12 border-2 border-dashed border-border rounded-lg">
            <h3 className="text-lg font-medium text-foreground mb-2">No tools found</h3>
            <p className="text-muted-foreground mb-6">Add your first AI tool to get started!</p>
            <Link 
              href="/admin/tools/new"
              className="px-4 py-2 bg-primary text-primary-foreground hover:bg-primary/90 rounded-md text-sm font-medium"
            >
              Add New Tool
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs uppercase bg-muted text-muted-foreground">
                <tr>
                  <th className="px-6 py-3">Name</th>
                  <th className="px-6 py-3">Category</th>
                  <th className="px-6 py-3">Rating</th>
                  <th className="px-6 py-3">Status</th>
                  <th className="px-6 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {tools.map((tool: Tool) => (
                  <tr key={tool.id} className="bg-card border-b border-border hover:bg-muted/50">
                    <td className="px-6 py-4 font-medium text-foreground">{tool.name}</td>
                    <td className="px-6 py-4">{tool.category || 'Uncategorized'}</td>
                    <td className="px-6 py-4">{tool.rating ? `${tool.rating}/5` : 'N/A'}</td>
                    <td className="px-6 py-4">
                      {tool.is_featured ? (
                        <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                          Featured
                        </span>
                      ) : (
                        <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300">
                          Standard
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <Link 
                          href={`/admin/tools/${tool.id}/edit`} 
                          className="text-blue-600 hover:underline font-medium"
                        >
                          Edit
                        </Link>
                        <DeleteButton id={tool.id} name={tool.name} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div className="rounded-lg border border-border bg-card p-6">
        <h2 className="text-xl font-semibold text-foreground mb-4">
          Admin Access
        </h2>
        <div className="space-y-2">
          <p className="text-sm">
            <span className="font-medium text-foreground">Status:</span>{' '}
            <span className="text-green-600 font-medium">Authenticated</span>
          </p>
          <p className="text-sm">
            <span className="font-medium text-foreground">Session:</span>{' '}
            <span className="text-muted-foreground">Active</span>
          </p>
          <p className="text-sm">
            <span className="font-medium text-foreground">Role:</span>{' '}
            <span className="text-muted-foreground">Administrator</span>
          </p>
        </div>
      </div>
    </div>
  )
}
