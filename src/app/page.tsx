import { getAllPosts } from "@/lib/posts";
import Link from "next/link";

export default function Home() {
  const posts = getAllPosts();

  return (
    <div className="home">
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
