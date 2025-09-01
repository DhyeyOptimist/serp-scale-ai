/*
  # Create tools table for AI tool directory

  1. New Tables
    - `tools`
      - `id` (bigint, auto-incrementing primary key)
      - `created_at` (timestamptz, default now())
      - `name` (text, required) - Tool title
      - `short_description` (text, required) - Brief summary
      - `full_description` (text, optional) - Detailed description
      - `logo_url` (text, optional) - Tool logo URL
      - `website_url` (text, required) - Official website
      - `rating` (numeric(2,1), optional) - Admin rating (0.0-9.9)
      - `pricing_model` (text, optional) - Pricing type
      - `category` (text, optional) - Primary category
      - `faqs` (jsonb, optional) - FAQ array as JSON
      - `is_featured` (boolean, default false) - Editor's pick flag

  2. Security
    - Enable RLS on `tools` table
    - Add policy for public read access (since this is a directory)
    - Add policy for authenticated admin users to manage tools
*/

CREATE TABLE IF NOT EXISTS tools (
  id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  created_at timestamptz DEFAULT now() NOT NULL,
  name text NOT NULL,
  short_description text NOT NULL,
  full_description text,
  logo_url text,
  website_url text NOT NULL,
  rating numeric(2, 1) CHECK (rating >= 0 AND rating <= 9.9),
  pricing_model text,
  category text,
  faqs jsonb,
  is_featured boolean DEFAULT false NOT NULL
);

-- Enable Row Level Security for the tools table
-- This ensures that access to the table is controlled by policies
ALTER TABLE tools ENABLE ROW LEVEL SECURITY;

-- Policy: Allow public read access to all tools
-- Since this is a directory, users should be able to browse all tools
CREATE POLICY "Allow public read access to tools"
  ON tools
  FOR SELECT
  TO public
  USING (true);

-- Policy: Allow authenticated users to insert/update/delete tools
-- This would typically be restricted to admin users in a real application
CREATE POLICY "Allow authenticated users to manage tools"
  ON tools
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_tools_category ON tools(category);
CREATE INDEX IF NOT EXISTS idx_tools_is_featured ON tools(is_featured);
CREATE INDEX IF NOT EXISTS idx_tools_created_at ON tools(created_at DESC);