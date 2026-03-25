import { getAllPosts } from "@/lib/posts";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog - Ying Wang",
  description: "All blog posts.",
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div>
      <h1 className="mb-10 text-2xl font-bold tracking-tight">All Posts</h1>
      <div className="space-y-8">
        {posts.map((post) => (
          <article key={post.slug}>
            <time className="text-sm tabular-nums text-gray-400">
              {new Date(post.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </time>
            <h2 className="mt-1 text-lg font-medium">
              <Link
                href={`/blog/${post.slug}`}
                className="text-gray-900 transition-colors hover:text-blue-600"
              >
                {post.title}
              </Link>
            </h2>
            <p className="mt-1 text-sm leading-relaxed text-gray-500">
              {post.excerpt}
            </p>
            <div className="mt-2 flex gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs text-gray-400"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
