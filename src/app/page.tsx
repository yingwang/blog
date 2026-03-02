import PostCard from "@/components/PostCard";
import SubscribeForm from "@/components/SubscribeForm";
import { getAllPosts } from "@/lib/posts";
import Link from "next/link";

export default function Home() {
  const posts = getAllPosts();
  const featuredPost = posts[0];
  const recentPosts = posts.slice(1, 4);

  return (
    <>
      {/* Hero section */}
      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto max-w-5xl px-6">
          <div className="max-w-3xl">
            <p className="mb-4 text-sm font-semibold uppercase tracking-wider text-primary-600">
              Welcome to my blog
            </p>
            <h1 className="mb-6 text-4xl font-extrabold tracking-tight text-gray-900 md:text-5xl lg:text-6xl">
              Thoughts, stories &amp;{" "}
              <span className="text-primary-600">ideas</span>
            </h1>
            <p className="mb-8 text-lg text-gray-600 md:text-xl">
              I write about web development, programming, and technology.
              Sharing what I learn along the way.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/blog"
                className="rounded-lg bg-primary-600 px-6 py-3 font-medium text-white transition-colors hover:bg-primary-700"
              >
                Read the Blog
              </Link>
              <Link
                href="#subscribe"
                className="rounded-lg border border-gray-300 bg-white px-6 py-3 font-medium text-gray-700 transition-colors hover:bg-gray-50"
              >
                Subscribe
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured post */}
      {featuredPost && (
        <section className="bg-gray-50 py-16">
          <div className="mx-auto max-w-5xl px-6">
            <h2 className="mb-8 text-2xl font-bold text-gray-900">
              Featured Post
            </h2>
            <Link
              href={`/blog/${featuredPost.slug}`}
              className="group block overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all hover:shadow-md md:flex"
            >
              <div className="aspect-[2/1] overflow-hidden bg-gray-100 md:aspect-auto md:w-1/2">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={featuredPost.coverImage}
                  alt={featuredPost.title}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-col justify-center p-6 md:w-1/2 md:p-8">
                <div className="mb-3 flex flex-wrap gap-2">
                  {featuredPost.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-primary-50 px-3 py-1 text-xs font-medium text-primary-700"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <h3 className="mb-3 text-2xl font-bold text-gray-900 transition-colors group-hover:text-primary-600">
                  {featuredPost.title}
                </h3>
                <p className="mb-4 text-gray-600">{featuredPost.excerpt}</p>
                <div className="flex items-center gap-3 text-sm text-gray-400">
                  <time dateTime={featuredPost.date}>
                    {new Date(featuredPost.date).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </time>
                  <span>&middot;</span>
                  <span>{featuredPost.readTime}</span>
                </div>
              </div>
            </Link>
          </div>
        </section>
      )}

      {/* Recent posts */}
      <section className="py-16">
        <div className="mx-auto max-w-5xl px-6">
          <div className="mb-8 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">Recent Posts</h2>
            <Link
              href="/blog"
              className="text-sm font-medium text-primary-600 transition-colors hover:text-primary-700"
            >
              View all posts &rarr;
            </Link>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {recentPosts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        </div>
      </section>

      {/* Subscribe section */}
      <SubscribeForm />
    </>
  );
}
