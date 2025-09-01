'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ITool } from '@/models/Tool';
import StarRating from './StarRating';
import { ExternalLink } from 'lucide-react';

interface ToolCardProps {
  tool: ITool;
}

export default function ToolCard({ tool }: ToolCardProps) {
  return (
    <div className="bg-card border border-secondary/30 rounded-lg p-6 hover:shadow-lg transition-all duration-300 hover:border-primary/20 group">
      <div className="flex items-start space-x-4">
        {/* Tool Logo */}
        <div className="flex-shrink-0">
          <div className="w-12 h-12 rounded-lg overflow-hidden bg-secondary/20">
            {tool.logo_url ? (
              <Image
                src={tool.logo_url}
                alt={`${tool.name} logo`}
                width={48}
                height={48}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-primary/10 flex items-center justify-center">
                <span className="text-primary font-semibold text-lg">
                  {tool.name.charAt(0)}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Tool Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-2">
            <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors duration-200">
              {tool.name}
            </h3>
            <Link
              href={tool.website_url}
              target="_blank"
              rel="noopener noreferrer"
              className="opacity-0 group-hover:opacity-100 transition-opacity duration-200"
            >
              <ExternalLink className="w-4 h-4 text-foreground/50 hover:text-primary" />
            </Link>
          </div>

          <StarRating rating={tool.rating || 0} className="mb-3" />

          <p className="text-foreground/70 text-sm leading-relaxed mb-4">
            {tool.short_description}
          </p>

          <div className="flex items-center justify-between">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-secondary/20 text-foreground/80">
              {tool.category}
            </span>
            <span className="text-xs text-foreground/60 font-medium">
              {tool.pricing_model}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}