import { notFound } from 'next/navigation';
import { getArticle, getArticleSlugs } from '@/lib/content';
import { ogContentType, ogSize, renderOgImage } from '@/lib/og';

export const size = ogSize;
export const contentType = ogContentType;

export function generateStaticParams() {
  return getArticleSlugs('blogs').map((slug) => ({ slug }));
}

export default async function BlogOgImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticle('blogs', slug);
  if (!article) notFound();

  return renderOgImage({
    eyebrow: 'Article',
    title: article.title,
    meta: `${article.readingTime} min read · ${article.author.name}`,
  });
}
