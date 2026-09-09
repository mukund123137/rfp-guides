import Link from 'next/link';
import { Icon } from '@/components/ui/Icon';
import { Disclosure } from './Disclosure';
import { archetypeLabels, featuredNote, getVendors, type VendorArchetype } from '@/lib/vendors';
import { cn } from '@/lib/utils';

const order: VendorArchetype[] = [
  'response-platform',
  'ai-native',
  'questionnaire',
  'document',
];

/**
 * Full vendor directory, grouped by archetype.
 *
 * Alphabetical inside each group and explicitly unranked. Each row states best
 * fit, standout strength and a real trade-off, because a directory that only
 * lists strengths is a advertisement with extra steps.
 */
export function VendorTable({ className }: { className?: string }) {
  const vendors = getVendors();

  return (
    <div className={cn('space-y-10', className)}>
      {order.map((archetype) => {
        const group = vendors.filter((v) => v.archetype === archetype);
        if (!group.length) return null;

        return (
          <section key={archetype} aria-labelledby={`group-${archetype}`}>
            <h3
              id={`group-${archetype}`}
              className="text-[0.6875rem] font-semibold uppercase tracking-eyebrow text-ink-500"
            >
              {archetypeLabels[archetype]}
            </h3>

            <ul className="mt-4 space-y-4">
              {group.map((vendor) => (
                <li
                  key={vendor.id}
                  className={cn(
                    'rounded-xl border bg-white p-5 shadow-card sm:p-6',
                    vendor.featured ? 'border-brand-200' : 'border-ink-200',
                  )}
                >
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex flex-wrap items-center gap-2.5">
                      <h4 className="font-display text-lg font-semibold text-ink-900">
                        {vendor.name}
                      </h4>
                      {vendor.featured ? (
                        <span className="rounded-full bg-accent-400/15 px-2.5 py-1 text-[0.625rem] font-semibold uppercase tracking-eyebrow text-accent-600">
                          Worth a look
                        </span>
                      ) : null}
                    </div>

                    <div className="flex items-center gap-4">
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
                        rel="noopener noreferrer nofollow"
                        className="inline-flex items-center gap-1.5 text-sm font-medium text-ink-500 transition-colors duration-150 ease-subtle hover:text-brand-700"
                      >
                        Website
                        <Icon name="arrow-up-right" size={14} />
                      </a>
                    </div>
                  </div>

                  <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-ink-700">
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
                      {featuredNote}
                    </p>
                  ) : null}
                </li>
              ))}
            </ul>
          </section>
        );
      })}

      <Disclosure />
    </div>
  );
}
