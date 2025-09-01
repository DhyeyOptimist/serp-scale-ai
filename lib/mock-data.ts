import { ITool, Tool } from '@/models/Tool';

// Mock data using the legacy ITool format for backward compatibility
export const mockTools: ITool[] = [
  {
    _id: '507f1f77bcf86cd799439011',
    name: 'ChatGPT',
    short_description: 'Advanced AI chatbot for conversations, writing, and problem-solving',
    full_description: 'ChatGPT is a state-of-the-art conversational AI that can help with writing, analysis, coding, math, and creative tasks. Built by OpenAI, it uses advanced language models to provide human-like responses.',
    logo_url: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
    website_url: 'https://chat.openai.com',
    rating: 4.8,
    pricing_model: 'Freemium',
    category: 'AI Chatbot',
    faqs: [
      { q: 'Is ChatGPT free to use?', a: 'Yes, ChatGPT has a free tier with limited usage. Premium plans are available for unlimited access.' },
      { q: 'What can ChatGPT help me with?', a: 'ChatGPT can assist with writing, coding, analysis, creative tasks, learning, and general conversation.' }
    ],
    is_featured: true,
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15')
  },
  {
    _id: '507f1f77bcf86cd799439012',
    name: 'Midjourney',
    short_description: 'AI-powered image generation tool for creating stunning artwork',
    full_description: 'Midjourney is an independent research lab that produces an AI program that creates images from textual descriptions. It\'s known for producing high-quality, artistic images.',
    logo_url: 'https://images.pexels.com/photos/8386434/pexels-photo-8386434.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
    website_url: 'https://midjourney.com',
    rating: 4.6,
    pricing_model: 'Subscription',
    category: 'AI Image Generator',
    faqs: [
      { q: 'How do I use Midjourney?', a: 'Midjourney works through Discord. You join their server and use commands to generate images.' },
      { q: 'What styles can Midjourney create?', a: 'Midjourney excels at artistic, creative, and stylized images across many different art styles.' }
    ],
    is_featured: true,
    createdAt: new Date('2024-01-16'),
    updatedAt: new Date('2024-01-16')
  },
  {
    _id: '507f1f77bcf86cd799439013',
    name: 'Jasper AI',
    short_description: 'AI writing assistant for marketing copy and content creation',
    full_description: 'Jasper AI is a comprehensive AI writing platform designed for businesses and marketers. It helps create blog posts, social media content, emails, and marketing copy.',
    logo_url: 'https://images.pexels.com/photos/8386422/pexels-photo-8386422.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
    website_url: 'https://jasper.ai',
    rating: 4.3,
    pricing_model: 'Subscription',
    category: 'AI Content Writer',
    faqs: [
      { q: 'What type of content can Jasper create?', a: 'Jasper can create blog posts, social media content, emails, ads, and various marketing materials.' },
      { q: 'Does Jasper support multiple languages?', a: 'Yes, Jasper supports content creation in over 25 languages.' }
    ],
    is_featured: true,
    createdAt: new Date('2024-01-17'),
    updatedAt: new Date('2024-01-17')
  },
  {
    _id: '507f1f77bcf86cd799439014',
    name: 'Runway ML',
    short_description: 'AI video editing and generation platform for creators',
    full_description: 'Runway ML is a creative toolkit powered by machine learning. It offers AI-powered video editing, image generation, and various creative AI tools for artists and creators.',
    logo_url: 'https://images.pexels.com/photos/8386427/pexels-photo-8386427.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
    website_url: 'https://runwayml.com',
    rating: 4.4,
    pricing_model: 'Freemium',
    category: 'AI Video Tools',
    faqs: [
      { q: 'What video formats does Runway support?', a: 'Runway supports most common video formats including MP4, MOV, and AVI.' },
      { q: 'Can I use Runway for commercial projects?', a: 'Yes, Runway offers commercial licenses for business and professional use.' }
    ],
    is_featured: false,
    createdAt: new Date('2024-01-18'),
    updatedAt: new Date('2024-01-18')
  }
];

// Helper function to convert legacy ITool to new Supabase Tool format
export function convertToSupabaseTool(legacyTool: ITool): Tool {
  return {
    id: parseInt(legacyTool._id, 16), // Convert hex string to number
    created_at: legacyTool.createdAt.toISOString(),
    name: legacyTool.name,
    short_description: legacyTool.short_description,
    full_description: legacyTool.full_description || null,
    logo_url: legacyTool.logo_url || null,
    website_url: legacyTool.website_url,
    rating: legacyTool.rating,
    pricing_model: legacyTool.pricing_model,
    category: legacyTool.category,
    faqs: legacyTool.faqs || null,
    is_featured: legacyTool.is_featured
  };
}

// Helper function to convert Supabase Tool to legacy ITool format
export function convertToLegacyTool(supabaseTool: Tool): ITool {
  return {
    _id: supabaseTool.id.toString(16), // Convert number to hex string
    name: supabaseTool.name,
    short_description: supabaseTool.short_description,
    full_description: supabaseTool.full_description ?? undefined,
    logo_url: supabaseTool.logo_url ?? undefined,
    website_url: supabaseTool.website_url,
    rating: supabaseTool.rating || 0,
    pricing_model: supabaseTool.pricing_model || '',
    category: supabaseTool.category || '',
    faqs: supabaseTool.faqs ?? undefined,
    is_featured: supabaseTool.is_featured,
    createdAt: new Date(supabaseTool.created_at),
    updatedAt: new Date(supabaseTool.created_at) // Using created_at as fallback
  };
}

export const mockCategories: string[] = [
  'AI Chatbot',
  'AI Content Writer',
  'AI Image Generator',
  'AI Video Tools',
  'AI Code Assistant',
  'AI Data Analysis',
  'AI Voice & Audio',
  'AI Design Tools'
];