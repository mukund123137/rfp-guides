# RFP Software Guides

An educational content site about RFP software — guides, analysis and a resource
library. Built with Next.js 15 (App Router), TypeScript and Tailwind CSS. No UI
libraries: every component in `components/` is written for this project.

Every page is statically generated at build time.

## Getting started

```bash
npm install
npm run dev        # http://localhost:3000
```

| Script | What it does |
| --- | --- |
| `npm run dev` | Development server |
| `npm run build` | Production build (static export of all routes) |
| `npm start` | Serve the production build |
| `npm run lint` | ESLint (flat config, `eslint .`) |
| `npm run typecheck` | `tsc --noEmit` |

## Adding content

**All articles are markdown files.** Adding one requires no React changes — drop
a file in the right directory and it appears in the listing, the sitemap, the RSS
feed, the internal-link graph and its own social card.

- `content/guides/<slug>.md` → published at `/guides/<slug>`
- `content/blogs/<slug>.md` → published at `/blog/<slug>`
- `content/compare/<slug>.md` → published at `/compare/<slug>`
- `content/resources/<slug>.md` → an entry in the resource library

The filename is the URL slug unless `slug:` overrides it.

### Article frontmatter

```yaml
---
title: How to Buy RFP Software          # H1 and card title
seoTitle: '...'                         # <title> and og:title; falls back to title
description: ...                        # meta description, card copy, og:description
category: Buying Guide                  # badge label and articleSection
author: dana-whitfield                  # key in lib/authors.ts
publishedAt: '2025-09-16'
updatedAt: '2026-07-28'                 # drives the "Last updated" line
order: 1                                # listing order; lower first
featured: true
keywords: [.., ..]                      # meta keywords
takeaways: [.., ..]                     # renders the Key takeaways panel
related: [guides:some-slug, ..]         # "Keep reading"; backfilled automatically
faq:                                    # renders the FAQ block *and* FAQPage schema
  - question: ...
    answer: ...
ctaHeading: ...                         # overrides the end-of-article CTA
ctaBody: ...
inventiveAngle: provenance              # optional; renders a publisher callout
---
```

Only `title`, `description` and `publishedAt` are required — the loader throws a
build error naming the file if one is missing, so a malformed article fails the
build rather than shipping silently.

> **YAML gotcha:** a plain scalar containing `": "` is invalid YAML. Use a folded
> block scalar for prose that contains a colon:
>
> ```yaml
> answer: >-
>   A checklist records claims: a matrix records evidence.
> ```

### What is generated automatically

- **Table of contents** — parsed from the `##`/`###` headings in the markdown.
- **Heading anchors** — via `rehype-slug`, matching the TOC ids.
- **Reading time** — from word count, overridable with `readingTimeOverride`.
- **Social card** — a real 1200×630 PNG per article, rendered at build time with
  the article's own title (`app/*/[slug]/opengraph-image.tsx`).
- **Sitemap, RSS and JSON-LD** — all derived from the content directory.

### Resources and glossary

Resource entries are frontmatter-only (`category` must be one of the ids in
`lib/resources.ts`). The glossary lives in `content/resources/99-glossary.md` as a
`terms:` array, and is rendered as a definition list plus `DefinedTermSet` schema.

## Publisher disclosure and Inventive AI placements

This site is published by Inventive AI, which sells in the category the site
writes about. That is a real conflict of interest, and the code treats it as one.

**Everything about the relationship lives in [lib/partner.ts](lib/partner.ts)** —
the name, links, verified capability claims, vendor-reported metrics and the
disclosure wording. Nothing about Inventive AI is hard-coded in a component, so
the disclosure reads identically everywhere and cannot drift page to page.

Rules the implementation follows:

- **Every placement carries a disclosure.** `<Disclosure />` sits beneath each
  one and links to `/about#disclosure`. A placement without it is a bug.
- **Only verifiable claims.** `lib/partner.ts` holds claims sourced from
  Inventive AI's own published material. Vendor-reported figures are labelled as
  vendor-reported wherever they render.
- **Criteria first, product second.** The homepage spotlight and the profile page
  both state an evaluation test from our guides *before* saying what the product
  does about it. The criteria were written before the placements existed.
- **No fabricated competitor claims.** `CapabilityMatrix` compares product
  *archetypes*, never named competitors, because we have not tested them.
- **Outbound links are attributed.** `partnerUrl(placement)` adds UTM parameters
  so referred traffic is traceable to the exact placement it came from.

Placements: homepage spotlight, `/compare` hub, the publisher profile, an opt-in
in-article callout (`inventiveAngle` frontmatter), the About disclosure section,
and two footer links. Guides, the blog index and the resource library carry no
product placement beyond the global footer.

### Adding or changing a placement

Add the angle to `inventiveAngles` in
[components/partner/InventiveCallout.tsx](components/partner/InventiveCallout.tsx),
then set `inventiveAngle:` in the frontmatter of articles where it is genuinely
relevant. Do not add one to an article whose argument it does not follow — the
value of the placement depends on it not reading as an advert.

## Design system

