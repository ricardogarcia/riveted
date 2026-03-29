import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllPosts, getPostBySlug } from "@/lib/blog";
import BlogContent_ApiFirstWorkflow from "@/components/BlogContent_ApiFirstWorkflow";
import BlogContent_TechnicalCoFounder from "@/components/BlogContent_TechnicalCoFounder";
import BlogContent_AiChatbots90Days from "@/components/BlogContent_AiChatbots90Days";
import BlogContent_McpGroundsLlms from "@/components/BlogContent_McpGroundsLlms";
import BlogContent_AgenticAiWeatherShipping from "@/components/BlogContent_AgenticAiWeatherShipping";

const contentMap: Record<string, React.ComponentType> = {
  "agentic-ai-weather-shipping-decisions": BlogContent_AgenticAiWeatherShipping,
  "mcp-grounds-llms-in-real-data": BlogContent_McpGroundsLlms,
  "ai-chatbots-pay-for-themselves-in-90-days": BlogContent_AiChatbots90Days,
  "what-to-look-for-in-a-technical-co-founder": BlogContent_TechnicalCoFounder,
  "api-first-development-workflow": BlogContent_ApiFirstWorkflow,
};

function formatDate(dateStr: string): string {
  const date = new Date(dateStr + "T00:00:00");
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  return {
    title: `${post.title} | Riveted Blog`,
    description: post.ogDescription,
    openGraph: {
      title: post.title,
      description: post.ogDescription,
      type: "article",
      publishedTime: post.date,
      url: `https://rivetedinc.com/blog/${post.slug}`,
      siteName: "Riveted, Inc.",
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.ogDescription,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const Content = contentMap[post.slug];
  if (!Content) notFound();

  return (
    <section className="pt-32 pb-20 px-4 sm:px-8 lg:px-16">
      <div className="mx-auto max-w-3xl w-full">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm text-foreground-light hover:text-rivet transition-colors mb-8"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5L8.25 12l7.5-7.5"
            />
          </svg>
          Back to Blog
        </Link>

        <div className="mb-10">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <time
              dateTime={post.date}
              className="text-sm text-foreground-light"
            >
              {formatDate(post.date)}
            </time>
            <span className="text-border-color">|</span>
            <span className="text-sm text-foreground-light">
              {post.readTimeMinutes} min read
            </span>
          </div>

          <h1 className="font-[family-name:var(--font-instrument-serif)] text-[clamp(2rem,4vw,3rem)] text-foreground font-normal leading-tight mb-5">
            {post.title}
          </h1>

          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs px-2.5 py-1 rounded-full border border-border-light text-foreground-light"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <Content />

        <div className="mt-16 pt-8 border-t border-border-light">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-foreground-light hover:text-rivet transition-colors"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5L8.25 12l7.5-7.5"
              />
            </svg>
            All Posts
          </Link>
        </div>
      </div>
    </section>
  );
}
