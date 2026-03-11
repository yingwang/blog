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
      <div className="section-header">
        <h2>All Posts</h2>
      </div>

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
            <span className="post-excerpt">{post.excerpt}</span>
            <div className="post-tags">
              {post.tags.map((tag) => (
                <span key={tag} className="post-tag">
                  {tag}
                </span>
              ))}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
