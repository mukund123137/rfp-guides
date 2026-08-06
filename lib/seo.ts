import type { Metadata } from 'next';
import { absoluteUrl, ogImageUrl, siteConfig } from './site';
import type { Article } from './content';

type BuildMetadataInput = {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  ogType?: 'website' | 'article';
  publishedTime?: string;
  modifiedTime?: string;
  authors?: string[];
  section?: string;
  noIndex?: boolean;
};

/**
 * Every page's metadata funnels through here, which guarantees a canonical URL,
 * Open Graph tags and a Twitter card are never accidentally omitted.
 */
export function buildMetadata({
  title,
  description,
  path,
  keywords = [],
  ogType = 'website',
  publishedTime,
  modifiedTime,
  authors,
  section,
  noIndex = false,
}: BuildMetadataInput): Metadata {
  const url = absoluteUrl(path);
  const ogImage = ogImageUrl(path);

  return {
    title,
    description,
    keywords: keywords.length ? keywords : undefined,
    alternates: {
      canonical: url,
      types: {
        'application/rss+xml': absoluteUrl('/rss.xml'),
      },
    },
    robots: noIndex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            'max-image-preview': 'large',
            'max-snippet': -1,
            'max-video-preview': -1,
          },
        },
    openGraph: {
      type: ogType,
      url,
      title,
      description,
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: `${title} — ${siteConfig.name}`,
        },
      ],
      ...(ogType === 'article'
        ? {
            publishedTime,
            modifiedTime,
            authors,
            section,
          }
        : {}),
    },
    twitter: {
      card: 'summary_large_image',
      site: siteConfig.twitterHandle,
      creator: siteConfig.twitterHandle,
      title,
      description,
      images: [ogImage],
    },
  };
}

export function buildArticleMetadata(article: Article): Metadata {
  return buildMetadata({
    title: article.seoTitle,
    description: article.description,
    path: article.url,
    keywords: article.keywords,
    ogType: 'article',
    publishedTime: new Date(article.publishedAt).toISOString(),
    modifiedTime: new Date(article.updatedAt).toISOString(),
    authors: [article.author.name],
    section: article.category,
  });
}
