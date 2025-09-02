// We're using this file for both imports in Next.js and requires in ts-node
// so we'll manually define the types instead of importing from the project

// Define tools without auto-generated fields (id, created_at)
interface SeedTool {
  name: string;
  short_description: string;
  full_description: string;
  logo_url: string | null;
  website_url: string;
  rating: number;
  pricing_model: string;
  category: string;
  faqs: { q: string; a: string }[];
  is_featured: boolean;
  slug: string;
}

// Sample data for seeding the database
const seedTools = [
  {
    name: 'ChatGPT',
    short_description: 'Conversational AI assistant for natural language understanding and generation',
    full_description: 
      'ChatGPT is an advanced AI assistant built by OpenAI that can understand and generate human-like text. It can answer questions, provide information, assist with writing, explain concepts, and engage in conversations on a wide range of topics. Based on the GPT (Generative Pre-trained Transformer) architecture, it continually improves its capabilities through training on diverse internet text and human feedback.\n\nChatGPT can help with drafting emails, writing code, educational tutoring, creative writing, and more. The free version offers access to GPT-3.5, while ChatGPT Plus subscribers get access to GPT-4, which has enhanced reasoning capabilities, broader knowledge, and better instruction-following.',
    logo_url: 'https://static.vecteezy.com/system/resources/previews/021/495/996/original/chatgpt-openai-logo-icon-free-png.png',
    website_url: 'https://chat.openai.com/',
    rating: 4.8,
    pricing_model: 'Freemium',
    category: 'AI Assistants',
    faqs: [
      {
        q: 'What can ChatGPT do?',
        a: 'ChatGPT can answer questions, assist with writing tasks, explain complex topics, generate creative content, help with programming, translate languages, and engage in conversational exchanges on a wide variety of subjects.'
      },
      {
        q: 'Is there a free version of ChatGPT?',
        a: 'Yes, OpenAI offers a free version of ChatGPT that uses the GPT-3.5 model with some limitations on usage during peak times.'
      },
      {
        q: "What's the difference between ChatGPT and ChatGPT Plus?",
        a: "ChatGPT Plus ($20/month) offers access to GPT-4 (a more advanced model), priority access during peak times, faster response times, and early access to new features and improvements."
      }
    ],
    is_featured: true,
    slug: 'chatgpt'
  },
  {
    name: 'Midjourney',
    short_description: 'AI art generator that creates stunning images from text descriptions',
    full_description: 
      'Midjourney is an independent research lab that produces an AI program of the same name which creates images from textual descriptions. The tool has gained popularity for its ability to generate highly artistic and visually impressive imagery based on text prompts.\n\nUsers describe their desired image using natural language, and Midjourney's AI converts these descriptions into detailed, artistic visualizations. The quality and artistic style of Midjourney's outputs have made it especially popular among artists, designers, and creative professionals.\n\nThe tool operates primarily through Discord, where users can join the Midjourney server and generate images using text commands. With each new version release, Midjourney has significantly improved its ability to understand complex prompts and create more realistic and aesthetically pleasing images.',
    logo_url: 'https://upload.wikimedia.org/wikipedia/commons/e/e6/Midjourney_Emblem.png',
    website_url: 'https://www.midjourney.com/',
    rating: 4.7,
    pricing_model: 'Subscription',
    category: 'AI Image Generation',
    faqs: [
      {
        q: 'How do I use Midjourney?',
        a: 'Midjourney operates primarily through Discord. You join the Midjourney Discord server, navigate to one of the "newbie" channels, and type "/imagine" followed by your text prompt describing the image you want to create.'
      },
      {
        q: 'How much does Midjourney cost?',
        a: 'Midjourney offers several subscription tiers starting at $10/month for the Basic plan, which gives you about 200 standard images per month. Higher tiers offer more usage and features.'
      },
      {
        q: 'Can I use Midjourney images commercially?',
        a: 'Yes, subscribers can use the images they generate for commercial purposes, with some limitations depending on your subscription tier. The standard plans grant you a license to the images you create.'
      }
    ],
    is_featured: true,
    slug: 'midjourney'
  },
  {
    name: 'DALL-E 3',
    short_description: 'OpenAI\'s advanced image generation model that creates highly detailed images from text',
    full_description: 
      'DALL-E 3 is the third iteration of OpenAI\'s text-to-image generation system, representing a significant advancement in AI-generated imagery. It creates highly detailed, accurate, and photorealistic images based on text prompts, with remarkable improvements in understanding spatial relationships, specific details, and text rendering within images.\n\nThe model demonstrates an enhanced ability to follow complex instructions and generate images that closely match user intent. DALL-E 3 is integrated directly with ChatGPT, allowing users to iteratively refine their prompts with the help of the language model to achieve desired results.\n\nDALL-E 3 has improved safety measures to decline requests that ask for images of real individuals, violent or sexual content, or images that might infringe on intellectual property rights.',
    logo_url: 'https://seeklogo.com/images/D/dall-e-logo-1F945968D7-seeklogo.com.png',
    website_url: 'https://openai.com/dall-e-3',
    rating: 4.9,
    pricing_model: 'Included with ChatGPT Plus',
    category: 'AI Image Generation',
    faqs: [
      {
        q: 'How can I access DALL-E 3?',
        a: 'DALL-E 3 is available through ChatGPT Plus and Enterprise subscriptions. It\'s also accessible via the OpenAI API for developers.'
      },
      {
        q: 'What improvements does DALL-E 3 offer over previous versions?',
        a: 'DALL-E 3 offers significant improvements in image quality, understanding complex prompts, rendering text correctly within images, and following detailed instructions about specific elements and their relationships within the image.'
      },
      {
        q: 'Are there any limitations on what DALL-E 3 can generate?',
        a: 'Yes, DALL-E 3 has safety measures to prevent generation of violent, sexual, hateful content, or images of real public figures. It also has guardrails against creating images that might infringe on intellectual property.'
      }
    ],
    is_featured: true,
    slug: 'dall-e-3'
  },
  {
    name: 'Notion AI',
    short_description: 'AI writing assistant integrated directly into Notion workspace',
    full_description: 
      'Notion AI is an artificial intelligence writing assistant built directly into the Notion productivity platform. It helps users draft content, summarize text, improve writing style, brainstorm ideas, and edit existing content—all within their Notion workspace.\n\nThe AI assistant can generate first drafts of blog posts, meeting agendas, job descriptions, and other content types based on simple prompts. It can transform bullet points into full paragraphs, summarize long documents, and translate text between languages.\n\nNotion AI can also help improve writing by suggesting more concise wording, fixing grammar issues, and adjusting tone to be more professional, friendly, or straightforward as needed. This integration allows users to leverage AI capabilities without leaving their primary workspace and knowledge management system.',
    logo_url: 'https://upload.wikimedia.org/wikipedia/commons/4/45/Notion_app_logo.png',
    website_url: 'https://www.notion.so/product/ai',
    rating: 4.6,
    pricing_model: 'Add-on Subscription',
    category: 'AI Writing Tools',
    faqs: [
      {
        q: 'How much does Notion AI cost?',
        a: 'Notion AI is available as an add-on to any Notion plan for $10 per member per month (billed annually) or $12 per member per month (billed monthly).'
      },
      {
        q: 'What can I do with Notion AI?',
        a: 'With Notion AI, you can draft blog posts, create summaries, improve your writing, brainstorm ideas, translate content, extract key points from meetings, create action item lists, and much more—all without leaving your Notion workspace.'
      },
      {
        q: 'Do I need a Notion subscription to use Notion AI?',
        a: 'Yes, Notion AI is an add-on feature that requires a Notion account. It works with free personal accounts as well as paid Team and Enterprise plans.'
      }
    ],
    is_featured: false,
    slug: 'notion-ai'
  },
  {
    name: 'Descript',
    short_description: 'All-in-one audio and video editing platform powered by AI',
    full_description: 
      'Descript is an all-in-one audio and video editing platform that leverages artificial intelligence to simplify the content creation process. Its standout feature is the ability to edit audio and video as easily as editing a text document—users can remove filler words, correct mistakes, or rearrange content by simply editing a transcript of their recording.\n\nThe platform offers several AI-powered capabilities, including Overdub, which creates a synthetic voice clone that can generate new audio in a user\'s voice (with their permission). This allows for easy corrections without re-recording. Studio Sound automatically improves audio quality by reducing background noise and enhancing voice clarity.\n\nDescript\'s AI features extend to automated transcription, which converts spoken content to text with high accuracy. The platform also offers collaborative features, screen recording capabilities, and various export options, making it popular among podcasters, video creators, and businesses producing multimedia content.',
    logo_url: 'https://upload.wikimedia.org/wikipedia/commons/9/91/Descript_Logo.svg',
    website_url: 'https://www.descript.com/',
    rating: 4.7,
    pricing_model: 'Freemium',
    category: 'AI Video & Audio',
    faqs: [
      {
        q: 'What makes Descript different from traditional video editors?',
        a: 'Descript allows you to edit video and audio by editing text. When you delete or rearrange words in the transcript, the corresponding sections of audio and video are automatically edited accordingly. This makes editing much faster and more intuitive than traditional timeline-based editors.'
      },
      {
        q: 'What is Overdub and how does it work?',
        a: 'Overdub is Descript\'s voice cloning technology that lets you create a realistic AI voice based on your own voice. Once you\'ve created an Overdub voice (which requires reading specific consent scripts), you can generate new audio in your voice by simply typing text. This is useful for correcting mistakes or adding new content without having to record again.'
      },
      {
        q: 'Does Descript have a free plan?',
        a: 'Yes, Descript offers a free plan with limited features, including up to 3 projects, 1 hour of transcription, and basic editing tools. Paid plans start at $12/month and offer more transcription hours and advanced features.'
      }
    ],
    is_featured: false,
    slug: 'descript'
  },
  {
    name: 'Runway',
    short_description: 'AI-powered creative suite for video editing and visual effects',
    full_description: 
      'Runway is an advanced AI-powered creative suite that enables users to create and edit videos with revolutionary ease. The platform combines cutting-edge AI technologies with intuitive design to make professional-level video editing and generation accessible to creators of all skill levels.\n\nThe flagship feature of Runway is Gen-2, its text-to-video model that can generate original video content from text prompts or transform still images into moving footage. Users can create videos without source footage or dramatically manipulate existing videos with tools like text-based editing, background removal, and motion tracking—all powered by AI.\n\nRunway also offers features such as frame interpolation (generating new frames between existing ones for smooth slow motion), image generation from text prompts, and various video enhancement tools like upscaling and noise reduction. The platform has gained popularity among filmmakers, designers, and digital artists looking to streamline their workflows or achieve effects that would be difficult or impossible with traditional tools.',
    logo_url: 'https://framerusercontent.com/images/nXLtHbvibDZD9LF2NE32kzjzzM.png',
    website_url: 'https://runwayml.com/',
    rating: 4.8,
    pricing_model: 'Subscription',
    category: 'AI Video & Audio',
    faqs: [
      {
        q: 'What is Gen-2 in Runway?',
        a: 'Gen-2 is Runway\'s text-to-video AI model that allows you to generate original videos from text descriptions or transform still images into videos. It\'s one of the most advanced text-to-video systems currently available.'
      },
      {
        q: 'How much does Runway cost?',
        a: 'Runway offers several pricing tiers: a free plan with limited features, a Standard plan ($12/month) with more generations, and a Pro plan ($28/month) with priority access and higher resolution outputs. They also offer an Unlimited plan ($76/month) for professional creators.'
      },
      {
        q: 'Do I need technical skills to use Runway?',
        a: 'No, Runway is designed to be accessible to users regardless of technical background. The interface is intuitive, and many advanced effects can be achieved with simple text prompts or a few clicks, rather than complex manual processes.'
      }
    ],
    is_featured: true,
    slug: 'runway'
  },
  {
    name: 'GitHub Copilot',
    short_description: 'AI pair programmer that helps write better code faster',
    full_description: 
      'GitHub Copilot is an AI pair programming tool developed by GitHub and OpenAI that helps developers write code more efficiently. It functions as an autocomplete-style tool that can suggest code snippets, functions, and even entire algorithms based on comments and existing code context.\n\nPowered by OpenAI\'s Codex model, Copilot has been trained on billions of lines of public code from GitHub repositories. It works across numerous programming languages including Python, JavaScript, TypeScript, Ruby, Go, and many others. The tool is deeply integrated into code editors like Visual Studio Code, Visual Studio, Neovim, and JetBrains IDEs.\n\nGitHub Copilot can understand natural language comments and convert them into functioning code, complete repetitive code patterns, suggest tests based on implementation code, and help developers explore alternative approaches to solving problems. While it significantly accelerates coding speed, it\'s designed to be a collaborative tool that enhances developer productivity rather than replacing human programming expertise.',
    logo_url: 'https://github.githubassets.com/assets/GitHub-Mark-ea2971cee799.png',
    website_url: 'https://github.com/features/copilot',
    rating: 4.7,
    pricing_model: 'Subscription',
    category: 'Developer Tools',
    faqs: [
      {
        q: 'How accurate is the code suggested by GitHub Copilot?',
        a: 'GitHub Copilot generally provides helpful suggestions, but code quality can vary. Developers should always review, test, and verify the suggested code before incorporating it into their projects. It\'s meant to be a helpful assistant rather than a replacement for developer judgment.'
      },
      {
        q: 'How much does GitHub Copilot cost?',
        a: 'GitHub Copilot is available for $10/month for individual developers or $19/user/month for businesses. It\'s free for verified students, teachers, and maintainers of popular open-source projects.'
      },
      {
        q: 'What programming languages does GitHub Copilot support?',
        a: 'GitHub Copilot supports a wide range of programming languages, including Python, JavaScript, TypeScript, Ruby, Go, C#, C++, Java, and many others. It generally works best with popular languages that were well-represented in its training data.'
      }
    ],
    is_featured: true,
    slug: 'github-copilot'
  },
  {
    name: 'ElevenLabs',
    short_description: 'AI voice generator with lifelike speech synthesis and voice cloning',
    full_description: 
      'ElevenLabs is an AI speech software company that specializes in producing ultra-realistic text-to-speech and voice cloning technology. Their platform allows users to generate human-like voiceovers, clone voices (with permission), and create lifelike speech in multiple languages and accents.\n\nThe company\'s proprietary technology creates voice outputs that maintain natural intonation, emotion, and pacing, overcoming the robotic qualities often associated with traditional text-to-speech systems. Users can adjust parameters like stability and clarity to fine-tune the emotional quality and performance of the generated speech.\n\nElevenLabs offers a library of premade synthetic voices with different characteristics, as well as the ability to create custom voices through their voice cloning feature. The platform is used for various applications including audiobook production, video narration, accessibility features, character voicing for games, and content localization across languages.',
    logo_url: 'https://assets-global.website-files.com/646218c67da47160c64a84d5/64804df15a16e87a3fd9c782_favicon-256.png',
    website_url: 'https://elevenlabs.io/',
    rating: 4.9,
    pricing_model: 'Freemium',
    category: 'AI Voice Generation',
    faqs: [
      {
        q: 'Is voice cloning legal and ethical with ElevenLabs?',
        a: 'ElevenLabs requires explicit consent for voice cloning and prohibits impersonation of real individuals without their permission. Users must agree to their terms of service, which forbid creating content that could deceive others about someone\'s identity or creating harmful content using cloned voices.'
      },
      {
        q: 'How much does ElevenLabs cost?',
        a: 'ElevenLabs offers a free tier with limited characters per month. Paid plans start at $5/month for the Starter plan and increase to $22/month for the Creator plan and $99/month for the Pro plan, with each tier offering more characters and features.'
      },
      {
        q: 'What languages does ElevenLabs support?',
        a: 'While initially focused on English, ElevenLabs has expanded to support multiple languages including Spanish, German, French, Polish, Italian, Portuguese, Hindi, and is continuously adding more languages to its platform.'
      }
    ],
    is_featured: false,
    slug: 'elevenlabs'
  },
  {
    name: 'Perplexity AI',
    short_description: 'AI-powered search engine that answers questions with cited sources',
    full_description: 
      'Perplexity AI is an AI-powered search and discovery platform that provides direct answers to user questions while citing sources, combining elements of traditional search engines with conversational AI capabilities. The platform uses large language models to analyze information from across the web and generate concise, informative responses.\n\nUnlike traditional search engines that return links requiring users to sift through websites for answers, Perplexity provides direct, synthesized answers with citations to the original sources, allowing users to verify information. The platform also maintains conversation context, enabling follow-up questions and a more natural interaction flow.\n\nPerplexity offers both a general web search mode and a focused academic search for scholarly research. The platform is accessible via web interface, mobile apps, and browser extensions, making it versatile for different use cases. With features like image search, voice input, and multilingual support, Perplexity aims to reimagine information discovery for the AI era.',
    logo_url: 'https://assets-global.website-files.com/64a5409cce51bcbae2fa5fec/653d733aa72707f69b4b162e_Frame%2058761.svg',
    website_url: 'https://www.perplexity.ai/',
    rating: 4.7,
    pricing_model: 'Freemium',
    category: 'AI Research Tools',
    faqs: [
      {
        q: 'How is Perplexity different from ChatGPT?',
        a: 'Unlike ChatGPT, Perplexity AI focuses specifically on providing factual answers with citations. It actively searches the web in real-time to retrieve current information rather than relying solely on pre-trained knowledge. Perplexity also provides sources for its answers, allowing users to verify information.'
      },
      {
        q: 'Is Perplexity AI free to use?',
        a: 'Yes, Perplexity offers a free version with access to its core features. They also offer Perplexity Pro at $20/month, which provides access to more advanced models like Claude and GPT-4, higher query limits, and additional features.'
      },
      {
        q: 'How accurate is the information from Perplexity?',
        a: 'Perplexity aims to provide accurate information by searching across multiple sources and citing references. However, like any AI system, it can make mistakes or occasionally provide outdated information. Users should verify critical information by checking the provided sources.'
      }
    ],
    is_featured: false,
    slug: 'perplexity-ai'
  },
  {
    name: 'Tome',
    short_description: 'AI-powered storytelling platform that generates complete presentations',
    full_description: 
      'Tome is an AI-powered storytelling platform that reimagines how presentations and visual narratives are created. It allows users to generate complete, visually engaging presentations and stories with minimal effort by leveraging artificial intelligence to assist with both content generation and design.\n\nThe platform\'s standout feature is its ability to transform simple prompts into full presentations, complete with formatted text, relevant imagery, and a coherent narrative structure. Tome integrates with various AI models for content generation, image creation, and formatting, making it a comprehensive tool for quick, professional-looking presentations.\n\nTome supports interactive elements and animations, making presentations more dynamic and engaging. Users can edit AI-generated content, add their own material, and refine the presentation to match their specific needs. The platform is designed to be intuitive, allowing users to focus on their message rather than getting caught up in design details or spending hours arranging slides.',
    logo_url: 'https://tome.app/images/tome-logo-dark.svg',
    website_url: 'https://tome.app/',
    rating: 4.6,
    pricing_model: 'Freemium',
    category: 'AI Presentation Tools',
    faqs: [
      {
        q: 'How does Tome differ from traditional presentation software like PowerPoint?',
        a: 'Tome differs from traditional presentation tools by using AI to generate both content and design simultaneously. Instead of starting with blank slides, users can generate entire presentations from prompts. Tome creates narrative-focused, scrollable documents rather than static slides, though it can export to traditional slide formats.'
      },
      {
        q: 'Can I edit the AI-generated content in Tome?',
        a: 'Yes, all AI-generated content in Tome is fully editable. You can modify text, replace images, adjust formatting, and add or remove sections as needed. The AI serves as a starting point that you can refine to match your specific requirements.'
      },
      {
        q: 'Is Tome free to use?',
        a: 'Tome offers a free plan that includes limited AI generations and basic features. For more advanced capabilities and increased usage limits, Tome offers a Pro plan at $8/month (billed annually) or $10/month (billed monthly).'
      }
    ],
    is_featured: false,
    slug: 'tome'
  },
  {
    name: 'Anthropic Claude',
    short_description: 'Conversational AI assistant focused on helpfulness, harmlessness, and honesty',
    full_description: 
      'Claude is an AI assistant created by Anthropic, designed with a focus on being helpful, harmless, and honest. It\'s a sophisticated conversational AI that can understand complex prompts, engage in nuanced conversations, and assist with a wide range of tasks from answering questions to creative writing and analysis.\n\nClaude is designed with a technique called Constitutional AI, which helps it avoid harmful, unethical, or misleading responses. The assistant excels at understanding context, following detailed instructions, and maintaining a consistent, helpful tone throughout conversations.\n\nOne of Claude\'s standout capabilities is handling very long inputs—up to approximately 100,000 tokens in Claude 2, equivalent to about 75,000 words. This allows users to provide extensive documents, code, or detailed contexts for Claude to analyze and respond to. Claude is available through Anthropic\'s direct API, the Claude web interface, and through integrations with platforms like Amazon Bedrock.',
    logo_url: 'https://assets-global.website-files.com/62a1d5838f5969f656c7559c/6492bf681de94b3819a0ebbb_Frame%2018931.svg',
    website_url: 'https://claude.ai/',
    rating: 4.8,
    pricing_model: 'Freemium',
    category: 'AI Assistants',
    faqs: [
      {
        q: 'How is Claude different from ChatGPT?',
        a: 'While both are conversational AI assistants, Claude has been specifically designed with an emphasis on helpfulness, harmlessness, and honesty using Anthropic\'s Constitutional AI approach. Claude typically excels at nuanced reasoning, following detailed instructions, and handling extremely long inputs (up to 100,000 tokens), which is substantially more than ChatGPT\'s standard context window.'
      },
      {
        q: 'Is Claude free to use?',
        a: 'Claude offers a free tier with access to the Claude 2 model with some usage limitations. Anthropic also offers Claude Pro at $20/month, which provides priority access, higher usage limits, and faster response times.'
      },
      {
        q: 'What can I use Claude for?',
        a: 'Claude is versatile and can help with drafting and editing text, answering questions, summarizing documents, creative writing, coding assistance, data analysis, brainstorming ideas, and many other tasks that involve understanding and generating text. Its large context window makes it particularly useful for analyzing long documents or conversations.'
      }
    ],
    is_featured: true,
    slug: 'anthropic-claude'
  },
  {
    name: 'Jasper',
    short_description: 'AI content platform for marketing teams to create high-converting copy',
    full_description: 
      'Jasper is an AI content creation platform designed primarily for marketing teams and content creators. It helps users generate high-quality, SEO-friendly content across various formats, including blog posts, social media updates, emails, ad copy, product descriptions, and more.\n\nThe platform offers specialized templates for different content types and use cases, making it easy to create tailored content for specific marketing needs. Jasper can adapt to different brand voices and tones, ensuring consistent messaging across all content.\n\nAdvanced features include a long-form document editor for creating comprehensive articles and blog posts, with integrated AI assistance to help overcome writer\'s block and expand on ideas. The platform also offers collaboration tools for team-based content creation, brand voice settings to maintain consistency, and SEO optimization features to help content rank better in search results.\n\nJasper integrates with various marketing tools and platforms, including Surfer SEO for enhanced optimization, making it a comprehensive solution for content marketing needs.',
    logo_url: 'https://assets-global.website-files.com/60e5f2de011b86acebc30db7/6515e33129ada5573e001a8f_jasper-favicon-250x250.png',
    website_url: 'https://www.jasper.ai/',
    rating: 4.5,
    pricing_model: 'Subscription',
    category: 'AI Writing Tools',
    faqs: [
      {
        q: 'How accurate is the content generated by Jasper?',
        a: 'Jasper generates content based on patterns it learned during training, so while it produces fluent and coherent text, users should always review, fact-check, and edit the output. Jasper is designed to assist human writers rather than replace them completely.'
      },
      {
        q: 'How much does Jasper cost?',
        a: 'Jasper offers several pricing tiers. The Creator plan starts at $39/month (billed annually) for individuals and small teams. The Teams plan at $99/month offers more features for marketing teams. They also have an Enterprise plan with custom pricing for larger organizations.'
      },
      {
        q: 'Can Jasper write in different languages?',
        a: 'Yes, Jasper supports content creation in over 30 languages, making it useful for global marketing campaigns and multilingual content strategies.'
      }
    ],
    is_featured: false,
    slug: 'jasper'
  },
  {
    name: 'Synthesia',
    short_description: 'AI video generation platform that creates videos from text with virtual presenters',
    full_description: 
      'Synthesia is an AI video generation platform that allows users to create professional-looking videos from text scripts without requiring cameras, studios, or actors. The platform\'s core technology enables the creation of talking-head videos featuring AI avatars that deliver content in a natural, human-like manner.\n\nUsers can select from a diverse library of over 140 AI avatars representing different ages, ethnicities, and professional styles. The platform supports more than 120 languages and various regional accents, making it ideal for creating multilingual content without needing multiple presenters.\n\nThe video creation process is streamlined: users write a script, select an avatar, and the platform generates a video with the chosen virtual presenter delivering the content naturally. The technology synchronizes lip movements with the spoken audio and includes realistic gestures and expressions.\n\nSynthesia also offers customization options including background selection, brand elements insertion, transitions, and the ability to create custom AI avatars based on real people (with their consent). The platform is used for various purposes including employee training, product demonstrations, marketing videos, educational content, and personalized customer communications.',
    logo_url: 'https://assets-global.website-files.com/61dc0796f359b6145bc06ea6/6475f76ec7d5e376f9d0f2de_OG%20fallback%20(11).png',
    website_url: 'https://www.synthesia.io/',
    rating: 4.7,
    pricing_model: 'Subscription',
    category: 'AI Video & Audio',
    faqs: [
      {
        q: 'How realistic are Synthesia\'s AI avatars?',
        a: 'Synthesia\'s AI avatars have become increasingly realistic with each version update. While they may not be completely indistinguishable from real humans in all cases, they deliver content with natural-looking lip synchronization, appropriate facial expressions, and natural gestures that create a professional and engaging presentation.'
      },
      {
        q: 'How much does Synthesia cost?',
        a: 'Synthesia offers a Personal plan starting at $22/month (billed annually) and a Business plan at $67/month (billed annually). They also offer Enterprise plans with custom pricing for larger organizations with specific needs.'
      },
      {
        q: 'Can I create my own custom AI avatar in Synthesia?',
        a: 'Yes, Synthesia offers custom avatar creation where you can create an AI version of yourself or team members (with appropriate consent). This service typically requires an Enterprise plan and involves a specific filming process to capture the person\'s likeness and expressions.'
      }
    ],
    is_featured: false,
    slug: 'synthesia'
  },
  {
    name: 'Stable Diffusion',
    short_description: 'Open-source AI image generation model capable of creating detailed visuals from text',
    full_description: 
      'Stable Diffusion is an open-source AI image generation model that creates detailed images based on text descriptions. Developed by Stability AI in collaboration with EleutherAI and LAION, it represents a significant advancement in making powerful AI image generation technology freely available to the public.\n\nThe model uses a latent diffusion approach to generate images by gradually denoising random patterns until they form coherent visuals that match the provided text prompt. This technique allows it to create highly detailed images across various styles, from photorealistic scenes to artistic renderings and abstract concepts.\n\nUnlike many AI image generators, Stable Diffusion\'s open-source nature means it can be run locally on consumer hardware with modest GPU requirements. This has led to a flourishing ecosystem of applications, modifications, and improvements developed by the community. Various user interfaces such as Automatic1111, ComfyUI, and commercial implementations like DreamStudio make the technology accessible to users with different technical abilities.\n\nThe model supports various creative functions beyond basic image generation, including image-to-image transformations, inpainting (selectively changing parts of images), outpainting (extending images beyond their original boundaries), and creating variations of existing images.',
    logo_url: 'https://stability.ai/assets/images/stability-ai-logo-black.svg',
    website_url: 'https://stability.ai/stable-diffusion',
    rating: 4.6,
    pricing_model: 'Open Source / Freemium',
    category: 'AI Image Generation',
    faqs: [
      {
        q: 'How is Stable Diffusion different from other AI image generators?',
        a: 'The key difference is that Stable Diffusion is open-source and can be run locally on consumer hardware, unlike services like DALL-E or Midjourney which are only accessible through cloud APIs. This allows for unrestricted use, privacy, customization, and community-driven improvements.'
      },
      {
        q: 'Is Stable Diffusion completely free?',
        a: 'The core Stable Diffusion model is free and open-source, allowing anyone to use it locally if they have suitable hardware. There are also commercial implementations like Stability AI\'s DreamStudio, which offers cloud-based access on a credit system, starting with some free credits and then charging based on usage.'
      },
      {
        q: 'What hardware do I need to run Stable Diffusion locally?',
        a: 'To run Stable Diffusion locally with reasonable performance, you typically need a computer with a relatively recent NVIDIA GPU with at least 6-8GB of VRAM. More powerful GPUs will generate images faster. There are also optimized versions that can run on lower-end hardware, though with slower generation times.'
      }
    ],
    is_featured: true,
    slug: 'stable-diffusion'
  },
  {
    name: 'Codeium',
    short_description: 'Free AI coding assistant with autocomplete and advanced code generation',
    full_description: 
      'Codeium is an AI-powered coding assistant that helps developers write code more efficiently through intelligent autocomplete, code generation, and explanation features. Similar to GitHub Copilot but available for free for individual use, Codeium integrates with over 40 popular code editors and IDEs including VS Code, JetBrains products, Vim, and many others.\n\nThe tool provides context-aware code suggestions as developers type, understanding both the code structure and the developer\'s intent. It can complete lines of code, suggest entire functions, and even generate complex algorithms based on natural language comments or descriptions.\n\nBeyond autocomplete, Codeium offers features like natural language search across codebases, the ability to transform code between languages, explanation of complex code sections, and automatic documentation generation. It supports over 70 programming languages, with stronger capabilities in popular languages like Python, JavaScript, TypeScript, Java, and Go.\n\nCodeium uses a client-server architecture where a local extension communicates with Codeium\'s cloud servers, which host the AI models. This approach allows the tool to run efficiently even on low-powered machines while maintaining privacy through various security measures like code anonymization and encryption.',
    logo_url: 'https://codeium.com/favicon.ico',
    website_url: 'https://codeium.com/',
    rating: 4.5,
    pricing_model: 'Freemium',
    category: 'Developer Tools',
    faqs: [
      {
        q: 'How does Codeium compare to GitHub Copilot?',
        a: 'Codeium offers similar functionality to GitHub Copilot, including AI-powered code suggestions and generation. The main difference is that Codeium is free for individual developers, while Copilot requires a subscription. Some users report that the quality of suggestions varies between the two depending on the programming language and use case.'
      },
      {
        q: 'Is Codeium really free? What\'s the catch?',
        a: 'Codeium is free for individual developers. The company monetizes through enterprise plans for businesses and teams, which include additional features like admin controls, enhanced security, and priority support. This business model allows them to offer the core product free for individual use.'
      },
      {
        q: 'What programming languages does Codeium support?',
        a: 'Codeium supports over 70 programming languages. It has particularly strong support for mainstream languages like Python, JavaScript/TypeScript, Java, C/C++, Go, Ruby, PHP, Rust, and C#, but also works with many other languages, though potentially with varying degrees of effectiveness.'
      }
    ],
    is_featured: false,
    slug: 'codeium'
  }
];

// Export for CommonJS compatibility with ts-node
module.exports = { seedTools };
