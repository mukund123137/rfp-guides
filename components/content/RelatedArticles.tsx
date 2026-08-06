import type { ArticleSummary } from '@/lib/content';
import { ArticleGrid } from './ArticleGrid';
import { cn } from '@/lib/utils';

type RelatedArticlesProps = {
  articles: ArticleSummary[];
  className?: string;
  heading?: string;
};

export function RelatedArticles({
  articles,
  className,
  heading = 'Keep reading',
}: RelatedArticlesProps) {
  if (!articles.length) return null;

  return (
    <section aria-labelledby="related-heading" className={cn(className)}>
      <h2
        id="related-heading"
        className="text-2xl font-semibold tracking-[-0.015em] text-ink-900 sm:text-[1.75rem]"
      >
        {heading}
      </h2>
      <ArticleGrid articles={articles} columns={3} variant="compact" className="mt-6" />
    </section>
  );
}
