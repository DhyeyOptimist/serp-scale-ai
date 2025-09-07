// FAQ interface for TypeScript
export interface FAQ {
  q: string;
  a: string;
}

// Category interface for TypeScript
export interface Category {
  id: number;
  name: string;
  created_at?: string;
}

// Supabase Tool type definition that matches the database schema
export interface Tool {
  id: number;
  created_at: string;
  name: string;
  short_description: string;
  full_description: string | null;
  logo_url: string | null;
  website_url: string;
  rating: number | null;
  pricing_model: string | null;
  category: string | null;
  faqs: FAQ[] | null;
  is_featured: boolean;
  slug: string;
}

// Type for inserting a new tool (omits auto-generated fields)
export interface ToolInsert {
  name: string;
  short_description: string;
  full_description?: string;
  logo_url?: string;
  website_url: string;
  rating?: number;
  pricing_model?: string;
  category?: string;
  faqs?: FAQ[];
  is_featured?: boolean;
  slug: string;
}

// Type for updating an existing tool (all fields optional except id)
export interface ToolUpdate {
  id: number;
  name?: string;
  short_description?: string;
  full_description?: string;
  logo_url?: string;
  website_url?: string;
  rating?: number;
  pricing_model?: string;
  category?: string;
  faqs?: FAQ[];
  is_featured?: boolean;
  slug?: string;
}

// Legacy interface for backward compatibility (maps to new Tool type)
export interface ITool extends Omit<Tool, 'id' | 'created_at' | 'full_description' | 'logo_url' | 'faqs' | 'slug'> {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
  full_description?: string;
  logo_url?: string;
  faqs?: FAQ[];
  slug?: string; // Making slug optional in the legacy interface
}

// Legacy FAQ interface for backward compatibility
export interface IFAQ extends FAQ {}