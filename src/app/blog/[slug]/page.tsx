import { getAllPosts, getPostBySlug } from "@/lib/posts";
import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import ShareButtons from "@/components/ShareButtons";
import GiscusComments from "@/components/GiscusComments";

type Params = Promise<{ slug: string }>;

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: "Post Not Found" };
  return {
    title: `${post.title} - Ying Wang`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
    },
  };
}

export default async function PostPage({ params }: { params: Params }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <article>
      <header className="mb-10">
        <h1 className="text-3xl font-bold leading-tight tracking-tight">
          {post.title}
        </h1>
        <div className="mt-3 flex items-center gap-3 text-sm text-gray-400">
          <time>
            {new Date(post.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>
          <span>&middot;</span>
          <span>{post.author}</span>
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-gray-100 px-2.5 py-0.5 text-xs text-gray-500"
            >
              {tag}
            </span>
          ))}
        </div>
      </header>
      <div
        className="prose prose-gray max-w-none prose-headings:tracking-tight prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
      <ShareButtons title={post.title} slug={slug} />
      <GiscusComments />
      <div className="mt-12 border-t border-gray-100 pt-6">
        <Link
          href="/"
          className="text-sm text-gray-400 transition-colors hover:text-gray-900"
        >
          &larr; Back to home
        </Link>
      </div>
    </article>
  );
}
