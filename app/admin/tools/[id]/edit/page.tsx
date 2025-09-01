import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { updateTool } from '@/app/admin/actions'
import '../../../config' // Import the edge runtime configuration

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
        <form action={updateTool} className="space-y-6">
          {/* Hidden ID field */}
          <input type="hidden" name="id" value={tool.id} />
          
          {/* Name */}
          <div className="space-y-2">
            <label htmlFor="name" className="block text-sm font-medium">
              Tool Name <span className="text-destructive">*</span>
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              defaultValue={tool.name}
              className="mt-1 block w-full px-3 py-2 bg-background border border-border rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
              placeholder="ChatGPT"
            />
          </div>
          
          {/* Short Description */}
          <div className="space-y-2">
            <label htmlFor="short_description" className="block text-sm font-medium">
              Short Description <span className="text-destructive">*</span>
            </label>
            <input
              id="short_description"
              name="short_description"
              type="text"
              required
              defaultValue={tool.short_description}
              className="mt-1 block w-full px-3 py-2 bg-background border border-border rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
              placeholder="A brief one-line description"
              maxLength={100}
            />
            <p className="text-xs text-muted-foreground">
              A brief description (max 100 characters)
            </p>
          </div>
          
          {/* Full Description */}
          <div className="space-y-2">
            <label htmlFor="full_description" className="block text-sm font-medium">
              Full Description
            </label>
            <textarea
              id="full_description"
              name="full_description"
              rows={5}
              defaultValue={tool.full_description || ''}
              className="mt-1 block w-full px-3 py-2 bg-background border border-border rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
              placeholder="Detailed description of the tool, its features, and capabilities..."
            ></textarea>
          </div>
          
          {/* Website URL */}
          <div className="space-y-2">
            <label htmlFor="website_url" className="block text-sm font-medium">
              Website URL <span className="text-destructive">*</span>
            </label>
            <input
              id="website_url"
              name="website_url"
              type="url"
              required
              defaultValue={tool.website_url}
              className="mt-1 block w-full px-3 py-2 bg-background border border-border rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
              placeholder="https://example.com"
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Rating */}
            <div className="space-y-2">
              <label htmlFor="rating" className="block text-sm font-medium">
                Rating (out of 5)
              </label>
              <input
                id="rating"
                name="rating"
                type="number"
                min="0"
                max="5"
                step="0.1"
                defaultValue={tool.rating || ''}
                className="mt-1 block w-full px-3 py-2 bg-background border border-border rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                placeholder="4.5"
              />
            </div>
            
            {/* Category */}
            <div className="space-y-2">
              <label htmlFor="category" className="block text-sm font-medium">
                Category
              </label>
              <input
                id="category"
                name="category"
                type="text"
                defaultValue={tool.category || ''}
                className="mt-1 block w-full px-3 py-2 bg-background border border-border rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                placeholder="Content Generation"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Pricing Model */}
            <div className="space-y-2">
              <label htmlFor="pricing_model" className="block text-sm font-medium">
                Pricing Model
              </label>
              <input
                id="pricing_model"
                name="pricing_model"
                type="text"
                defaultValue={tool.pricing_model || ''}
                className="mt-1 block w-full px-3 py-2 bg-background border border-border rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                placeholder="Free, Freemium, Paid, etc."
              />
            </div>
            
            {/* Logo URL */}
            <div className="space-y-2">
              <label htmlFor="logo_url" className="block text-sm font-medium">
                Logo URL
              </label>
              <input
                id="logo_url"
                name="logo_url"
                type="url"
                defaultValue={tool.logo_url || ''}
                className="mt-1 block w-full px-3 py-2 bg-background border border-border rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                placeholder="https://example.com/logo.png"
              />
            </div>
          </div>
          
          {/* FAQs */}
          <div className="space-y-2">
            <label htmlFor="faqs" className="block text-sm font-medium">
              FAQs (JSON Format)
            </label>
            <textarea
              id="faqs"
              name="faqs"
              rows={4}
              defaultValue={faqsString}
              className="mt-1 block w-full px-3 py-2 bg-background border border-border rounded-md font-mono text-sm shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
              placeholder='[{"q":"What is this tool?","a":"This tool helps you..."},{"q":"How much does it cost?","a":"The pricing is..."}]'
            ></textarea>
            <p className="text-xs text-muted-foreground">
              Enter FAQs in JSON format as an array of objects with "q" and "a" properties
            </p>
          </div>
          
          {/* Featured Checkbox */}
          <div className="flex items-center">
            <input
              id="is_featured"
              name="is_featured"
              type="checkbox"
              defaultChecked={tool.is_featured}
              className="h-4 w-4 text-primary focus:ring-primary border-border rounded"
            />
            <label htmlFor="is_featured" className="ml-2 block text-sm">
              Feature this tool on the homepage
            </label>
          </div>
          
          <div className="flex justify-end space-x-3 pt-6 border-t border-border">
            <Link
              href="/admin/dashboard"
              className="px-4 py-2 bg-muted text-muted-foreground hover:bg-muted/80 rounded-md font-medium"
            >
              Cancel
            </Link>
            <button
              type="submit"
              className="px-4 py-2 bg-primary text-primary-foreground hover:bg-primary/90 rounded-md font-medium"
            >
              Update Tool
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
