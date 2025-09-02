-- Add slug column to tools table for SEO-friendly URLs
ALTER TABLE tools ADD COLUMN slug TEXT;

-- Add a unique constraint to ensure each slug is unique
ALTER TABLE tools ADD CONSTRAINT tools_slug_key UNIQUE (slug);

-- Add an index to improve query performance when looking up tools by slug
CREATE INDEX idx_tools_slug ON tools (slug);

-- Add a comment explaining the purpose of the column
COMMENT ON COLUMN tools.slug IS 'URL-friendly version of the tool name for SEO and readable URLs (e.g., "my-tool-name")';
