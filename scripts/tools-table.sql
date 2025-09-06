-- tools-table.sql
-- Run this in the Supabase SQL Editor

-- Create the tools table
CREATE TABLE IF NOT EXISTS public.tools (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  short_description TEXT,
  full_description TEXT,
  logo_url TEXT,
  website_url TEXT,
  rating NUMERIC,
  pricing_model TEXT,
  category TEXT,
  faqs JSONB,
  is_featured BOOLEAN DEFAULT false,
  slug TEXT UNIQUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Add RLS policies
ALTER TABLE public.tools ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anyone to read
CREATE POLICY "Allow public read access" 
  ON public.tools 
  FOR SELECT 
  USING (true);
  
-- Create policy to allow authenticated users to insert
CREATE POLICY "Allow authenticated insert" 
  ON public.tools 
  FOR INSERT 
  WITH CHECK (auth.role() = 'authenticated');
