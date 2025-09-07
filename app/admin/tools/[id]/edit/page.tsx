'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import '../../../config' // Import the edge runtime configuration
import ToolForm from '@/components/admin/ToolForm'
import { createClient } from '@supabase/supabase-js'

interface EditToolPageProps {
  params: {
    id: string
  }
}

export default function EditToolPage({ params }: EditToolPageProps) {
  const router = useRouter()
  const { id } = params
  const toolId = parseInt(id, 10)
  
  const [tool, setTool] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  useEffect(() => {
    async function fetchTool() {
      if (isNaN(toolId)) {
        router.push('/admin/dashboard')
        return
      }
      
      try {
        // Use environment variables directly
        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
        const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
        
        if (!supabaseUrl || !supabaseKey) {
          throw new Error('Missing Supabase credentials')
        }
        
        const supabase = createClient(supabaseUrl, supabaseKey)
        
        // Fetch the tool by ID
        const { data, error: supabaseError } = await supabase
          .from('tools')
          .select('*')
          .eq('id', toolId)
          .single()
        
        if (supabaseError) throw supabaseError
        
        if (!data) {
          router.push('/admin/dashboard')
          return
        }
        
        setTool(data)
      } catch (err) {
        console.error('Error fetching tool:', err)
        setError('Failed to load tool. Please try again.')
      } finally {
        setIsLoading(false)
      }
    }
    
    fetchTool()
  }, [toolId, router])
  
  if (isLoading) {
    return <div className="p-6 text-center">Loading tool information...</div>
  }
  
  if (error) {
    return <div className="p-6 text-center text-red-500">{error}</div>
  }
  
  if (!tool) {
    return <div className="p-6 text-center">Tool not found</div>
  }
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center border-b border-border pb-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Edit Tool</h1>
          <p className="text-muted-foreground mt-2">
            Update the information for {tool.name}
          </p>
        </div>
        <Link 
          href="/admin/dashboard"
          className="px-4 py-2 bg-muted text-muted-foreground hover:bg-muted/80 rounded-md font-medium"
        >
          Cancel
        </Link>
      </div>
      
      <div className="rounded-lg border border-border bg-card p-6">
        <ToolForm initialData={tool} />
      </div>
    </div>
  )
}
