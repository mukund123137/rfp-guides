import type { MetadataRoute } from 'next';
import { getArticles } from '@/lib/content';
import { absoluteUrl } from '@/lib/site';
import { authors } from '@/lib/authors';

/**
 * Static sitemap generated at build time from the content directory, so a new
 * markdown file is indexed without touching this file.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const guides = getArticles('guides');
  const posts = getArticles('blogs');
  const comparisons = getArticles('compare');

  const newestArticleDate = [...guides, ...posts, ...comparisons]
    .map((article) => article.updatedAt)
    .sort()
    .at(-1);

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: absoluteUrl('/'),
      lastModified: new Date(newestArticleDate ?? Date.now()),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: absoluteUrl('/guides'),
      lastModified: new Date(
        guides.map((g) => g.updatedAt).sort().at(-1) ?? Date.now(),
      ),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: absoluteUrl('/blog'),
      lastModified: new Date(
        posts.map((p) => p.updatedAt).sort().at(-1) ?? Date.now(),
      ),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: absoluteUrl('/compare'),
      lastModified: new Date(
        comparisons.map((c) => c.updatedAt).sort().at(-1) ?? Date.now(),
      ),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: absoluteUrl('/resources'),
      lastModified: new Date(newestArticleDate ?? Date.now()),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: absoluteUrl('/glossary'),
      lastModified: new Date(newestArticleDate ?? Date.now()),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: absoluteUrl('/about'),
      lastModified: new Date(newestArticleDate ?? Date.now()),
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    {
      url: absoluteUrl('/authors'),
      lastModified: new Date(newestArticleDate ?? Date.now()),
      changeFrequency: 'monthly',
      priority: 0.4,
    },
    {
      url: absoluteUrl('/contact'),
      lastModified: new Date(newestArticleDate ?? Date.now()),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: absoluteUrl('/privacy'),
      lastModified: new Date('2026-09-09'),
      changeFrequency: 'yearly',
      priority: 0.2,
    },
    {
      url: absoluteUrl('/terms'),
      lastModified: new Date('2026-09-09'),
      changeFrequency: 'yearly',
      priority: 0.2,
    },
  ];

  const authorRoutes: MetadataRoute.Sitemap = Object.values(authors).map((author) => ({
    url: absoluteUrl(`/authors/${author.id}`),
    lastModified: new Date(newestArticleDate ?? Date.now()),
    changeFrequency: 'monthly',
    priority: 0.4,
  }));

  const articleRoutes: MetadataRoute.Sitemap = [
    ...guides,
    ...posts,
    ...comparisons,
  ].map((article) => ({
    url: absoluteUrl(article.url),
    lastModified: new Date(article.updatedAt),
    changeFrequency: 'monthly',
    priority: article.collection === 'blogs' ? 0.7 : 0.9,
  }));

  return [...staticRoutes, ...authorRoutes, ...articleRoutes];
}
