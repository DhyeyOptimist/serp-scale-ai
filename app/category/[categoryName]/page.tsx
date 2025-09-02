import { createClient } from '@/lib/supabase/server';
import ToolCard from '@/components/ui/ToolCard';
import Link from 'next/link';
import { Tool } from '@/models/Tool';

// Extend the Tool type to include the slug field
interface ToolWithSlug extends Tool {
  slug?: string;
}

interface CategoryPageParams {
  params: {
    categoryName: string;
  };
}

export default async function CategoryPage({ params }: CategoryPageParams) {
  // Decode the URL-encoded category name from the URL
  const decodedCategory = decodeURIComponent(params.categoryName);
  
  const supabase = createClient();
  
  // Fetch all tools that match the specified category
  const { data: tools, error } = await supabase
    .from('tools')
    .select('*')
    .eq('category', decodedCategory) as { data: ToolWithSlug[] | null, error: any };

  return (
    <div className="max-w-5xl mx-auto py-8 space-y-8">
      {/* Category Header */}
      <section className="space-y-4">
        <h1 className="text-3xl font-bold text-foreground">
          Tools in the "{decodedCategory}" Category
        </h1>
        <p className="text-foreground/60">
          Discover specialized AI tools for {decodedCategory}.
        </p>
      </section>

      {/* Tools Grid */}
      <section className="space-y-6">
        {error ? (
          <div className="text-center py-12 text-destructive">
            An error occurred while loading tools. Please try again.
          </div>
        ) : tools && tools.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tools.map((tool: ToolWithSlug) => (
              <Link key={tool.id} href={`/tool/${tool.slug || tool.id}`}>
                <ToolCard 
                  tool={{
                    _id: String(tool.id),
                    name: tool.name,
                    short_description: tool.short_description,
                    full_description: tool.full_description || undefined,
                    logo_url: tool.logo_url || undefined,
                    website_url: tool.website_url,
                    rating: tool.rating || 0,
                    pricing_model: tool.pricing_model || '',
                    category: tool.category || '',
                    faqs: tool.faqs || undefined,
                    is_featured: tool.is_featured,
                    createdAt: new Date(tool.created_at),
                    updatedAt: new Date(tool.created_at)
                  }} 
                />
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-foreground/60">
            No tools found in the "{decodedCategory}" category.
          </div>
        )}
      </section>
      
      {/* Back to Home Link */}
      <div className="text-center pt-4">
        <Link href="/" className="text-primary hover:underline">
          &larr; Back to all tools
        </Link>
      </div>
    </div>
  );
}
