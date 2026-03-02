import { getPostBySlug, getAllPosts } from "@/lib/posts";
import { notFound } from "next/navigation";
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
    title: `${post.title} - Ying Wang blog`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const renderContent = (content: string) => {
    return content
      .split("\n")
      .map((line) => line.trimEnd())
      .join("\n");
  };

  return (
    <div className="post">
      <header className="post-header">
        <h1>{post.title}</h1>
        <p className="meta">
          {new Date(post.date).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
          {" • "}
          {post.author}
        </p>
      </header>

      <article className="post-content">
        {renderContent(post.content)
          .split("\n\n")
          .map((block, i) => {
            const trimmed = block.trim();
            if (!trimmed) return null;

            if (trimmed.startsWith("### ")) {
              return <h3 key={i}>{trimmed.replace("### ", "")}</h3>;
            }
            if (trimmed.startsWith("## ")) {
              return <h2 key={i}>{trimmed.replace("## ", "")}</h2>;
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
                    <li key={j}>
                      {item
                        .replace(/^\d+\.\s\*\*(.+?)\*\*(.*)/, "$1$2")
                        .replace(/^\d+\.\s/, "")}
                    </li>
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
      </article>
    </div>
  );
}
