import { getAllPosts } from "@/lib/posts";
import Link from "next/link";

export default function Home() {
  const posts = getAllPosts();

  return (
    <div>
      <section className="mb-16">
        <p className="text-lg text-gray-500">
          Writing about software engineering, quantitative finance, and building
          things.
        </p>
      </section>

      <section>
        <h2 className="mb-8 text-xs font-medium uppercase tracking-widest text-gray-400">
          Recent Posts
        </h2>
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
              <h3 className="mt-1 text-lg font-medium">
                <Link
                  href={`/blog/${post.slug}`}
                  className="text-gray-900 transition-colors hover:text-blue-600"
                >
                  {post.title}
                </Link>
              </h3>
              <p className="mt-1 text-sm leading-relaxed text-gray-500">
                {post.excerpt}
              </p>
            </article>
          ))}
        </div>
        <Link
          href="/blog"
          className="mt-10 inline-block text-sm text-gray-400 transition-colors hover:text-gray-900"
        >
          View all posts &rarr;
        </Link>
      </section>
    </div>
  );
}
