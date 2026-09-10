import Link from 'next/link';
import { Icon } from '@/components/ui/Icon';
import { Disclosure } from './Disclosure';
import {
  archetypeLabels,
  featuredNote,
  getVendors,
  vendorRel,
} from '@/lib/vendors';
import { cn } from '@/lib/utils';

/**
 * Full vendor directory.
 *
 * A single ordered list rather than archetype-grouped sections: readers scan a
 * flat list far faster, and each row carries its archetype as a label so the
 * grouping information is not lost. Each row states best fit, standout strength
 * and a real trade-off — a directory that lists only strengths is an
 * advertisement with extra steps.
 */
export function VendorTable({ className }: { className?: string }) {
  const vendors = getVendors();

  return (
    <div className={cn(className)}>
      <ol className="space-y-4">
        {vendors.map((vendor, index) => (
          <li
            key={vendor.id}
            className={cn(
              'rounded-xl border bg-white p-5 shadow-card sm:p-6',
              vendor.featured ? 'border-brand-200' : 'border-ink-200',
            )}
          >
            <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-3">
              <div className="flex min-w-0 items-baseline gap-3">
                <span
                  aria-hidden="true"
                  className="font-mono text-xs text-ink-400"
                >
                  {String(index + 1).padStart(2, '0')}
                </span>
                <div className="min-w-0">
                  <h3 className="font-display text-lg font-semibold text-ink-900">
                    {vendor.name}
                  </h3>
                  <p className="mt-0.5 text-[0.6875rem] uppercase tracking-eyebrow text-ink-400">
                    {archetypeLabels[vendor.archetype]}
                  </p>
                </div>
              </div>

              <div className="flex shrink-0 items-center gap-4">
                {vendor.profilePath ? (
                  <Link
                    href={vendor.profilePath}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700 transition-colors duration-150 ease-subtle hover:text-brand-800"
                  >
                    Our review
                    <Icon name="arrow-right" size={15} />
                  </Link>
                ) : null}
                <a
                  href={vendor.url}
                  target="_blank"
                  rel={vendorRel(vendor)}
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-ink-500 transition-colors duration-150 ease-subtle hover:text-brand-700"
                >
                  Website
                  <Icon name="arrow-up-right" size={14} />
                </a>
              </div>
            </div>

            <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-700">
              {vendor.positioning}
            </p>

            <dl className="mt-4 grid gap-3 border-t border-ink-200 pt-4 text-[0.875rem] sm:grid-cols-3">
              <div>
                <dt className="font-semibold text-ink-900">Best for</dt>
                <dd className="mt-0.5 leading-snug text-ink-600">{vendor.bestFor}</dd>
              </div>
              <div>
                <dt className="font-semibold text-ink-900">Stands out</dt>
                <dd className="mt-0.5 leading-snug text-ink-600">{vendor.strength}</dd>
              </div>
              <div>
                <dt className="font-semibold text-ink-900">Watch out for</dt>
                <dd className="mt-0.5 leading-snug text-ink-600">{vendor.watchOut}</dd>
              </div>
            </dl>

            {vendor.featured ? (
              <p className="mt-4 border-t border-ink-200 pt-3 text-xs leading-relaxed text-ink-500">
                {featuredNote}{' '}
                <Link
                  href="/about#funding"
                  className="underline decoration-dotted underline-offset-2 transition-colors duration-150 ease-subtle hover:text-brand-700"
                >
                  How this site is funded
                </Link>
              </p>
            ) : null}
          </li>
        ))}
      </ol>

      <Disclosure className="mt-6" withLink={false} />
    </div>
  );
}
