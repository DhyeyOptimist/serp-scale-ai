-- Create the tools table
CREATE TABLE tools (
  id BIGSERIAL PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  name TEXT NOT NULL,
  short_description TEXT NOT NULL,
  full_description TEXT,
  logo_url TEXT,
  website_url TEXT NOT NULL,
  rating NUMERIC,
  pricing_model TEXT,
  category TEXT,
  faqs JSONB,
  is_featured BOOLEAN DEFAULT FALSE
);

-- Create indexes for better performance
CREATE INDEX idx_tools_category ON tools(category);
CREATE INDEX idx_tools_is_featured ON tools(is_featured);

-- Set up Row Level Security policies
ALTER TABLE tools ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read tools
CREATE POLICY "Allow public read access to tools" 
ON tools FOR SELECT USING (true);

-- Only allow authenticated users to insert/update/delete
CREATE POLICY "Allow authenticated users to insert tools" 
ON tools FOR INSERT TO authenticated USING (true);

CREATE POLICY "Allow authenticated users to update tools" 
ON tools FOR UPDATE TO authenticated USING (true);

CREATE POLICY "Allow authenticated users to delete tools" 
ON tools FOR DELETE TO authenticated USING (true);
