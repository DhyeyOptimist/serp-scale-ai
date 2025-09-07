-- Create categories table
CREATE TABLE IF NOT EXISTS public.categories (
  id SERIAL PRIMARY KEY,
  name TEXT UNIQUE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Add RLS policies
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anyone to read categories
CREATE POLICY "Allow public read access for categories" 
  ON public.categories 
  FOR SELECT 
  USING (true);
  
-- Create policy to allow authenticated users to manage categories
CREATE POLICY "Allow authenticated users to manage categories" 
  ON public.categories 
  USING (auth.role() = 'authenticated');
