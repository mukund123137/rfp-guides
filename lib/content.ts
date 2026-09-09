import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';
import rehypeSlug from 'rehype-slug';
import rehypeStringify from 'rehype-stringify';
import { visit } from 'unist-util-visit';
import { toString as mdastToString } from 'mdast-util-to-string';
import GithubSlugger from 'github-slugger';
import type { Root, Heading } from 'mdast';
import { getAuthor, type Author } from './authors';

export type Collection = 'guides' | 'blogs' | 'compare';

export type TocEntry = {
  id: string;
  title: string;
  depth: 2 | 3;
  children: TocEntry[];
};

export type FaqItem = {
  question: string;
  answer: string;
};

/** Raw shape allowed in a content file's YAML frontmatter. */
type Frontmatter = {
  title: string;
  seoTitle?: string;
  description: string;
  slug?: string;
  category?: string;
  author?: string;
  publishedAt: string;
  updatedAt?: string;
  keywords?: string[];
  featured?: boolean;
  order?: number;
  readingTimeOverride?: number;
  takeaways?: string[];
  faq?: FaqItem[];
  related?: string[];
  ctaHeading?: string;
  ctaBody?: string;
  /** Opts the article into a contextual tool note. See ToolNote. */
  toolNote?: string;
};

export type Article = {
  collection: Collection;
  slug: string;
  url: string;
  title: string;
  seoTitle: string;
  description: string;
  category: string;
  author: Author;
  publishedAt: string;
  updatedAt: string;
  keywords: string[];
  featured: boolean;
  order: number;
  takeaways: string[];
  faq: FaqItem[];
  related: string[];
  ctaHeading?: string;
  ctaBody?: string;
  toolNote?: string;
  html: string;
  toc: TocEntry[];
  wordCount: number;
  readingTime: number;
};

export type ArticleSummary = Omit<Article, 'html' | 'toc'>;

const CONTENT_ROOT = path.join(process.cwd(), 'content');

const COLLECTION_BASE_PATH: Record<Collection, string> = {
  guides: '/guides',
  blogs: '/blog',
  compare: '/compare',
};

export const COLLECTION_LABEL: Record<Collection, string> = {
  guides: 'Guide',
  blogs: 'Article',
  compare: 'Comparison',
};

function collectionDir(collection: Collection): string {
  return path.join(CONTENT_ROOT, collection);
}

function listMarkdownFiles(collection: Collection): string[] {
  const dir = collectionDir(collection);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((file) => file.endsWith('.md') || file.endsWith('.mdx'))
    .sort();
}

/** Pull an ordered, nested heading tree straight out of the markdown AST. */
function buildToc(tree: Root): TocEntry[] {
  const slugger = new GithubSlugger();
  const flat: TocEntry[] = [];

  visit(tree, 'heading', (node: Heading) => {
    if (node.depth !== 2 && node.depth !== 3) return;
    const title = mdastToString(node).trim();
    if (!title) return;
    flat.push({
      id: slugger.slug(title),
      title,
      depth: node.depth,
      children: [],
    });
  });

  const nested: TocEntry[] = [];
  for (const entry of flat) {
    if (entry.depth === 2) {
      nested.push(entry);
    } else if (nested.length > 0) {
      nested[nested.length - 1].children.push(entry);
    } else {
      nested.push(entry);
    }
  }
  return nested;
}

function countWords(markdown: string): number {
  return markdown
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/[#>*_`|\-]/g, ' ')
    .split(/\s+/)
    .filter(Boolean).length;
}

function renderMarkdown(markdown: string): { html: string; toc: TocEntry[] } {
  const processor = unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypeSlug)
    .use(rehypeStringify);

  const tree = processor.parse(markdown) as Root;
  const toc = buildToc(tree);
  const html = processor.stringify(
    processor.runSync(tree) as Parameters<typeof processor.stringify>[0],
  );

  return { html, toc };
}

function assertFrontmatter(
  data: Record<string, unknown>,
  file: string,
): Frontmatter {
  const required = ['title', 'description', 'publishedAt'] as const;
  for (const key of required) {
    if (typeof data[key] !== 'string' || !data[key]) {
      throw new Error(`Content file "${file}" is missing required frontmatter: ${key}`);
    }
  }
  return data as Frontmatter;
}

