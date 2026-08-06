import type { ArticleSummary } from '@/lib/content';
import { ArticleCard } from './ArticleCard';
import { cn } from '@/lib/utils';

type ArticleGridProps = {
  articles: ArticleSummary[];
  columns?: 2 | 3 | 4;
  variant?: 'default' | 'featured' | 'compact';
  headingLevel?: 'h2' | 'h3' | 'h4';
  className?: string;
};

const columnClasses = {
  2: 'sm:grid-cols-2',
  3: 'sm:grid-cols-2 lg:grid-cols-3',
  4: 'sm:grid-cols-2 lg:grid-cols-4',
} as const;

export function ArticleGrid({
  articles,
  columns = 3,
  variant = 'default',
  headingLevel = 'h3',
  className,
}: ArticleGridProps) {
  if (!articles.length) return null;

  return (
    <ul className={cn('grid list-none grid-cols-1 gap-6 p-0', columnClasses[columns], className)}>
      {articles.map((article) => (
        <li key={`${article.collection}-${article.slug}`} className="flex">
          <ArticleCard
            article={article}
            variant={variant}
            headingLevel={headingLevel}
            className="w-full"
          />
        </li>
      ))}
    </ul>
  );
}
