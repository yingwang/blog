import { getPostBySlug, getAllPosts } from "@/lib/posts";
import { notFound } from "next/navigation";
import ShareButtons from "@/components/ShareButtons";
import Comments from "@/components/Comments";
import SubscribeForm from "@/components/SubscribeForm";
import Link from "next/link";
import type { Metadata } from "next";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: "Post Not Found" };

  return {
    title: `${post.title} - Ying's Blog`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const allPosts = getAllPosts();
  const currentIndex = allPosts.findIndex((p) => p.slug === post.slug);
  const relatedPosts = allPosts
    .filter(
      (p) =>
        p.slug !== post.slug &&
        p.tags.some((tag) => post.tags.includes(tag))
    )
    .slice(0, 2);

  const prevPost = currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null;
  const nextPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null;

  // Simple markdown-like rendering
  const renderContent = (content: string) => {
    return content
      .split("\n")
      .map((line) => line.trimEnd())
      .join("\n");
  };

  const siteUrl = "https://yingwang.blog";

  return (
    <>
      <article className="py-12">
        <div className="mx-auto max-w-3xl px-6">
          {/* Breadcrumb */}
          <nav className="mb-8">
            <ol className="flex items-center gap-2 text-sm text-gray-400">
              <li>
                <Link
                  href="/"
                  className="transition-colors hover:text-primary-600"
                >
                  Home
                </Link>
              </li>
              <li>/</li>
              <li>
                <Link
                  href="/blog"
                  className="transition-colors hover:text-primary-600"
                >
                  Blog
                </Link>
              </li>
              <li>/</li>
              <li className="text-gray-600">{post.title}</li>
            </ol>
          </nav>

          {/* Header */}
          <header className="mb-8">
            <div className="mb-4 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-primary-50 px-3 py-1 text-xs font-medium text-primary-700"
                >
                  {tag}
                </span>
              ))}
            </div>
            <h1 className="mb-4 text-3xl font-extrabold tracking-tight text-gray-900 md:text-4xl">
              {post.title}
            </h1>
            <p className="mb-6 text-lg text-gray-600">{post.excerpt}</p>
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-100 text-sm font-bold text-primary-700">
                  {post.author.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">
                    {post.author}
                  </p>
                  <p className="text-sm text-gray-400">
                    {new Date(post.date).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}{" "}
                    &middot; {post.readTime}
                  </p>
                </div>
              </div>
              <ShareButtons
                url={`${siteUrl}/blog/${post.slug}`}
                title={post.title}
              />
            </div>
          </header>

          {/* Cover image */}
          <div className="mb-10 overflow-hidden rounded-xl">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={post.coverImage}
              alt={post.title}
              className="w-full object-cover"
            />
          </div>

          {/* Content */}
          <div className="prose max-w-none">
            {renderContent(post.content)
              .split("\n\n")
              .map((block, i) => {
                const trimmed = block.trim();
                if (!trimmed) return null;

                if (trimmed.startsWith("### ")) {
                  return (
                    <h3 key={i}>{trimmed.replace("### ", "")}</h3>
                  );
                }
                if (trimmed.startsWith("## ")) {
                  return (
                    <h2 key={i}>{trimmed.replace("## ", "")}</h2>
                  );
                }
                if (trimmed.startsWith("```")) {
                  const lines = trimmed.split("\n");
                  const code = lines.slice(1, -1).join("\n");
                  return (
                    <pre key={i}>
                      <code>{code}</code>
                    </pre>
                  );
                }
                if (trimmed.match(/^\d+\.\s/)) {
                  const items = trimmed.split("\n").filter((l) => l.trim());
                  return (
                    <ol key={i}>
                      {items.map((item, j) => (
                        <li key={j}>{item.replace(/^\d+\.\s\*\*(.+?)\*\*(.*)/, "$1$2").replace(/^\d+\.\s/, "")}</li>
                      ))}
                    </ol>
                  );
                }
                if (trimmed.startsWith("- ")) {
                  const items = trimmed.split("\n").filter((l) => l.trim());
                  return (
                    <ul key={i}>
                      {items.map((item, j) => (
                        <li
                          key={j}
                          dangerouslySetInnerHTML={{
                            __html: item
                              .replace(/^- /, "")
                              .replace(
                                /\*\*(.+?)\*\*/g,
                                "<strong>$1</strong>"
                              )
                              .replace(/`(.+?)`/g, "<code>$1</code>"),
                          }}
                        />
                      ))}
                    </ul>
                  );
                }
                return (
                  <p
                    key={i}
                    dangerouslySetInnerHTML={{
                      __html: trimmed
                        .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
                        .replace(/`(.+?)`/g, "<code>$1</code>"),
                    }}
                  />
                );
              })}
          </div>

          {/* Share at bottom */}
          <div className="mt-10 border-t border-gray-200 pt-6">
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-500">
                Enjoyed this article? Share it with others.
              </p>
              <ShareButtons
                url={`${siteUrl}/blog/${post.slug}`}
                title={post.title}
              />
            </div>
          </div>

          {/* Post navigation */}
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {prevPost && (
              <Link
                href={`/blog/${prevPost.slug}`}
                className="rounded-xl border border-gray-200 bg-white p-4 transition-all hover:shadow-md"
              >
                <span className="text-xs text-gray-400">&larr; Previous</span>
                <p className="mt-1 text-sm font-semibold text-gray-900">
                  {prevPost.title}
                </p>
              </Link>
            )}
            {nextPost && (
              <Link
                href={`/blog/${nextPost.slug}`}
                className="rounded-xl border border-gray-200 bg-white p-4 text-right transition-all hover:shadow-md sm:col-start-2"
              >
                <span className="text-xs text-gray-400">Next &rarr;</span>
                <p className="mt-1 text-sm font-semibold text-gray-900">
                  {nextPost.title}
                </p>
              </Link>
            )}
          </div>

          {/* Related posts */}
          {relatedPosts.length > 0 && (
            <div className="mt-12">
              <h2 className="mb-6 text-xl font-bold text-gray-900">
                Related Posts
              </h2>
              <div className="grid gap-4 sm:grid-cols-2">
                {relatedPosts.map((related) => (
                  <Link
                    key={related.slug}
                    href={`/blog/${related.slug}`}
                    className="group rounded-xl border border-gray-200 bg-white p-4 transition-all hover:shadow-md"
                  >
                    <div className="mb-2 flex flex-wrap gap-1">
                      {related.tags.slice(0, 2).map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full bg-primary-50 px-2 py-0.5 text-xs text-primary-700"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h3 className="text-sm font-semibold text-gray-900 transition-colors group-hover:text-primary-600">
                      {related.title}
                    </h3>
                    <p className="mt-1 text-xs text-gray-400">
                      {related.readTime}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Comments */}
          <Comments postSlug={post.slug} />
        </div>
      </article>

      <SubscribeForm />
    </>
  );
}
