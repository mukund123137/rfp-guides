import { notFound } from 'next/navigation';
import { getArticle, getArticleSlugs } from '@/lib/content';
import { ogContentType, ogSize, renderOgImage } from '@/lib/og';

export const size = ogSize;
export const contentType = ogContentType;

export function generateStaticParams() {
  return getArticleSlugs('guides').map((slug) => ({ slug }));
}

export default async function GuideOgImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticle('guides', slug);
  if (!article) notFound();

  return renderOgImage({
    eyebrow: 'Guide',
    title: article.title,
    meta: `${article.readingTime} min read · ${article.author.name}`,
  });
}