function parseArticle(collection: Collection, filename: string): Article {
  const fullPath = path.join(collectionDir(collection), filename);
  const raw = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(raw);
  const fm = assertFrontmatter(data, filename);

  const slug = fm.slug ?? filename.replace(/\.mdx?$/, '');
  const { html, toc } = renderMarkdown(content);
  const wordCount = countWords(content);

  return {
    collection,
    slug,
    url: `${COLLECTION_BASE_PATH[collection]}/${slug}`,
    title: fm.title,
    seoTitle: fm.seoTitle ?? fm.title,
    description: fm.description,
    category: fm.category ?? COLLECTION_LABEL[collection],
    author: getAuthor(fm.author),
    publishedAt: fm.publishedAt,
    updatedAt: fm.updatedAt ?? fm.publishedAt,
    keywords: fm.keywords ?? [],
    featured: Boolean(fm.featured),
    order: typeof fm.order === 'number' ? fm.order : 999,
    takeaways: fm.takeaways ?? [],
    faq: fm.faq ?? [],
    related: fm.related ?? [],
    ctaHeading: fm.ctaHeading,
    ctaBody: fm.ctaBody,
    toolNote: fm.toolNote,
    html,
    toc,
    wordCount,
    readingTime:
      fm.readingTimeOverride ?? Math.max(1, Math.round(wordCount / 225)),
  };
}

/**
 * Parsed content is cached per process. `next build` reads each collection many
 * times (list page, detail pages, sitemap, RSS); markdown is only rendered once.
 */
const cache = new Map<Collection, Article[]>();

export function getArticles(collection: Collection): Article[] {
  const cached = cache.get(collection);
  if (cached) return cached;

  const articles = listMarkdownFiles(collection)
    .map((file) => parseArticle(collection, file))
    .sort((a, b) => {
      if (a.order !== b.order) return a.order - b.order;
      return b.publishedAt.localeCompare(a.publishedAt);
    });

  cache.set(collection, articles);
  return articles;
}

export function getArticle(
  collection: Collection,
  slug: string,
): Article | undefined {
  return getArticles(collection).find((article) => article.slug === slug);
}

export function getArticleSlugs(collection: Collection): string[] {
  return getArticles(collection).map((article) => article.slug);
}

export function toSummary(article: Article): ArticleSummary {
  const { html: _html, toc: _toc, ...summary } = article;
  return summary;
}

export function getSummaries(collection: Collection): ArticleSummary[] {
  return getArticles(collection).map(toSummary);
}

/** Newest-first across every collection — used by the homepage and RSS feed. */
export function getAllArticles(): Article[] {
  return [
    ...getArticles('guides'),
    ...getArticles('blogs'),
    ...getArticles('compare'),
  ].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}

/** Every article credited to one author, newest first. */
export function getArticlesByAuthor(authorId: string): ArticleSummary[] {
  return getAllArticles()
    .filter((article) => article.author.id === authorId)
    .map(toSummary);
}

/**
 * Resolve `related:` slugs into summaries. Accepts either a bare slug (looked up
 * in both collections) or a `collection:slug` pair for disambiguation.
 */
export function getRelatedArticles(
  article: Article,
  limit = 3,
): ArticleSummary[] {
  const pool = getAllArticles();
  const resolved: ArticleSummary[] = [];

  for (const ref of article.related) {
    const [maybeCollection, maybeSlug] = ref.includes(':')
      ? (ref.split(':') as [Collection, string])
      : [undefined, ref];

    const match = pool.find(
      (candidate) =>
        candidate.slug === (maybeSlug ?? ref) &&
        (!maybeCollection || candidate.collection === maybeCollection),
    );
    if (match && match.slug !== article.slug) resolved.push(toSummary(match));
  }

  // Backfill with same-collection neighbours so every article links onward.
  if (resolved.length < limit) {
    for (const candidate of pool) {
      if (resolved.length >= limit) break;
      if (candidate.slug === article.slug) continue;
      if (resolved.some((r) => r.slug === candidate.slug)) continue;
      if (candidate.collection === article.collection) {
        resolved.push(toSummary(candidate));
      }
    }
  }

  return resolved.slice(0, limit);
}
