import { createClient } from '@/lib/supabase/server';
import { Tool } from '@/models/Tool';
import ToolCard from '@/components/ui/ToolCard';
import Link from 'next/link';
import { Search } from 'lucide-react';

// Extend the Tool type to include the slug field
interface ToolWithSlug extends Tool {
  slug?: string;
}

interface SearchPageProps {
  searchParams: {
    q?: string;
  };
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const searchQuery = searchParams.q?.trim();
  const supabase = createClient();
  
  let tools: ToolWithSlug[] = [];
  let error = null;

  if (searchQuery && searchQuery.length > 0) {
    // First, try to search using textSearch for name and short_description
    // Note: textSearch works best for English language and requires proper configuration in Supabase
    try {
      const nameSearch = await supabase
        .from('tools')
        .select('*')
        .textSearch('name', searchQuery) as { data: ToolWithSlug[] | null, error: any };
        
      const descriptionSearch = await supabase
        .from('tools')
        .select('*')
        .textSearch('short_description', searchQuery) as { data: ToolWithSlug[] | null, error: any };
      
      // Combine results and remove duplicates
      const combinedResults = [
        ...(nameSearch.data || []),
        ...(descriptionSearch.data || [])
      ];
      
      // Remove duplicates by ID
      tools = Array.from(
        new Map(combinedResults.map(tool => [tool.id, tool]))
      ).map(([, tool]) => tool);
    } catch (e) {
      // Fallback to ILIKE search if textSearch is not configured properly
      console.error("Error with text search, falling back to ILIKE:", e);
      
      const { data, error: searchError } = await supabase
        .from('tools')
        .select('*')
        .or(`name.ilike.%${searchQuery}%,short_description.ilike.%${searchQuery}%`) as 
        { data: ToolWithSlug[] | null, error: any };
      
      tools = data || [];
      error = searchError;
    }
  }

  return (
    <div className="max-w-5xl mx-auto py-8 space-y-8">
      {/* Search Header */}
      <section className="space-y-6">
        <h1 className="text-3xl font-bold text-foreground">
          {searchQuery 
            ? `Search Results for "${searchQuery}"`
            : "Search Tools"}
        </h1>
        
        {/* Search form (repeated on the search results page for easy refinement) */}
        <form 
          action="/search" 
          method="GET"
          className="max-w-2xl mx-auto"
        >
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search className="h-5 w-5 text-foreground/50" />
            </div>
            <input
              type="text"
              name="q"
              defaultValue={searchQuery || ''}
              placeholder="Search for AI tools..."
              className="block w-full h-12 pl-10 pr-4 py-2 bg-card border border-secondary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50"
              aria-label="Search"
              autoComplete="off"
              autoFocus
            />
          </div>
        </form>
      </section>

      {/* Search Results */}
      <section className="space-y-6">
        {!searchQuery ? (
          <div className="text-center py-12 text-foreground/60">
            Enter a search term to find AI tools.
          </div>
        ) : error ? (
          <div className="text-center py-12 text-destructive">
            An error occurred while searching. Please try again.
          </div>
        ) : tools.length > 0 ? (
          <>
            <p className="text-foreground/60">{tools.length} result{tools.length === 1 ? '' : 's'} found</p>
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
          </>
        ) : (
          <div className="text-center py-12 text-foreground/60">
            No tools found matching "{searchQuery}". Try a different search term.
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
