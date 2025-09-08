import { createTool, updateTool } from "@/app/admin/actions";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Category, Tool } from "@/models/Tool";
import { createClient } from "@/lib/supabaseClient";
import ImageUploader from "./ImageUploader";

interface ToolFormProps {
  initialData?: Tool;
}

export default async function ToolForm({ initialData }: ToolFormProps) {
  const supabase = createClient();
  
  // Fetch categories from the database
  const { data: categories, error } = await supabase
    .from('categories')
    .select('id, name')
    .order('name');
  
  if (error) {
    console.error('Error fetching categories:', error);
  }
  
  const action = initialData ? updateTool.bind(null, initialData.id) : createTool;
  const submitButtonText = initialData ? 'Update Tool' : 'Create Tool';
  
  return (
    <form action={action} className="space-y-8">
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input 
          id="name" 
          name="name" 
          required 
          defaultValue={initialData?.name || ''}
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="short_description">Short Description</Label>
        <Textarea 
          id="short_description" 
          name="short_description" 
          rows={2} 
          required 
          defaultValue={initialData?.short_description || ''}
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="full_description">Full Description</Label>
        <Textarea 
          id="full_description" 
          name="full_description" 
          rows={6} 
          defaultValue={initialData?.full_description || ''}
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="logo">Logo</Label>
        <ImageUploader 
          id="logo"
          name="logo"
          initialImageUrl={initialData?.logo_url || ''}
        />
        <input type="hidden" name="existing_logo_url" value={initialData?.logo_url || ''} />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="website_url">Website URL</Label>
        <Input 
          id="website_url" 
          name="website_url" 
          type="url" 
          required 
          defaultValue={initialData?.website_url || ''}
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="rating">Rating</Label>
        <Input 
          id="rating" 
          name="rating" 
          type="number" 
          min="0" 
          max="5" 
          step="0.1" 
          defaultValue={initialData?.rating?.toString() || ''}
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="pricing_model">Pricing Model</Label>
        <Input 
          id="pricing_model" 
          name="pricing_model" 
          defaultValue={initialData?.pricing_model || ''}
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="category">Category</Label>
        <select 
          id="category" 
          name="category" 
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          defaultValue={initialData?.category || ''}
        >
          <option value="">Select a category</option>
          {categories?.map((category: Category) => (
            <option key={category.id} value={category.name}>
              {category.name}
            </option>
          ))}
        </select>
        <div className="text-sm text-gray-500">Or create a new category below</div>
        <Input 
          id="new_category" 
          name="new_category" 
          placeholder="New category name" 
          defaultValue=""
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="slug">Slug</Label>
        <Input 
          id="slug" 
          name="slug" 
          required 
          defaultValue={initialData?.slug || ''}
        />
        <p className="text-sm text-gray-500">
          URL-friendly version of the tool name (e.g., "ai-assistant")
        </p>
      </div>
      
      <div className="flex items-center space-x-2">
        <Checkbox 
          id="is_featured" 
          name="is_featured" 
          defaultChecked={initialData?.is_featured || false}
        />
        <Label htmlFor="is_featured">Featured Tool</Label>
      </div>
      
      {/* FAQs section - we could add dynamic FAQs fields in a future enhancement */}
      
      <Button type="submit" className="w-full">
        {submitButtonText}
      </Button>
    </form>
  );
}
