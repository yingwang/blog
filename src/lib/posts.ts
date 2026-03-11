export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  author: string;
  tags: string[];
}

const posts: BlogPost[] = [
  {
    slug: "building-modern-web-apps",
    title: "Building Modern Web Applications with Next.js",
    excerpt:
      "Exploring the latest features of Next.js 15 and how they change the way we build for the web.",
    content: "",
    date: "2026-03-10",
    author: "Ying Wang",
    tags: ["nextjs", "react", "webdev"],
  },
  {
    slug: "typescript-patterns",
    title: "TypeScript Patterns I Use Every Day",
    excerpt:
      "Practical TypeScript patterns that make code safer and more expressive without over-engineering.",
    content: "",
    date: "2026-02-22",
    author: "Ying Wang",
    tags: ["typescript", "patterns"],
  },
  {
    slug: "css-layout-2026",
    title: "The State of CSS Layout in 2026",
    excerpt:
      "From Flexbox to Grid to container queries — a look at modern CSS layout techniques and when to use each.",
    content: "",
    date: "2026-02-08",
    author: "Ying Wang",
    tags: ["css", "webdev"],
  },
  {
    slug: "react-server-components",
    title: "Understanding React Server Components",
    excerpt:
      "A deep dive into how React Server Components work and why they matter for performance.",
    content: "",
    date: "2026-01-15",
    author: "Ying Wang",
    tags: ["react", "performance"],
  },
];

export function getAllPosts(): BlogPost[] {
  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return posts.find((post) => post.slug === slug);
}

export function getPostsByTag(tag: string): BlogPost[] {
  return posts
    .filter((post) => post.tags.includes(tag))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getAllTags(): string[] {
  const tags = new Set<string>();
  posts.forEach((post) => post.tags.forEach((tag) => tags.add(tag)));
  return Array.from(tags).sort();
}
