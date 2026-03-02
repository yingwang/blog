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
    slug: "getting-started-with-nextjs",
    title: "Getting Started with Next.js: A Complete Guide",
    excerpt:
      "Learn how to build modern web applications with Next.js, from setup to deployment. This guide covers everything you need to know.",
    content: `
Next.js has become one of the most popular frameworks for building React applications. It provides an excellent developer experience with features like server-side rendering, static site generation, and API routes built in.

## Why Next.js?

Next.js solves many common challenges in React development:

- **Server-Side Rendering (SSR)**: Pages are rendered on the server, improving SEO and initial load performance.
- **Static Site Generation (SSG)**: Pre-render pages at build time for maximum performance.
- **File-based Routing**: Create pages by adding files to the \`app\` directory.
- **API Routes**: Build API endpoints alongside your frontend code.
- **Built-in Optimizations**: Automatic image optimization, code splitting, and more.

## Setting Up Your First Project

Getting started is straightforward. Run the following command:

\`\`\`bash
npx create-next-app@latest my-app --typescript --tailwind
\`\`\`

This creates a new project with TypeScript and Tailwind CSS configured out of the box.

## Project Structure

A typical Next.js project looks like this:

\`\`\`
my-app/
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── globals.css
│   ├── components/
│   └── lib/
├── public/
├── package.json
└── next.config.ts
\`\`\`

## Building Your First Page

Pages in Next.js are React components exported from files in the \`app\` directory. Each folder represents a route segment.

## Data Fetching

Next.js supports multiple data fetching strategies. You can use \`fetch\` directly in server components, and the framework handles caching and revalidation automatically.

## Deployment

Deploy your Next.js app to Vercel with zero configuration, or self-host it on any Node.js server. The build output is optimized for production automatically.

Next.js continues to evolve with each release, making it an excellent choice for both small projects and large-scale applications.
    `,
    date: "2026-02-28",
    author: "Ying Wang",
    tags: ["Next.js", "React", "Web Development"],
  },
  {
    slug: "mastering-typescript",
    title: "Mastering TypeScript: Tips and Best Practices",
    excerpt:
      "Dive deep into TypeScript's type system and learn patterns that will make your code more robust and maintainable.",
    content: `
TypeScript has transformed how we write JavaScript applications. By adding static types, it catches errors early and provides better tooling support.

## Why TypeScript Matters

TypeScript isn't just about catching bugs — it's about communication. Types serve as documentation that's always up to date and enforced by the compiler.

## Essential Type Patterns

### Utility Types

TypeScript provides several built-in utility types:

\`\`\`typescript
// Make all properties optional
type PartialUser = Partial<User>;

// Make all properties required
type RequiredUser = Required<User>;

// Pick specific properties
type UserName = Pick<User, 'firstName' | 'lastName'>;

// Omit specific properties
type UserWithoutEmail = Omit<User, 'email'>;
\`\`\`

### Discriminated Unions

One of the most powerful patterns in TypeScript:

\`\`\`typescript
type Result<T> =
  | { success: true; data: T }
  | { success: false; error: string };

function handleResult(result: Result<User>) {
  if (result.success) {
    console.log(result.data); // TypeScript knows data exists
  } else {
    console.error(result.error); // TypeScript knows error exists
  }
}
\`\`\`

### Generic Constraints

Use constraints to narrow what types can be passed to generics:

\`\`\`typescript
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}
\`\`\`

## Best Practices

1. **Prefer interfaces for object shapes** — they're more extensible.
2. **Use \`unknown\` instead of \`any\`** — it forces type checking.
3. **Enable strict mode** — it catches more potential issues.
4. **Use type guards** — they narrow types safely at runtime.
5. **Avoid type assertions** — prefer type narrowing instead.

## Conclusion

TypeScript is a powerful tool that, when used well, significantly improves code quality and developer productivity.
    `,
    date: "2026-02-20",
    author: "Ying Wang",
    tags: ["TypeScript", "JavaScript", "Programming"],
  },
  {
    slug: "building-beautiful-uis-with-tailwind",
    title: "Building Beautiful UIs with Tailwind CSS",
    excerpt:
      "Discover how utility-first CSS can speed up your development workflow and help you create stunning interfaces.",
    content: `
Tailwind CSS takes a different approach to styling. Instead of writing custom CSS, you compose designs using utility classes directly in your HTML.

## The Utility-First Approach

Traditional CSS often leads to bloated stylesheets and naming conflicts. Tailwind solves this by providing low-level utility classes:

\`\`\`html
<div class="flex items-center gap-4 rounded-lg bg-white p-6 shadow-lg">
  <img class="h-12 w-12 rounded-full" src="avatar.jpg" alt="" />
  <div>
    <h3 class="text-lg font-semibold text-gray-900">John Doe</h3>
    <p class="text-sm text-gray-500">Software Engineer</p>
  </div>
</div>
\`\`\`

## Why Developers Love Tailwind

- **No context switching**: Style directly in your markup.
- **Consistent design**: Use a predefined design system.
- **Small bundle size**: Unused styles are automatically purged.
- **Responsive design**: Built-in responsive modifiers.
- **Dark mode**: Easy dark mode support with the \`dark:\` prefix.

## Responsive Design

Tailwind makes responsive design intuitive:

\`\`\`html
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  <!-- Cards automatically adjust to screen size -->
</div>
\`\`\`

## Custom Configuration

Extend Tailwind's default theme to match your brand:

\`\`\`javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        brand: {
          light: '#3fbaeb',
          DEFAULT: '#0fa9e6',
          dark: '#0c87b8',
        },
      },
    },
  },
};
\`\`\`

## Component Patterns

While Tailwind is utility-first, you can still create reusable patterns using components in your framework of choice, keeping your code DRY without sacrificing the benefits of utility classes.

Tailwind CSS has proven that utility-first CSS isn't just a trend — it's a genuinely better way to style modern web applications.
    `,
    date: "2026-02-15",
    author: "Ying Wang",
    tags: ["CSS", "Tailwind", "UI Design"],
  },
  {
    slug: "the-power-of-react-server-components",
    title: "The Power of React Server Components",
    excerpt:
      "Understand how React Server Components change the game for building fast, interactive web applications.",
    content: `
React Server Components (RSC) represent a fundamental shift in how we think about React applications. They allow components to run exclusively on the server, reducing the JavaScript sent to the client.

## What Are Server Components?

Server Components are React components that render only on the server. They can:

- Access databases directly
- Read from the filesystem
- Fetch data without exposing API keys
- Reduce client-side JavaScript bundle size

## Server vs Client Components

\`\`\`typescript
// This is a Server Component (default in Next.js App Router)
async function BlogPost({ id }: { id: string }) {
  const post = await db.posts.findUnique({ where: { id } });
  return <article>{post.content}</article>;
}

// This is a Client Component
'use client';
function LikeButton({ postId }: { postId: string }) {
  const [liked, setLiked] = useState(false);
  return <button onClick={() => setLiked(!liked)}>Like</button>;
}
\`\`\`

## Benefits

1. **Smaller bundles**: Server Components don't add to the JavaScript bundle.
2. **Direct data access**: No need for API layers for server-side data.
3. **Better security**: Sensitive logic stays on the server.
4. **Improved performance**: Less JavaScript means faster page loads.

## When to Use Each

Use **Server Components** for:
- Data fetching
- Rendering static content
- Accessing backend resources

Use **Client Components** for:
- Interactivity (event handlers)
- Browser APIs
- State management
- Effects

## The Future

Server Components are still evolving, but they've already changed how we architect React applications. The combination of server and client components gives us the best of both worlds — fast initial loads with rich interactivity.
    `,
    date: "2026-02-10",
    author: "Ying Wang",
    tags: ["React", "Server Components", "Performance"],
  },
  {
    slug: "git-workflow-for-teams",
    title: "Git Workflow Best Practices for Teams",
    excerpt:
      "Learn effective Git workflows that keep your team productive and your codebase clean.",
    content: `
A well-defined Git workflow is essential for team productivity. Here's how to set up a workflow that scales.

## Branch Strategy

A good branching strategy keeps development organized:

- **main**: Production-ready code
- **develop**: Integration branch for features
- **feature/\\***: Individual feature branches
- **hotfix/\\***: Emergency production fixes

## Commit Messages

Write meaningful commit messages:

\`\`\`
feat: add user authentication flow

- Implement login/logout functionality
- Add JWT token management
- Create protected route middleware
\`\`\`

Follow the conventional commits specification for consistency.

## Pull Request Best Practices

1. **Keep PRs small**: Aim for under 400 lines of changes.
2. **Write descriptions**: Explain what and why, not just how.
3. **Add screenshots**: For UI changes, include before/after screenshots.
4. **Request specific reviewers**: Don't just assign randomly.
5. **Address all comments**: Don't merge with unresolved threads.

## Code Review Tips

- Review the overall design first, then details.
- Be constructive in feedback.
- Approve when satisfied, don't block on minor style issues.
- Use automated tools for formatting and linting.

## Handling Conflicts

When conflicts arise:

1. Communicate with the team member whose code conflicts with yours.
2. Pull the latest changes from the target branch.
3. Resolve conflicts locally and test thoroughly.
4. Push the resolution and re-request review if needed.

## Automation

Use CI/CD to automate:
- Running tests on every PR
- Linting and formatting checks
- Building preview deployments
- Automated releases from main

A good Git workflow reduces friction and lets your team focus on writing great code.
    `,
    date: "2026-02-05",
    author: "Ying Wang",
    tags: ["Git", "Teamwork", "DevOps"],
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
