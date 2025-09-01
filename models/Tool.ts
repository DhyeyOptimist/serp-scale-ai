// Define the FAQ interface for TypeScript
export interface IFAQ {
  q: string;
  a: string;
}

// TypeScript interface for AI tools
export interface ITool {
  _id: string;
  name: string;
  short_description: string;
  full_description?: string;
  logo_url?: string;
  website_url: string;
  rating: number;
  pricing_model: string;
  category: string;
  faqs?: IFAQ[];
  is_featured: boolean;
  createdAt: Date;
  updatedAt: Date;
}