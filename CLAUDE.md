# CLAUDE.md

Personal blog built with Next.js 15, deployed to GitHub Pages.

## Commands

```bash
npm install          # install dependencies
npm run dev          # dev server at http://localhost:3000/blog/
npm run build        # static export to out/
```

Push to `main` triggers GitHub Pages deployment automatically.

## Architecture

```
posts/               # Markdown blog posts (frontmatter + content)
src/
  app/
    page.tsx         # Home page — lists all posts
    [slug]/page.tsx  # Individual post page (generated from posts/)
    layout.tsx       # Root layout (Inter font, header, footer)
    not-found.tsx    # 404 page
  components/
    Header.tsx       # Site header with nav
    Footer.tsx       # Minimal footer
    ShareButtons.tsx # Social share (client component)
    GiscusComments.tsx # GitHub-based comments (client component)
  lib/
    posts.ts         # Reads posts/ directory, parses frontmatter + markdown
```

## Writing a New Post

Create `posts/<slug>.md` with frontmatter:

```markdown
---
title: "Post Title"
excerpt: "Summary"
date: "2026-03-25"
author: "Ying Wang"
tags: ["tag1"]
---
```

## Key Details

- `basePath: "/blog"` in next.config.ts — all internal Link hrefs should NOT include `/blog` prefix (Next.js adds it automatically)
- Static export (`output: "export"`) — no API routes or server-side features
- Styling: Tailwind CSS utility classes only, no custom CSS
- Post content rendered via `marked` with `@tailwindcss/typography` prose classes
- Comments: Giscus (repo: yingwang/blog, zh-CN locale)
