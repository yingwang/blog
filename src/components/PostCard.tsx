import Link from "next/link";
import type { BlogPost } from "@/lib/posts";

export default function PostCard({ post }: { post: BlogPost }) {
  return (
    <article className="group overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all hover:shadow-md">
      <Link href={`/blog/${post.slug}`}>
        <div className="aspect-[2/1] overflow-hidden bg-gray-100">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={post.coverImage}
            alt={post.title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      </Link>
      <div className="p-6">
        <div className="mb-3 flex flex-wrap items-center gap-2">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-primary-50 px-3 py-1 text-xs font-medium text-primary-700"
            >
              {tag}
            </span>
          ))}
        </div>
        <Link href={`/blog/${post.slug}`}>
          <h2 className="mb-2 text-xl font-bold text-gray-900 transition-colors group-hover:text-primary-600">
            {post.title}
          </h2>
        </Link>
        <p className="mb-4 line-clamp-2 text-sm text-gray-600">
          {post.excerpt}
        </p>
        <div className="flex items-center justify-between text-sm text-gray-400">
          <div className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary-100 text-xs font-bold text-primary-700">
              {post.author.charAt(0)}
            </div>
            <span>{post.author}</span>
          </div>
          <div className="flex items-center gap-3">
            <time dateTime={post.date}>
              {new Date(post.date).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </time>
            <span>&middot;</span>
            <span>{post.readTime}</span>
          </div>
        </div>
      </div>
    </article>
  );
}