The site is deliberately **webfont-free**: no `next/font`, no Google Fonts, zero
font requests, so there is no FOUT, no layout shift and nothing blocking first
paint. The editorial character comes from a system display-serif stack
(`--font-display`) used on `h1`–`h3`, a warm `paper` ground rather than pure
white, an indigo `brand` scale, and a sparing gold `accent` used only for rules
and eyebrow marks.

Two reusable editorial marks live in [styles/globals.css](styles/globals.css):
`.eyebrow` (uppercase label preceded by a short rule) and `.rule-editorial`.
Prefer them over ad-hoc uppercase labels so section openers stay consistent.

## Project structure

```
app/                    Routes, sitemap.ts, robots.ts, rss.xml, opengraph-image
components/
  content/              Article template and its parts (TOC, FAQ, author, CTA…)
  home/                 Homepage sections
  layout/               Header, Footer, Logo, social links
  partner/              Inventive AI placements + the shared Disclosure
  resources/            Resource cards, list, glossary
  seo/                  JsonLd
  ui/                   Button, Card, Badge, Icon, Container, NewsletterForm…
content/                All markdown (guides, blogs, compare, resources)
lib/
  content.ts            Markdown loading, rendering, TOC extraction, caching
  resources.ts          Resource categories and glossary loading
  seo.ts                Metadata builder (canonical, OG, Twitter)
  schema.ts             JSON-LD builders
  site.ts               Site config, navigation, URL helpers
  partner.ts            Inventive AI relationship, claims and disclosure text
  authors.ts            Author records referenced from frontmatter
  og.tsx                Shared social-card renderer
styles/globals.css      Tailwind layers + hand-written `.prose` typography
```

## Routes

| Route | Source |
| --- | --- |
| `/`, `/guides`, `/compare`, `/blog`, `/resources` | Page components + content dirs |
| `/guides/[slug]`, `/blog/[slug]`, `/compare/[slug]` | Markdown in `content/` |
| `/glossary` | `content/resources/99-glossary.md` frontmatter |
| `/authors`, `/authors/[slug]` | `lib/authors.ts` + `getArticlesByAuthor` |
| `/about`, `/contact`, `/privacy`, `/terms` | Page components |
| `/robots.txt`, `/sitemap.xml`, `/rss.xml` | Generated from content |

**Aliases are redirected, not left to 404.** `next.config.ts` maps the paths people
type or link to — `/privacy-policy`, `/terms-of-service`, `/rss`, `/feed`,
`/sitemap`, `/templates`, `/checklists`, `/newsletter`, `/disclosure`,
`/author/:slug`, `/inventive-ai` and others — onto the real page or anchor. Add a
redirect there rather than creating a thin duplicate page.

Resource items intentionally have **no** detail pages: each is a few sentences of
frontmatter, so individual pages would be thin content. They live on `/resources`.

## SEO implementation

| Requirement | Where |
| --- | --- |
| Dynamic metadata, canonical URLs | `lib/seo.ts`, used by every route |
| Open Graph + Twitter cards | `lib/seo.ts`; images from `opengraph-image` routes |
| Organization, WebSite schema | `app/layout.tsx` (site-wide `@graph`) |
| Article / TechArticle schema | `components/content/ArticleLayout.tsx` |
| Breadcrumb schema + visible trail | `Breadcrumbs` + `breadcrumbSchema`, same source |
| FAQPage schema | Generated from `faq:` frontmatter |
| CollectionPage, ItemList | Listing pages |
| `robots.txt`, `sitemap.xml`, `rss.xml` | `app/robots.ts`, `app/sitemap.ts`, `app/rss.xml/route.ts` |
| Semantic HTML, one `h1`, no level skips | Enforced by the component API (`headingLevel` props) |
| Author E-E-A-T (`ProfilePage`/`Person`) | `/authors/[slug]`, linked from every byline |
| `DefinedTermSet` glossary | `/glossary` |

### Site origin

Every absolute URL derives from one value. The production origin is
`https://rfpsoftwareguide.com`, set as `PRODUCTION_URL` in [lib/site.ts](lib/site.ts),
and it feeds canonical URLs, `metadataBase`, Open Graph and Twitter tags, JSON-LD,
`sitemap.xml`, `robots.txt` and `rss.xml`.

Override it per deployment with `NEXT_PUBLIC_SITE_URL` (see `.env.example`) so
preview and staging builds emit their own origin rather than claiming production's.
It is read at build time, so a change needs a rebuild.

## Notes

- **The newsletter form is UI only.** It validates and confirms locally and posts
  nowhere; wire `handleSubmit` in `components/ui/NewsletterForm.tsx` to a provider.
- **Social links are placeholders** pointing at each network's root, so nothing
  404s before real profiles exist (`socialLinks` in `lib/site.ts`).
- **Markdown is rendered at build time** and injected with
  `dangerouslySetInnerHTML`. That is safe here because the HTML comes only from
  version-controlled files in `content/`. If you ever accept content from an
  untrusted source, add `rehype-sanitize` to the pipeline in `lib/content.ts`.
