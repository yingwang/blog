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
  };
}

export default async function PostPage({ params }: { params: Params }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="post">
      <div className="post-header">
        <h1>{post.title}</h1>
        <p className="meta">
          {new Date(post.date).toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
          })}{" "}
          &middot; {post.author}
        </p>
        <div className="post-tags" style={{ marginTop: "12px", display: "flex", gap: "6px", flexWrap: "wrap" }}>
          {post.tags.map((tag) => (
            <span
              key={tag}
              style={{
                fontSize: "12px",
                fontWeight: 600,
                color: "#6366f1",
                background: "#eef2ff",
                padding: "3px 10px",
                borderRadius: "99px",
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
      <div
        className="post-content"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
      <ShareButtons title={post.title} slug={slug} />
      <GiscusComments />
      <hr style={{ border: "none", borderTop: "1px solid #e2e8f0", margin: "48px 0 24px" }} />
      <Link href="/" style={{ fontSize: "15px", fontWeight: 600 }}>
        &larr; Back to home
      </Link>
    </div>
  );
}
