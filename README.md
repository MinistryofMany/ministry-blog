# ministry-blog

The blog for the [Ministry of Many](https://github.com/MinistryofMany) — a
privacy-preserving OIDC identity provider (Minister) and the anonymous social
apps that sign in with it.

A small, static SvelteKit + mdsvex site: markdown posts with frontmatter, a post
index, individual post pages, and an RSS feed. No CMS, no database, no tracking.

## Stack

- **SvelteKit** (Svelte 5, runes)
- **mdsvex** — markdown-as-Svelte-components for posts
- **@sveltejs/adapter-static** — the whole site prerenders to static HTML

## Develop

```sh
npm install
npm run dev            # dev server on http://localhost:5173
```

## Build

```sh
npm run build          # prerenders the site to ./build
npm run preview        # serve the production build locally
npm run check          # svelte-check type check
```

> Node 20+. This repo uses **npm** (a `package-lock.json` is committed). pnpm 11
> currently requires Node 22, so if you prefer pnpm, use pnpm 9 with Node 20.

## Add a post

Drop a markdown file in `src/posts/`. The filename (minus `.md`) becomes the
URL slug, so `src/posts/my-post.md` is served at `/my-post/`.

Each post needs frontmatter:

```md
---
title: My Post Title
date: 2026-07-03
description: One or two sentences shown on the index and in the RSS feed.
---

Body goes here. Standard markdown — headings, lists, `code`, links, images.
```

- `title`, `date` (ISO `YYYY-MM-DD`), and `description` are required.
- Posts are sorted newest-first by `date` on the index and in the feed.
- An optional `slug:` field overrides the filename-derived slug.

Nothing else to wire up — the index, the post page, and `rss.xml` all read
`src/posts/` automatically. Run `npm run build` to confirm it prerenders.

## Structure

```
src/
  posts/                 # markdown posts (the content)
  lib/
    posts.ts             # loads post frontmatter, newest first
    config.ts            # site title, description, canonical URL
  routes/
    +layout.svelte       # shell, header/footer, global styles
    +layout.ts           # prerender = true
    +page.svelte         # post index
    [slug]/+page.svelte  # individual post
    rss.xml/+server.ts   # RSS feed
  app.css                # global typography
```

The canonical URL used in absolute RSS links lives in `src/lib/config.ts`
(`site.url`) — set it to the deployed origin.
