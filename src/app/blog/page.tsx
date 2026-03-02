import { getAllPosts } from "@/lib/posts";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "All Posts - Ying Wang",
  description: "Browse all blog posts about web development and programming.",
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="home">
      <h1>All Posts</h1>
      <ul className="posts">
        {posts.map((post) => (
          <li key={post.slug}>
            <span className="post-date">
              {new Date(post.date).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </span>
            <Link href={`/blog/${post.slug}`} className="post-link">
              {post.title}
            </Link>
            <br />
            <span className="post-excerpt">{post.excerpt}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
