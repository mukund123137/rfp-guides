import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

type CardProps = {
  children: ReactNode;
  className?: string;
  as?: 'article' | 'div' | 'li' | 'section';
  interactive?: boolean;
};

/**
 * Shared card shell.
 *
 * Cards that link somewhere pair this with `stretchedLink` on their heading
 * anchor: one real, focusable link whose `::after` covers the whole card. That
 * gives a big pointer target without inventing a second hidden link for screen
 * readers to announce.
 */
export function Card({
  children,
  className,
  as: Tag = 'div',
  interactive = true,
}: CardProps) {
  return (
    <Tag
      className={cn(
        'relative flex flex-col rounded-xl border border-ink-200 bg-white p-6 shadow-card',
        interactive &&
          'transition duration-200 ease-subtle hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-card-hover',
        className,
      )}
    >
      {children}
    </Tag>
  );
}

export const stretchedLink =
  'after:absolute after:inset-0 after:rounded-xl after:content-[""]';
