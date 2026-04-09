# Blog

Personal blog built with Next.js 15, deployed to GitHub Pages.

**Live:** https://yingwang.github.io/blog/

## Stack

- Next.js 15 (static export)
- React 19 + TypeScript
- Tailwind CSS + Typography plugin
- Markdown posts with gray-matter + marked
- Giscus comments (GitHub-based)
- GitHub Pages auto-deploy on push

## Writing a New Post

Create `posts/<slug>.md`:

```markdown
---
title: "Post Title"
excerpt: "A short summary."
date: "2026-03-25"
author: "Ying Wang"
tags: ["tag1", "tag2"]
---

Your content here...
```

Push to `main` and it deploys automatically.

## Development

```bash
npm install
npm run dev     # http://localhost:3000/blog/
npm run build   # static export to out/
```

## Project Structure

```
posts/               # Markdown blog posts
src/
  app/
    page.tsx         # Home -- post list
    [slug]/page.tsx  # Individual post
    layout.tsx       # Root layout
  components/        # Header, Footer, ShareButtons, GiscusComments
  lib/posts.ts       # Markdown parser
```
