import { createClient } from '@/lib/supabase/server';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import StarRating from '@/components/ui/StarRating';
import { Tool, FAQ } from '@/models/Tool';
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from '@/components/ui/accordion';

// Type alias using Tool interface
type ToolWithSlug = Tool;

interface ToolPageParams {
  params: {
    slug: string;
  };
}

export default async function ToolPage({ params }: ToolPageParams) {
  const supabase = createClient();
  
  // First, try to find tool by slug
  let { data: tool } = await supabase
    .from('tools')
    .select('*')
    .eq('slug', params.slug)
    .single() as { data: ToolWithSlug | null };

  // If not found by slug, try by ID (for backward compatibility)
  if (!tool) {
    try {
      const id = parseInt(params.slug);
      if (!isNaN(id)) {
        const { data: toolById } = await supabase
          .from('tools')
          .select('*')
          .eq('id', id)
          .single() as { data: ToolWithSlug | null };
        
        tool = toolById;
      }
    } catch (e) {
      // If error parsing ID, just continue to 404
    }
  }

  // If tool still not found, show 404 page
  if (!tool) {
    notFound();
  }

  return (
    <div className="max-w-5xl mx-auto py-8">
      <div className="grid md:grid-cols-12 gap-8">
        {/* Left Column (1/3 width on desktop) */}
        <div className="md:col-span-4 space-y-6">
          {/* Tool Logo */}
          <div className="w-24 h-24 rounded-lg overflow-hidden bg-secondary/20 mx-auto md:mx-0">
            {tool.logo_url ? (
              <Image
                src={tool.logo_url}
                alt={`${tool.name} logo`}
                width={96}
                height={96}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-primary/10 flex items-center justify-center">
                <span className="text-primary font-semibold text-4xl">
                  {tool.name.charAt(0)}
                </span>
              </div>
            )}
          </div>

          {/* Basic Info */}
          <div>
            <h1 className="text-2xl font-bold text-foreground">{tool.name}</h1>
            <div className="mt-2 mb-3">
              <StarRating rating={tool.rating || 0} />
            </div>
            <p className="text-foreground/70 mb-4">{tool.short_description}</p>
            
            <div className="flex items-center justify-between mb-6">
              {tool.category && (
                <Link href={`/category/${encodeURIComponent(tool.category)}`}>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-secondary/20 text-foreground/80 hover:bg-primary/10 transition-colors">
                    {tool.category}
                  </span>
                </Link>
              )}
              <span className="text-xs text-foreground/60 font-medium">
                {tool.pricing_model || 'N/A'}
              </span>
            </div>

            {/* Visit Website Button */}
            <Button asChild className="w-full">
              <Link 
                href={tool.website_url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2"
              >
                Visit Site <ExternalLink className="w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>

        {/* Right Column (2/3 width on desktop) */}
        <div className="md:col-span-8">
          {/* Full Description */}
          <div className="bg-card border border-secondary/20 rounded-lg p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">About {tool.name}</h2>
            <div className="prose prose-sm max-w-none text-foreground/80">
              {tool.full_description ? (
                <p className="whitespace-pre-line">{tool.full_description}</p>
              ) : (
                <p className="text-foreground/60">No detailed description available.</p>
              )}
            </div>
          </div>

          {/* FAQs Section */}
          {tool.faqs && tool.faqs.length > 0 && (
            <div className="bg-card border border-secondary/20 rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Frequently Asked Questions</h2>
              <Accordion type="single" collapsible className="w-full">
                {tool.faqs.map((faq: FAQ, index: number) => (
                  <AccordionItem key={index} value={`faq-${index}`}>
                    <AccordionTrigger className="text-left font-medium">
                      {faq.q}
                    </AccordionTrigger>
                    <AccordionContent className="text-foreground/70">
                      <p className="whitespace-pre-line">{faq.a}</p>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          )}
        </div>
      </div>

      {/* Back Button */}
      <div className="mt-8 text-center">
        <Link href="/" className="text-primary hover:underline">
          &larr; Back to all tools
        </Link>
      </div>
    </div>
  );
}
