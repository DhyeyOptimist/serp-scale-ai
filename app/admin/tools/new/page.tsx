import Link from 'next/link'
import '../../config' // Import the edge runtime configuration
import ToolForm from '@/components/admin/ToolForm'

export default async function AddNewTool() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center border-b border-border pb-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Add a New AI Tool</h1>
          <p className="text-muted-foreground mt-2">
            Add a new tool to the directory by filling out the form below
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
        <ToolForm />
      </div>
    </div>
  )
}
