// full-seed-data.js - A more comprehensive list of tools we can add later
// This file just contains the seed data and can be imported into seed.js if needed

const fullSeedTools = [
  // Core 5 tools already in seed.js plus 10 more tools
  {
    name: 'ChatGPT',
    short_description: 'Conversational AI assistant for natural language understanding and generation',
    full_description: 'ChatGPT is an advanced AI assistant built by OpenAI that can understand and generate human-like text. It can help with writing tasks, answer questions, assist with brainstorming, explain complex topics, and much more.',
    logo_url: 'https://static.vecteezy.com/system/resources/previews/021/495/996/original/chatgpt-openai-logo-icon-free-png.png',
    website_url: 'https://chat.openai.com/',
    rating: 4.8,
    pricing_model: 'Freemium',
    category: 'AI Assistants',
    faqs: [
      {
        q: "What can ChatGPT do?",
        a: "ChatGPT can answer questions, assist with writing tasks, explain complex topics, and more."
      },
      {
        q: "Is ChatGPT free to use?",
        a: "ChatGPT offers both free and paid tiers. The free version provides access to the base model, while ChatGPT Plus offers additional features."
      }
    ],
    is_featured: true,
    slug: 'chatgpt'
  },
  {
    name: 'Midjourney',
    short_description: 'AI art generator that creates stunning images from text descriptions',
    full_description: 'Midjourney is an independent research lab that produces an AI program that creates images from text descriptions. The tool has gained popularity for its artistic style and ability to generate highly detailed, imaginative images.',
    logo_url: 'https://upload.wikimedia.org/wikipedia/commons/e/e6/Midjourney_Emblem.png',
    website_url: 'https://www.midjourney.com/',
    rating: 4.7,
    pricing_model: 'Subscription',
    category: 'AI Image Generation',
    faqs: [
      {
        q: "How do I use Midjourney?",
        a: "Midjourney operates primarily through Discord. Join their server and use the /imagine command."
      },
      {
        q: "What makes Midjourney different from other image generators?",
        a: "Midjourney is known for its distinctive artistic style and ability to create highly aesthetic images with good composition."
      }
    ],
    is_featured: true,
    slug: 'midjourney'
  },
  {
    name: 'DALL-E 3',
    short_description: "OpenAI's advanced image generation model",
    full_description: 'DALL-E 3 creates highly detailed images based on text prompts. It represents a significant improvement over previous versions with enhanced image quality, better text rendering, and improved prompt following.',
    logo_url: 'https://seeklogo.com/images/D/dall-e-logo-1F945968D7-seeklogo.com.png',
    website_url: 'https://openai.com/dall-e-3',
    rating: 4.9,
    pricing_model: 'Included with ChatGPT Plus',
    category: 'AI Image Generation',
    faqs: [
      {
        q: "How can I access DALL-E 3?",
        a: "DALL-E 3 is available through ChatGPT Plus and Enterprise subscriptions."
      },
      {
        q: "What improvements does DALL-E 3 offer over previous versions?",
        a: "DALL-E 3 has significantly improved text rendering, more accurate interpretation of prompts, and higher quality image generation."
      }
    ],
    is_featured: true,
    slug: 'dall-e-3'
  },
  {
    name: 'GitHub Copilot',
    short_description: 'AI pair programmer that helps write better code faster',
    full_description: 'GitHub Copilot is an AI tool that helps developers write code more efficiently. It provides suggestions based on comments and existing code, acting as an AI pair programmer to boost productivity.',
    logo_url: 'https://github.githubassets.com/assets/GitHub-Mark-ea2971cee799.png',
    website_url: 'https://github.com/features/copilot',
    rating: 4.7,
    pricing_model: 'Subscription',
    category: 'Developer Tools',
    faqs: [
      {
        q: "How accurate is the code suggested by GitHub Copilot?",
        a: "GitHub Copilot generally provides helpful suggestions, but code quality can vary."
      },
      {
        q: "What programming languages does GitHub Copilot support?",
        a: "Copilot supports most popular programming languages including JavaScript, Python, TypeScript, Ruby, Go, and many others."
      }
    ],
    is_featured: true,
    slug: 'github-copilot'
  },
  {
    name: 'Stable Diffusion',
    short_description: 'Open-source AI image generation model',
    full_description: 'Stable Diffusion is an open-source AI model that creates detailed images from text descriptions. Unlike many other image generation systems, it can be run locally on consumer hardware.',
    logo_url: 'https://stability.ai/assets/images/stability-ai-logo-black.svg',
    website_url: 'https://stability.ai/stable-diffusion',
    rating: 4.6,
    pricing_model: 'Open Source / Freemium',
    category: 'AI Image Generation',
    faqs: [
      {
        q: "Is Stable Diffusion completely free?",
        a: "The core Stable Diffusion model is free and open-source."
      },
      {
        q: "Can I run Stable Diffusion on my own computer?",
        a: "Yes, Stable Diffusion can run on consumer hardware with a decent GPU, unlike some other AI image generators that only run in the cloud."
      }
    ],
    is_featured: true,
    slug: 'stable-diffusion'
  },
  // Additional tools
  {
    name: 'Claude',
    short_description: 'Anthropic\'s helpful, harmless, and honest AI assistant',
    full_description: 'Claude is an AI assistant created by Anthropic, designed to be helpful, harmless, and honest. Claude can assist with writing, analysis, and problem-solving with a focus on safety and reliability.',
    logo_url: 'https://storage.googleapis.com/anthropic-website-assets/logo_claude.svg',
    website_url: 'https://www.anthropic.com/claude',
    rating: 4.7,
    pricing_model: 'Freemium',
    category: 'AI Assistants',
    faqs: [
      {
        q: "How does Claude differ from ChatGPT?",
        a: "Claude focuses on being helpful, harmless, and honest, with particular strengths in longer conversations and nuanced reasoning."
      }
    ],
    is_featured: false,
    slug: 'claude'
  },
  {
    name: 'Jasper',
    short_description: 'AI content platform for marketing teams',
    full_description: 'Jasper is an AI content creation platform specifically designed for marketing teams. It helps create blog posts, social media content, ads, emails, and more with AI assistance.',
    logo_url: 'https://assets-global.website-files.com/60e5f2de011b86acebc30db7/654ae13a755bfc53c6ac8228_Jasper-Logomark-Light-BG.svg',
    website_url: 'https://www.jasper.ai/',
    rating: 4.5,
    pricing_model: 'Subscription',
    category: 'Content Creation',
    faqs: [
      {
        q: "What kind of content can Jasper create?",
        a: "Jasper can help create blog posts, social media content, marketing copy, emails, and product descriptions."
      }
    ],
    is_featured: false,
    slug: 'jasper'
  },
  {
    name: 'Notion AI',
    short_description: 'AI writing assistant built into Notion',
    full_description: 'Notion AI is an AI writing assistant integrated directly into the Notion platform. It helps with drafting, editing, summarizing, and brainstorming content within your Notion workspace.',
    logo_url: 'https://upload.wikimedia.org/wikipedia/commons/4/45/Notion_app_logo.png',
    website_url: 'https://www.notion.so/product/ai',
    rating: 4.6,
    pricing_model: 'Subscription Add-on',
    category: 'Productivity',
    faqs: [
      {
        q: "Do I need a Notion subscription to use Notion AI?",
        a: "Yes, Notion AI is an add-on to existing Notion plans."
      }
    ],
    is_featured: false,
    slug: 'notion-ai'
  },
  {
    name: 'Grammarly',
    short_description: 'AI-powered writing assistant for grammar and style',
    full_description: 'Grammarly is an AI-powered writing assistant that helps with grammar, spelling, punctuation, clarity, engagement, and delivery mistakes. It works across various platforms and websites.',
    logo_url: 'https://static.wikia.nocookie.net/logopedia/images/c/c4/Grammarly_logo_2022.svg',
    website_url: 'https://www.grammarly.com/',
    rating: 4.7,
    pricing_model: 'Freemium',
    category: 'Writing & Editing',
    faqs: [
      {
        q: "Does Grammarly work in all browsers?",
        a: "Grammarly offers browser extensions for Chrome, Safari, Firefox, and Edge, as well as desktop apps."
      }
    ],
    is_featured: false,
    slug: 'grammarly'
  },
  {
    name: 'Perplexity AI',
    short_description: 'AI search engine with cited answers',
    full_description: 'Perplexity AI is an AI search engine that provides answers to questions with direct citations to sources. It combines the power of large language models with web search to deliver more accurate results.',
    logo_url: 'https://assets-global.website-files.com/64f6f2c0e3f4c5a91c1e823a/653a000ee7d96d5a01e3d101_perplexity_logo_blackbg.svg',
    website_url: 'https://www.perplexity.ai/',
    rating: 4.6,
    pricing_model: 'Freemium',
    category: 'Research & Discovery',
    faqs: [
      {
        q: "How is Perplexity different from traditional search engines?",
        a: "Perplexity provides direct answers to questions with citations rather than just links to websites."
      }
    ],
    is_featured: false,
    slug: 'perplexity-ai'
  },
  {
    name: 'Runway',
    short_description: 'Creative suite with AI video generation',
    full_description: 'Runway is an applied AI research company that creates AI tools for creative professionals. Their Gen-2 model can create and edit videos using text prompts or image inputs.',
    logo_url: 'https://cdn.sanity.io/images/7p2wodib/production/73a11bee0123185723901744ed9608e410c7ac75-1024x1024.png',
    website_url: 'https://runwayml.com/',
    rating: 4.8,
    pricing_model: 'Subscription',
    category: 'Video Creation',
    faqs: [
      {
        q: "What can you create with Runway?",
        a: "Runway allows you to generate and edit videos using text prompts, images, or other videos as input."
      }
    ],
    is_featured: false,
    slug: 'runway'
  },
  {
    name: 'Hugging Face',
    short_description: 'Platform for sharing and deploying AI models',
    full_description: 'Hugging Face is a platform for the machine learning community to share and collaborate on models, datasets, and applications. It offers thousands of pre-trained models and tools for working with them.',
    logo_url: 'https://huggingface.co/front/assets/huggingface_logo-noborder.svg',
    website_url: 'https://huggingface.co/',
    rating: 4.9,
    pricing_model: 'Freemium',
    category: 'Developer Tools',
    faqs: [
      {
        q: "What is Hugging Face used for?",
        a: "Hugging Face provides access to pre-trained AI models, datasets, and tools for implementing AI in applications."
      }
    ],
    is_featured: false,
    slug: 'hugging-face'
  },
  {
    name: 'Otter.ai',
    short_description: 'AI meeting assistant for real-time transcription',
    full_description: 'Otter.ai is an AI meeting assistant that provides real-time transcription, recording, and note-taking for meetings and conversations. It helps teams collaborate and stay on the same page.',
    logo_url: 'https://assets-global.website-files.com/618e9316785b3582a5178502/61f821dc6039d312861c4619_Otter_Logomark_Teal-p-500.png',
    website_url: 'https://otter.ai/',
    rating: 4.5,
    pricing_model: 'Freemium',
    category: 'Productivity',
    faqs: [
      {
        q: "How accurate is Otter.ai's transcription?",
        a: "Otter.ai typically achieves high accuracy, especially in clear audio environments with standard accents."
      }
    ],
    is_featured: false,
    slug: 'otter-ai'
  },
  {
    name: 'Synthesia',
    short_description: 'AI video generation from text',
    full_description: 'Synthesia is an AI video generation platform that creates professional-looking videos from text. It offers a variety of AI avatars and voices in multiple languages, eliminating the need for cameras, microphones, or actors.',
    logo_url: 'https://cdn.synthesia.io/images/synthesia/logo_dark.svg',
    website_url: 'https://www.synthesia.io/',
    rating: 4.6,
    pricing_model: 'Subscription',
    category: 'Video Creation',
    faqs: [
      {
        q: "How many languages does Synthesia support?",
        a: "Synthesia supports over 120 languages and accents for AI video creation."
      }
    ],
    is_featured: false,
    slug: 'synthesia'
  }
];

module.exports = fullSeedTools;
