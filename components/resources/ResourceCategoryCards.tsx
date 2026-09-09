import Link from 'next/link';
import { resourceCategories } from '@/lib/resources';
import { Card, stretchedLink } from '@/components/ui/Card';
import { Icon } from '@/components/ui/Icon';
import { cn } from '@/lib/utils';

type ResourceCategoryCardsProps = {
  className?: string;
  /** Where each card points — the resources page anchors by default. */
  hrefFor?: (id: string) => string;
  /**
   * Card title level. Defaults to h3 for use under a section heading; pass h2
   * when the grid sits directly beneath the page h1.
   */
  headingLevel?: 'h2' | 'h3';
};

export function ResourceCategoryCards({
  className,
  hrefFor = (id) => `/resources#${id}`,
  headingLevel: Heading = 'h3',
}: ResourceCategoryCardsProps) {
  return (
    <ul
      className={cn(
        'grid list-none grid-cols-1 gap-5 p-0 sm:grid-cols-2 lg:grid-cols-3',
        className,
      )}
    >
      {resourceCategories.map((category) => (
        <li key={category.id} className="flex">
          <Card className="group w-full p-6">
            <span
              aria-hidden="true"
              className="flex h-11 w-11 items-center justify-center rounded-lg bg-brand-50 text-brand-600 transition-colors duration-150 ease-subtle group-hover:bg-brand-100"
            >
              <Icon name={category.icon} size={22} />
            </span>

            <Heading className="mt-5 text-lg font-semibold tracking-[-0.01em] text-ink-900">
              <Link
                href={'href' in category ? category.href : hrefFor(category.id)}
                className={cn(
                  'transition-colors duration-150 ease-subtle group-hover:text-brand-700',
                  stretchedLink,
                )}
              >
                {category.label}
              </Link>
            </Heading>

            <p className="mt-2 text-pretty text-[0.9375rem] leading-relaxed text-ink-600">
              {category.blurb}
            </p>

            <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700">
              Explore
              <Icon
                name="arrow-right"
                size={16}
                className="transition-transform duration-150 ease-subtle group-hover:translate-x-0.5"
              />
            </span>
          </Card>
        </li>
      ))}
    </ul>
  );
}
