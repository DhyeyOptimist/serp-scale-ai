# Serp-scale-AI Database Documentation

## Overview
This document outlines the Supabase database schema for the AI tools directory.

## Database Schema

### Tools Table
The `tools` table stores all AI tool listings with the following structure:

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | `bigint` | PRIMARY KEY, AUTO INCREMENT | Unique identifier |
| `created_at` | `timestamp with time zone` | NOT NULL, DEFAULT now() | Record creation timestamp |
| `name` | `text` | NOT NULL | Tool display name |
| `short_description` | `text` | NOT NULL | Brief summary for listings |
| `full_description` | `text` | NULL | Detailed description |
| `logo_url` | `text` | NULL | URL to tool logo |
| `website_url` | `text` | NOT NULL | Official website URL |
| `rating` | `numeric(2,1)` | NULL | Admin rating (0.0-9.9) |
| `pricing_model` | `text` | NULL | Pricing structure |
| `category` | `text` | NULL | Primary category |
| `faqs` | `jsonb` | NULL | FAQ array as JSON |
| `is_featured` | `boolean` | NOT NULL, DEFAULT false | Featured flag |

### Security Features
- **Row Level Security (RLS)** is enabled on the tools table
- Database indexes are created for optimal query performance on:
  - `category`
  - `is_featured`
  - `rating`
  - `created_at`

## TypeScript Integration

### Primary Types
- `Tool` - Main Supabase table row type
- `ToolInsert` - Type for inserting new records
- `ToolUpdate` - Type for updating existing records
- `FAQ` - Type for FAQ objects in the jsonb column

### Legacy Compatibility
- `ITool` - Legacy interface for backward compatibility
- Helper functions provided to convert between legacy and new formats

## Files Structure
```
├── supabase/
│   └── migrations/
│       └── 20250901000000_create_tools_table.sql
├── lib/
│   └── types/
│       └── database.ts
├── models/
│   └── Tool.ts
└── lib/
    └── mock-data.ts
```

## Migration Instructions
1. Run the SQL migration file in your Supabase dashboard
2. Configure RLS policies as needed for your authentication requirements
3. Update existing code to use the new `Tool` type where applicable
4. Use helper functions for converting between legacy and new formats during transition

## Example Usage

### Inserting a Tool
```typescript
const newTool: ToolInsert = {
  name: "AI Tool Name",
  short_description: "Brief description",
  website_url: "https://example.com",
  rating: 4.5,
  pricing_model: "Freemium",
  category: "AI Chatbot",
  is_featured: true
};
```

### FAQ Structure
```typescript
const faqs: FAQ[] = [
  { q: "Is this tool free?", a: "Yes, it has a free tier" },
  { q: "What can it do?", a: "It can help with various tasks" }
];
```
