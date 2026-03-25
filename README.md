# blog

Personal blog built with Next.js 15, TypeScript, and Tailwind CSS. Deployed to GitHub Pages.

**Live:** https://yingwang.github.io/blog/

## Stack

- Next.js 15 (static export)
- React 19
- Tailwind CSS + Typography plugin
- Markdown posts with gray-matter + marked
- Giscus comments

## Writing a new post

Create a Markdown file in `posts/`:

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

Push to `main` and GitHub Pages deploys automatically.

## Development

```bash
npm install
npm run dev     # http://localhost:3000/blog/
npm run build   # static export to out/
```

## Project structure

```
posts/           # Markdown blog posts
src/
  app/
    page.tsx     # Home page with post list
    [slug]/      # Individual post pages
  components/    # Header, Footer, ShareButtons, GiscusComments
  lib/posts.ts   # Reads and parses markdown posts
```
