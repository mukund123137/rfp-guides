import { getAllArticles, COLLECTION_LABEL } from '@/lib/content';
import { absoluteUrl, siteConfig } from '@/lib/site';
import { escapeXml, toRfc822 } from '@/lib/utils';

/** Rendered once at build time — the feed only changes when content does. */
export const dynamic = 'force-static';

export function GET(): Response {
  const articles = getAllArticles();
  const lastBuild = articles.length
    ? toRfc822(articles[0].updatedAt)
    : new Date(0).toUTCString();

  const items = articles
    .map((article) => {
      const url = absoluteUrl(article.url);
      return `    <item>
      <title>${escapeXml(article.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <description>${escapeXml(article.description)}</description>
      <pubDate>${toRfc822(article.publishedAt)}</pubDate>
      <author>${escapeXml(`${siteConfig.contactEmail} (${article.author.name})`)}</author>
      <category>${escapeXml(article.category || COLLECTION_LABEL[article.collection])}</category>
    </item>`;
    })
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(siteConfig.name)}</title>
    <link>${siteConfig.url}</link>
    <atom:link href="${absoluteUrl('/rss.xml')}" rel="self" type="application/rss+xml" />
    <description>${escapeXml(siteConfig.description)}</description>
    <language>${siteConfig.language}</language>
    <lastBuildDate>${lastBuild}</lastBuildDate>
    <generator>Next.js</generator>
    <copyright>${escapeXml(`Copyright ${new Date().getFullYear()} ${siteConfig.name}`)}</copyright>
${items}
  </channel>
</rss>
`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
}
