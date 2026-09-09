import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getArticle, getArticleSlugs, getRelatedArticles } from '@/lib/content';
import { buildArticleMetadata } from '@/lib/seo';
import { ArticleLayout } from '@/components/content/ArticleLayout';

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getArticleSlugs('compare').map((slug) => ({ slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle('compare', slug);
  if (!article) return { title: 'Comparison not found' };
  return buildArticleMetadata(article);
}

export default async function ComparePostPage({ params }: PageProps) {
  const { slug } = await params;
  const article = getArticle('compare', slug);
  if (!article) notFound();

  return (
    <ArticleLayout
      article={article}
      related={getRelatedArticles(article)}
      crumbs={[
        { name: 'Home', href: '/' },
        { name: 'Compare', href: '/compare' },
        { name: article.title, href: article.url },
      ]}
    />
  );
}
