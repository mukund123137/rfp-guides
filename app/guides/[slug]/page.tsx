import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import {
  getArticle,
  getArticleSlugs,
  getRelatedArticles,
} from '@/lib/content';
import { buildArticleMetadata } from '@/lib/seo';
import { ArticleLayout } from '@/components/content/ArticleLayout';

type PageProps = {
  params: Promise<{ slug: string }>;
};

/** Every guide is pre-rendered at build time; unknown slugs 404. */
export function generateStaticParams() {
  return getArticleSlugs('guides').map((slug) => ({ slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle('guides', slug);
  if (!article) return { title: 'Guide not found' };
  return buildArticleMetadata(article);
}

export default async function GuidePage({ params }: PageProps) {
  const { slug } = await params;
  const article = getArticle('guides', slug);
  if (!article) notFound();

  return (
    <ArticleLayout
      article={article}
      related={getRelatedArticles(article)}
      crumbs={[
        { name: 'Home', href: '/' },
        { name: 'Guides', href: '/guides' },
        { name: article.title, href: article.url },
      ]}
    />
  );
}
