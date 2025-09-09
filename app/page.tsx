import { createClient } from '@/lib/supabase/server';
import { Tool } from '@/models/Tool';
import ToolCard from '@/components/ui/ToolCard';
import CategoryTag from '@/components/ui/CategoryTag';
import HeroSection from '@/components/layout/HeroSection';
import Link from 'next/link';

// Type alias using Tool interface (no need to extend as slug is already in Tool)
type ToolWithSlug = Tool;

export default async function Home() {
  const supabase = createClient();
  
  // Fetch featured tools (up to 6)
  const { data: featuredTools, error: featuredError } = await supabase
    .from('tools')
    .select('*')
    .eq('is_featured', true)
    .limit(6) as { data: ToolWithSlug[] | null, error: any };
  
  // Fetch latest tools (up to 12, ordered by created_at desc)
  const { data: latestTools, error: latestError } = await supabase
    .from('tools')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(12) as { data: ToolWithSlug[] | null, error: any };
  
  // Fetch all unique categories
  const { data: categoriesData, error: categoriesError } = await supabase
    .from('tools')
    .select('category')
    .not('category', 'is', null);
  
  // Extract unique category names
  const categories = categoriesData
    ? Array.from(new Set(categoriesData.map(tool => tool.category)))
        .filter(Boolean) as string[]
    : [];
  return (
    <>
      {/* Hero Section with Aurora Background */}
      <HeroSection />
      
      <div className="max-w-5xl mx-auto py-8 space-y-12">
        {/* Editor's Pick Section */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-foreground">
            Editor's Picks
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {featuredTools && featuredTools.length > 0 ? (
              featuredTools.map((tool: ToolWithSlug) => (
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
              ))
            ) : (
              <div className="col-span-2 text-center py-12 text-foreground/60">
                {featuredError ? 'Error loading featured tools' : 'No featured tools available yet'}
              </div>
            )}
          </div>
        </section>

      {/* Categories Section */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold text-foreground">
          Popular Categories
        </h2>
        <div className="flex flex-wrap gap-3">
          {categories && categories.length > 0 ? (
            categories.map((category) => (
              <Link key={category} href={`/category/${encodeURIComponent(category)}`}>
                <CategoryTag 
                  key={category} 
                  category={category}
                />
              </Link>
            ))
          ) : (
            <div className="w-full text-center py-6 text-foreground/60">
              {categoriesError ? 'Error loading categories' : 'No categories available yet'}
            </div>
          )}
        </div>
      </section>

      {/* Latest Additions Section */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold text-foreground">
          Latest Additions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {latestTools && latestTools.length > 0 ? (
            latestTools.map((tool: ToolWithSlug) => (
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
            ))
          ) : (
            <div className="col-span-3 text-center py-12 text-foreground/60">
              {latestError ? 'Error loading latest tools' : 'No tools available yet'}
            </div>
          )}
        </div>
      </section>
      </div>
    </>
  );
}