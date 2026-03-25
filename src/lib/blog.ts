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
    slug: "api-first-development-workflow",
    title: "The API-First Workflow That Changed How I Build Fullstack Features",
    excerpt:
      "Starting every feature from the backend API sounds backwards until you realize it eliminates an entire category of coordination problems. Here is the workflow that cut my fullstack development time in half.",
    date: "2026-03-25",
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
