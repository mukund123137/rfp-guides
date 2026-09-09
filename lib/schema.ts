import { absoluteUrl, ogImageUrl, siteConfig } from './site';
import type { Article } from './content';

/**
 * JSON-LD builders. Each returns a plain object that `<JsonLd />` serialises,
 * so schema stays testable and free of stringly-typed markup.
 */

export type JsonLdObject = Record<string, unknown>;

export const ORGANIZATION_ID = absoluteUrl('/#organization');
export const WEBSITE_ID = absoluteUrl('/#website');

export function organizationSchema(): JsonLdObject {
  return {
    '@type': 'Organization',
    '@id': ORGANIZATION_ID,
    name: siteConfig.name,
    alternateName: siteConfig.shortName,
    url: siteConfig.url,
    description: siteConfig.description,
    foundingDate: String(siteConfig.foundingYear),
    logo: {
      '@type': 'ImageObject',
      url: absoluteUrl(siteConfig.logo),
      width: 512,
      height: 512,
    },
    email: siteConfig.contactEmail,
    knowsAbout: [
      'RFP software',
      'Proposal management software',
      'Request for proposal process',
      'Procurement technology',
      'Response content management',
    ],
    sameAs: ['https://www.linkedin.com/', 'https://x.com/'],
  };
}

export function websiteSchema(): JsonLdObject {
  return {
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    url: siteConfig.url,
    name: siteConfig.name,
    description: siteConfig.description,
    inLanguage: siteConfig.language,
    publisher: { '@id': ORGANIZATION_ID },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${siteConfig.url}/guides?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

export type BreadcrumbCrumb = { name: string; href: string };

export function breadcrumbSchema(crumbs: BreadcrumbCrumb[]): JsonLdObject {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: absoluteUrl(crumb.href),
    })),
  };
}

export function articleSchema(article: Article): JsonLdObject {
  const url = absoluteUrl(article.url);
  return {
    /* Guides are instructional, comparisons are analysis, blog posts are posts.
       Comparison pieces stay Article rather than Review: we do not score
       products on a rating scale, and Review implies one. */
    '@type':
      article.collection === 'guides'
        ? 'TechArticle'
        : article.collection === 'compare'
          ? 'Article'
          : 'BlogPosting',
    '@id': `${url}#article`,
    headline: article.title,
    name: article.title,
    description: article.description,
    url,
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    datePublished: new Date(article.publishedAt).toISOString(),
    dateModified: new Date(article.updatedAt).toISOString(),
    inLanguage: siteConfig.language,
    wordCount: article.wordCount,
    articleSection: article.category,
    keywords: article.keywords.join(', '),
    image: [ogImageUrl(article.url)],
    author: {
      '@type': 'Person',
      name: article.author.name,
      jobTitle: article.author.role,
      description: article.author.bio,
    },
    publisher: { '@id': ORGANIZATION_ID },
    isAccessibleForFree: true,
  };
}

export function faqSchema(
  faq: { question: string; answer: string }[],
): JsonLdObject | null {
  if (!faq.length) return null;
  return {
    '@type': 'FAQPage',
    mainEntity: faq.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  };
}

export function itemListSchema(
  items: { name: string; href: string; description?: string }[],
  listName: string,
): JsonLdObject {
  return {
    '@type': 'ItemList',
    name: listName,
    numberOfItems: items.length,
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      description: item.description,
      url: absoluteUrl(item.href),
    })),
  };
}

export function collectionPageSchema(input: {
  name: string;
  description: string;
  path: string;
}): JsonLdObject {
  return {
    '@type': 'CollectionPage',
    '@id': `${absoluteUrl(input.path)}#collection`,
    name: input.name,
    description: input.description,
    url: absoluteUrl(input.path),
    isPartOf: { '@id': WEBSITE_ID },
    inLanguage: siteConfig.language,
  };
}

/** Wraps one or more schema nodes in a single `@graph` document. */
export function graph(...nodes: (JsonLdObject | null | undefined)[]): JsonLdObject {
  return {
    '@context': 'https://schema.org',
    '@graph': nodes.filter(Boolean) as JsonLdObject[],
  };
}
