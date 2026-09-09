import { notFound } from 'next/navigation';
import { getArticle, getArticleSlugs } from '@/lib/content';
import { ogContentType, ogSize, renderOgImage } from '@/lib/og';

export const size = ogSize;
export const contentType = ogContentType;

export function generateStaticParams() {
  return getArticleSlugs('compare').map((slug) => ({ slug }));
}

export default async function CompareOgImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticle('compare', slug);
  if (!article) notFound();

  return renderOgImage({
    eyebrow: 'Comparison',
    title: article.title,
    meta: `${article.readingTime} min read · ${article.author.name}`,
  });
}
