import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getArticle, getArticleSlugs, getRelatedArticles } from '@/lib/content';
import { buildArticleMetadata } from '@/lib/seo';
import { ArticleLayout } from '@/components/content/ArticleLayout';

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getArticleSlugs('blogs').map((slug) => ({ slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle('blogs', slug);
  if (!article) return { title: 'Article not found' };
  return buildArticleMetadata(article);
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const article = getArticle('blogs', slug);
  if (!article) notFound();

  return (
    <ArticleLayout
      article={article}
      related={getRelatedArticles(article)}
      crumbs={[
        { name: 'Home', href: '/' },
        { name: 'Blog', href: '/blog' },
        { name: article.title, href: article.url },
      ]}
    />
  );
}
