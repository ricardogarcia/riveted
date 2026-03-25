import type { Metadata } from "next";
import { getAllPosts } from "@/lib/blog";
import BlogPostCard from "@/components/BlogPostCard";

export const metadata: Metadata = {
  title: "Blog | Riveted, Inc.",
  description:
    "Engineering insights, product thinking, and lessons from building AI-powered web applications.",
  openGraph: {
    title: "Blog | Riveted, Inc.",
    description:
      "Engineering insights, product thinking, and lessons from building AI-powered web applications.",
    url: "https://rivetedinc.com/blog",
    siteName: "Riveted, Inc.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog | Riveted, Inc.",
    description:
      "Engineering insights, product thinking, and lessons from building AI-powered web applications.",
  },
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <section className="pt-32 pb-20 px-4 sm:px-8 lg:px-16">
      <div className="mx-auto max-w-7xl w-full">
        <div className="mb-12">
          <div className="flex items-center gap-4 mb-4">
            <div className="h-px w-8 bg-rivet" />
            <span className="text-[0.75rem] font-semibold tracking-[0.2em] uppercase text-rivet">
              Blog
            </span>
          </div>
          <h1 className="font-[family-name:var(--font-instrument-serif)] text-[clamp(2rem,4vw,3rem)] text-foreground font-normal leading-tight">
            Ideas, Insights, and the Occasional Hot Take
          </h1>
          <p className="mt-4 text-foreground-light text-lg max-w-2xl leading-relaxed">
            Thoughts on engineering workflows, AI tooling, and building
            products that work.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {posts.map((post, i) => (
            <BlogPostCard key={post.slug} post={post} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
