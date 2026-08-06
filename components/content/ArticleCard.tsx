import Link from 'next/link';
import type { ArticleSummary } from '@/lib/content';
import { Badge } from '@/components/ui/Badge';
import { Card, stretchedLink } from '@/components/ui/Card';
import { Icon } from '@/components/ui/Icon';
import { cn, formatDateShort } from '@/lib/utils';

type ArticleCardProps = {
  article: ArticleSummary;
  variant?: 'default' | 'featured' | 'compact';
  /** Renders the card's title as h3 by default; set for correct outline nesting. */
  headingLevel?: 'h2' | 'h3' | 'h4';
  className?: string;
};

export function ArticleCard({
  article,
  variant = 'default',
  headingLevel = 'h3',
  className,
}: ArticleCardProps) {
  const Heading = headingLevel;
  const isFeatured = variant === 'featured';
  const isCompact = variant === 'compact';

  return (
    <Card
      as="article"
      className={cn(
        'group h-full',
        isFeatured && 'p-7 sm:p-8',
        isCompact && 'p-5',
        className,
      )}
    >
      <div className="mb-3 flex flex-wrap items-center gap-2.5">
        <Badge tone="brand">{article.category}</Badge>
        <span className="inline-flex items-center gap-1.5 text-xs font-medium text-ink-500">
          <Icon name="clock" size={14} />
          {article.readingTime} min read
        </span>
      </div>

      <Heading
        className={cn(
          'font-semibold tracking-[-0.01em] text-ink-900',
          isFeatured ? 'text-xl sm:text-[1.4375rem]' : isCompact ? 'text-base' : 'text-lg',
        )}
      >
        <Link
          href={article.url}
          className={cn(
            'transition-colors duration-150 ease-subtle group-hover:text-brand-700',
            stretchedLink,
          )}
        >
          {article.title}
        </Link>
      </Heading>

      <p
        className={cn(
          'mt-2.5 text-pretty leading-relaxed text-ink-600',
          isCompact ? 'text-sm' : 'text-[0.9375rem]',
        )}
      >
        {article.description}
      </p>

      <div className="mt-auto flex flex-wrap items-center gap-x-3 gap-y-1 pt-5 text-xs text-ink-500">
        <span className="font-medium text-ink-700">{article.author.name}</span>
        <span aria-hidden="true" className="text-ink-300">
          &middot;
        </span>
        <span>
          Updated{' '}
          <time dateTime={new Date(article.updatedAt).toISOString()}>
            {formatDateShort(article.updatedAt)}
          </time>
        </span>
      </div>
    </Card>
  );
}
