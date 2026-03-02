import PostCard from "@/components/PostCard";
import SubscribeForm from "@/components/SubscribeForm";
import { getAllPosts, getAllTags } from "@/lib/posts";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "All Posts - Ying's Blog",
  description: "Browse all blog posts about web development and programming.",
};

export default function BlogPage() {
  const posts = getAllPosts();
  const tags = getAllTags();

  return (
    <>
      <section className="bg-white py-12">
        <div className="mx-auto max-w-5xl px-6">
          <h1 className="mb-4 text-3xl font-extrabold text-gray-900 md:text-4xl">
            All Posts
          </h1>
          <p className="mb-8 text-lg text-gray-600">
            Browse all articles about web development, programming, and more.
          </p>

          {/* Tags */}
          <div className="mb-8 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="cursor-default rounded-full border border-gray-200 bg-white px-4 py-1.5 text-sm font-medium text-gray-600 transition-colors hover:border-primary-300 hover:bg-primary-50 hover:text-primary-700"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-16">
        <div className="mx-auto max-w-5xl px-6">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        </div>
      </section>

      <SubscribeForm />
    </>
  );
}
