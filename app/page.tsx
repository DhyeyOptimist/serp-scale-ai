'use client';

import { mockTools, mockCategories } from '@/lib/mock-data';
import ToolCard from '@/components/ui/ToolCard';
import CategoryTag from '@/components/ui/CategoryTag';

export default function Home() {
  return (
    <div className="max-w-5xl mx-auto py-8 space-y-12">
      {/* Search Section */}
      <section className="text-center space-y-6">
        <h1 className="text-4xl md:text-5xl font-bold text-foreground">
          Find The Right AI Tool
        </h1>
        <div className="max-w-2xl mx-auto">
          {/* Placeholder for search bar */}
          <div className="h-12 bg-card border border-secondary rounded-lg flex items-center justify-center text-foreground/50">
            Search bar placeholder
          </div>
        </div>
      </section>

      {/* Editor's Pick Section */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold text-foreground">
          Editor's Picks
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {mockTools
            .filter(tool => tool.is_featured)
            .map((tool) => (
              <ToolCard key={tool._id} tool={tool} />
            ))}
        </div>
      </section>

      {/* Categories Section */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold text-foreground">
          Popular Categories
        </h2>
        <div className="flex flex-wrap gap-3">
          {mockCategories.map((category) => (
            <CategoryTag 
              key={category} 
              category={category}
              onClick={() => console.log(`Clicked category: ${category}`)}
            />
          ))}
        </div>
      </section>
    </div>
  );
}