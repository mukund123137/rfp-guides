import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Icon } from '@/components/ui/Icon';
import { Card, stretchedLink } from '@/components/ui/Card';
import { Disclosure } from './Disclosure';
import { archetypeLabels, featuredNote, getVendors } from '@/lib/vendors';
import { partnerUrl } from '@/lib/partner';
import { cn } from '@/lib/utils';

/**
 * The vendor landscape, as a homepage section.
 *
 * Deliberately a landscape rather than a ranking: products are grouped by what
 * they are built around, alphabetically within each group, so a reader picks a
 * shape of product before picking a name. One entry is highlighted, and the
 * reason for the highlight — including the funding relationship — is printed
 * next to it rather than left for the reader to infer.
 */
export function VendorLandscape() {
  const vendors = getVendors();
  const featured = vendors.find((v) => v.featured);
  const rest = vendors.filter((v) => !v.featured);

  return (
    <section
      aria-labelledby="landscape-heading"
      className="border-t border-ink-200 bg-paper-100 py-16 sm:py-20"
    >
      <Container>
        <SectionHeading
          titleId="landscape-heading"
          eyebrow="The landscape"
          title="Who builds RFP software"
          description="Grouped by what each product is actually built around, not ranked. Pick the shape of product that matches your bottleneck first — that decision eliminates more of the market than any feature comparison will."
          link={{ href: '/compare', label: 'Full comparison' }}
        />

        <div className="mt-10 lg:grid lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] lg:gap-8">
          {/* ------------------------------------------------ Featured entry */}
          {featured ? (
            <Card as="article" className="group relative overflow-hidden p-7 sm:p-8">
              <span
                aria-hidden="true"
                className="absolute inset-x-0 top-0 h-0.5 bg-accent-400"
              />
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="rounded-full bg-brand-50 px-2.5 py-1 text-[0.6875rem] font-semibold uppercase tracking-eyebrow text-brand-700 ring-1 ring-inset ring-brand-100">
                  {archetypeLabels[featured.archetype]}
                </span>
                <span className="rounded-full bg-accent-400/15 px-2.5 py-1 text-[0.6875rem] font-semibold uppercase tracking-eyebrow text-accent-600">
                  Worth a look
                </span>
              </div>

              <h3 className="mt-5 font-display text-2xl font-semibold tracking-[-0.015em] text-ink-900">
                <Link
                  href={featured.profilePath ?? '/compare'}
                  className={cn(
                    'transition-colors duration-150 ease-subtle group-hover:text-brand-700',
                    stretchedLink,
                  )}
                >
                  {featured.name}
                </Link>
              </h3>

              <p className="mt-3 text-pretty text-[1.0625rem] leading-relaxed text-ink-700">
                {featured.positioning}
              </p>

              <dl className="mt-6 space-y-3.5 border-t border-ink-200 pt-5 text-[0.9375rem]">
                <div>
                  <dt className="font-semibold text-ink-900">Best for</dt>
                  <dd className="mt-0.5 text-ink-600">{featured.bestFor}</dd>
                </div>
                <div>
                  <dt className="font-semibold text-ink-900">Where it stands out</dt>
                  <dd className="mt-0.5 text-ink-600">{featured.strength}</dd>
                </div>
                <div>
                  <dt className="font-semibold text-ink-900">Watch out for</dt>
                  <dd className="mt-0.5 text-ink-600">{featured.watchOut}</dd>
                </div>
              </dl>

              <div className="relative z-10 mt-6 flex flex-wrap items-center gap-x-5 gap-y-2">
                <Link
                  href={featured.profilePath ?? '/compare'}
                  className="inline-flex items-center gap-1.5 text-[0.9375rem] font-semibold text-brand-700 transition-colors duration-150 ease-subtle hover:text-brand-800"
                >
                  Read our review
                  <Icon name="arrow-right" size={16} />
                </Link>
                <a
                  href={partnerUrl('home-landscape')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-[0.9375rem] font-medium text-ink-600 transition-colors duration-150 ease-subtle hover:text-brand-700"
                >
                  Visit {featured.name}
                  <Icon name="arrow-up-right" size={15} />
                </a>
              </div>

              <p className="mt-5 border-t border-ink-200 pt-4 text-xs leading-relaxed text-ink-500">
                {featuredNote}
              </p>
            </Card>
          ) : null}

          {/* -------------------------------------------------- Everyone else */}
          <div className="mt-6 lg:mt-0">
            <ul className="divide-y divide-ink-200 overflow-hidden rounded-xl border border-ink-200 bg-white">
              {rest.map((vendor) => (
                <li key={vendor.id} className="group/row">
                  <a
                    href={vendor.url}
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="flex items-start gap-4 p-4 transition-colors duration-150 ease-subtle hover:bg-paper-100 sm:p-5"
                  >
                    <span className="min-w-0 flex-1">
                      <span className="flex flex-wrap items-baseline gap-x-2.5 gap-y-1">
                        <span className="text-[0.9375rem] font-semibold text-ink-900 transition-colors duration-150 ease-subtle group-hover/row:text-brand-700">
                          {vendor.name}
                        </span>
                        <span className="text-[0.6875rem] uppercase tracking-eyebrow text-ink-400">
                          {archetypeLabels[vendor.archetype]}
                        </span>
                      </span>
                      <span className="mt-1 block text-[0.875rem] leading-snug text-ink-600">
                        {vendor.bestFor}
                      </span>
                    </span>
                    <Icon
                      name="arrow-up-right"
                      size={15}
                      className="mt-1 shrink-0 text-ink-300 transition-colors duration-150 ease-subtle group-hover/row:text-brand-600"
                    />
                  </a>
                </li>
              ))}
            </ul>

            <p className="mt-4 text-[0.8125rem] leading-relaxed text-ink-500">
              Listed alphabetically within each group. Nobody pays to appear here and
              nobody can pay to be removed. Missing someone?{' '}
              <Link
                href="/contact"
                className="font-medium text-brand-700 underline decoration-brand-300 underline-offset-2 hover:text-brand-800"
              >
                Tell us
              </Link>
              .
            </p>

            <Disclosure className="mt-3" />
          </div>
        </div>
      </Container>
    </section>
  );
}
