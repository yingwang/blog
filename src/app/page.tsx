import { getAllPosts } from "@/lib/posts";
import Link from "next/link";

export default function Home() {
  const posts = getAllPosts();

  return (
    <div className="home">
      <section className="hero">
        <h1>
          Hi, I&apos;m <span className="hero-gradient">Ying Wang</span>
        </h1>
        <p>
          Writing about software engineering, quantitative finance, and building things.
        </p>
      </section>

      <div className="section-header">
        <h2>Recent Posts</h2>
        <Link href="/blog">View all</Link>
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
