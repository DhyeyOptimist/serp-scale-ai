// TypeScript type definition for the tools table
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
}

// Type for FAQ entries stored in the jsonb column
export interface FAQ {
  q: string; // question
  a: string; // answer
}

// Type for inserting new tools (excludes auto-generated fields)
export type ToolInsert = Omit<Tool, 'id' | 'created_at'>;

// Type for updating tools (all fields optional except id)
export type ToolUpdate = Partial<Omit<Tool, 'id'>> & { id: number };