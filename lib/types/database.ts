// Supabase Database Types
// Generated types that match the database schema

export interface Database {
  public: {
    Tables: {
      tools: {
        Row: {
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
          faqs: Array<{ q: string; a: string }> | null;
          is_featured: boolean;
        };
        Insert: {
          id?: never; // auto-generated
          created_at?: never; // auto-generated with default
          name: string;
          short_description: string;
          full_description?: string;
          logo_url?: string;
          website_url: string;
          rating?: number;
          pricing_model?: string;
          category?: string;
          faqs?: Array<{ q: string; a: string }>;
          is_featured?: boolean; // has default value
        };
        Update: {
          id?: never; // cannot update primary key
          created_at?: never; // cannot update timestamp
          name?: string;
          short_description?: string;
          full_description?: string;
          logo_url?: string;
          website_url?: string;
          rating?: number;
          pricing_model?: string;
          category?: string;
          faqs?: Array<{ q: string; a: string }>;
          is_featured?: boolean;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
}

// Type for FAQ entries stored in the jsonb column
export interface FAQ {
  q: string; // question
  a: string; // answer
}

// Export commonly used types
export type Tool = Database['public']['Tables']['tools']['Row'];
export type ToolInsert = Database['public']['Tables']['tools']['Insert'];
export type ToolUpdate = Database['public']['Tables']['tools']['Update'];