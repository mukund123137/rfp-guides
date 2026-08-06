import Link from 'next/link';
import type { BreadcrumbCrumb } from '@/lib/schema';
import { cn } from '@/lib/utils';

type BreadcrumbsProps = {
  crumbs: BreadcrumbCrumb[];
  className?: string;
};

/**
 * Visible breadcrumb trail. The matching BreadcrumbList JSON-LD is emitted by
 * the page so the two always describe the same path.
 */
export function Breadcrumbs({ crumbs, className }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className={cn('text-sm', className)}>
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-ink-500">
        {crumbs.map((crumb, index) => {
          const isLast = index === crumbs.length - 1;
          return (
            <li key={crumb.href} className="flex items-center gap-2">
              {isLast ? (
                <span className="font-medium text-ink-700" aria-current="page">
                  {crumb.name}
                </span>
              ) : (
                <>
                  <Link
                    href={crumb.href}
                    className="transition-colors duration-150 ease-subtle hover:text-brand-700"
                  >
                    {crumb.name}
                  </Link>
                  <span aria-hidden="true" className="text-ink-300">
                    /
                  </span>
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
