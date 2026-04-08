export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTimeMinutes: number;
  tags: string[];
  ogDescription: string;
}

export const posts: BlogPost[] = [
  {
    slug: "agentic-ai-weather-shipping-decisions",
    title:
      "How We Used Agentic AI to Put Weather-Based Shipping Decisions on Autopilot",
    excerpt:
      "A look at the Automatic Weather Recheck feature and what it teaches us about the real promise of agentic AI in logistics.",
    date: "2026-03-29",
    readTimeMinutes: 7,
    tags: ["AI", "Logistics", "Agentic AI", "WeatherFreight"],
    ogDescription:
      "How WeatherFreight's Automatic Weather Recheck uses agentic AI to autonomously monitor and resolve shipping holds for temperature-sensitive products.",
  },
  {
    slug: "mcp-grounds-llms-in-real-data",
    title:
      "Stop Letting Your AI Make Things Up: How MCP Grounds LLMs in Real Data",
    excerpt:
      "Hallucinations are the most embarrassing thing an AI can do, and the most dangerous. Here's the architectural pattern that makes them structurally impossible for anything the AI is supposed to know.",
    date: "2026-03-27",
    readTimeMinutes: 6,
    tags: ["AI", "MCP", "Engineering", "LLMs"],
    ogDescription:
      "How the Model Context Protocol eliminates LLM hallucinations by grounding AI in real, auditable data sources — and why it's increasingly a compliance requirement.",
  },
  {
    slug: "ai-assistants-pay-for-themselves-in-90-days",
    title: "How AI Assistants Pay for Themselves in 90 Days",
    excerpt:
      "It is 9:14 PM and a customer with a real problem just landed on your website. Your office is closed. That lead is gone. Here is the math on why a $250/month AI assistant is the highest-ROI investment a small business can make.",
    date: "2026-03-26",
    readTimeMinutes: 5,
    tags: ["Small Business", "AI", "Lead Generation", "AI Assistants"],
    ogDescription:
      "The math behind AI assistants for small businesses: how a $250/month investment captures after-hours leads and delivers an 11x return in 90 days.",
  },
  {
    slug: "what-to-look-for-in-a-technical-co-founder",
    title: "What to Look for in a Technical Co-Founder",
    excerpt:
      "Sixty days from first conversation to Shopify App Store. Two people, no funding, no engineering team. Here is what made that partnership work and the three questions you should ask before choosing your technical counterpart.",
    date: "2026-03-25",
    readTimeMinutes: 5,
    tags: ["Founders", "Startups", "Product", "AI"],
    ogDescription:
      "What actually matters when choosing a technical co-founder, based on building an AI-powered Shopify app from idea to App Store in sixty days.",
  },
  {
    slug: "api-first-development-workflow",
    title: "The API-First Workflow That Changed How I Build Fullstack Features",
    excerpt:
      "Starting every feature from the backend API sounds backwards until you realize it eliminates an entire category of coordination problems. Here is the workflow that cut my fullstack development time in half.",
    date: "2026-03-24",
    readTimeMinutes: 7,
    tags: ["Engineering", "API Design", "Workflow", "Fullstack"],
    ogDescription:
      "A practical guide to building fullstack features faster by designing the backend API first and letting the code serve as living documentation.",
  },
];

export function getPostBySlug(slug: string): BlogPost | undefined {
  return posts.find((p) => p.slug === slug);
}

export function getAllPosts(): BlogPost[] {
  return [...posts].sort((a, b) => b.date.localeCompare(a.date));
}
