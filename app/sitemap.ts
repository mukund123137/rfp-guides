import type { MetadataRoute } from 'next';
import { getArticles } from '@/lib/content';
import { absoluteUrl } from '@/lib/site';

/**
 * Static sitemap generated at build time from the content directory, so a new
 * markdown file is indexed without touching this file.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const guides = getArticles('guides');
  const posts = getArticles('blogs');

  const newestArticleDate = [...guides, ...posts]
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
      url: absoluteUrl('/resources'),
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
  ];

  const articleRoutes: MetadataRoute.Sitemap = [...guides, ...posts].map((article) => ({
    url: absoluteUrl(article.url),
    lastModified: new Date(article.updatedAt),
    changeFrequency: 'monthly',
    priority: article.collection === 'guides' ? 0.9 : 0.7,
  }));

  return [...staticRoutes, ...articleRoutes];
}
