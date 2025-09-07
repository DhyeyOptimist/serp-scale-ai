import { createClient } from '@/lib/supabaseClient'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import '../../../config' // Import the edge runtime configuration
import ToolForm from '@/components/admin/ToolForm'

interface EditToolPageProps {
  params: {
    id: string
  }
}

export default async function EditToolPage({ params }: EditToolPageProps) {
  const { id } = params
  const toolId = parseInt(id, 10)
  
  if (isNaN(toolId)) {
    notFound()
  }
  
  const supabase = createClient()
  
  // Fetch the tool by ID
  const { data: tool, error } = await supabase
    .from('tools')
    .select('*')
    .eq('id', toolId)
    .single()
  
  if (error || !tool) {
    notFound()
  }
  
  // Format FAQs for display in textarea
  const faqsString = tool.faqs ? JSON.stringify(tool.faqs, null, 2) : ''
  
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
