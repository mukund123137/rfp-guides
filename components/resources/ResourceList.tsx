import Link from 'next/link';
import type { ResourceItem } from '@/lib/resources';
import { Card, stretchedLink } from '@/components/ui/Card';
import { Icon } from '@/components/ui/Icon';
import { cn } from '@/lib/utils';

type ResourceListProps = {
  items: ResourceItem[];
  className?: string;
};

export function ResourceList({ items, className }: ResourceListProps) {
  if (!items.length) return null;

  return (
    <ul className={cn('grid list-none grid-cols-1 gap-5 p-0 lg:grid-cols-2', className)}>
      {items.map((item) => {
        const hasLink = Boolean(item.href);

        return (
          <li key={item.slug} className="flex">
            <Card as="div" className="group w-full" interactive={hasLink}>
              <div className="flex flex-wrap items-center gap-2 text-xs">
                <span className="rounded bg-ink-100 px-2 py-1 font-semibold uppercase tracking-wide text-ink-600">
                  {item.format}
                </span>
                <span className="inline-flex items-center gap-1.5 text-ink-500">
                  <Icon name="clock" size={14} />
                  {item.effort}
                </span>
              </div>

              <h3 className="mt-4 text-lg font-semibold tracking-[-0.01em] text-ink-900">
                {hasLink && item.href ? (
                  <Link
                    href={item.href}
                    className={cn(
                      'transition-colors duration-150 ease-subtle group-hover:text-brand-700',
                      stretchedLink,
                    )}
                  >
                    {item.title}
                  </Link>
                ) : (
                  item.title
                )}
              </h3>

              <p className="mt-2 text-pretty text-[0.9375rem] leading-relaxed text-ink-600">
                {item.description}
              </p>

              {item.bullets.length > 0 ? (
                <ul className="mt-4 space-y-2">
                  {item.bullets.map((bullet) => (
                    <li key={bullet} className="flex gap-2.5 text-sm text-ink-600">
                      <Icon
                        name="checklist"
                        size={15}
                        className="mt-0.5 shrink-0 text-brand-500"
                      />
                      <span className="text-pretty">{bullet}</span>
                    </li>
                  ))}
                </ul>
              ) : null}

              {hasLink && item.href ? (
                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700">
                  Open the guide
                  <Icon
                    name="arrow-right"
                    size={16}
                    className="transition-transform duration-150 ease-subtle group-hover:translate-x-0.5"
                  />
                </span>
              ) : (
                <p className="mt-5 text-xs font-medium text-ink-500">
                  Copy the structure below into your own doc — nothing to download, no form
                  to fill in.
                </p>
              )}
            </Card>
          </li>
        );
      })}
    </ul>
  );
}
