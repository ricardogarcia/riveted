"use client";

import Link from "next/link";
import FadeIn from "./FadeIn";
import type { BlogPost } from "@/lib/blog";

function formatDate(dateStr: string): string {
  const date = new Date(dateStr + "T00:00:00");
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function BlogPostCard({
  post,
  index = 0,
}: {
  post: BlogPost;
  index?: number;
}) {
  return (
    <FadeIn delay={index * 0.1}>
      <Link href={`/blog/${post.slug}`} className="block group">
        <div className="border border-border-light rounded-lg p-6 sm:p-8 transition-all duration-300 hover:border-border-color hover:shadow-[0_4px_24px_rgba(0,0,0,0.04)]">
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

          <h2 className="font-[family-name:var(--font-instrument-serif)] text-[1.4rem] sm:text-[1.6rem] text-foreground mb-3 font-normal group-hover:text-rivet transition-colors">
            {post.title}
          </h2>

          <p className="text-[0.95rem] leading-[1.8] text-foreground-light mb-5">
            {post.excerpt}
          </p>

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
      </Link>
    </FadeIn>
  );
}
